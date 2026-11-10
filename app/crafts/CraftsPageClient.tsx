'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import ArtCard3D from '@/components/ArtCard3D'
import { crafts } from '@/lib/data'
import { useCartStore, usePriceStore } from '@/lib/store'
import { ArrowLeft, Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface CraftsPageClientProps {
  initialPrices: Record<string, number>
}

export default function CraftsPageClient({ initialPrices }: CraftsPageClientProps) {
  const { data: session, status } = useSession()
  const { getItemCount } = useCartStore()
  const [cartOpen, setCartOpen] = useState(false)
  const itemCount = getItemCount()
  const [pricesInitialized, setPricesInitialized] = useState(false)

  // Initialize prices from server-fetched overrides on mount
  useEffect(() => {
    if (!pricesInitialized && status === 'authenticated') {
      // Set the initial prices from server
      usePriceStore.getState().setPrices(initialPrices)
      setPricesInitialized(true)
    }
  }, [initialPrices, pricesInitialized, status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-obsidian to-crimson flex items-center justify-center">
            <span className="font-serif text-4xl text-white font-bold">र</span>
          </div>
          <p className="font-serif text-2xl text-obsidian">Loading Studio...</p>
        </motion.div>
      </div>
    )
  }

  if (!session) {
    return <AuthGate />
  }

  return (
    <>
      <Navbar />

      <main className="pt-16 min-h-screen bg-gallery-radial">
        {/* Page Header */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-crimson transition-colors font-medium mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Gallery
              </Link>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-4">
                <Crown className="w-4 h-4" />
                Ceremonial Crafts Studio
              </div>

              <h1 className="section-heading mb-4">Heritage Handicrafts & Ritual Pieces</h1>
              <p className="section-description max-w-2xl">
                Nine exquisite ceremonial crafts — alpona motifs, ritual thali sets, hand-painted textiles,
                and traditional wedding implements. Each piece crafted using ancestral techniques
                for auspicious occasions and daily worship.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Crafts Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="art-grid">
              {crafts.map((craft, index) => (
                <ArtCard3D
                  key={craft.id}
                  id={craft.id}
                  slug={craft.slug}
                  title={craft.title}
                  description={craft.description}
                  medium={craft.medium}
                  price={craft.price}
                  image={craft.image}
                  type="craft"
                  featured={craft.featured}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Continue Your Journey
              </div>

              <h2 className="section-heading mb-4">Explore Sacred Fine Art</h2>
              <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover original devotional paintings — each a masterpiece of traditional
                iconography and spiritual expression.
              </p>

              <Link href="/art" className="btn-secondary border-crimson text-crimson hover:bg-crimson/5">
                Browse Fine Art Gallery
                <ArrowLeft className="w-5 h-5 -rotate-90" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Floating Cart Button for Mobile */}
      <motion.button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 md:hidden z-40 p-3 rounded-2xl bg-gradient-to-r from-crimson to-obsidian text-white shadow-gallery-hover hover:shadow-[0_0_0_4px_rgba(155,27,48,0.3)] transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Open cart, ${itemCount} items`}
      >
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v4m5-4h10m-10 0l2 2m-2-2l-2 2m-2 0v4m21-2a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v4" />
          </svg>
          {itemCount > 0 && (
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-crimson text-xs font-bold flex items-center justify-center"
            >
              {itemCount > 9 ? '9+' : itemCount}
            </motion.span>
          )}
        </div>
      </motion.button>
    </>
  )
}

function AuthGate() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-md mx-6 p-10 md:p-14 text-center"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl animate-float-slow" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-br from-crimson/10 to-transparent rounded-full blur-3xl animate-float" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
            className="relative mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-obsidian to-crimson shadow-gallery mb-6">
              <span className="font-serif text-4xl md:text-5xl text-white font-bold tracking-wide">
                रङ्गशिल्प
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <Sparkles className="w-5 h-5 text-gold" />
              <div className="w-16 h-px bg-gradient-to-r from-gold via-gold to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="mb-10"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-obsidian mb-4 tracking-tight">RangaShilpo</h1>
            <p className="font-serif text-xl text-crimson font-medium mb-6">Devotional Fine Art & Heritage Crafts</p>
            <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
              Enter our curated sanctuary of traditional Indian fine arts and ceremonial crafts.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
            onClick={() => signIn('google', { callbackUrl: '/crafts' })}
            className="w-full group relative px-8 py-4 rounded-xl bg-gradient-to-r from-obsidian via-crimson to-obsidian text-white font-medium text-lg overflow-hidden shadow-gallery hover:shadow-gallery-hover transition-all duration-300"
          >
            <span className="relative flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Continue with Google</span>
            </span>
            <motion.span className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-sm text-slate-500 font-serif italic"
          >
            "Where devotion meets artistry — every piece tells a story of faith, tradition, and masterful craftsmanship."
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}