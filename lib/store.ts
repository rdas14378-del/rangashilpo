import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Artwork, Craft } from '@/lib/data'

export type CartItem = {
  id: string
  type: 'artwork' | 'craft'
  title: string
  price: number
  image: string
  quantity: number
  slug: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'rangashilpo-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

interface PriceStore {
  prices: Record<string, number>
  setPrice: (id: string, price: number) => Promise<void>
  setPrices: (prices: Record<string, number>) => void
  getPrice: (id: string) => number | undefined
  initializePrices: () => Promise<void>
}

const DEFAULT_PRICES: Record<string, number> = {
  'art-1': 18500,
  'art-2': 12800,
  'art-3': 15600,
  'art-4': 9800,
  'art-5': 11200,
  'art-6': 14300,
  'art-7': 22500,
  'art-8': 19800,
  'art-9': 16700,
  'craft-1': 3200,
  'craft-2': 2800,
  'craft-3': 4500,
  'craft-4': 5800,
  'craft-5': 6200,
  'craft-6': 3600,
  'craft-7': 4200,
  'craft-8': 4800,
  'craft-9': 8500,
}

const STORAGE_KEY = 'rangashilpo-prices'

export const usePriceStore = create<PriceStore>((set, get) => ({
  prices: {},

  initializePrices: async () => {
    if (typeof window !== 'undefined') {
      // First try localStorage for instant UI
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          set({ prices: JSON.parse(stored) })
        } catch {
          set({ prices: DEFAULT_PRICES })
        }
      } else {
        set({ prices: DEFAULT_PRICES })
      }

      // Then fetch from database to sync overrides
      try {
        const response = await fetch('/api/update-price')
        if (response.ok) {
          const { priceOverrides } = await response.json()
          if (priceOverrides && priceOverrides.length > 0) {
            const dbPrices: Record<string, number> = {}
            for (const override of priceOverrides) {
              dbPrices[override.productId] = override.price
            }
            const mergedPrices = { ...get().prices, ...dbPrices }
            set({ prices: mergedPrices })
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedPrices))
          }
        }
      } catch {
        // Silently fail - localStorage is source of truth
      }
    }
  },

  setPrices: (prices: Record<string, number>) => {
    set({ prices })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prices))
    }
  },

  setPrice: async (id: string, price: number) => {
    const newPrices = { ...get().prices, [id]: price }
    set({ prices: newPrices })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrices))
    }
    // Also sync to server via API
    try {
      await fetch('/api/update-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, price }),
      })
    } catch {
      // Silently fail - localStorage is source of truth
    }
  },

  getPrice: (id: string) => {
    return get().prices[id] ?? DEFAULT_PRICES[id]
  },
}))

export function getCurrentPrice(itemId: string): number {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const prices = JSON.parse(stored)
        return prices[itemId] ?? DEFAULT_PRICES[itemId]
      } catch {
        return DEFAULT_PRICES[itemId]
      }
    }
  }
  return DEFAULT_PRICES[itemId]
}