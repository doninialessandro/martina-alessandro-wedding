'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { NoiseRevealImage } from './noise-reveal-image'
import { ScrollReveal } from './scroll-reveal'

const timelineItems = [
  {
    time: '16:00',
    title: 'Apertura',
    description:
      'Il ritrovo dell’equipaggio. Mettete via le mappe, prendete un drink e preparatevi mentalmente al caos bellissimo che sta per iniziare.',
    photo: 'Foto 1',
    photoColor: '#F2F0EB',
  },
  {
    time: '16:30',
    title: 'Cerimonia',
    description:
      'Il momento clou. Meno ingessati possibile, pronti a fare il grande salto. Fazzoletti ammessi, ma le risate sono obbligatorie.',
    photo: 'Foto 2',
    photoColor: '#E8EDE7',
  },
  {
    time: '17:30',
    title: 'Cocktail',
    description:
      'Si rompono le righe. Spritz alla mano, pancia che brontola e il momento perfetto per testare quanto reggete prima del round finale.',
    photo: 'Foto 3',
    photoColor: '#EDE8E4',
  },
  {
    time: '19:30',
    title: 'Cena',
    description:
      'Ora, dicono che qui si mangia di brutto. Non siamo del tutto convinti delle porzioni e speriamo di non dover chiamare la pizza di salvataggio. Ma su una cosa potete stare tranquilli: si berrà senza pietà e nessuno rimarrà sobrio. Brindisi obbligatori per l’equipaggio!',
    photo: 'Foto 4',
    photoColor: '#EAE7E0',
  },
  {
    time: '23:00',
    title: 'Festa',
    description:
      'Le regole non valgono più. Si scende in trincea a fare macello, togliete i tacchi e preparatevi a sudare in pista fino all’ultimo.',
    photo: 'Foto 5',
    photoColor: '#E7ECE6',
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
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        {/* Mobile: stacked layout (no sticky) */}
        <div className="md:hidden">
          <ScrollReveal translateY={18} start={0} end={0.35}>
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-4">
              Il programma
            </h2>
            <p className="text-base font-serif text-[#4A4440] text-center mb-16">
              Villa Castelbarco Pindemonte Rezzonico
            </p>
          </ScrollReveal>

          <MobileTimeline />
        </div>

        {/*
         * Desktop: scrollytelling.
         * h2 + venue name centered above the grid.
         * Grid layout: left column is sticky (photo), right column scrolls (timeline).
         * h-[500vh] = 5 items × 100vh; sticky releases naturally when container exits.
         * self-start prevents grid from stretching the sticky column to 500vh.
         * offset ["start start","end end"]: progress 0→1 over 400vh of effective scroll.
         */}
        <div className="hidden md:block">
          {/* Centered h2 + venue name above scrollytelling */}
          <ScrollReveal translateY={20} start={0} end={0.35}>
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-4">
              Il programma
            </h2>
            <p className="text-base font-serif text-[#4A4440] text-center mb-20">
              Villa Castelbarco Pindemonte Rezzonico
            </p>
          </ScrollReveal>

          <div
            ref={programmaRef}
            className="grid gap-16 lg:gap-24 relative"
            style={{ height: `${COUNT * 100}vh`, gridTemplateColumns: '380px 1fr' }}
          >
            {/* LEFT — sticky photo */}
            <div className="sticky top-0 h-screen self-start flex items-center">
              <div className="relative w-full aspect-[3/4]">
                <AnimatePresence>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <NoiseRevealImage
                      key={activeIndex}
                      background="#FDFCFA"
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backgroundColor: timelineItems[activeIndex]?.photoColor ?? '#F2F0EB',
                        }}
                      >
                        <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                          {timelineItems[activeIndex]?.photo}
                        </span>
                      </div>
                    </NoiseRevealImage>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT — scrolling timeline, centered in the column */}
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col">
                <div
                  className="absolute top-[50vh] bottom-[50vh] w-px bg-[#D5CCBC]"
                  style={{ left: '23.5px' }}
                  aria-hidden="true"
                />

                {timelineItems.map((item, i) => (
                  <div key={item.time} className="h-screen flex items-center">
                    <motion.div
                      className="relative flex items-center gap-6"
                      animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
                      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <div className="relative z-10 shrink-0 w-12 flex justify-center">
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full"
                          animate={{ backgroundColor: activeIndex === i ? '#8E9E8C' : '#D5CCBC' }}
                          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1">
                          {item.time}
                        </span>
                        <h3 className="text-xl md:text-2xl font-serif font-normal text-[#1A1A1A] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm font-serif text-[#4A4440]">{item.description}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Mobile-only stacked timeline with image placeholders */
function MobileTimeline() {
  return (
    <div className="flex flex-col gap-24">
      {timelineItems.map((item) => (
        <div key={item.time}>
          <ScrollReveal translateY={14} start={0} end={0.35} offset={0.1}>
            <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1 block">
              {item.time}
            </span>
            <h3 className="text-2xl font-serif font-normal text-[#1A1A1A] mb-1">{item.title}</h3>
            <p className="text-base font-serif text-[#4A4440] mb-8">{item.description}</p>
          </ScrollReveal>
          <ScrollReveal translateY={18} start={0} end={0.4} offset={0.1} effect="slide">
            <div className="w-full aspect-[4/5] relative bg-[#FDFCFA]">
              <NoiseRevealImage key={item.time} background="#FDFCFA" className="absolute inset-0">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: item.photoColor }}
                >
                  <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                    {item.photo}
                  </span>
                </div>
              </NoiseRevealImage>
            </div>
          </ScrollReveal>
        </div>
      ))}
    </div>
  )
}
