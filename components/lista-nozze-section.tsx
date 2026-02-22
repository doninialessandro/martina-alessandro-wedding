'use client'

import { ScrollReveal } from './scroll-reveal'

export function ListaNozzeSection() {
  return (
    <section className="px-8 py-24 sm:px-12 md:px-16 md:py-40">
      <div className="mx-auto max-w-[600px] text-center">
        <ScrollReveal translateY={18} start={0} end={0.35}>
          <h2 className="mb-16 font-serif text-[#8E9E8C] text-sm uppercase tracking-[0.3em] md:mb-20">
            Lista nozze
          </h2>
        </ScrollReveal>

        <ScrollReveal translateY={10} start={0.05} end={0.4} offset={0.1}>
          <p className="select-all font-serif text-[#1A1A1A] text-base tracking-[0.05em] md:text-lg">
            [IBAN PLACEHOLDER]
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
