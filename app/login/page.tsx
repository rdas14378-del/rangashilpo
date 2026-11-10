'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { Sparkles, Shield, Crown, Heart, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const { data: session, status } = useSession()

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      window.location.href = '/'
    }
  }, [session, status])

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

  if (session) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-crimson/10 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gold/5 via-transparent to-crimson/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-md mx-auto p-10 md:p-14 text-center"
        >
          {/* RangaShilpo Crest */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
            className="relative mb-10"
          >
            <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-obsidian to-crimson shadow-gallery mb-6 relative overflow-hidden">
              <span className="font-serif text-5xl md:text-6xl text-white font-bold tracking-wide relative z-10">
                रङ्गशिल्प
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-gold/20 rounded-full"
              />
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <motion.span
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-6 text-gold"
              >
                <Sparkles className="w-6 h-6" />
              </motion.span>
              <div className="w-20 h-px bg-gradient-to-r from-gold via-gold to-transparent" />
            </div>
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-obsidian mb-4 tracking-tight">
              RangaShilpo
            </h1>
            <p className="font-serif text-xl md:text-2xl text-crimson font-medium mb-6">
              Devotional Fine Art & Heritage Crafts
            </p>
            <p className="text-slate-600 leading-relaxed max-w-sm mx-auto text-lg">
              Enter our curated sanctuary of traditional Indian fine arts and ceremonial crafts.
              Authentic pieces by Riddhima Das, managed by Ratul Das.
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="mb-12 grid grid-cols-3 gap-4 text-center"
          >
            <div className="p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
              <Shield className="w-7 h-7 mx-auto text-crimson mb-2" />
              <p className="text-xs text-slate-600 font-medium">Authentic Curation</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
              <Crown className="w-7 h-7 mx-auto text-gold mb-2" />
              <p className="text-xs text-slate-600 font-medium">Secure Access</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
              <Heart className="w-7 h-7 mx-auto text-crimson mb-2" />
              <p className="text-xs text-slate-600 font-medium">Heritage Quality</p>
            </div>
          </motion.div>

          {/* Sign In Button */}
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full group relative px-8 py-4.5 rounded-xl bg-gradient-to-r from-obsidian via-crimson to-obsidian text-white font-semibold text-lg overflow-hidden shadow-gallery hover:shadow-gallery-hover transition-all duration-300 focus-visible-ring"
          >
            <span className="relative flex items-center justify-center gap-3">
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="flex items-center justify-center"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </motion.span>
              <span>Continue with Google</span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </span>

            <motion.span
              className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"
            />

            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
            />
          </motion.button>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 text-sm md:text-base text-slate-500 font-serif italic leading-relaxed"
          >
            "Where devotion meets artistry — every piece tells a story of faith, tradition, and masterful craftsmanship."
          </motion.p>

          {/* Footer info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 pt-8 border-t border-slate-200 text-xs text-slate-400 space-y-2"
          >
            <p className="font-medium text-slate-500">RangaShilpo (रङ्गशिल्प)</p>
            <p>Artist & Creator: Riddhima Das</p>
            <p>Website Manager: Ratul Das</p>
            <p>Support: rdas90503@gmail.com</p>
            <p>WhatsApp: +91 98318 97956</p>
            <p>Instagram: @ratulyx</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}