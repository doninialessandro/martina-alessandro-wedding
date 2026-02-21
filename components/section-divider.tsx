"use client"

import { useInView } from "@/hooks/use-in-view"

export function SectionDivider() {
  const { ref, isInView } = useInView(0.5)

  return (
    <div ref={ref} className="flex justify-center py-2">
      <div
        className={`h-px bg-[#E0DCD5] transition-all duration-[1200ms] ease-out ${
          isInView ? "w-16 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  )
}
