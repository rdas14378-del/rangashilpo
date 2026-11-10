import { prisma } from '@/lib/prisma'
import CraftsPageClient from './CraftsPageClient'

export const dynamic = 'force-dynamic'

export default async function CraftsPage() {
  // Fetch price overrides from Neon database
  const priceOverrides = await prisma.priceOverride.findMany()

  // Convert to a map for easy lookup
  const priceMap: Record<string, number> = {}
  for (const override of priceOverrides) {
    priceMap[override.productId] = override.price
  }

  return <CraftsPageClient initialPrices={priceMap} />
}