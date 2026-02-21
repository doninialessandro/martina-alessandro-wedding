"use client"

import { useEffect, useState } from "react"
import { MonolineFlower } from "./monoline-flower"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[#FAF9F6]" />

      {/* Flower illustration replacing yarn ball */}
      <div
        className={`relative z-10 mb-12 transition-opacity duration-[1500ms] ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <MonolineFlower
          size={180}
          animate={true}
        />
      </div>

      {/* Title */}
      <div className="relative z-10 text-center max-w-3xl">
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-[#1A1A1A] leading-tight tracking-[-0.01em] transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Human Artificial Intelligence
        </h1>
        <p
          className={`mt-6 md:mt-8 text-base md:text-lg text-[#6B6B6B] font-serif italic tracking-wide transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Our platform for a new generation of websites
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-[1200ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B6B6B] font-serif">
            Scroll
          </span>
          <div className="w-px h-8 bg-[#C4A882] opacity-60" />
        </div>
      </div>
    </section>
  )
}
