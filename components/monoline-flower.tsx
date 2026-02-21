"use client"

import { useEffect, useRef, useState } from "react"

interface MonolineFlowerProps {
  className?: string
  size?: number
  animate?: boolean
  color?: string
}

export function MonolineFlower({
  className = "",
  size = 200,
  animate = true,
  color = "#1A1A1A",
}: MonolineFlowerProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isVisible, setIsVisible] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (svgRef.current) observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [animate])

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Center circle */}
      <circle
        cx="100"
        cy="100"
        r="12"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        style={{
          strokeDasharray: 75.4,
          strokeDashoffset: isVisible ? 0 : 75.4,
          transition: "stroke-dashoffset 0.8s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      />
      {/* Petals - 6 petals arranged radially */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 100 + Math.cos(rad) * 35
        const cy = 100 + Math.sin(rad) * 35
        const pathLength = 150
        return (
          <ellipse
            key={angle}
            cx={cx}
            cy={cy}
            rx="22"
            ry="13"
            transform={`rotate(${angle} ${cx} ${cy})`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: isVisible ? 0 : pathLength,
              transition: `stroke-dashoffset 0.6s cubic-bezier(0.33, 1, 0.68, 1) ${0.06 * (i + 1)}s`,
            }}
          />
        )
      })}
      {/* Inner detail petals */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 100 + Math.cos(rad) * 20
        const cy = 100 + Math.sin(rad) * 20
        const pathLength = 95
        return (
          <ellipse
            key={`inner-${angle}`}
            cx={cx}
            cy={cy}
            rx="14"
            ry="8"
            transform={`rotate(${angle} ${cx} ${cy})`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: isVisible ? 0 : pathLength,
              transition: `stroke-dashoffset 0.5s cubic-bezier(0.33, 1, 0.68, 1) ${0.04 * (i + 1) + 0.4}s`,
            }}
          />
        )
      })}
      {/* Stem */}
      <path
        d="M100 112 Q100 145 100 175 Q100 185 95 190"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDasharray: 85,
          strokeDashoffset: isVisible ? 0 : 85,
          transition: "stroke-dashoffset 0.6s cubic-bezier(0.33, 1, 0.68, 1) 0.7s",
        }}
      />
      {/* Leaf left */}
      <path
        d="M100 155 Q85 145 78 150 Q72 155 80 162 Q88 165 100 158"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDasharray: 65,
          strokeDashoffset: isVisible ? 0 : 65,
          transition: "stroke-dashoffset 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.9s",
        }}
      />
      {/* Leaf right */}
      <path
        d="M100 165 Q115 155 122 160 Q128 165 120 172 Q112 175 100 168"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDasharray: 65,
          strokeDashoffset: isVisible ? 0 : 65,
          transition: "stroke-dashoffset 0.5s cubic-bezier(0.33, 1, 0.68, 1) 1s",
        }}
      />
    </svg>
  )
}
