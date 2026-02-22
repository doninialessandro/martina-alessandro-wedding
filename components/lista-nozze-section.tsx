'use client'

import { ScrollReveal } from './scroll-reveal'

export function ListaNozzeSection() {
  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center px-8 pt-8 pb-16 sm:px-12 md:px-16 mb-16">
      <div className="mx-auto max-w-[1100px]">
        <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
          <h2 className="mb-16 font-serif text-[#8E9E8C] text-sm uppercase tracking-[0.3em] text-center md:mb-20">
            Lista nozze
          </h2>
        </ScrollReveal>

        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal translateY={10} start={0.05} end={0.4} offset={0.1} effect="slide">
            <p className="select-text font-serif text-[#1A1A1A] text-base tracking-[0.05em] md:text-lg">
              Niente frullatori o servizi di piatti che non useremo mai. Se volete darci una mano a
              finanziare la prossima avventura pazzesca dall’altra parte del mondo (o anche solo per
              pagarci i danni della festa), questo è l’IBAN:
              <br />
              <br />
              <strong>IT60X0542811101000000123456</strong>.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          className="mt-16 md:mt-20"
          translateY={18}
          start={0}
          end={0.4}
          offset={0.1}
          effect="slide"
        >
          <div className="w-full aspect-[16/9] relative overflow-hidden">
            {/* biome-ignore lint/performance/noImgElement: decorative photo */}
            <img
              src="/images/lista_nozze/lista_nozze.webp"
              alt="Lista nozze"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
