'use client'

import { useScrollProgress } from '@/hooks/use-scroll-progress'
import { NoiseRevealImage } from './noise-reveal-image'
import { ScrollReveal } from './scroll-reveal'

export function LocationSection() {
  const { ref: villaRef, progress: villaProgress } = useScrollProgress(0.05)

  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center px-8 py-16 sm:px-12 md:px-16">
      <div className="mx-auto max-w-[1000px]">
        {/* Title */}
        <ScrollReveal translateY={20} start={0} end={0.35} effect="slide">
          <h2 className="mb-16 text-center font-serif text-[#8E9E8C] text-sm uppercase tracking-[0.3em] md:mb-20">
            Location
          </h2>
        </ScrollReveal>

        {/* Full-width large image */}
        <div
          ref={villaRef}
          className="mb-16 md:mb-20 w-full aspect-[16/9] relative overflow-hidden bg-[#FDFCFA]"
        >
          <NoiseRevealImage
            src="https://cdn0.matrimonio.com/vendor/5512/3_2/1280/jpeg/b3eec765-ed46-4a59-b18f-907b0710d8fb_2_15512-164931398289049.webp"
            background="#FDFCFA"
            alt="Villa Castelbarco Pindemonte Rezzonico"
            visible={villaProgress > 0.05}
            className="absolute inset-0"
          />
        </div>

        {/* Two-column grid: text left, map right */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          {/* Left: text */}
          <ScrollReveal translateY={18} start={0} end={0.45} offset={0.1} effect="slide">
            <h3 className="mb-3 font-normal font-serif text-2xl text-[#1A1A1A] md:text-3xl">
              Villa Castelbarco Pindemonte Rezzonico
            </h3>
            <p className="mb-6 font-serif text-[#8E9E8C] text-sm uppercase tracking-[0.1em]">
              Via Cesare Cantu 21, 23898 Imbersago (LC)
            </p>
            <p className="font-serif text-[#4A4440] text-base leading-relaxed md:text-lg">
              Ed ecco qui la location. Una villa secentesca immersa nel verde dell’Alta Brianza,
              talmente spettacolare che cattura lo sguardo. Niente formalità ingessate: questo parco
              secolare e questa corte storica saranno il palcoscenico ideale del nostro matrimonio.
              Un luogo meraviglioso dove perdersi tra gli alberi, rilassarsi dopo la cerimonia e
              lasciarsi andare quando il sole inizia a calare. Preparate i navigatori: non vediamo
              l’ora di accogliervi qui insieme a noi!
            </p>
          </ScrollReveal>

          {/* Right: map */}
          <ScrollReveal
            className="w-full"
            translateY={24}
            start={0}
            end={0.5}
            offset={0.1}
            effect="slide"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2F0EB]">
              <iframe
                title="Villa Castelbarco Pindemonte Rezzonico"
                src="https://maps.google.com/maps?q=Via+Cesare+Cantu+21%2C+23898+Imbersago+LC%2C+Italy&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
