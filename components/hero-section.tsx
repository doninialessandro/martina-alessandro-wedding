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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-16">

      {/* ——— Desktop: side-by-side row ——— */}
      <div className="hidden md:flex items-center justify-center gap-12 lg:gap-16 w-full max-w-[1000px]">

        <h1
          className={`font-serif text-[#1A1A1A] uppercase tracking-[0.2em] text-xl lg:text-2xl xl:text-3xl transition-all duration-[1400ms] ease-out ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
          style={{ fontWeight: 400, lineHeight: 1.1, textAlign: "right", flex: "1 1 0%" }}
        >
          Martina
        </h1>

        <div
          className={`shrink-0 transition-opacity duration-[2000ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <MonolineFlower size={220} animate={true} showThread={false} />
        </div>

        <h1
          className={`font-serif text-[#1A1A1A] uppercase tracking-[0.2em] text-xl lg:text-2xl xl:text-3xl transition-all duration-[1400ms] ease-out delay-200 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ fontWeight: 400, lineHeight: 1.1, textAlign: "left", flex: "1 1 0%" }}
        >
          Alessandro
        </h1>
      </div>

      {/* ——— Mobile: flower on top, names stacked below ——— */}
      <div className="flex md:hidden flex-col items-center gap-10 w-full">

        <div
          className={`transition-opacity duration-[2000ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <MonolineFlower size={160} animate={true} showThread={false} />
        </div>

        <h1
          className={`font-serif text-[#1A1A1A] uppercase tracking-[0.2em] text-xl text-center transition-all duration-[1400ms] ease-out delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontWeight: 400, lineHeight: 1.4 }}
        >
          Martina & Alessandro
        </h1>
      </div>

    </section>
  )
}
