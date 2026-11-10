'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, Send, Loader2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useSession } from 'next-auth/react'

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, getTotal, clearCart, getItemCount } = useCartStore()
  const { data: session } = useSession()
  const [sending, setSending] = useState(false)

  const total = getTotal()
  const itemCount = getItemCount()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const generateWhatsAppMessage = () => {
    const lines = items.map((item, index) =>
      `${index + 1}. ${item.title} - ${formatPrice(item.price)} x ${item.quantity}`
    ).join('\n')

    const customerName = session?.user?.name || 'Valued Customer'
    const customerEmail = session?.user?.email || 'Not provided'

    return `Hello Riddhima & Ratul, I would like to purchase the following from RangaShilpo:

${lines}

Total: ${formatPrice(total)}

Customer Email: ${customerEmail}
Customer Name: ${customerName}

Please share delivery options and payment details.`
  }

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage()
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919831897956?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-obsidian/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="false"
      >
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-gallery-hover flex flex-col z-50"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Shopping cart"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson to-gold flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-obsidian">Your Collection</h2>
                <p className="text-sm text-slate-500">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-obsidian hover:bg-slate-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="font-serif text-lg text-obsidian mb-2">Your collection is empty</h3>
                <p className="text-slate-500 text-sm">Discover sacred art and ceremonial crafts to begin</p>
              </motion.div>
            ) : (
              <motion.ul className="space-y-4">
                {items.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 p-3 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white shadow-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-obsidian truncate">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-0.5">{formatPrice(item.price)} each</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-semibold text-obsidian">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-crimson hover:bg-crimson/10 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <span className="font-serif text-lg font-bold text-crimson">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Footer - Total & Checkout */}
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-slate-200 p-6 bg-slate-50/30"
            >
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-serif text-lg text-slate-600">Total</span>
                <span className="font-serif text-2xl font-bold text-crimson">{formatPrice(total)}</span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                disabled={sending}
                className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-crimson via-obsidian to-crimson text-white font-semibold text-lg shadow-gallery hover:shadow-gallery-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting to WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Checkout via WhatsApp</span>
                  </>
                )}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-xl translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                />
              </button>

              <p className="text-center text-xs text-slate-500 mt-4 font-serif italic">
                "Your chosen pieces will be personally curated and prepared for their journey to you."
              </p>
            </motion.div>
          )}
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  )
}