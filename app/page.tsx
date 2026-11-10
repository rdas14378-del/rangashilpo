import { prisma } from '@/lib/prisma'
import HomePageClient from './HomePageClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch price overrides from Neon database
  const priceOverrides = await prisma.priceOverride.findMany()

  // Convert to a map for easy lookup
  const priceMap: Record<string, number> = {}
  for (const override of priceOverrides) {
    priceMap[override.productId] = override.price
  }

  return <HomePageClient initialPrices={priceMap} />
}