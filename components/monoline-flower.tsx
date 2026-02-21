"use client"

import { useEffect, useRef, useState } from "react"

interface MonolineFlowerProps {
  className?: string
  size?: number
  animate?: boolean
  showThread?: boolean
}

export function MonolineFlower({
  className = "",
  size = 200,
  animate = true,
  showThread = false,
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

  // A refined sunflower inspired by the Pinterest reference:
  // Organic, hand-drawn feel, single continuous-style strokes,
  // with a natural seed-head center, layered petals, curved stem with leaves
  const segments = [
    // === STEM (drawn first, rising from bottom) ===
    { id: "stem", d: "M100 198 C99 188 97 175 98 165 C99 155 101 142 100 132 C99 125 100 118 100 114", len: 88 },
    // Left leaf
    { id: "leaf-l", d: "M99 162 C95 157 88 153 82 154 C76 156 75 161 79 165 C83 169 92 168 99 164", len: 52 },
    // Left leaf vein
    { id: "vein-l", d: "M99 163 C93 160 86 158 82 159", len: 20 },
    // Right leaf
    { id: "leaf-r", d: "M101 146 C105 141 112 137 118 138 C124 140 125 145 121 149 C117 152 108 151 101 148", len: 52 },
    // Right leaf vein
    { id: "vein-r", d: "M101 147 C107 144 114 142 118 143", len: 20 },

    // === CENTER SEED HEAD (spiral pattern) ===
    { id: "center-1", d: "M104 99 C106 95 103 91 99 91 C94 91 91 95 92 100 C93 105 97 108 102 108 C107 107 109 103 108 98 C107 93 103 89 98 89 C92 89 88 94 89 100", len: 110 },
    { id: "center-2", d: "M89 100 C90 107 95 112 101 112 C108 112 113 107 113 100 C113 93 108 87 101 86 C94 86 88 90 87 97", len: 100 },
    // Inner dots / small marks for seed texture
    { id: "seed-1", d: "M97 96 C98 95 99 95 100 96", len: 5 },
    { id: "seed-2", d: "M102 100 C103 99 103 98 102 97", len: 5 },
    { id: "seed-3", d: "M98 102 C97 101 97 100 98 99", len: 5 },

    // === PETALS (radiating outward, organic uneven shapes like a real sunflower) ===
    // Top petal
    { id: "p1", d: "M99 86 C97 78 95 67 96 59 C97 52 99 48 101 48 C103 48 105 52 105 60 C105 68 103 78 101 86", len: 82 },
    // Top-right petal
    { id: "p2", d: "M107 88 C112 82 120 73 126 69 C131 66 134 66 135 68 C136 71 133 75 128 80 C122 86 114 91 109 93", len: 74 },
    // Right petal
    { id: "p3", d: "M113 97 C120 95 130 93 138 94 C144 95 147 98 147 100 C147 103 144 105 138 106 C130 106 120 104 113 103", len: 78 },
    // Bottom-right petal
    { id: "p4", d: "M110 108 C115 114 121 123 124 130 C126 136 125 139 123 140 C121 140 118 137 116 131 C113 124 111 116 109 110", len: 72 },
    // Bottom petal
    { id: "p5", d: "M101 113 C103 120 105 130 104 138 C103 144 101 148 100 148 C99 148 97 144 96 138 C95 130 97 120 99 113", len: 78 },
    // Bottom-left petal
    { id: "p6", d: "M91 109 C87 115 81 123 78 130 C76 136 77 139 79 140 C81 140 84 137 86 131 C89 124 90 116 91 110", len: 72 },
    // Left petal
    { id: "p7", d: "M87 103 C80 104 70 106 62 106 C56 105 53 103 53 100 C53 98 56 95 62 94 C70 93 80 95 87 97", len: 78 },
    // Top-left petal
    { id: "p8", d: "M91 92 C87 86 80 76 74 72 C69 69 67 69 66 71 C66 74 69 78 74 83 C80 88 87 92 91 93", len: 74 },

    // === OUTER PETAL TIPS (thin accent lines at the tip of each petal for detail) ===
    { id: "tip1", d: "M98 50 C100 46 102 46 104 50", len: 10 },
    { id: "tip2", d: "M133 67 C136 65 137 67 135 70", len: 8 },
    { id: "tip3", d: "M145 97 C149 99 149 101 145 103", len: 10 },
    { id: "tip4", d: "M125 138 C124 142 122 142 121 138", len: 8 },
    { id: "tip5", d: "M102 147 C100 151 98 151 96 147", len: 10 },
    { id: "tip6", d: "M77 138 C78 142 80 142 81 138", len: 8 },
    { id: "tip7", d: "M55 103 C51 101 51 99 55 97", len: 10 },
    { id: "tip8", d: "M67 70 C65 68 66 66 69 68", len: 8 },
  ]

  // Compute draw timings: each segment draws sequentially with overlap
  let cumulativeDelay = 0
  const timings = segments.map((seg) => {
    const delay = cumulativeDelay
    const dur = Math.max(0.12, seg.len / 500)
    cumulativeDelay += dur * 0.45
    return { delay, dur }
  })

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Warm earthy gradient for petals: gold -> terracotta -> brown */}
          <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4B896" />
            <stop offset="40%" stopColor="#C4A882" />
            <stop offset="75%" stopColor="#A08060" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>
          {/* Darker organic gradient for stem and center */}
          <linearGradient id="stemGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#6B6B6B" />
            <stop offset="50%" stopColor="#7A6B55" />
            <stop offset="100%" stopColor="#5C4E3C" />
          </linearGradient>
          {/* Rich warm brown for the seed head */}
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="60%" stopColor="#6B5B45" />
            <stop offset="100%" stopColor="#4A3F30" />
          </radialGradient>
        </defs>

        {segments.map((seg, i) => {
          const { delay, dur } = timings[i]
          // Choose gradient based on segment type
          let stroke = "url(#petalGrad)"
          if (seg.id.startsWith("stem") || seg.id.startsWith("leaf") || seg.id.startsWith("vein")) {
            stroke = "url(#stemGrad)"
          } else if (seg.id.startsWith("center") || seg.id.startsWith("seed")) {
            stroke = "url(#centerGrad)"
          } else if (seg.id.startsWith("tip")) {
            stroke = "#C4A882"
          }

          // Thinner strokes for details
          let sw = 1.5
          if (seg.id.startsWith("vein") || seg.id.startsWith("seed") || seg.id.startsWith("tip")) {
            sw = 0.8
          }

          return (
            <path
              key={seg.id}
              d={seg.d}
              stroke={stroke}
              strokeWidth={sw}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: seg.len,
                strokeDashoffset: isVisible ? 0 : seg.len,
                transition: `stroke-dashoffset ${dur.toFixed(2)}s cubic-bezier(0.33, 1, 0.68, 1) ${delay.toFixed(2)}s`,
              }}
            />
          )
        })}
      </svg>

      {/* Thread emerging from the stem bottom, continues downward infinitely */}
      {showThread && (
        <div
          className="w-px bg-[#E0DCD5] transition-all duration-[2000ms] ease-out"
          style={{
            height: isVisible ? 80 : 0,
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${(cumulativeDelay + 0.3).toFixed(2)}s`,
          }}
        />
      )}
    </div>
  )
}
