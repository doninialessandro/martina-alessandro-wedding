"use client"

import { ScrollReveal } from "./scroll-reveal"

const storyBlocks = [
  {
    title: "Come ci siamo conosciuti",
    body: "[Testo da inserire — racconta come vi siete incontrati per la prima volta, il luogo, le circostanze, cosa vi ha colpito l'uno dell'altra.]",
  },
  {
    title: "Il primo appuntamento",
    body: "[Testo da inserire — il vostro primo vero appuntamento, dove siete andati, cosa avete fatto, le emozioni di quella giornata.]",
  },
  {
    title: "La proposta",
    body: "[Testo da inserire — il momento della proposta di matrimonio, come è avvenuta, le parole dette, la reazione.]",
  },
]

export function OurStorySection() {
  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1100px] mx-auto">

        {/* Mobile: stacked layout */}
        <div className="md:hidden">
          <ScrollReveal translateY={18} start={0} end={0.35}>
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20">
              La nostra storia
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-24">
            {storyBlocks.map((block, index) => (
              <div key={index}>
                <ScrollReveal translateY={14} start={0} end={0.35} offset={0.1}>
                  <h3 className="text-2xl font-serif font-normal text-[#1A1A1A] mb-4">
                    {block.title}
                  </h3>
                </ScrollReveal>
                <ScrollReveal translateY={14} start={0.05} end={0.4} offset={0.1}>
                  <p className="text-base leading-relaxed font-serif text-[#4A4440] mb-8">
                    {block.body}
                  </p>
                </ScrollReveal>
                <ScrollReveal translateY={18} start={0} end={0.4} offset={0.1} effect="slide">
                  <div className="w-full aspect-[4/5] bg-[#F2F0EB] flex items-center justify-center">
                    <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                      Foto {index + 1}
                    </span>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: sticky left title + scrolling right content */}
        <div className="hidden md:flex md:flex-row gap-16 lg:gap-24">
          {/* Left — sticky title */}
          <div className="md:w-[280px] lg:w-[320px] shrink-0">
            <div className="sticky top-[40vh]">
              <ScrollReveal translateY={18} start={0} end={0.35}>
                <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif mb-4">
                  La nostra storia
                </h2>
                <p className="text-base leading-relaxed font-serif text-[#4A4440]">
                  I momenti che ci hanno portato fin qui.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Right — scrolling story blocks */}
          <div className="flex-1 flex flex-col gap-36">
            {storyBlocks.map((block, index) => (
              <div key={index} className="flex flex-col gap-8">
                <div>
                  <ScrollReveal translateY={14} start={0} end={0.35} offset={0.1}>
                    <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A] mb-4">
                      {block.title}
                    </h3>
                  </ScrollReveal>
                  <ScrollReveal translateY={14} start={0.05} end={0.4} offset={0.1}>
                    <p className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440]">
                      {block.body}
                    </p>
                  </ScrollReveal>
                </div>
                <ScrollReveal translateY={18} start={0} end={0.4} offset={0.1} effect="slide">
                  <div className="w-full aspect-[3/4] bg-[#F2F0EB] flex items-center justify-center">
                    <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                      Foto {index + 1}
                    </span>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
