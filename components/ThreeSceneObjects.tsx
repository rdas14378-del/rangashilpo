'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Export the Book and FloatingTools components from HeroFallingBook
// This is a placeholder - the actual components are in HeroFallingBook.tsx
// We keep this file for any shared Three.js objects

export function createBookGeometry() {
  const coverGeometry = new THREE.BoxGeometry(2.2, 0.35, 3.0)
  const pageGeometry = new THREE.BoxGeometry(2.15, 0.28, 2.9)
  return { coverGeometry, pageGeometry }
}

export function createGoldMaterial() {
  return new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.8,
    roughness: 0.2,
  })
}

export function createCrimsonMaterial() {
  return new THREE.MeshStandardMaterial({
    color: 0x9b1b30,
    metalness: 0.1,
    roughness: 0.3,
  })
}

export function createObsidianMaterial() {
  return new THREE.MeshStandardMaterial({
    color: 0x16171f,
    metalness: 0.1,
    roughness: 0.25,
  })
}