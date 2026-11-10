import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || !isSuperAdmin(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { productId, price } = await request.json()

    if (!productId || typeof price !== 'number' || price < 0) {
      return NextResponse.json({ error: 'Invalid request: productId and price are required' }, { status: 400 })
    }

    const priceOverride = await prisma.priceOverride.upsert({
      where: { productId },
      update: { price },
      create: { productId, price },
    })

    return NextResponse.json({ success: true, priceOverride })
  } catch (error) {
    console.error('Error updating price:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || !isSuperAdmin(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const priceOverrides = await prisma.priceOverride.findMany()
    return NextResponse.json({ priceOverrides })
  } catch (error) {
    console.error('Error fetching price overrides:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}