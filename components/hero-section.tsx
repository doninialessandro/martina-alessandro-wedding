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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#FAF9F6]" />

      {/* ——— Main hero content ——— */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* ——— DESKTOP: Human — Flower — AI in a single row ——— */}
        <div className="hidden md:flex items-center justify-center w-full px-10 lg:px-16">

          {/* "Human" — pushed toward the outer left */}
          <div className="flex-1 flex justify-end pr-10 lg:pr-16 xl:pr-20">
            <span
              className={`font-serif text-[#1A1A1A] text-lg lg:text-xl xl:text-2xl tracking-[0.15em] uppercase transition-all duration-1000 delay-300 ${
                loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ fontWeight: 400, lineHeight: 1 }}
            >
              Human
            </span>
          </div>

          {/* Flower — large, centered */}
          <div
            className={`shrink-0 transition-opacity duration-[1800ms] ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <MonolineFlower size={220} animate={true} showThread={false} />
          </div>

          {/* "AI" — pushed toward the outer right */}
          <div className="flex-1 flex justify-start pl-10 lg:pl-16 xl:pl-20">
            <span
              className={`font-serif text-[#1A1A1A] text-lg lg:text-xl xl:text-2xl tracking-[0.15em] uppercase transition-all duration-1000 delay-500 ${
                loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ fontWeight: 400, lineHeight: 1 }}
            >
              AI
            </span>
          </div>
        </div>

        {/* ——— MOBILE: stacked — flower on top, words below ——— */}
        <div className="flex flex-col items-center md:hidden px-6">

          {/* Flower — large and prominent */}
          <div
            className={`mb-10 transition-opacity duration-[1800ms] ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <MonolineFlower size={160} animate={true} showThread={false} />
          </div>

          {/* "Human" left, "AI" right */}
          <div className="flex items-center justify-center w-full gap-12">
            <span
              className={`font-serif text-[#1A1A1A] text-base tracking-[0.15em] uppercase transition-all duration-1000 delay-300 ${
                loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              }`}
              style={{ fontWeight: 400 }}
            >
              Human
            </span>
            <span
              className={`font-serif text-[#1A1A1A] text-base tracking-[0.15em] uppercase transition-all duration-1000 delay-500 ${
                loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
              }`}
              style={{ fontWeight: 400 }}
            >
              AI
            </span>
          </div>
        </div>
      </div>

      {/* ——— Thread line extending down from hero ——— */}
      <div
        className="relative z-10 mt-16 md:mt-20 flex justify-center"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-out 2.5s",
        }}
      >
        <svg
          width="1"
          height="120"
          viewBox="0 0 1 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <line
            x1="0.5" y1="0" x2="0.5" y2="120"
            stroke="#D5CDC2"
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              strokeDasharray: 120,
              strokeDashoffset: loaded ? 0 : 120,
              transition: "stroke-dashoffset 2s cubic-bezier(0.33,1,0.68,1) 2.8s",
            }}
          />
        </svg>
      </div>
    </section>
  )
}
