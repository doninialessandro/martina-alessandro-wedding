"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

export function SectionDivider() {
  const { ref, progress } = useScrollProgress(0.3)

  // Ease-out cubic for a luxurious expansion
  const eased = 1 - Math.pow(1 - Math.min(1, progress / 0.6), 3)
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
