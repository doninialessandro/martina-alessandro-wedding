'use client'

import { useScrollProgress } from '@/hooks/use-scroll-progress'

export function SectionDivider() {
  const { ref, progress } = useScrollProgress(0.3)

  // Softer ease-in-out for smooth romantic reveal
  const t = Math.min(1, progress / 0.7)
  const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
  const opacity = eased
  const strokeOffset = (1 - eased) * 300 // Draw from right to left as it fades in

  return (
    <div ref={ref} className="flex justify-center py-8" data-animate>
      <svg
        width="150"
        height="37.5"
        viewBox="0 0 160 40"
        aria-label="Decorative mountain divider"
        className="overflow-visible"
        style={{
          opacity,
          willChange: 'opacity',
        }}
      >
        {/* Monte Rosa profile: multiple peaks with plateaus and ridges */}
        <path
          d="M 0 40 L 12 28 L 20 22 L 28 26 L 35 14 L 42 18 L 48 12 L 54 8 L 58 6 L 62 10 L 68 4 L 72 8 L 78 2 L 85 6 L 92 14 L 100 10 L 108 18 L 118 12 L 128 20 L 138 16 L 148 24 L 160 40"
          fill="none"
          stroke="#8E9E8C"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="300"
          strokeDashoffset={strokeOffset}
          style={{
            willChange: 'stroke-dashoffset',
          }}
        />
      </svg>
    </div>
  )
}
