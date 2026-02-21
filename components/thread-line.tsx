"use client"

import { useInView } from "@/hooks/use-in-view"

export function ThreadLine() {
  const { ref, isInView } = useInView(0.1)

  return (
    <div ref={ref} className="flex justify-center py-2">
      <div
        className="w-px bg-[#E0DCD5] origin-top transition-all duration-[1200ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
        style={{
          height: 80,
          transform: isInView ? "scaleY(1)" : "scaleY(0)",
          opacity: isInView ? 1 : 0,
        }}
      />
    </div>
  )
}
