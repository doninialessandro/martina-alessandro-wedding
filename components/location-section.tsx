'use client'

import { MonolineFlower } from './monoline-flower'
import { ScrollReveal } from './scroll-reveal'

export function LocationSection() {
  return (
    <section className="px-8 py-24 sm:px-12 md:px-16 md:py-40">
      <div className="mx-auto max-w-[1000px]">
        <ScrollReveal translateY={18} start={0} end={0.35}>
          <h2 className="mb-20 text-center font-serif text-[#8E9E8C] text-sm uppercase tracking-[0.3em] md:mb-28">
            Location
          </h2>
        </ScrollReveal>

        <div className="flex flex-col items-start gap-12 md:flex-row md:gap-16">
          {/* Info */}
          <div className="flex-1">
            <ScrollReveal translateY={14} start={0} end={0.35} offset={0.1}>
              <h3 className="mb-3 font-normal font-serif text-2xl text-[#1A1A1A] md:text-3xl">
                Villa Castelbarco Pindemonte Rezzonico
              </h3>
              <p className="mb-6 font-serif text-[#8E9E8C] text-sm uppercase tracking-[0.1em]">
                Via Cesare Cantu 21, 23898 Imbersago (LC)
              </p>
              <p className="font-serif text-[#4A4440] text-base leading-relaxed md:text-lg">
                Una dimora secentesca immersa nel parco collinare dell{"'"}Alta Brianza, con corte
                storica, saloni affrescati e parco secolare.
              </p>
            </ScrollReveal>
          </div>

          {/* Map with decorative flower corners */}
          <ScrollReveal
            className="w-full flex-1"
            translateY={18}
            start={0}
            end={0.4}
            offset={0.1}
            effect="slide"
          >
            <div className="relative">
              {/* Top-left flower */}
              <div className="absolute -top-10 -left-10 z-10 opacity-60">
                <MonolineFlower size={80} animate={false} showThread={false} />
              </div>
              {/* Bottom-right flower */}
              <div className="absolute -right-10 -bottom-10 z-10 opacity-60">
                <MonolineFlower size={80} animate={false} showThread={false} />
              </div>

              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#F2F0EB]">
                <iframe
                  title="Villa Castelbarco Pindemonte Rezzonico"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.654!2d9.4435!3d45.7120!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786be2d1a3c7b5d%3A0x1234567890abcdef!2sVilla+Castelbarco+Pindemonte+Rezzonico!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
