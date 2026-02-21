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
    // Start from center at hero bottom — directly below the flower stem tip
    "M 200 95",
    // Continue straight down briefly, same direction as stem
    "C 200 100, 200 105, 202 115",
    // Gentle drift right through first story section
    "C 206 135, 250 155, 275 175",
    // Sweep left through creativity section
    "C 310 200, 150 230, 110 265",
    // Curve right through new generation
    "C 65 305, 290 335, 330 370",
    // Sweep left into platform sections
    "C 370 410, 120 440, 75 480",
    // Curve right
    "C 25 520, 310 550, 345 590",
    // Sweep left
    "C 385 630, 100 660, 65 700",
    // Curve right
    "C 25 740, 320 770, 350 810",
    // Sweep left
    "C 385 850, 95 880, 60 920",
    // Drift back to center at bottom
    "C 30 955, 190 975, 200 1000",
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
            <stop offset="0%" stopColor="#7A6B55" />
            <stop offset="5%" stopColor="#8B7355" />
            <stop offset="20%" stopColor="#C4A882" />
            <stop offset="50%" stopColor="#D5CDC2" />
            <stop offset="80%" stopColor="#C4A882" />
            <stop offset="95%" stopColor="#8B7355" />
            <stop offset="100%" stopColor="#7A6B55" />
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
