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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20">

      {/* ——— Main hero row: HUMAN — flower — AI ——— */}
      <div className="flex items-center justify-center gap-8 md:gap-14 lg:gap-20 w-full max-w-[1100px]">

        {/* "Martina" — uppercase, tracked, right-aligned toward center */}
        <h1
          className={`font-serif text-[#1A1A1A] uppercase tracking-[0.25em] text-2xl md:text-4xl lg:text-5xl xl:text-6xl transition-all duration-[1400ms] ease-out ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ fontWeight: 400, lineHeight: 1, textAlign: "right", flex: "1 1 0%" }}
        >
          Martina
        </h1>

        {/* Flower — visual centerpiece, no thread line */}
        <div
          className={`shrink-0 transition-opacity duration-[2000ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Desktop */}
          <div className="hidden md:block">
            <MonolineFlower size={220} animate={true} showThread={false} />
          </div>
          {/* Mobile */}
          <div className="block md:hidden">
            <MonolineFlower size={140} animate={true} showThread={false} />
          </div>
        </div>

        {/* "Alessandro" — uppercase, tracked, left-aligned toward center */}
        <h1
          className={`font-serif text-[#1A1A1A] uppercase tracking-[0.25em] text-2xl md:text-4xl lg:text-5xl xl:text-6xl transition-all duration-[1400ms] ease-out delay-200 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ fontWeight: 400, lineHeight: 1, textAlign: "left", flex: "1 1 0%" }}
        >
          Alessandro
        </h1>
      </div>

    </section>
  )
}
