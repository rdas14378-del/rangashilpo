'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface HeroFallingBookProps {
  onAnimationComplete: () => void
}

export default function HeroFallingBook({ onAnimationComplete }: HeroFallingBookProps) {
  const [showCanvas, setShowCanvas] = useState(false)
  const [bookLanded, setBookLanded] = useState(false)
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Delay canvas mount to allow DOM to settle
    const timer = setTimeout(() => setShowCanvas(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Trigger completion when book lands
  useEffect(() => {
    if (bookLanded) {
      const timer = setTimeout(onAnimationComplete, 800)
      return () => clearTimeout(timer)
    }
  }, [bookLanded, onAnimationComplete])

  return (
    <div ref={mountRef} className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Fallback/Elegant loading */}
      {!showCanvas && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
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
      )}

      {showCanvas && (
        <Canvas
          camera={{ position: [0, 1.5, 4], fov: 45 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
          shadows={true}
          className="absolute inset-0 z-0"
        >
          <color attach="background" args={['#ffffff']} />

          {/* Lighting */}
          <ambientLight intensity={0.6} color="#ffffff" />
          <directionalLight
            position={[3, 8, 5]}
            intensity={1.2}
            color="#fff8f0"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={20}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
            shadow-bias={-0.001}
          />
          <directionalLight
            position={[-3, 5, -5]}
            intensity={0.4}
            color="#f7f5f0"
          />
          <hemisphereLight color="#ffffff" groundColor="#f0ebe0" intensity={0.5} />

          {/* Floor / Pedestal */}
          <mesh
            receiveShadow
            position={[0, -0.02, 0]}
            onPointerOver={(e) => e.stopPropagation()}
          >
            <planeGeometry args={[20, 20]} />
            <shadowMaterial
              attach="material"
              opacity={0.15}
              color="#16171f"
            />
          </mesh>

          {/* Subtle pedestal for the book */}
          <mesh
            receiveShadow
            position={[0, 0.08, 0]}
            scale={[2.5, 0.16, 2.5]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]} />
            <meshStandardMaterial
              color="#faf8f5"
              roughness={0.9}
              metalness={0.02}
            />
          </mesh>

          {/* Main Camera */}
          <PerspectiveCamera makeDefault fov={42} position={[0, 1.8, 4.2]} />

          {/* Orbit Controls - subtle */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.2}
            minAzimuthAngle={-0.3}
            maxAzimuthAngle={0.3}
          />

          {/* The Falling Book */}
          <Book onLand={setBookLanded} />

          {/* Floating Tools */}
          <FloatingTools />

          {/* HTML Overlay for click hint */}
          <Html
            position={[0, 1.2, 0]}
            occlude={false}
            fullscreen
            zIndexRange={[100, 100]}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: bookLanded ? 1 : 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="pointer-events-none"
            >
              <div className="text-center">
                <p className="font-serif text-sm md:text-base text-obsidian/60 mb-2">
                  Click the book to explore volumes
                </p>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center gap-1 text-crimson/70 text-xs font-medium"
                >
                  <span>Tap to flip</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </Html>
        </Canvas>
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/10 to-transparent z-5 pointer-events-none" />
    </div>
  )
}

// Book Component with Physics Animation
function Book({ onLand }: { onLand: (landed: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const bookRef = useRef<THREE.Mesh>(null)
  const pagesRef = useRef<THREE.Group>(null)
  const [flipped, setFlipped] = useState(false)
  const [landed, setLanded] = useState(false)
  const { camera } = useThree()

  // Animation state
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const velocityRef = useRef(0)

  useFrame((state, delta) => {
    if (!groupRef.current || landed) return

    progressRef.current += delta * 0.8

    // Physics: gravity drop with bounce
    const t = Math.min(progressRef.current, 1)

    // Easing with overshoot (spring)
    let y: number
    let rotationX: number
    let rotationZ: number

    if (t < 0.6) {
      // Falling phase
      const fallT = t / 0.6
      y = THREE.MathUtils.lerp(-8, 0.25, fallT * fallT * fallT) // Cubic ease in
      rotationX = THREE.MathUtils.lerp(-Math.PI * 0.4, 0, fallT)
      rotationZ = THREE.MathUtils.lerp(-0.25, 0, fallT)
    } else if (t < 0.85) {
      // First bounce
      const bounceT = (t - 0.6) / 0.25
      y = 0.25 + Math.sin(bounceT * Math.PI) * 0.15 * (1 - bounceT)
      rotationX = Math.sin(bounceT * Math.PI * 2) * 0.1 * (1 - bounceT)
      rotationZ = Math.sin(bounceT * Math.PI * 1.5) * 0.05 * (1 - bounceT)
    } else if (t < 0.95) {
      // Second smaller bounce
      const bounceT = (t - 0.85) / 0.1
      y = 0.25 + Math.sin(bounceT * Math.PI) * 0.05 * (1 - bounceT)
      rotationX = Math.sin(bounceT * Math.PI * 2) * 0.03 * (1 - bounceT)
      rotationZ = 0
    } else {
      // Settled
      y = 0.25
      rotationX = 0
      rotationZ = 0
      if (!landed) {
        setLanded(true)
        onLand(true)
      }
    }

    if (groupRef.current) {
      groupRef.current.position.y = y
      groupRef.current.rotation.x = rotationX
      groupRef.current.rotation.z = rotationZ
    }
  })

  const handleClick = () => {
    if (!landed) return
    setFlipped(!flipped)
  }

  return (
    <group ref={groupRef} onClick={handleClick} onPointerDown={(e) => e.stopPropagation()}>
      {/* Book Cover & Spine */}
      <mesh
        ref={bookRef}
        castShadow
        receiveShadow
        position={[0, 0, 0]}
        rotation={flipped ? [0, Math.PI, 0] : [0, 0, 0]}
      >
        <boxGeometry args={[2.2, 0.35, 3.0]} />
        <meshStandardMaterial
          color="#0d0d12"
          roughness={0.25}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gold foil stamping on cover */}
      <mesh
        position={[0, 0.185, 0]}
        rotation={flipped ? [0, Math.PI, 0] : [0, 0, 0]}
      >
        <planeGeometry args={[1.8, 2.6]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cover Text - HTML overlay */}
      <Html
        position={[0, 0.25, 1.55]}
        rotation={flipped ? [0, Math.PI, 0] : [0, 0, 0]}
        occlude={false}
      >
        <div className="text-center pointer-events-none transform transition-transform duration-700">
          <div className="font-serif text-[14px] md:text-[18px] text-gold font-bold tracking-wider leading-tight">
            RangaShilpo
          </div>
          <div className="font-serif text-[8px] md:text-[10px] text-gold/70 mt-1 tracking-wide">
            Devotional Fine Art & Heritage Crafts
          </div>
          <div className="w-16 h-px bg-gold/50 mx-auto mt-3 mb-2" />
          <div className="font-serif text-[10px] md:text-[13px] text-gold/80">
            Volume I: Sacred Paintings
          </div>
          <div className="font-serif text-[10px] md:text-[13px] text-gold/80 mt-1">
            Volume II: Ceremonial Crafts
          </div>
        </div>
      </Html>

      {/* Pages */}
      <group ref={pagesRef} position={[0, 0.175, 0]}>
        {/* Page stack */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.15, 0.28, 2.9]} />
          <meshStandardMaterial
            color="#faf8f3"
            roughness={0.95}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Page edges - gold gilding */}
        <mesh position={[1.075, 0, 0]}>
          <planeGeometry args={[0.28, 2.9]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-1.075, 0, 0]}>
          <planeGeometry args={[0.28, 2.9]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 1.45]}>
          <planeGeometry args={[2.15, 0.28]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Spine details */}
      <mesh position={[0, 0, -1.52]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 2.2, 8]} />
        <meshStandardMaterial color="#9b1b30" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  )
}

// Floating Tools Component
function FloatingTools() {
  const { camera } = useThree()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      {/* Calligraphy Dip Pen */}
      <FloatingTool
        position={[-3.2, 2.8, -1.5]}
        mouse={mouse}
        amplitude={0.4}
        speed={0.7}
        id="pen"
      >
        <CalligraphyPen />
      </FloatingTool>

      {/* Paintbrush */}
      <FloatingTool
        position={[3.5, 2.2, -2]}
        mouse={mouse}
        amplitude={0.35}
        speed={0.9}
        phase={Math.PI / 3}
        id="brush"
      >
        <Paintbrush />
      </FloatingTool>

      {/* Peacock Feather */}
      <FloatingTool
        position={[0.5, 3.5, -3]}
        mouse={mouse}
        amplitude={0.5}
        speed={0.5}
        phase={Math.PI / 2}
        id="feather"
      >
        <PeacockFeather />
      </FloatingTool>
    </>
  )
}

function FloatingTool({
  children,
  position,
  mouse,
  amplitude = 0.3,
  speed = 1,
  phase = 0,
  id,
}: {
  children: React.ReactNode
  position: [number, number, number]
  mouse: { x: number; y: number }
  amplitude?: number
  speed?: number
  phase?: number
  id: string
}) {
  const ref = useRef<THREE.Group>(null)
  const basePos = position

  useFrame((state, delta) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime() * speed + phase

    // Base floating motion
    const floatY = Math.sin(time) * 0.15
    const floatX = Math.cos(time * 0.7) * 0.1
    const floatZ = Math.sin(time * 1.3) * 0.08

    // Mouse parallax
    const parallaxX = mouse.x * amplitude * 0.8
    const parallaxY = -mouse.y * amplitude * 0.6

    // Gentle rotation
    const rotY = Math.sin(time * 0.5) * 0.15
    const rotX = Math.cos(time * 0.3) * 0.08

    ref.current.position.set(
      basePos[0] + floatX + parallaxX,
      basePos[1] + floatY + parallaxY,
      basePos[2] + floatZ
    )
    ref.current.rotation.y = rotY
    ref.current.rotation.x = rotX
  })

  return <group ref={ref}>{children}</group>
}

// Calligraphy Pen
function CalligraphyPen() {
  return (
    <group>
      {/* Pen body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.06, 1.2, 12]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Golden nib */}
      <mesh position={[0, -0.62, 0]} castShadow>
        <coneGeometry args={[0.05, 0.18, 8]} />
        <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Nib tip */}
      <mesh position={[0, -0.71, 0]} castShadow>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#d4af37" roughness={0.05} metalness={1} />
      </mesh>

      {/* Decorative band */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <torusGeometry args={[0.07, 0.015, 8, 16]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Ink reservoir hint */}
      <mesh position={[0, 0.2, 0.07]} castShadow>
        <boxGeometry args={[0.12, 0.3, 0.08]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.3} metalness={0.5} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// Paintbrush
function Paintbrush() {
  return (
    <group rotation={[-0.3, 0, 0.2]}>
      {/* Handle */}
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.07, 1.1, 12]} />
        <meshStandardMaterial color="#8b5a3c" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Ferrule (metal band) */}
      <mesh position={[0, -0.52, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.075, 0.12, 12]} />
        <meshStandardMaterial color="#c9b896" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Bristles */}
      <group>
        <mesh castShadow>
          <coneGeometry args={[0.07, 0.35, 8, 1, true]} />
          <meshStandardMaterial color="#3a1a1a" roughness={0.8} metalness={0.0} />
        </mesh>

        {/* Crimson paint on bristles */}
        <mesh position={[0, -0.7, 0]} castShadow>
          <coneGeometry args={[0.055, 0.15, 8, 1, true]} />
          <meshStandardMaterial color="#9b1b30" roughness={0.3} metalness={0.1} transparent opacity={0.9} />
        </mesh>

        {/* Wet paint droplets */}
        <mesh position={[0.03, -0.78, 0.02]} castShadow>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshStandardMaterial color="#c43a4d" roughness={0.1} metalness={0.2} transparent opacity={0.8} />
        </mesh>
        <mesh position={[-0.02, -0.82, -0.01]} castShadow>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial color="#c43a4d" roughness={0.1} metalness={0.2} transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  )
}

// Peacock Feather
function PeacockFeather() {
  return (
    <group rotation={[-0.15, 0.2, 0]}>
      {/* Quill/Stem */}
      <mesh castShadow>
        <cylinderGeometry args={[0.02, 0.04, 1.4, 8]} />
        <meshStandardMaterial color="#1a3a2e" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Feather vane - main body */}
      <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <planeGeometry args={[1.8, 0.9]} />
        <meshStandardMaterial
          color="#0d3d2e"
          roughness={0.4}
          metalness={0.2}
          side={THREE.DoubleSide}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Eye of the feather */}
      <mesh position={[0, -0.2, 0.02]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <circleGeometry args={[0.22, 16]} />
        <meshStandardMaterial
          color="#006d5b"
          roughness={0.3}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner eye */}
      <mesh position={[0, -0.2, 0.025]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.2}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center pupil */}
      <mesh position={[0, -0.2, 0.03]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <circleGeometry args={[0.04, 12]} />
        <meshStandardMaterial
          color="#0a1a15"
          roughness={0.1}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gold accent lines on feather */}
      <mesh position={[0, -0.2, 0.015]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <ringGeometry args={[0.22, 0.24, 16]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.3}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}