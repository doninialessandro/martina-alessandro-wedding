'use client'

import { useScrollytelling } from '@/hooks/use-scrollytelling'
import { ScrollReveal } from './scroll-reveal'

const timelineItems = [
  { time: '16:00', title: 'Apertura', description: 'Accoglienza degli ospiti' },
  { time: '16:30', title: 'Cerimonia', description: 'Rito nuziale' },
  { time: '17:30', title: 'Cocktail', description: 'Aperitivo nel parco' },
  { time: '19:30', title: 'Cena', description: 'Cena di gala' },
  { time: '23:00', title: 'Festa', description: 'Cantinone & Taverna' },
]

export function ProgramSection() {
  const { activeIndex, setItemRef } = useScrollytelling(timelineItems.length)

  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        {/* Mobile: stacked layout (no sticky) */}
        <div className="md:hidden">
          <ScrollReveal translateY={18} start={0} end={0.35}>
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-4">
              Il programma
            </h2>
            <p className="text-base font-serif text-[#4A4440] text-center mb-20">
              Villa Castelbarco Pindemonte Rezzonico
            </p>
          </ScrollReveal>

          <MobileTimeline />
        </div>

        {/* Desktop: scrollytelling — sticky title left, timeline scrolls right */}
        <div className="hidden md:flex md:flex-row gap-16 lg:gap-24">
          {/* Left — sticky title */}
          <div className="md:w-[280px] lg:w-[320px] shrink-0">
            <div className="sticky top-[40vh]">
              <ScrollReveal translateY={18} start={0} end={0.35}>
                <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif mb-4">
                  Il programma
                </h2>
                <p className="text-base leading-relaxed font-serif text-[#4A4440]">
                  Villa Castelbarco Pindemonte Rezzonico
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Right — scrolling timeline items with active detection */}
          <div className="flex-1 relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#D5CCBC]" aria-hidden="true" />

            <div className="flex flex-col">
              {timelineItems.map((item, i) => (
                <div key={item.time} ref={setItemRef(i)} className="min-h-[50vh] flex items-center">
                  <div
                    className="relative flex items-start gap-6 pl-0 py-6"
                    style={{
                      opacity: activeIndex === i ? 1 : 0.2,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                  >
                    {/* Dot on the line */}
                    <div className="relative z-10 shrink-0 w-12 flex justify-center pt-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full transition-colors duration-500 ease-in-out"
                        style={{
                          backgroundColor: activeIndex === i ? '#8E9E8C' : '#D5CCBC',
                        }}
                      />
                    </div>

                    {/* Text content */}
                    <div className="flex flex-col">
                      <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1">
                        {item.time}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-normal text-[#1A1A1A] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm font-serif text-[#4A4440]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Mobile-only alternating timeline (no scrollytelling) */
function MobileTimeline() {
  return (
    <div className="relative">
      <div
        className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#D5CCBC]"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-16">
        {timelineItems.map((item, i) => {
          const isLeft = i % 2 === 0
          return (
            <ScrollReveal key={item.time} translateY={14} start={0} end={0.4} offset={0.1}>
              <div className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-x-4">
                {isLeft ? (
                  <div className="flex flex-col items-end text-right pr-1">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1">
                      {item.time}
                    </span>
                    <h3 className="text-xl font-serif font-normal text-[#1A1A1A] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-serif text-[#4A4440]">{item.description}</p>
                  </div>
                ) : (
                  <div />
                )}

                <div className="flex justify-center pt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8E9E8C] relative z-10" />
                </div>

                {!isLeft ? (
                  <div className="flex flex-col items-start text-left pl-1">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1">
                      {item.time}
                    </span>
                    <h3 className="text-xl font-serif font-normal text-[#1A1A1A] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-serif text-[#4A4440]">{item.description}</p>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
