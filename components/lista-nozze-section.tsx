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
            Niente frullatori o servizi di piatti che non useremo mai. Se volete darci una mano a
            finanziare la prossima avventura pazzesca dall’altra parte del mondo (o anche solo per
            pagarci i danni della festa), questo è l’IBAN:{' '}
            <strong>IT60X0542811101000000123456</strong>.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
