'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Mail, MessageCircle, Heart, Sparkles, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-slate-200">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="RangaShilpo Home">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-obsidian to-crimson flex items-center justify-center shadow-gallery">
                <span className="font-serif text-2xl text-white font-bold">र</span>
              </div>
              <span className="font-serif text-2xl font-bold text-obsidian tracking-tight">RangaShilpo</span>
            </Link>

            <p className="font-serif text-crimson font-medium mb-4">
              Devotional Fine Art & Heritage Crafts
            </p>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xs">
              Curated sanctuary of traditional Indian fine arts and ceremonial crafts.
              Every piece tells a story of faith, tradition, and masterful craftsmanship.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/ratulyx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-slate-500 hover:text-crimson hover:bg-slate-100 transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:rdas90503@gmail.com"
                className="p-2 rounded-xl text-slate-500 hover:text-crimson hover:bg-slate-100 transition-all duration-200"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919831897956"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-slate-500 hover:text-crimson hover:bg-slate-100 transition-all duration-200"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-serif text-lg font-bold text-obsidian mb-4">Collections</h3>
            <nav className="space-y-3">
              <Link
                href="/art"
                className="block text-slate-600 hover:text-crimson transition-colors font-medium"
              >
                Sacred Fine Art Gallery
              </Link>
              <Link
                href="/crafts"
                className="block text-slate-600 hover:text-crimson transition-colors font-medium"
              >
                Ceremonial Crafts Studio
              </Link>
              <Link
                href="/"
                className="block text-slate-600 hover:text-crimson transition-colors font-medium"
              >
                Featured Masterpieces
              </Link>
              <Link
                href="/cart"
                className="block text-slate-600 hover:text-crimson transition-colors font-medium"
              >
                Your Collection
              </Link>
            </nav>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-serif text-lg font-bold text-obsidian mb-4">Support</h3>
            <nav className="space-y-3">
              <a
                href="mailto:rdas90503@gmail.com"
                className="block text-slate-600 hover:text-crimson transition-colors font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>rdas90503@gmail.com</span>
              </a>
              <a
                href="https://wa.me/919831897956"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-600 hover:text-crimson transition-colors font-medium flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>+91 98318 97956</span>
              </a>
              <Link
                href="/"
                className="block text-slate-600 hover:text-crimson transition-colors font-medium"
              >
                Shipping & Delivery
              </Link>
              <Link
                href="/"
                className="block text-slate-600 hover:text-crimson transition-colors font-medium"
              >
                Returns & Care
              </Link>
            </nav>
          </motion.div>

          {/* Promise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-serif text-lg font-bold text-obsidian mb-4">Our Promise</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson to-crimson-light flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-obsidian mb-1">Authentic Heritage</h4>
                  <p className="text-sm text-slate-600">Every piece handcrafted using traditional techniques passed down generations</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-obsidian mb-1">Made with Devotion</h4>
                  <p className="text-sm text-slate-600">Created with reverence by artist Riddhima Das in her studio</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson to-gold flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-obsidian mb-1">Curated Excellence</h4>
                  <p className="text-sm text-slate-600">Personally selected and managed by Ratul Das for discerning collectors</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-slate-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-serif">
              © {new Date().getFullYear()} RangaShilpo. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-crimson transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-crimson transition-colors">Terms</Link>
              <span className="text-gold">·</span>
              <span className="font-serif text-crimson">रङ्गशिल्प</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}