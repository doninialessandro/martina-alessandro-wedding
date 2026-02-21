"use client"

import { ScrollReveal } from "./scroll-reveal"
import { MonolineFlower } from "./monoline-flower"

export function FirstProjectSection() {
  return (
    <section className="py-28 md:py-44 px-8 sm:px-12 md:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#F0EDE8]/40" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ScrollReveal translateY={0} scaleFrom={0.85} start={0} end={0.35}>
          <div className="flex justify-center mb-12">
            <MonolineFlower size={80} animate={true} />
          </div>
        </ScrollReveal>

        <ScrollReveal translateY={40} start={0.05} end={0.35}>
          <h3 className="text-sm tracking-[0.3em] uppercase text-[#6B6B6B] font-serif mb-6">
            Our first project
          </h3>
        </ScrollReveal>

        <ScrollReveal translateY={50} start={0.1} end={0.4}>
          <a
            href="https://brunellocucinelli.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-2xl md:text-4xl font-serif text-[#1A1A1A] border-b border-[#C4A882] pb-1 hover:opacity-60 transition-opacity"
          >
            brunellocucinelli.ai
          </a>
        </ScrollReveal>

        <ScrollReveal translateY={40} start={0.15} end={0.45}>
          <div className="mt-8">
            <a
              href="#"
              className="text-sm tracking-[0.15em] uppercase text-[#6B6B6B] font-serif border-b border-[#E0DCD5] pb-0.5 hover:text-[#1A1A1A] hover:border-[#C4A882] transition-all"
            >
              Press release
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
