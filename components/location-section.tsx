"use client"

import { ScrollReveal } from "./scroll-reveal"

export function LocationSection() {
  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1000px] mx-auto">

        <ScrollReveal translateY={18} start={0} end={0.35}>
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20 md:mb-28">
            Location
          </h2>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Info */}
          <div className="flex-1">
            <ScrollReveal translateY={14} start={0} end={0.35} offset={0.1}>
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

          {/* Map with decorative flower corners */}
          <ScrollReveal className="flex-1 w-full" translateY={18} start={0} end={0.4} offset={0.1} effect="slide">
            <div className="relative">
              {/* Decorative flower SVGs overlapping the map corners */}
              {/* Top-left */}
              <svg className="absolute -top-5 -left-5 w-14 h-14 z-10 opacity-70" viewBox="0 0 60 60" fill="none" aria-hidden="true">
                <circle cx="30" cy="30" r="4" stroke="#8E9E8C" strokeWidth="1" />
                <path d="M30 18 C32 24,36 26,30 30 C24 26,26 24,30 18Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M30 42 C28 36,24 34,30 30 C36 34,34 36,30 42Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M18 30 C24 28,26 24,30 30 C26 36,24 32,18 30Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M42 30 C36 32,34 36,30 30 C34 24,36 28,42 30Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M21 21 C25 23,27 25,30 30 C25 27,23 25,21 21Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
                <path d="M39 21 C37 25,35 27,30 30 C33 25,35 23,39 21Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
                <path d="M21 39 C23 35,25 33,30 30 C27 35,25 37,21 39Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
                <path d="M39 39 C35 37,33 35,30 30 C35 33,37 35,39 39Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
              </svg>
              {/* Top-right */}
              <svg className="absolute -top-5 -right-5 w-14 h-14 z-10 opacity-70" viewBox="0 0 60 60" fill="none" aria-hidden="true">
                <circle cx="30" cy="30" r="4" stroke="#8E9E8C" strokeWidth="1" />
                <path d="M30 18 C32 24,36 26,30 30 C24 26,26 24,30 18Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M30 42 C28 36,24 34,30 30 C36 34,34 36,30 42Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M18 30 C24 28,26 24,30 30 C26 36,24 32,18 30Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M42 30 C36 32,34 36,30 30 C34 24,36 28,42 30Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M21 21 C25 23,27 25,30 30 C25 27,23 25,21 21Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
                <path d="M39 21 C37 25,35 27,30 30 C33 25,35 23,39 21Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
              </svg>
              {/* Bottom-left */}
              <svg className="absolute -bottom-5 -left-5 w-14 h-14 z-10 opacity-70" viewBox="0 0 60 60" fill="none" aria-hidden="true">
                <circle cx="30" cy="30" r="4" stroke="#8E9E8C" strokeWidth="1" />
                <path d="M30 18 C32 24,36 26,30 30 C24 26,26 24,30 18Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M30 42 C28 36,24 34,30 30 C36 34,34 36,30 42Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M18 30 C24 28,26 24,30 30 C26 36,24 32,18 30Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M42 30 C36 32,34 36,30 30 C34 24,36 28,42 30Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M21 39 C23 35,25 33,30 30 C27 35,25 37,21 39Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
                <path d="M39 39 C35 37,33 35,30 30 C35 33,37 35,39 39Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
              </svg>
              {/* Bottom-right */}
              <svg className="absolute -bottom-5 -right-5 w-14 h-14 z-10 opacity-70" viewBox="0 0 60 60" fill="none" aria-hidden="true">
                <circle cx="30" cy="30" r="4" stroke="#8E9E8C" strokeWidth="1" />
                <path d="M30 18 C32 24,36 26,30 30 C24 26,26 24,30 18Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M30 42 C28 36,24 34,30 30 C36 34,34 36,30 42Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M18 30 C24 28,26 24,30 30 C26 36,24 32,18 30Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M42 30 C36 32,34 36,30 30 C34 24,36 28,42 30Z" stroke="#D88A6E" strokeWidth="1" fill="none" />
                <path d="M21 21 C25 23,27 25,30 30 C25 27,23 25,21 21Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
                <path d="M39 39 C35 37,33 35,30 30 C35 33,37 35,39 39Z" stroke="#8E9E8C" strokeWidth="0.8" fill="none" />
              </svg>

              <div className="w-full aspect-[4/3] bg-[#F2F0EB] overflow-hidden rounded-2xl">
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
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
