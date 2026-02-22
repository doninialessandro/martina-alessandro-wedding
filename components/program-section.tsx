'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { MonolineFlower } from './monoline-flower'
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

const TRANSITION = { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } as const

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
    <section className="min-h-[100svh] pt-8 pb-16 px-8 sm:px-12 md:px-16">
      {/* Mobile: vertical dot timeline with clickable modal */}
      <div className="md:hidden max-w-[1100px] mx-auto">
        <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-16">
            Il programma
          </h2>
        </ScrollReveal>

        <MobileTimeline />
      </div>

      {/*
       * Desktop: scrollytelling — 3-column grid (1fr auto 1fr).
       * Each side column contains both scrolling titles and a sticky description
       * overlay, using the same padding from center for both content types.
       * Left (1fr):  EVEN titles (scrolling) + ODD descriptions (sticky)
       * Center (auto): vertical line + animated dots
       * Right (1fr): ODD titles (scrolling) + EVEN descriptions (sticky)
       * Height = COUNT × 100vh so every item gets one viewport of scroll space.
       */}
      <div className="hidden md:block">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal translateY={20} start={0} end={0.35} effect="slide">
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-16 md:mb-10">
              Il programma
            </h2>
          </ScrollReveal>
        </div>

        <div
          ref={programmaRef}
          className="relative grid"
          style={{ height: `${COUNT * 80}vh`, gridTemplateColumns: '1fr auto 1fr' }}
        >
          {/* LEFT COLUMN — EVEN titles (scrolling) + ODD descriptions (sticky overlay) */}
          <div className="relative">
            {/* Scrolling titles for EVEN items */}
            <div className="flex flex-col">
              {timelineItems.map((item, i) => (
                <div
                  key={item.time}
                  className="h-[80vh] flex items-center justify-end pr-6 lg:pr-10"
                >
                  {i % 2 === 0 && (
                    <motion.div
                      animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
                      transition={TRANSITION}
                      className="text-right"
                    >
                      <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1 block">
                        {item.time}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A]">
                        {item.title}
                      </h3>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            {/* Sticky description overlay for ODD items */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="sticky top-0 h-[80vh]">
                <div className="h-full flex items-center justify-end pr-6 lg:pr-10">
                  <div className="relative w-full max-w-md">
                    <p className="opacity-0 select-none pointer-events-none text-base md:text-lg leading-relaxed font-serif text-right">
                      {timelineItems[1].description}
                    </p>
                    {timelineItems.map((item, i) =>
                      i % 2 === 1 ? (
                        <motion.p
                          key={item.time}
                          animate={{ opacity: activeIndex === i ? 1 : 0 }}
                          transition={TRANSITION}
                          className="absolute inset-0 text-base md:text-lg leading-relaxed font-serif text-[#4A4440] text-right"
                        >
                          {item.description}
                        </motion.p>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>

          {/* CENTER COLUMN — vertical line + animated dots */}
          <div className="relative flex flex-col items-center w-5">
            <div
              className="absolute top-[40vh] bottom-[40vh] w-px bg-[#D5CCBC]"
              aria-hidden="true"
            />
            {timelineItems.map((item, i) => (
              <div
                key={item.time}
                className="h-[80vh] flex items-center justify-center relative z-10"
              >
                <motion.div
                  className="w-2.5 h-2.5 rounded-full"
                  animate={{ backgroundColor: activeIndex === i ? '#8E9E8C' : '#D5CCBC' }}
                  transition={TRANSITION}
                />
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN — ODD titles (scrolling) + EVEN descriptions (sticky overlay) */}
          <div className="relative">
            {/* Scrolling titles for ODD items */}
            <div className="flex flex-col">
              {timelineItems.map((item, i) => (
                <div key={item.time} className="h-[80vh] flex items-center pl-6 lg:pl-10">
                  {i % 2 === 1 && (
                    <motion.div
                      animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
                      transition={TRANSITION}
                    >
                      <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif mb-1 block">
                        {item.time}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A]">
                        {item.title}
                      </h3>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            {/* Sticky description overlay for EVEN items */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="sticky top-0 h-[80vh]">
                <div className="h-full flex items-center pl-6 lg:pl-10">
                  <div className="relative w-full max-w-md">
                    <p className="opacity-0 select-none pointer-events-none text-base md:text-lg leading-relaxed font-serif text-left">
                      {timelineItems[0].description}
                    </p>
                    {timelineItems.map((item, i) =>
                      i % 2 === 0 ? (
                        <motion.p
                          key={item.time}
                          animate={{ opacity: activeIndex === i ? 1 : 0 }}
                          transition={TRANSITION}
                          className="absolute inset-0 text-base md:text-lg leading-relaxed font-serif text-[#4A4440] text-left"
                        >
                          {item.description}
                        </motion.p>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Spring modal for mobile — shown when a timeline dot is tapped */
function ProgramModal({ item, onClose }: { item: (typeof timelineItems)[0]; onClose: () => void }) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal — spring scale + slide up */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 bg-[#FDFCFA] p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4A4440] font-serif text-lg"
        >
          ✕
        </button>
        <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif block mb-1">
          {item.time}
        </span>
        <h3 className="text-2xl font-serif font-normal text-[#1A1A1A] mb-4">{item.title}</h3>
        <p className="text-base font-serif text-[#4A4440] leading-relaxed">{item.description}</p>
      </motion.div>
    </>
  )
}

/** Mobile-only vertical dot timeline with clickable dots that open a spring modal */
function MobileTimeline() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <>
      <div className="relative">
        {/* Vertical line — spans only between the first and last dots */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[20vh] bottom-[20vh] w-px bg-[#D5CCBC]"
          aria-hidden="true"
        />

        {timelineItems.map((item, i) => (
          <button
            key={item.time}
            type="button"
            onClick={() => setSelectedItem(i)}
            className="relative h-[40vh] flex items-center w-full"
          >
            {i % 2 === 0 ? (
              /* Even — text LEFT, flower RIGHT */
              <>
                <div className="w-1/2 pr-6 text-right">
                  <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif block">
                    {item.time}
                  </span>
                  <span className="text-2xl font-serif text-[#1A1A1A]">{item.title}</span>
                </div>
                <div className="w-1/2 pl-2 flex items-center">
                  <MonolineFlower size={50} animate showThread={false} />
                </div>
              </>
            ) : (
              /* Odd — flower LEFT, text RIGHT */
              <>
                <div className="w-1/2 pr-2 flex items-center justify-end">
                  <MonolineFlower size={50} animate showThread={false} />
                </div>
                <div className="w-1/2 pl-6 text-left">
                  <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif block">
                    {item.time}
                  </span>
                  <span className="text-2xl font-serif text-[#1A1A1A]">{item.title}</span>
                </div>
              </>
            )}
            {/* Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8E9E8C] z-10" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem !== null && (
          <ProgramModal item={timelineItems[selectedItem]} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
