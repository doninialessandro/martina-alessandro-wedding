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
      <div className="absolute inset-0 bg-[#FAF9F6]" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[1200px] mx-auto">

        {/* ——— MOBILE layout: flower above, stacked title ——— */}
        <div className="flex flex-col items-center md:hidden">
          {/* Flower */}
          <div
            className={`mb-10 transition-opacity duration-[1500ms] ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <MonolineFlower size={120} animate={true} showThread={false} />
          </div>

          {/* Title stacked */}
          <h1
            className={`font-serif text-[#1A1A1A] text-center text-[2.5rem] leading-[1.05] tracking-[-0.01em] transition-all duration-1000 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontWeight: 400 }}
          >
            Human<br />
            <span className="italic">Artificial</span><br />
            Intelligence
          </h1>
        </div>

        {/* ——— DESKTOP layout: "Human" — flower — "Artificial Intelligence" inline ——— */}
        <div className="hidden md:flex items-center justify-center w-full">

          {/* "Human" — right-aligned toward center */}
          <div className="flex-1 flex justify-end">
            <h1
              className={`font-serif text-[#1A1A1A] text-right text-6xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-[-0.02em] transition-all duration-1000 delay-200 ${
                loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              }`}
              style={{ fontWeight: 400, lineHeight: 1 }}
            >
              Human
            </h1>
          </div>

          {/* Flower — fixed center column */}
          <div
            className={`mx-8 lg:mx-12 shrink-0 transition-opacity duration-[1500ms] ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <MonolineFlower size={130} animate={true} showThread={false} />
          </div>

          {/* "Artificial Intelligence" — left-aligned from center, stacked */}
          <div className="flex-1 flex justify-start">
            <h1
              className={`font-serif text-[#1A1A1A] text-left text-6xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-[-0.02em] transition-all duration-1000 delay-[400ms] ${
                loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
              }`}
              style={{ fontWeight: 400, lineHeight: 1 }}
            >
              Artificial<br />Intelligence
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className={`mt-10 md:mt-14 text-base md:text-lg text-[#6B6B6B] font-serif italic tracking-[0.04em] text-center transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Our platform for a new generation of websites
        </p>
      </div>

      {/* Thread dropping from center of hero into page below */}
      <div
        className="relative z-10 mt-12"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.5s ease-out 2s",
        }}
      >
        <div
          className="w-px mx-auto bg-[#E0DCD5] origin-top"
          style={{
            height: 80,
            transform: loaded ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 2s cubic-bezier(0.33,1,0.68,1) 2.2s",
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-[1400ms] ${
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
