"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

/* ═══════════════════════════════════════════════════════════
   ScrollReveal – scroll-linked opacity + transform
   Drives reveal with rAF-backed progress for 60fps smoothness
   ═══════════════════════════════════════════════════════════ */

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  start?: number          // progress at which reveal begins (0-1)
  end?: number            // progress at which reveal completes (0-1)
  translateY?: number     // px offset at progress=0
  translateX?: number     // px horizontal offset at progress=0
  scaleFrom?: number      // scale at progress=0
  offset?: number         // viewport offset for trigger zone
  rotate?: number         // degrees rotation at progress=0
}

export function ScrollReveal({
  children,
  className = "",
  start = 0,
  end = 0.4,
  translateY = 50,
  translateX = 0,
  offset = 0.08,
  scaleFrom = 1,
  rotate = 0,
}: ScrollRevealProps) {
  const { ref, progress } = useScrollProgress(offset)

  const local = Math.min(1, Math.max(0, (progress - start) / (end - start)))
  // Smooth ease-out quintic for a luxurious deceleration curve
  const eased = 1 - Math.pow(1 - local, 4)

  const opacity = eased
  const y = translateY * (1 - eased)
  const x = translateX * (1 - eased)
  const s = scaleFrom + (1 - scaleFrom) * eased
  const r = rotate * (1 - eased)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${r}deg)`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   WordReveal – each word fades from dim to full as you scroll
   Creates a "text painting" scrollytelling effect
   ═══════════════════════════════════════════════════════════ */

interface WordRevealProps {
  text: string
  className?: string
  offset?: number
}

export function WordReveal({ text, className = "", offset = 0.08 }: WordRevealProps) {
  const { ref, progress } = useScrollProgress(offset)
  const words = text.split(" ")

  return (
    <p ref={ref} className={className} style={{ willChange: "opacity" }}>
      {words.map((word, i) => {
        const wordStart = (i / words.length) * 0.55
        const wordEnd = wordStart + 0.3
        const wordProgress = Math.min(1, Math.max(0, (progress - wordStart) / (wordEnd - wordStart)))
        // Ease-out quad for each word
        const eased = 1 - Math.pow(1 - wordProgress, 2)

        return (
          <span
            key={i}
            style={{
              opacity: 0.12 + 0.88 * eased,
              transition: "opacity 0.06s linear",
            }}
          >
            {word}{" "}
          </span>
        )
      })}
    </p>
  )
}

/* ═══════════════════════════════════════════════════════════
   ParallaxFade – hero-style element that drifts up and fades
   out as user scrolls past it (exit parallax)
   ═══════════════════════════════════════════════════════════ */

interface ParallaxFadeProps {
  children: React.ReactNode
  className?: string
  speed?: number    // multiplier for parallax drift (default 0.35)
}

export function ParallaxFade({
  children,
  className = "",
  speed = 0.35,
}: ParallaxFadeProps) {
  const { ref, progress } = useScrollProgress(0)

  // progress 0-0.5: fully visible, 0.5-1: fades and drifts up
  const fadeStart = 0.35
  const fadeProg = Math.min(1, Math.max(0, (progress - fadeStart) / (1 - fadeStart)))
  const opacity = 1 - fadeProg
  const y = -fadeProg * 80 * speed

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity,
        transform: `translate3d(0, ${y}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  )
}
