"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

export function SectionDivider() {
  const { ref, progress } = useScrollProgress(0.3)

  // Gentle ease-in-out for a soft expansion
  const t = Math.min(1, progress / 0.7)
  const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  const width = eased * 64  // max 64px
  const opacity = eased

  return (
    <div ref={ref} className="flex justify-center py-4">
      <div
        className="h-px bg-[#8E9E8C]"
        style={{
          width: `${width}px`,
          opacity,
          willChange: "width, opacity",
        }}
      />
    </div>
  )
}
