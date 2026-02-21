"use client"

import { useInView } from "@/hooks/use-in-view"
import { MonolineFlower } from "./monoline-flower"

export function FirstProjectSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[#F0EDE8]/40" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Small flower accent */}
        <div
          className={`flex justify-center mb-12 transition-all duration-[1500ms] ease-out ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-[0.85]"
          }`}
        >
          <div className="animate-spin-slow">
            <MonolineFlower size={80} animate={true} color="#C4A882" />
          </div>
        </div>

        <h3
          className={`text-sm tracking-[0.3em] uppercase text-[#6B6B6B] font-serif mb-6 transition-all duration-800 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Our first project
        </h3>

        <a
          href="https://brunellocucinelli.ai"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block text-2xl md:text-4xl font-serif text-[#1A1A1A] border-b border-[#C4A882] pb-1 transition-all duration-800 delay-200 hover:opacity-60 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          brunellocucinelli.ai
        </a>

        <div
          className={`mt-8 transition-all duration-800 delay-400 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#"
            className="text-sm tracking-[0.15em] uppercase text-[#6B6B6B] font-serif border-b border-[#E0DCD5] pb-0.5 hover:text-[#1A1A1A] hover:border-[#C4A882] transition-all"
          >
            Press release
          </a>
        </div>
      </div>
    </section>
  )
}
