'use client'

import { useEffect, useState } from 'react'

const WEDDING_DATE = new Date('2026-09-18T16:00:00+02:00')

export function useSectionData() {
  const [loaded, setLoaded] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    function calc() {
      const diff = WEDDING_DATE.getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      }
    }
    setTimeLeft(calc())
    const interval = setInterval(() => setTimeLeft(calc()), 60_000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(true), 5_000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    function hideOnScroll() {
      setShowScrollHint(false)
      window.removeEventListener('scroll', hideOnScroll)
    }
    window.addEventListener('scroll', hideOnScroll, { passive: true })
    return () => window.removeEventListener('scroll', hideOnScroll)
  }, [])

  return { loaded, showScrollHint, ...timeLeft }
}
