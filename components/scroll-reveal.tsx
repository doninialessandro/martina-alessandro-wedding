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
   WordReveal – each word transitions from a muted color to
   its full color as you scroll, keeping text always readable.
   No opacity changes — colors are always vibrant.
   ═══════════════════════════════════════════════════════════ */

interface WordRevealProps {
  text: string
  className?: string
  offset?: number
  mutedColor?: string // the starting "unrevealed" color
  activeColor?: string // the final "revealed" color
}

export function WordReveal({
  text,
  className = '',
  offset = 0.08,
  mutedColor = '#D5CCBC',
  activeColor = '#3A3530',
}: WordRevealProps) {
  const { ref, progress } = useScrollProgress(offset)
  const words = text.split(' ')

  return (
    <p ref={ref} className={className} style={{ willChange: 'color' }}>
      {words.map((word, i) => {
        const wordStart = (i / words.length) * 0.5
        const wordEnd = wordStart + 0.4
        const wordProgress = Math.min(
          1,
          Math.max(0, (progress - wordStart) / (wordEnd - wordStart))
        )
        // Gentle ease-in-out quad
        const eased =
          wordProgress < 0.5
            ? 2 * wordProgress * wordProgress
            : 1 - (-2 * wordProgress + 2) ** 2 / 2

        const color =
          eased <= 0.01
            ? mutedColor
            : eased >= 0.99
              ? activeColor
              : interpolateColor(mutedColor, activeColor, eased)

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: composite word-index key is stable for static text splits
          <span key={`${word}-${i}`} style={{ color, transition: 'color 0.35s ease-in-out' }}>
            {word}{' '}
          </span>
        )
      })}
    </p>
  )
}

/** Simple hex color interpolation */
function interpolateColor(from: string, to: string, t: number): string {
  const f = hexToRgb(from)
  const tC = hexToRgb(to)
  const r = Math.round(f.r + (tC.r - f.r) * t)
  const g = Math.round(f.g + (tC.g - f.g) * t)
  const b = Math.round(f.b + (tC.b - f.b) * t)
  return `rgb(${r}, ${g}, ${b})`
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
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
