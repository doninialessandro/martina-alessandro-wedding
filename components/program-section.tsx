"use client"

import { ScrollReveal } from "./scroll-reveal"

const timelineItems = [
  { time: "16:00", title: "Apertura", description: "Accoglienza degli ospiti" },
  { time: "16:30", title: "Cerimonia", description: "Rito nuziale" },
  { time: "17:30", title: "Cocktail", description: "Aperitivo nel parco" },
  { time: "19:30", title: "Cena", description: "Cena di gala" },
  { time: "23:00", title: "Festa", description: "Cantinone & Taverna" },
]

export function ProgramSection() {
  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[600px] mx-auto">

        <ScrollReveal translateY={40} start={0} end={0.35}>
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-4">
            Il programma
          </h2>
          <p className="text-base font-serif text-[#4A4440] text-center mb-20 md:mb-28">
            Villa Castelbarco Pindemonte Rezzonico
          </p>
        </ScrollReveal>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#D5CCBC]" aria-hidden="true" />

          <div className="flex flex-col gap-16 md:gap-20">
            {timelineItems.map((item, i) => (
              <ScrollReveal key={i} translateY={30} start={0} end={0.4} offset={0.1}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8E9E8C] mb-5 relative z-10" />

                  <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-2">
                    {item.time}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-[#1A1A1A] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-serif text-[#4A4440]">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
