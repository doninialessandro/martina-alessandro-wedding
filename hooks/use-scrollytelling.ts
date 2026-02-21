"use client"

import { useEffect, useRef, useState, useCallback } from "react"

/**
 * Tracks which child element (by index) is closest to the vertical
 * center of the viewport. Attach `containerRef` to the scroll wrapper
 * and `setItemRef(index)` to each tracked block.
 */
export function useScrollytelling(count: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>(new Array(count).fill(null))

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el
    },
    []
  )

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      let closest = 0
      let closestDist = Infinity

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elCenter = rect.top + rect.height / 2
        const dist = Math.abs(elCenter - viewportCenter)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })

      setActiveIndex(closest)
    }

    // Use rAF-throttled scroll listener for performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    handleScroll() // initial check
    return () => window.removeEventListener("scroll", onScroll)
  }, [count])

  return { activeIndex, setItemRef }
}
