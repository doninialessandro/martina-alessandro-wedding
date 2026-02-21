'use client'

import { useScrollytelling } from '@/hooks/use-scrollytelling'
import { ScrollReveal } from './scroll-reveal'

const storyBlocks = [
  {
    title: 'Come ci siamo conosciuti',
    body: "[Testo da inserire — racconta come vi siete incontrati per la prima volta, il luogo, le circostanze, cosa vi ha colpito l'uno dell'altra.]",
    photo: 'Foto 1',
  },
  {
    title: 'Il primo appuntamento',
    body: '[Testo da inserire — il vostro primo vero appuntamento, dove siete andati, cosa avete fatto, le emozioni di quella giornata.]',
    photo: 'Foto 2',
  },
  {
    title: 'La proposta',
    body: '[Testo da inserire — il momento della proposta di matrimonio, come è avvenuta, le parole dette, la reazione.]',
    photo: 'Foto 3',
  },
]

export function OurStorySection() {
  const { activeIndex, setItemRef } = useScrollytelling(storyBlocks.length)

  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        {/* Mobile: stacked layout (no sticky) */}
        <div className="md:hidden">
          <ScrollReveal translateY={18} start={0} end={0.35}>
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20">
              La nostra storia
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-24">
            {storyBlocks.map((block, _index) => (
              <div key={block.title}>
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
                      {block.photo}
                    </span>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: scrollytelling — left text scrolls, right photo stays sticky */}
        <div className="hidden md:block">
          <ScrollReveal translateY={18} start={0} end={0.35}>
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif mb-20">
              La nostra storia
            </h2>
          </ScrollReveal>

          <div className="flex flex-row gap-16 lg:gap-24">
            {/* Left — text blocks that scroll, dim when inactive */}
            <div className="flex-1">
              {storyBlocks.map((block, index) => (
                <div
                  key={block.title}
                  ref={setItemRef(index)}
                  className="min-h-[70vh] flex items-center"
                >
                  <div
                    className="py-12"
                    style={{
                      opacity: activeIndex === index ? 1 : 0.2,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                  >
                    <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A] mb-4">
                      {block.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440]">
                      {block.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — sticky photo that crossfades based on active block */}
            <div className="w-[380px] lg:w-[420px] shrink-0">
              <div className="sticky top-[15vh] h-[70vh] flex items-center">
                <div className="relative w-full aspect-[3/4]">
                  {storyBlocks.map((block, index) => (
                    <div
                      key={block.title}
                      className="absolute inset-0 bg-[#F2F0EB] flex items-center justify-center"
                      style={{
                        opacity: activeIndex === index ? 1 : 0,
                        transition: 'opacity 0.6s ease-in-out',
                      }}
                    >
                      <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                        {block.photo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
