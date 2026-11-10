'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, User, LogOut, Crown, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { isSuperAdmin } from '@/lib/auth'
import { useCartStore } from '@/lib/store'
import clsx from 'clsx'

export default function Navbar() {
  const { data: session, status } = useSession()
  const { getItemCount } = useCartStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const itemCount = getItemCount()
  const isAdmin = session?.user?.email && isSuperAdmin(session.user.email)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/art', label: 'Fine Art' },
    { href: '/crafts', label: 'Ceremonial Crafts' },
  ]

  if (status === 'loading') {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16" />
      </header>
    )
  }

  if (!session) {
    return null // Auth gate handles unauthenticated state
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50" aria-label="RangaShilpo Home">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-obsidian to-crimson flex items-center justify-center shadow-gallery"
          >
            <span className="font-serif text-xl text-white font-bold">र</span>
          </motion.div>
          <span className="hidden sm:block font-serif text-xl font-bold text-obsidian tracking-tight">
            RangaShilpo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-medium text-slate-700 hover:text-crimson transition-colors duration-200 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-crimson after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-xl text-slate-700 hover:text-crimson hover:bg-slate-100 transition-all duration-200"
            aria-label={`Shopping cart, ${itemCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.3 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-crimson text-white text-xs font-bold flex items-center justify-center"
              >
                {itemCount > 9 ? '9+' : itemCount}
              </motion.span>
            )}
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              aria-expanded={profileMenuOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crimson to-gold flex items-center justify-center overflow-hidden">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium text-obsidian">
                {session.user?.name || 'User'}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-gallery-hover border border-slate-100 py-2 z-50"
                  role="menu"
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-obsidian truncate">{session.user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                    {isAdmin && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-medium"
                      >
                        <Crown className="w-3 h-3" />
                        Super Admin
                      </motion.span>
                    )}
                  </div>

                  <div className="py-1">
                    <Link
                      href="/cart"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-crimson transition-colors"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Cart
                      {itemCount > 0 && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-crimson text-white text-xs font-bold">
                          {itemCount}
                        </span>
                      )}
                    </Link>

                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-crimson transition-colors"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-crimson font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson to-gold flex items-center justify-center overflow-hidden flex-shrink-0">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-obsidian truncate">{session.user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-crimson font-medium transition-colors mt-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}