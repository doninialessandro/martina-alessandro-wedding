'use client'

import { useAnimationFrame } from 'motion/react'
import { useRef, useState } from 'react'

interface EmojiBurstProps {
  emoji?: string
}

const PARTICLE_COUNT = 12
const FLOAT_SPEED = -2.5
const WOBBLE_AMP = 1.2

type Particle = {
  x: number
  y: number
  vy: number
  wobble: number
  wobbleSpeed: number
  opacity: number
  scale: number
  rotation: number
  rotationSpeed: number
}

function createParticles(): Particle[] {
  const cx = window.innerWidth * 0.5
  const cy = window.innerHeight * 0.5

  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: cx + (Math.random() - 0.5) * 120,
    y: cy + (Math.random() - 0.5) * 40,
    vy: FLOAT_SPEED - Math.random() * 2,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.03 + Math.random() * 0.04,
    opacity: 1,
    scale: 0.8 + Math.random() * 0.6,
    rotation: (Math.random() - 0.5) * 0.3,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
  }))
}

export function EmojiBurst({ emoji = '👻' }: EmojiBurstProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles] = useState(createParticles)
  const elapsedRef = useRef(0)
  const aliveRef = useRef(true)

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: particle physics simulation requires branching
  useAnimationFrame(() => {
    if (!aliveRef.current) return
    const container = containerRef.current
    if (!container) return

    elapsedRef.current++
    const elapsed = elapsedRef.current
    let anyAlive = false

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      if (p.opacity <= 0) continue

      p.y += p.vy
      p.x += Math.sin(p.wobble) * WOBBLE_AMP
      p.wobble += p.wobbleSpeed
      p.rotation += p.rotationSpeed

      if (elapsed > 60) p.opacity -= 0.015
      p.opacity = Math.max(0, p.opacity)

      if (p.opacity <= 0) continue
      anyAlive = true

      const el = container.children[i] as HTMLElement | undefined
      if (el) {
        el.style.transform = `translate(${p.x}px,${p.y}px) scale(${p.scale}) rotate(${p.rotation}rad)`
        el.style.opacity = String(p.opacity)
      }
    }

    if (!anyAlive) aliveRef.current = false
  })

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: particles have no stable id
          key={i}
          className="absolute left-0 top-0 text-3xl"
          style={{ willChange: 'transform, opacity' }}
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}
