import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'

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

// In-memory cache (in production, use Vercel KV, Supabase, or Redis)
let priceCache: Record<string, number> = { ...DEFAULT_PRICES }

export async function GET() {
  return NextResponse.json({ prices: priceCache })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || !isSuperAdmin(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, price } = await request.json()

    if (!id || typeof price !== 'number' || price < 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    priceCache[id] = price

    // In production, persist to Vercel KV / Supabase here
    // await kv.set('prices', priceCache)

    return NextResponse.json({ success: true, price: priceCache[id] })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}