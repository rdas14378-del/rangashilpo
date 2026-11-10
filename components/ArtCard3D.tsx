'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, PerspectiveCamera } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { ShoppingCart, Eye, Tag, Edit2 } from 'lucide-react'
import { useCartStore, usePriceStore, getCurrentPrice } from '@/lib/store'
import { isSuperAdmin } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

interface ArtCard3DProps {
  id: string
  slug: string
  title: string
  description: string
  medium: string
  price: number
  image: string
  type: 'artwork' | 'craft'
  featured?: boolean
  index: number
}

export default function ArtCard3D({
  id,
  slug,
  title,
  description,
  medium,
  price: basePrice,
  image,
  type,
  featured,
  index,
}: ArtCard3DProps) {
  const { data: session } = useSession()
  const { addItem } = useCartStore()
  const { getPrice } = usePriceStore()
  const [hovered, setHovered] = useState(false)
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null)
  const isAdmin = session?.user?.email && isSuperAdmin(session.user.email)
  const currentPrice = getPrice(id) ?? basePrice

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    addItem({
      id,
      slug,
      type,
      title,
      price: currentPrice,
      image,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.div
      ref={setCardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8 }}
      className="group relative w-full max-w-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3D Canvas Card */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-gallery hover:shadow-gallery-hover transition-all duration-500">
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          shadows={true}
          className="absolute inset-0"
        >
          <color attach="background" args={['#ffffff']} />

          <ambientLight intensity={0.7} color="#ffffff" />
          <directionalLight
            position={[2, 4, 3]}
            intensity={1}
            color="#fffdf8"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.1}
            shadow-camera-far={10}
            shadow-camera-left={-3}
            shadow-camera-right={3}
            shadow-camera-top={3}
            shadow-camera-bottom={-3}
            shadow-bias={-0.001}
          />
          <hemisphereLight color="#ffffff" groundColor="#f5f0e8" intensity={0.4} />

          <PedestalCard
            image={image}
            title={title}
            hovered={hovered}
            featured={featured ?? false}
            onClick={handleAddToCart}
          />

          <PerspectiveCamera makeDefault fov={35} position={[0, 0, 3.5]} />
        </Canvas>

        {/* Hover overlay with quick actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/20 to-transparent flex items-end p-4 pointer-events-none"
            >
              <div className="w-full flex items-center justify-between pointer-events-auto">
                <button
                  onClick={handleAddToCart}
                  className="group-action flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-sm text-obsidian font-medium text-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Collection</span>
                </button>

                <button
                  className="group-action p-2.5 rounded-xl bg-white/95 backdrop-blur-sm text-obsidian shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200"
                  aria-label="View details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured badge */}
        {featured && (
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
            className="absolute top-4 left-4 z-10"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-crimson/95 text-white text-xs font-medium shadow-lg">
              <span className="relative">Featured</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-gold"
              />
            </span>
          </motion.div>
        )}
      </div>

      {/* Card Info */}
      <div className="mt-5 text-center sm:text-left">
        <p className="font-serif text-sm text-crimson font-medium tracking-wide mb-1">
          {type === 'artwork' ? 'Sacred Fine Art' : 'Ceremonial Craft'}
        </p>

        <h3 className="font-serif text-lg md:text-xl font-bold text-obsidian mb-2 group-hover:text-crimson transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{description}</p>

        <p className="text-xs text-slate-500 mb-3 font-medium">{medium}</p>

        <div className="flex items-center justify-center sm:justify-start gap-3">
          <motion.span
            key={currentPrice}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-serif text-xl md:text-2xl font-bold text-crimson"
          >
            {formatPrice(currentPrice)}
          </motion.span>

          {/* Admin Price Editor */}
          {isAdmin && (
            <PriceEditorInline
              itemId={id}
              currentPrice={currentPrice}
              onPriceChange={(newPrice) => {
                usePriceStore.getState().setPrice(id, newPrice)
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Pedestal Card - 3D artwork display
function PedestalCard({
  image,
  title,
  hovered,
  featured,
  onClick,
}: {
  image: string
  title: string
  hovered: boolean
  featured: boolean
  onClick: (e: React.MouseEvent) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const textureRef = useRef<THREE.Texture | null>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Subtle floating animation
    const time = state.clock.getElapsedTime()
    const floatY = Math.sin(time * 0.8) * 0.02
    const floatX = Math.cos(time * 0.6) * 0.015

    // Hover lift
    const targetY = hovered ? 0.15 : floatY
    const targetX = hovered ? 0 : floatX
    const targetRotY = hovered ? 0.05 : Math.sin(time * 0.4) * 0.02
    const targetRotX = hovered ? -0.05 : Math.cos(time * 0.3) * 0.015

    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 4)
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, delta * 4)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 4)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 4)

    // Frame follows
    if (frameRef.current) {
      frameRef.current.position.y = meshRef.current.position.y - 0.001
      frameRef.current.rotation.y = meshRef.current.rotation.y
      frameRef.current.rotation.x = meshRef.current.rotation.x
    }
  })

  // Load texture
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(image, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = 4
      textureRef.current = texture
      if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.map = texture
        meshRef.current.material.needsUpdate = true
      }
    })
  }, [image])

  return (
    <group>
      {/* Pedestal base */}
      <mesh
        receiveShadow
        position={[0, -0.7, 0]}
        scale={[1.8, 0.25, 1.3]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#faf8f5"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* Pedestal top */}
      <mesh
        receiveShadow
        position={[0, -0.52, 0]}
        scale={[1.5, 0.08, 1.1]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#f0ebe0"
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Artwork frame */}
      <mesh
        ref={frameRef}
        castShadow
        position={[0, -0.45, 0]}
        scale={[1.35, 1.75, 0.06]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={featured ? "#d4af37" : "#1a1a2e"}
          roughness={featured ? 0.2 : 0.3}
          metalness={featured ? 0.7 : 0.2}
        />
      </mesh>

      {/* Artwork canvas */}
      <mesh
        ref={meshRef}
        castShadow
        position={[0, -0.45, 0.04]}
        scale={[1.25, 1.65, 0.04]}
        onPointerDown={(e) => {
          e.stopPropagation()
          onClick(e as any)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick(e as any)
        }}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#f5f0e8"
          roughness={0.9}
          metalness={0.0}
          map={textureRef.current || undefined}
        />
      </mesh>

      {/* Subtle glow for featured */}
      {featured && (
        <mesh
          position={[0, -0.45, -0.05]}
          scale={[1.4, 1.8, 0.01]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  )
}

// Inline Price Editor for Admin
function PriceEditorInline({
  itemId,
  currentPrice,
  onPriceChange,
}: {
  itemId: string
  currentPrice: number
  onPriceChange: (price: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(currentPrice.toString())
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    const newPrice = parseInt(inputValue, 10)
    if (isNaN(newPrice) || newPrice < 0) return

    setSaving(true)
    try {
      await onPriceChange(newPrice)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setInputValue(currentPrice.toString())
    setEditing(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (!editing) {
    return (
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => setEditing(true)}
        className="p-1.5 rounded-lg text-gold hover:text-gold-light hover:bg-gold/10 transition-all duration-200"
        aria-label="Edit price"
        title="Edit price"
      >
        <Edit2 className="w-4 h-4" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2"
    >
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave()
          if (e.key === 'Escape') handleCancel()
        }}
        onBlur={handleSave}
        autoFocus
        className="w-24 px-2 py-1.5 text-sm font-semibold text-obsidian bg-white border border-gold/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
        min="0"
        step="100"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50"
        aria-label="Save"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <button
        onClick={handleCancel}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label="Cancel"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  )
}