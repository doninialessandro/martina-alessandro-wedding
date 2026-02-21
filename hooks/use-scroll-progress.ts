"use client"

import { useEffect, useRef, useState, useCallback } from "react"

/**
 * Returns a progress value from 0 to 1 as an element scrolls
 * through the viewport.  0 = element bottom has just entered
 * the viewport bottom, 1 = element top has reached the viewport
 * top.  Values are clamped [0,1].
 *
 * `offset` shifts the trigger zone:
 *   offset = 0   -> animation starts when element enters viewport bottom
 *   offset = 0.2 -> animation starts when element is 20% above viewport bottom
 */
export function useScrollProgress(offset = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const winH = window.innerHeight

    // Start when element bottom is `offset` fraction from viewport bottom
    const start = winH * (1 - offset)
    // End when element top reaches the viewport top + offset
    const end = winH * offset

    // raw: 0 when rect.top == start, 1 when rect.top == end
    const raw = (start - rect.top) / (start - end)
    setProgress(Math.min(1, Math.max(0, raw)))
  }, [offset])

  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [handleScroll])

  return { ref, progress }
}
