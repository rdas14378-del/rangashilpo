import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'RangaShilpo | Devotional Fine Art & Heritage Crafts',
  description: 'Curated sanctuary of traditional Indian fine arts and ceremonial crafts by Riddhima Das. Sacred paintings, ceremonial crafts, alpona, and heritage textiles.',
  keywords: ['Indian art', 'devotional art', 'traditional crafts', 'alpona', 'ceremonial crafts', 'fine art', 'heritage crafts', 'Bengali art', 'spiritual art'],
  authors: [{ name: 'Riddhima Das' }],
  creator: 'Ratul Das',
  publisher: 'RangaShilpo',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rangashilpo.com',
    title: 'RangaShilpo | Devotional Fine Art & Heritage Crafts',
    description: 'Curated sanctuary of traditional Indian fine arts and ceremonial crafts by Riddhima Das.',
    siteName: 'RangaShilpo',
    images: [
      {
        url: '/images/art/lord-rama.jpeg',
        width: 1200,
        height: 630,
        alt: 'RangaShilpo - Lord Rama with Bow & Quiver',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RangaShilpo | Devotional Fine Art & Heritage Crafts',
    description: 'Curated sanctuary of traditional Indian fine arts and ceremonial crafts.',
    images: ['/images/art/lord-rama.jpeg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#16171f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
  variable: '--font-noto-sans-devanagari',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${notoDevanagari.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased text-obsidian">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}