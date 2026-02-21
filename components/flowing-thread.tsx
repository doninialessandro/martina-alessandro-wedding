"use client"

import { useEffect, useRef, useState, useCallback } from "react"

/**
 * A single continuous SVG <path> using only cubic bezier curves
 * that flows from the hero center through every section to the footer.
 * Scroll-driven: the stroke draws on as the user scrolls down.
 * Positioned absolutely behind all content with z-index: 1.
 */
export function FlowingThread() {
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [progress, setProgress] = useState(0)
  const [pageHeight, setPageHeight] = useState(0)

  // Measure page and path
  const measure = useCallback(() => {
    if (containerRef.current) {
      const h = containerRef.current.parentElement?.scrollHeight || document.documentElement.scrollHeight
      setPageHeight(h)
    }
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  useEffect(() => {
    // Initial measure after layout settles
    const timer = setTimeout(measure, 200)
    window.addEventListener("resize", measure)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  // Re-measure once fonts / images load
  useEffect(() => {
    window.addEventListener("load", measure)
    return () => window.removeEventListener("load", measure)
  }, [measure])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          if (docHeight > 0) {
            setProgress(Math.min(1, Math.max(0, scrollTop / docHeight)))
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /*
    The path is defined in a coordinate system where:
    - x: 0..400  (maps to 0..100% page width)
    - y: 0..1000 (maps to 0..100% page height)
    The SVG uses preserveAspectRatio="none" so curves fill the page.
    Only C (cubic bezier) commands — no straight lines.
  */
  const d = [
    // Start from dead center (flower stem base) at ~top 50vh
    "M 200 60",
    // Gentle drift right
    "C 200 80, 240 100, 270 130",
    // Sweep left through story sections
    "C 310 170, 160 190, 110 230",
    // Curve right
    "C 60 270, 280 300, 320 340",
    // Sweep left
    "C 360 380, 130 400, 80 440",
    // Curve right into platform
    "C 30 480, 300 510, 340 550",
    // Sweep left
    "C 380 590, 110 620, 70 660",
    // Curve right
    "C 30 700, 310 730, 350 770",
    // Sweep left
    "C 390 810, 100 840, 60 880",
    // Curve right
    "C 20 920, 320 940, 300 970",
    // Drift back to center at bottom
    "C 280 990, 210 998, 200 1000",
  ].join(" ")

  const drawn = pathLength > 0 ? pathLength * (1 - progress) : pathLength

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 1, height: pageHeight || "100%" }}
      aria-hidden="true"
    >
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 400 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="threadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="15%" stopColor="#C4A882" />
            <stop offset="50%" stopColor="#D5CDC2" />
            <stop offset="85%" stopColor="#C4A882" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={d}
          stroke="url(#threadGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: pathLength || 1,
            strokeDashoffset: drawn,
            transition: "stroke-dashoffset 0.08s linear",
          }}
        />
      </svg>
    </div>
  )
}
