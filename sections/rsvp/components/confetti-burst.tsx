'use client'

import { useAnimationFrame } from 'motion/react'
import { useRef, useState } from 'react'

const COLORS = ['#8E9E8C', '#D5CCBC', '#C4A882', '#E8C4A0', '#B5C5B3', '#F2D6A2', '#A3B899']
const PARTICLE_COUNT = 300
const GRAVITY = 0.12
const DECAY = 0.96

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  color: string
  tilt: number
  tiltSpeed: number
  wobble: number
  wobbleSpeed: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

function createParticles(): Particle[] {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const cx = vw * 0.5
  const cy = vh * 0.4

  return Array.from({ length: PARTICLE_COUNT }, () => {
    const angle = Math.random() * Math.PI * 2
    const velocity = 8 + Math.random() * 16
    return {
      x: cx + (Math.random() - 0.5) * 20,
      y: cy + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity * 0.6 - 7,
      w: 4 + Math.random() * 5,
      h: 8 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      tilt: Math.random() * Math.PI * 2,
      tiltSpeed: 0.02 + Math.random() * 0.06,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.05,
      opacity: 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
    }
  })
}

export function ConfettiBurst() {
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
    const vh = window.innerHeight
    let anyAlive = false

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      if (p.opacity <= 0) continue

      p.vx *= DECAY
      p.vy = p.vy * DECAY + GRAVITY
      p.x += p.vx + Math.sin(p.wobble) * 0.8
      p.y += p.vy
      p.wobble += p.wobbleSpeed
      p.tilt += p.tiltSpeed
      p.rotation += p.rotationSpeed

      if (p.y > vh * 0.8) p.opacity -= 0.02
      if (elapsed > 120) p.opacity -= 0.008
      p.opacity = Math.max(0, p.opacity)

      if (p.opacity <= 0) continue
      anyAlive = true

      const el = container.children[i] as HTMLElement | undefined
      if (el) {
        const scaleX = Math.cos(p.tilt)
        el.style.transform = `translate(${p.x}px,${p.y}px) rotate(${p.rotation}rad) scaleX(${scaleX})`
        el.style.opacity = String(p.opacity)
      }
    }

    if (!anyAlive) aliveRef.current = false
  })

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: confetti particles have no stable id
          key={i}
          className="absolute left-0 top-0"
          style={{
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            borderRadius: 1,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
