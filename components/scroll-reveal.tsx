'use client'

import { useScrollProgress } from '@/hooks/use-scroll-progress'

/* ═══════════════════════════════════════════════════════════
   ScrollReveal – scroll-linked clip + transform reveal
   Content is always fully opaque; a clip-path mask slides
   away to unveil it, keeping colors vibrant at all times.
   ═══════════════════════════════════════════════════════════ */

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  start?: number
  end?: number
  translateY?: number
  translateX?: number
  scaleFrom?: number
  offset?: number
  rotate?: number
  /** "clip" uses clip-path (great for text); "slide" uses only transform (never crops content) */
  effect?: 'clip' | 'slide'
}

export function ScrollReveal({
  children,
  className = '',
  start = 0,
  end = 0.5,
  translateY = 20,
  translateX = 0,
  offset = 0.08,
  scaleFrom = 1,
  rotate = 0,
  effect = 'clip',
}: ScrollRevealProps) {
  const { ref, progress } = useScrollProgress(offset)

  const local = Math.min(1, Math.max(0, (progress - start) / (end - start)))
  // Softer ease-in-out: romantic, smooth settlement
  const eased = local < 0.5 ? 2 * local * local : 1 - (-2 * local + 2) ** 2 / 2

  const y = translateY * (1 - eased)
  const x = translateX * (1 - eased)
  const s = scaleFrom + (1 - scaleFrom) * eased
  const r = rotate * (1 - eased)

  if (effect === 'slide') {
    // No clip-path — content slides in with blur-in focus effect
    return (
      <div
        ref={ref}
        className={className}
        data-animate
        style={{
          opacity: eased,
          transform: `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${r}deg)`,
          filter: `blur(${(1 - eased) * 8}px)`,
          willChange: 'opacity, transform, filter',
        }}
      >
        {children}
      </div>
    )
  }

  // clip-path: reveal from bottom to top
  const clipTop = 100 * (1 - eased)
  const clip = `inset(${clipTop}% 0% 0% 0%)`

  return (
    <div
      ref={ref}
      className={className}
      data-animate
      style={{
        clipPath: clip,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${r}deg)`,
        willChange: 'clip-path, transform',
      }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   ParallaxFade – hero element that drifts up and scales down
   as user scrolls past. Uses clip instead of opacity.
   ═══════════════════════════════════════════════════════════ */

interface ParallaxFadeProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function ParallaxFade({ children, className = '', speed = 0.35 }: ParallaxFadeProps) {
  const { ref, progress } = useScrollProgress(0)

  const fadeStart = 0.45
  const fadeProg = Math.min(1, Math.max(0, (progress - fadeStart) / (1 - fadeStart)))
  // Gentle ease-in-out
  const easedFade = fadeProg < 0.5 ? 2 * fadeProg * fadeProg : 1 - (-2 * fadeProg + 2) ** 2 / 2
  const y = -easedFade * 30 * speed
  const s = 1 - easedFade * 0.03
  const opacity = 1 - easedFade * 0.6

  return (
    <div
      ref={ref}
      className={className}
      data-animate
      style={{
        opacity,
        transform: `translate3d(0, ${y}px, 0) scale(${s})`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
