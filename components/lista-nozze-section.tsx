"use client"

import { ScrollReveal } from "./scroll-reveal"

export function ListaNozzeSection() {
  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[600px] mx-auto text-center">

        <ScrollReveal translateY={18} start={0} end={0.35}>
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif mb-16 md:mb-20">
            Lista nozze
          </h2>
        </ScrollReveal>

        <ScrollReveal translateY={10} start={0.05} end={0.4} offset={0.1}>
          <p className="text-base md:text-lg font-serif text-[#1A1A1A] tracking-[0.05em] select-all">
            [IBAN PLACEHOLDER]
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
