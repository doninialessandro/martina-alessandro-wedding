"use client"

import { useInView } from "@/hooks/use-in-view"

export function ThreadLine({ height = 100 }: { height?: number }) {
  const { ref, isInView } = useInView(0.05)

  return (
    <div ref={ref} className="flex justify-center">
      <svg
        width="1"
        height={height}
        viewBox={`0 0 1 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2={height}
          stroke="#D5CDC2"
          strokeWidth="1"
          strokeLinecap="round"
          style={{
            strokeDasharray: height,
            strokeDashoffset: isInView ? 0 : height,
            transition: `stroke-dashoffset 1.6s cubic-bezier(0.33, 1, 0.68, 1)`,
          }}
        />
      </svg>
    </div>
  )
}
