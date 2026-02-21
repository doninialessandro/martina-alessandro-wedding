"use client"

import { ScrollReveal } from "./scroll-reveal"

export function LocationSection() {
  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1000px] mx-auto">

        <ScrollReveal translateY={40} start={0} end={0.35}>
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20 md:mb-28">
            Location
          </h2>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Info */}
          <div className="flex-1">
            <ScrollReveal translateY={30} start={0} end={0.35} offset={0.1}>
              <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A] mb-3">
                Villa Castelbarco Pindemonte Rezzonico
              </h3>
              <p className="text-sm font-serif text-[#8E9E8C] tracking-[0.1em] uppercase mb-6">
                Via Cesare Cantu 21, 23898 Imbersago (LC)
              </p>
              <p className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440]">
                Una dimora secentesca immersa nel parco collinare dell{"'"}Alta Brianza, con corte storica, saloni affrescati e parco secolare.
              </p>
            </ScrollReveal>
          </div>

          {/* Map */}
          <ScrollReveal className="flex-1 w-full" translateY={40} start={0} end={0.4} offset={0.1} effect="slide">
            <div className="w-full aspect-[4/3] bg-[#EDE8DA] overflow-hidden">
              <iframe
                title="Villa Castelbarco Pindemonte Rezzonico"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.654!2d9.4435!3d45.7120!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786be2d1a3c7b5d%3A0x1234567890abcdef!2sVilla+Castelbarco+Pindemonte+Rezzonico!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
