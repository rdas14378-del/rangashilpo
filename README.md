# RangaShilpo (रङ्गशिल्प) — Devotional Fine Art & Heritage Crafts

A highly animated, ultra-premium production-ready e-commerce and portfolio web application for traditional Indian fine arts and ceremonial crafts.

## Features

### 🎨 Visual Excellence
- **Pristine White Gallery Theme** — Luxury white & alabaster radial gradients with gallery lighting
- **3D Hero Experience** — Physics-based falling artbook with floating 3D studio instruments (calligraphy pen, paintbrush, peacock feather)
- **Interactive 3D Art Cards** — Each artwork displayed on a 3D pedestal with hover animations
- **Framer Motion Animations** — Staggered entrances, micro-interactions, and fluid transitions throughout

### 🔐 Authentication & Access Control
- **Mandatory Google Sign-In** — Full-screen elegant auth gate with RangaShilpo crest
- **NextAuth.js (Auth.js)** — Secure Google OAuth 2.0 integration
- **Role-Based Access** — Super-admin (`rdas14378@gmail.com`) gets inline price editing
- **Session Persistence** — 30-day JWT sessions with profile avatar in navbar

### 🛍️ Dual Catalog Architecture
- **Collection A: Sacred Fine Art Gallery** (9 original paintings)
- **Collection B: Ceremonial Crafts Studio** (9 heritage handicrafts)
- **Real-time Price Sync** — Admin price changes propagate instantly via localStorage + API

### 🛒 Shopping & Checkout
- **Slide-Over Cart Drawer** — LocalStorage-backed with quantity controls
- **WhatsApp Direct Checkout** — Structured message with customer details, opens `wa.me/919831897956`
- **Persistent Cart** — Survives page refreshes and sessions

### 🎯 Admin Features
- **Inline Price Editor** — Pencil icon appears next to prices for super-admin
- **Immediate Persistence** — Saves to localStorage + syncs to `/api/prices` endpoint
- **Vercel KV Ready** — API route structured for serverless persistence

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion 11 |
| 3D Graphics | Three.js / @react-three/fiber / @react-three/drei |
| Icons | Lucide React |
| Auth | NextAuth.js (Auth.js) v4 |
| State | Zustand + persist middleware |
| Language | TypeScript (strict) |
| Deployment | Vercel (1-click) |

## Project Structure

```
rangashilpo/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth.js endpoints
│   │   └── prices/                 # Price persistence API
│   ├── art/                        # Fine Art Gallery page
│   ├── crafts/                     # Ceremonial Crafts page
│   ├── cart/                       # Shopping Cart page
│   ├── login/                      # Auth Gate page
│   ├── layout.tsx                  # Root layout with fonts
│   ├── page.tsx                    # Homepage with 3D Hero
│   ├── providers.tsx               # SessionProvider wrapper
│   └── globals.css                 # Tailwind + custom styles
├── components/
│   ├── Navbar.tsx                  # Navigation with cart/profile
│   ├── Footer.tsx                  # Footer with trust signals
│   ├── HeroFallingBook.tsx         # 3D Hero with physics book
│   ├── ArtCard3D.tsx               # 3D Art/Craft cards
│   ├── CartDrawer.tsx              # Slide-over cart
│   ├── GoogleAuthGateModal.tsx     # Full-screen login gate
│   └── ThreeSceneObjects.tsx       # Shared 3D utilities
├── lib/
│   ├── auth.ts                     # NextAuth config + RBAC
│   ├── data.ts                     # Artwork & Craft catalog
│   └── store.ts                    # Zustand stores (cart, prices)
├── public/
│   ├── images/
│   │   ├── art/                    # 9 artwork images
│   │   └── crafts/                 # 9 craft images
│   └── manifest.json               # PWA manifest
├── .env.example                    # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── middleware.ts                   # Auth protection
└── README.md
```

## Getting Started

### 1. Install Dependencies
```bash
cd rangashilpo
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your_32_char_secret
NEXTAUTH_URL=http://localhost:3000

# Optional: Vercel KV for price persistence
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API** (or **Google Identity** API)
4. Create **OAuth 2.0 Client ID** (Web application)
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
npm start
```

## Deployment to Vercel

### 1-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/rangashilpo)

### Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard:
# GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL
```

### Environment Variables on Vercel
| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes |
| `NEXTAUTH_SECRET` | 32+ char random string | Yes |
| `NEXTAUTH_URL` | Production URL (e.g., `https://rangashilpo.vercel.app`) | Yes |
| `KV_REST_API_URL` | Vercel KV REST API URL | No |
| `KV_REST_API_TOKEN` | Vercel KV REST API Token | No |

## Catalog Data

### Fine Art Gallery (9 pieces)
1. Lord Rama with Bow & Quiver — ₹18,500
2. Traditional Bengali Shola Topor & Mukut — ₹12,800
3. Lord Jagannath Face (Chita/Jhoti) — ₹15,600
4. Tiranga Paisley Mandala — ₹9,800
5. Sacred Floral Lotus Mandala — ₹11,200
6. Portrait of Traditional Indian Woman — ₹14,300
7. Mahishasuramardini Goddess Durga — ₹22,500 ⭐
8. Sri Panchamukhi Hanuman — ₹19,800
9. Lord Krishna with Mayur Mukut — ₹16,700 ⭐

### Ceremonial Crafts Studio (9 pieces)
1. Lakshmi Pad (Alpona Footprint) — ₹3,200 ⭐
2. Matsya Yugala (Twin Fish) — ₹2,800
3. Shola Trishul (Bridal Mandap Crest) — ₹4,500
4. Crimson Boron Thali & Baati Set — ₹5,800
5. Solar Radiance Pooja Thali Set — ₹6,200
6. Mangal Boron Kula (Winnowing Fan) — ₹3,600
7. Artisan Hand-Painted Kurta — ₹4,200
8. Hand-Painted Festive Shawl — ₹4,800 ⭐
9. Suvarna Mayur Pooja Ensemble — ₹8,500

⭐ = Featured items

## Customization

### Adding New Artworks/Crafts
Edit `lib/data.ts`:
```typescript
export const artworks: Artwork[] = [
  // Add new objects following the same structure
]
```

### Modifying Colors
Edit `tailwind.config.ts` → `theme.extend.colors`

### Updating Brand Info
- Artist: Riddhima Das (in `lib/data.ts` and components)
- Manager: Ratul Das
- Email: rdas90503@gmail.com
- WhatsApp: +91 98318 97956
- Instagram: @ratulyx

## Performance

- **Lighthouse Score Target**: 95+ across all metrics
- **Images**: Optimized with Next.js Image component
- **3D**: Lazy-loaded with dynamic imports
- **Fonts**: Self-hosted with `next/font` (Inter, Playfair Display, Noto Sans Devanagari)
- **Bundle**: Code-split by route

## Accessibility

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Focus visible states
- Reduced motion support
- Color contrast ratios (WCAG AA)
- Keyboard navigation

## License

Private project for RangaShilpo. All artwork © Riddhima Das.

## Support

- **Email**: rdas90503@gmail.com
- **WhatsApp**: +91 98318 97956
- **Instagram**: @ratulyx