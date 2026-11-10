'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { signIn, signOut } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import HeroFallingBook from '@/components/HeroFallingBook'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { Sparkles, ArrowDown, Crown, Shield, Heart, Award } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { artworks, crafts } from '@/lib/data'
import { isSuperAdmin } from '@/lib/auth'

// Dynamic import for 3D heavy component
const HeroFallingBookDynamic = dynamic(() => import('@/components/HeroFallingBook'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-obsidian to-crimson flex items-center justify-center">
          <span className="font-serif text-4xl text-white font-bold">र</span>
        </div>
        <p className="font-serif text-2xl text-obsidian">Loading Gallery...</p>
      </motion.div>
    </div>
  ),
})

export default function HomePage() {
  const { data: session, status } = useSession()
  const { getItemCount } = useCartStore()
  const [heroComplete, setHeroComplete] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const isAdmin = session?.user?.email && isSuperAdmin(session.user.email)

  // Show auth gate if not authenticated
  if (status === 'authenticated' && !session) {
    return null // Will show login page instead
  }

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
          <p className="font-serif text-2xl text-obsidian">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (!session) {
    return <AuthGate />
  }

  const featuredArt = artworks.filter(a => a.featured).slice(0, 3)
  const featuredCrafts = crafts.filter(c => c.featured).slice(0, 3)
  const itemCount = getItemCount()

  return (
    <>
      <Navbar />

      <main className="pt-16 min-h-screen bg-gallery-radial">
        {/* Hero Section */}
        <section className="relative">
          <HeroFallingBookDynamic onAnimationComplete={() => setHeroComplete(true)} />

          {/* Hero Content Overlay */}
          <AnimatePresence mode="wait">
            {heroComplete && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-20 z-10"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                  className="text-center max-w-3xl mx-auto"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-crimson text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    Welcome to RangaShilpo
                  </span>

                  <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-obsidian tracking-tight leading-[1.05] mb-6">
                    Devotional Fine Art
                    <br />
                    <span className="text-gradient-crimson">& Heritage Crafts</span>
                  </h1>

                  <p className="font-serif text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Curated sanctuary of traditional Indian paintings and ceremonial crafts —
                    each piece a prayer rendered in pigment, thread, and devotion.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="/art"
                      className="btn-primary w-full sm:w-auto group"
                    >
                      Explore Fine Art
                      <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </a>
                    <a
                      href="/crafts"
                      className="btn-secondary w-full sm:w-auto border-crimson text-crimson hover:bg-crimson/5"
                    >
                      Ceremonial Crafts
                    </a>
                  </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: [0, 10, 0] }}
                  transition={{
                    opacity: { delay: 1, duration: 0.8 },
                    y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 text-crimson/60"
                >
                  <ArrowDown className="w-6 h-6" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Featured Collections Preview */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-4">
                <Crown className="w-4 h-4" />
                Curated Collections
              </span>
              <h2 className="section-heading">Masterpieces Awaiting Discovery</h2>
              <p className="section-description mx-auto">
                Hand-selected sacred artworks and ceremonial pieces — each carrying the lineage of
                traditional techniques and devotional intention.
              </p>
            </div>

            {/* Featured Art */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-obsidian">
                    Sacred Fine Art Gallery
                  </h3>
                  <p className="text-slate-600 mt-1">Original devotional paintings</p>
                </div>
                <a
                  href="/art"
                  className="hidden md:inline-flex items-center gap-2 text-crimson font-medium hover:text-crimson-light transition-colors"
                >
                  View All 9 Artworks
                  <ArrowDown className="w-4 h-4" />
                </a>
              </div>

              <div className="art-grid">
                {featuredArt.map((art, index) => (
                  <ArtCardPreview key={art.id} item={art} type="artwork" index={index} />
                ))}
              </div>

              <div className="md:hidden mt-6 text-center">
                <a href="/art" className="btn-secondary">
                  View All 9 Artworks
                  <ArrowDown className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Featured Crafts */}
            <div>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-obsidian">
                    Ceremonial Crafts Studio
                  </h3>
                  <p className="text-slate-600 mt-1">Heritage handicrafts & ritual pieces</p>
                </div>
                <a
                  href="/crafts"
                  className="hidden md:inline-flex items-center gap-2 text-crimson font-medium hover:text-crimson-light transition-colors"
                >
                  View All 9 Crafts
                  <ArrowDown className="w-4 h-4" />
                </a>
              </div>

              <div className="art-grid">
                {featuredCrafts.map((craft, index) => (
                  <ArtCardPreview key={craft.id} item={craft} type="craft" index={index} />
                ))}
              </div>

              <div className="md:hidden mt-6 text-center">
                <a href="/crafts" className="btn-secondary">
                  View All 9 Crafts
                  <ArrowDown className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <TrustCard
                icon={Shield}
                title="Authentic Heritage"
                description="Every piece handcrafted using traditional techniques passed down through generations of master artisans."
              />
              <TrustCard
                icon={Heart}
                title="Made with Devotion"
                description="Created with reverence by artist Riddhima Das in her studio — each brushstroke a prayer."
              />
              <TrustCard
                icon={Award}
                title="Curated Excellence"
                description="Personally selected and managed by Ratul Das for discerning collectors and devotees."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Ready to Begin Your Collection
              </div>

              <h2 className="section-heading mb-6">
                Bring Sacred Artistry Home
              </h2>

              <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Each piece in our gallery carries the blessing of tradition and the mastery of technique.
                Begin your journey into the world of devotional fine art and ceremonial crafts.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/art" className="btn-primary w-full sm:w-auto">
                  Browse Fine Art Gallery
                </a>
                <a href="/crafts" className="btn-secondary w-full sm:w-auto border-crimson text-crimson hover:bg-crimson/5">
                  Explore Ceremonial Crafts
                </a>
              </div>
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

// Auth Gate Component
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
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-obsidian mb-4 tracking-tight">
              RangaShilpo
            </h1>
            <p className="font-serif text-xl text-crimson font-medium mb-6">
              Devotional Fine Art & Heritage Crafts
            </p>
            <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
              Enter our curated sanctuary of traditional Indian fine arts and ceremonial crafts.
              Authentic pieces by Riddhima Das, managed by Ratul Das.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="mb-10 grid grid-cols-3 gap-4 text-center"
          >
            <div className="p-3 rounded-xl bg-slate-50/50">
              <Shield className="w-6 h-6 mx-auto text-crimson mb-2" />
              <p className="text-xs text-slate-600 font-medium">Authentic Curation</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/50">
              <Crown className="w-6 h-6 mx-auto text-gold mb-2" />
              <p className="text-xs text-slate-600 font-medium">Secure Access</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/50">
              <Sparkles className="w-6 h-6 mx-auto text-crimson mb-2" />
              <p className="text-xs text-slate-600 font-medium">Heritage Quality</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
            onClick={() => signIn('google', { callbackUrl: '/' })}
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
            <motion.span
              className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"
            />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-sm text-slate-500 font-serif italic"
          >
            "Where devotion meets artistry — every piece tells a story of faith, tradition, and masterful craftsmanship."
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 pt-8 border-t border-slate-200 text-xs text-slate-400 space-y-1"
          >
            <p>Artist: Riddhima Das</p>
            <p>Manager: Ratul Das</p>
            <p>Support: rdas90503@gmail.com</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// Art Card Preview Component
function ArtCardPreview({
  item,
  type,
  index
}: {
  item: typeof artworks[0] | typeof crafts[0]
  type: 'artwork' | 'craft'
  index: number
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-gallery hover:shadow-gallery-hover transition-all duration-500"
    >
      <Link href={`/${type === 'artwork' ? 'art' : 'crafts'}/${item.slug}`} className="block">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />

          {item.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-crimson/95 text-white text-xs font-medium shadow-lg">
              Featured
            </span>
          )}
        </div>

        <div className="p-5">
          <p className="font-serif text-sm text-crimson font-medium tracking-wide mb-1">
            {type === 'artwork' ? 'Sacred Fine Art' : 'Ceremonial Craft'}
          </p>

          <h3 className="font-serif text-lg font-bold text-obsidian mb-2 group-hover:text-crimson transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between">
            <span className="font-serif text-xl font-bold text-crimson">{formatPrice(item.price)}</span>
            <span className="text-xs text-slate-500 font-medium">{item.medium}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// Trust Card Component
function TrustCard({
  icon: Icon,
  title,
  description
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center p-8 md:p-10 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-crimson to-gold mb-6">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="font-serif text-xl font-bold text-obsidian mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}