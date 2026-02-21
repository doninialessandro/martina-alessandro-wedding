"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** 0-1 – where in the scroll progress range this element starts revealing (default 0) */
  start?: number
  /** 0-1 – where it becomes fully revealed (default 0.45) */
  end?: number
  /** vertical offset in px at progress=0 (default 60) */
  translateY?: number
  /** viewport offset for trigger zone (default 0.12) */
  offset?: number
  /** optional: slight horizontal shift for parallax feel */
  translateX?: number
  /** optional: slight scale */
  scaleFrom?: number
}

export function ScrollReveal({
  children,
  className = "",
  start = 0,
  end = 0.45,
  translateY = 60,
  translateX = 0,
  offset = 0.12,
  scaleFrom = 1,
}: ScrollRevealProps) {
  const { ref, progress } = useScrollProgress(offset)

  // Map global progress to local 0-1 within [start, end]
  const local = Math.min(1, Math.max(0, (progress - start) / (end - start)))

  // Eased progress (ease-out cubic)
  const eased = 1 - Math.pow(1 - local, 3)

  const opacity = eased
  const y = translateY * (1 - eased)
  const x = translateX * (1 - eased)
  const s = scaleFrom + (1 - scaleFrom) * eased

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${s})`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  )
}

/**
 * Reveals each word one at a time as scroll progresses,
 * creating a typewriter / word-cascade scrollytelling effect.
 */
interface WordRevealProps {
  text: string
  className?: string
  offset?: number
}

export function WordReveal({ text, className = "", offset = 0.12 }: WordRevealProps) {
  const { ref, progress } = useScrollProgress(offset)
  const words = text.split(" ")

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        // Each word reveals at a slightly different progress point
        const wordStart = (i / words.length) * 0.6
        const wordEnd = wordStart + 0.25
        const wordProgress = Math.min(1, Math.max(0, (progress - wordStart) / (wordEnd - wordStart)))
        const eased = 1 - Math.pow(1 - wordProgress, 2)

        return (
          <span
            key={i}
            style={{
              opacity: 0.15 + 0.85 * eased,
              transition: "opacity 0.05s linear",
              willChange: "opacity",
            }}
          >
            {word}{" "}
          </span>
        )
      })}
    </p>
  )
}
