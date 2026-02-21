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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">

      {/* ——— DESKTOP layout ——— */}
      <div className="hidden md:flex items-center justify-between w-full px-8 lg:px-16 xl:px-24">

        {/* "Martina" — small, pushed to left edge */}
        <span
          className={`font-serif text-[#1A1A1A] text-sm lg:text-base tracking-[0.25em] uppercase transition-all duration-[1200ms] ease-out ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
          style={{ fontWeight: 400, lineHeight: 1 }}
        >
          Martina
        </span>

        {/* Flower — large, dominant center */}
        <div
          className={`shrink-0 transition-opacity duration-[2000ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <MonolineFlower size={280} animate={true} showThread={true} />
        </div>

        {/* "Alessandro" — small, pushed to right edge */}
        <span
          className={`font-serif text-[#1A1A1A] text-sm lg:text-base tracking-[0.25em] uppercase transition-all duration-[1200ms] ease-out delay-200 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ fontWeight: 400, lineHeight: 1 }}
        >
          Alessandro
        </span>
      </div>

      {/* ——— MOBILE layout ——— */}
      <div className="flex flex-col items-center md:hidden px-6">

        {/* Flower — large */}
        <div
          className={`mb-10 transition-opacity duration-[2000ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <MonolineFlower size={200} animate={true} showThread={true} />
        </div>

        {/* Names on either side */}
        <div className="flex items-center justify-between w-full max-w-xs">
          <span
            className={`font-serif text-[#1A1A1A] text-xs tracking-[0.25em] uppercase transition-all duration-[1200ms] ease-out ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
            style={{ fontWeight: 400 }}
          >
            Martina
          </span>
          <span
            className={`font-serif text-[#1A1A1A] text-xs tracking-[0.25em] uppercase transition-all duration-[1200ms] ease-out delay-200 ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
            style={{ fontWeight: 400 }}
          >
            Alessandro
          </span>
        </div>
      </div>
    </section>
  )
}
