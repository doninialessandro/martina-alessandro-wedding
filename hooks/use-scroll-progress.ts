'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * High-performance scroll progress hook.
 * Returns a 0-1 value driven by rAF for smooth 60fps animation.
 *
 * progress = 0 : element bottom just entered viewport bottom
 * progress = 1 : element top reached viewport top
 */
export function useScrollProgress(offset = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const rafId = useRef(0)
  const ticking = useRef(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const winH = window.innerHeight
    const start = winH * (1 - offset)
    const end = winH * offset
    const raw = (start - rect.top) / (start - end)
    setProgress((prev) => {
      const next = Math.min(1, Math.max(0, raw))
      return next === prev ? prev : next
    })
    ticking.current = false
  }, [offset])

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true
      rafId.current = requestAnimationFrame(update)
    }
  }, [update])

  useEffect(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [onScroll, update])

  return { ref, progress }
}
