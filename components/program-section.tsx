'use client'

import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { ScrollReveal } from './scroll-reveal'

const timelineItems = [
  {
    time: '16:00',
    title: 'Apertura',
    description:
      'Il momento dei saluti e degli abbracci. Mettete via gli orologi, prendete posto e preparatevi mentalmente alla bellissima e allegra confusione che sta per iniziare.',
  },
  {
    time: '16:30',
    title: 'Cerimonia',
    description:
      'Il momento clou. Meno ingessati possibile, pronti a vivere il grande salto. I fazzoletti per le lacrime di commozione sono ammessi, ma i sorrisi e le risate sono assolutamente obbligatori.',
  },
  {
    time: '17:30',
    title: 'Cocktail',
    description:
      "Si rompono le righe. Spritz alla mano, chiacchiere in libertà e l'atmosfera perfetta per sciogliere la tensione e iniziare ufficialmente i festeggiamenti.",
  },
  {
    time: '19:30',
    title: 'Cena',
    description:
      'Ci si accomoda a tavola per ricaricare le energie. Promettiamo ottima compagnia, discorsi emozionanti e, soprattutto, tantissimi brindisi per celebrare insieme questo traguardo speciale.',
  },
  {
    time: '22:00',
    title: 'Festa',
    description:
      "Da qui in poi le formalità non valgono più. Togliete i tacchi, allentate le cravatte e preparatevi a scendere in pista: la serata è tutta da ballare fino all' ultimo respiro.",
  },
]

const COUNT = timelineItems.length

export function ProgramSection() {
  const programmaRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: programmaRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(Math.round(v * (COUNT - 1)), COUNT - 1))
  })

  return (
    <section className="min-h-[100svh] py-16 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        {/* Mobile: stacked layout (no sticky) */}
        <div className="md:hidden">
          <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-16 md:mb-20">
              Il programma
            </h2>
          </ScrollReveal>

          <MobileTimeline />
        </div>

        {/*
         * Desktop: scrollytelling — 3-column grid.
         * Left: sticky description panel (fades between items).
         * Center: vertical dot timeline (auto-width, sized to dot wrapper).
         * Right: scrolling time + title per item.
         * Height = COUNT × 100vh so every item gets one viewport of scroll space.
         */}
        <div className="hidden md:block">
          <ScrollReveal translateY={20} start={0} end={0.35} effect="slide">
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-16 md:mb-20">
              Il programma
            </h2>
          </ScrollReveal>

          <div
            ref={programmaRef}
            className="relative grid"
            style={{ height: `${COUNT * 100}vh`, gridTemplateColumns: '1fr auto 1fr' }}
          >
            {/* LEFT — sticky description, fades between active items */}
            <div className="sticky top-0 h-screen self-start">
              <div className="h-full flex items-center justify-center px-8 lg:px-16">
                <div className="relative w-full max-w-xs">
                  {/* Invisible placeholder preserves height from the longest description */}
                  <p className="opacity-0 select-none pointer-events-none text-base md:text-lg leading-relaxed font-serif">
                    {timelineItems[0].description}
                  </p>
                  {timelineItems.map((item, i) => (
                    <motion.p
                      key={item.time}
                      animate={{ opacity: activeIndex === i ? 1 : 0 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute inset-0 text-base md:text-lg leading-relaxed font-serif text-[#4A4440]"
                    >
                      {item.description}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER — vertical line + dots */}
            <div className="relative flex flex-col items-center w-5">
              <div
                className="absolute top-[50vh] bottom-[50vh] w-px bg-[#D5CCBC]"
                aria-hidden="true"
              />
              {timelineItems.map((item, i) => (
                <div
                  key={item.time}
                  className="h-screen flex items-center justify-center relative z-10"
                >
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full"
                    animate={{ backgroundColor: activeIndex === i ? '#8E9E8C' : '#D5CCBC' }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              ))}
            </div>

            {/* RIGHT — time + title, one per scroll step */}
            <div className="flex flex-col">
              {timelineItems.map((item, i) => (
                <div key={item.time} className="h-screen flex items-center pl-8">
                  <motion.div
                    animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1 block">
                      {item.time}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A]">
                      {item.title}
                    </h3>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Mobile-only stacked timeline (text only, no images) */
function MobileTimeline() {
  return (
    <div className="flex flex-col gap-16">
      {timelineItems.map((item) => (
        <ScrollReveal
          key={item.time}
          translateY={14}
          start={0}
          end={0.35}
          offset={0.1}
          effect="slide"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1 block">
            {item.time}
          </span>
          <h3 className="text-2xl font-serif font-normal text-[#1A1A1A] mb-1">{item.title}</h3>
          <p className="text-base font-serif text-[#4A4440]">{item.description}</p>
        </ScrollReveal>
      ))}
    </div>
  )
}
