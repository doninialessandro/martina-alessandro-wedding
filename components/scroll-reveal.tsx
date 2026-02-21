"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

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
  effect?: "clip" | "slide"
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
  effect = "clip",
}: ScrollRevealProps) {
  const { ref, progress } = useScrollProgress(offset)

  const local = Math.min(1, Math.max(0, (progress - start) / (end - start)))
  // Smooth ease-out quartic
  const eased = 1 - Math.pow(1 - local, 4)

  const y = translateY * (1 - eased)
  const x = translateX * (1 - eased)
  const s = scaleFrom + (1 - scaleFrom) * eased
  const r = rotate * (1 - eased)

  if (effect === "slide") {
    // No clip-path — content is always fully visible, just slides into place
    return (
      <div
        ref={ref}
        className={className}
        style={{
          opacity: eased,
          transform: `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${r}deg)`,
          willChange: "opacity, transform",
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
      style={{
        clipPath: clip,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${r}deg)`,
        willChange: "clip-path, transform",
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
  mutedColor?: string   // the starting "unrevealed" color
  activeColor?: string  // the final "revealed" color
}

export function WordReveal({
  text,
  className = "",
  offset = 0.08,
  mutedColor = "#C0B5A6",
  activeColor = "#3A3530",
}: WordRevealProps) {
  const { ref, progress } = useScrollProgress(offset)
  const words = text.split(" ")

  return (
    <p ref={ref} className={className} style={{ willChange: "color" }}>
      {words.map((word, i) => {
        const wordStart = (i / words.length) * 0.55
        const wordEnd = wordStart + 0.3
        const wordProgress = Math.min(1, Math.max(0, (progress - wordStart) / (wordEnd - wordStart)))
        // Ease-out quad
        const eased = 1 - Math.pow(1 - wordProgress, 2)

        const color = eased <= 0.01
          ? mutedColor
          : eased >= 0.99
            ? activeColor
            : interpolateColor(mutedColor, activeColor, eased)

        return (
          <span
            key={i}
            style={{ color, transition: "color 0.12s ease-out" }}
          >
            {word}{" "}
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
  const h = hex.replace("#", "")
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

export function ParallaxFade({
  children,
  className = "",
  speed = 0.35,
}: ParallaxFadeProps) {
  const { ref, progress } = useScrollProgress(0)

  const fadeStart = 0.4
  const fadeProg = Math.min(1, Math.max(0, (progress - fadeStart) / (1 - fadeStart)))
  const y = -fadeProg * 60 * speed
  const s = 1 - fadeProg * 0.05
  // Use opacity only for exit — no clip-path so the flower is never cropped
  const opacity = 1 - fadeProg * 0.8

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity,
        transform: `translate3d(0, ${y}px, 0) scale(${s})`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}
