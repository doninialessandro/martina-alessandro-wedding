"use client"

import { useEffect, useRef, useState } from "react"

interface MonolineFlowerProps {
  className?: string
  size?: number
  animate?: boolean
  color?: string
}

export function MonolineFlower({
  className = "",
  size = 200,
  animate = true,
}: MonolineFlowerProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isVisible, setIsVisible] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (svgRef.current) observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [animate])

  // All paths with their measured lengths, ordered as a continuous drawing sequence
  const paths = [
    // Stem (drawn first, bottom-up feel)
    { d: "M100 195 C100 195 98 170 100 150 C102 130 100 115 100 112", len: 86 },
    // Left leaf on stem
    { d: "M100 160 C94 154 84 150 78 154 C72 158 74 164 80 168 C86 170 94 166 100 162", len: 58 },
    // Right leaf on stem
    { d: "M100 145 C106 139 116 136 122 140 C128 144 126 150 120 153 C114 155 106 151 100 147", len: 58 },
    // Center spiral (the sunflower seed head — a single spiral)
    { d: "M105 100 C107 96 104 92 100 92 C95 92 92 96 92 100 C92 105 96 109 100 110 C106 110 110 106 110 100 C110 94 106 89 100 88 C93 88 88 94 88 100 C88 108 94 113 100 114", len: 105 },
    // Petals drawn as continuous strokes radiating out — 8 petals
    // Top petal
    { d: "M100 88 C98 78 94 62 96 54 C98 46 102 46 104 54 C106 62 102 78 100 88", len: 78 },
    // Top-right petal
    { d: "M108 90 C114 82 124 70 130 66 C136 62 138 66 134 72 C130 78 118 84 110 92", len: 72 },
    // Right petal
    { d: "M112 100 C122 98 138 96 146 98 C154 100 154 104 146 106 C138 108 122 104 112 102", len: 78 },
    // Bottom-right petal
    { d: "M110 110 C118 116 128 128 130 136 C132 144 128 146 124 140 C120 134 114 120 108 112", len: 72 },
    // Bottom petal
    { d: "M100 114 C102 124 104 140 102 148 C100 156 98 156 96 148 C94 140 98 124 100 114", len: 78 },
    // Bottom-left petal
    { d: "M90 110 C82 116 72 128 70 136 C68 144 72 146 76 140 C80 134 86 120 92 112", len: 72 },
    // Left petal
    { d: "M88 100 C78 98 62 96 54 98 C46 100 46 104 54 106 C62 108 78 104 88 102", len: 78 },
    // Top-left petal
    { d: "M90 90 C86 82 76 70 70 66 C64 62 62 66 66 72 C70 78 82 84 90 92", len: 72 },
  ]

  // Total cumulative length for delay calculation
  let cumulativeDelay = 0

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Warm gradient inspired by the Pinterest sunflower: earthy gold to terracotta to deep charcoal */}
        <linearGradient id="flowerGradientMain" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6B6B6B" />
          <stop offset="35%" stopColor="#8B7355" />
          <stop offset="65%" stopColor="#C4A882" />
          <stop offset="100%" stopColor="#D4B896" />
        </linearGradient>
        <linearGradient id="flowerGradientAccent" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="50%" stopColor="#C4A882" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>

      {paths.map((p, i) => {
        const delay = cumulativeDelay
        // Each path draws over a proportion of the total ~1.8s animation
        const drawDuration = 0.15 + (p.len / 900)
        cumulativeDelay += drawDuration * 0.55 // Overlap draws for fluid feel

        // Alternate gradients between paths for color variation
        const strokeUrl = i < 3 ? "url(#flowerGradientAccent)" : "url(#flowerGradientMain)"

        return (
          <path
            key={i}
            d={p.d}
            stroke={strokeUrl}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: p.len,
              strokeDashoffset: isVisible ? 0 : p.len,
              transition: `stroke-dashoffset ${drawDuration.toFixed(2)}s cubic-bezier(0.33, 1, 0.68, 1) ${delay.toFixed(2)}s`,
            }}
          />
        )
      })}
    </svg>
  )
}
