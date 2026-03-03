'use client'

import { motion } from 'motion/react'
import type { RefObject } from 'react'
import { ScrollReveal } from '@/components/scroll-reveal'

export interface ProgramItem {
  time: string
  title: string
  description: string
}

const TRANSITION = { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } as const
const TRANSITION_FAST = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } as const

interface ProgramDesktopProps {
  sectionTitle: string
  items: ProgramItem[]
  programmaRef: RefObject<HTMLDivElement | null>
  activeIndex: number
}

export function ProgramDesktop({
  sectionTitle,
  items,
  programmaRef,
  activeIndex,
}: ProgramDesktopProps) {
  const COUNT = items.length

  return (
    <div className="hidden md:block" data-nojs-hide>
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal translateY={20} start={0} end={0.35} effect="slide">
          <h2 className="text-sm tracking-[0.3em] uppercase text-accent font-serif text-center mb-20 md:mb-24">
            {sectionTitle}
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
            {items.map((item, i) => (
              <div key={item.time} className="h-[80vh] flex items-center justify-end pr-6 lg:pr-10">
                {i % 2 === 0 && (
                  <motion.div
                    animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
                    transition={TRANSITION}
                    className="text-right"
                  >
                    <span className="text-sm tracking-[0.2em] uppercase text-accent font-serif mb-1 block">
                      {item.time}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-normal text-foreground">
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
                    {items[1].description}
                  </p>
                  {items.map((item, i) =>
                    i % 2 === 1 ? (
                      <motion.p
                        key={item.time}
                        animate={{ opacity: activeIndex === i ? 1 : 0 }}
                        transition={TRANSITION_FAST}
                        className="absolute inset-0 text-base md:text-lg leading-relaxed font-serif text-muted-foreground text-right"
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

        {/* CENTER COLUMN — vertical line + animated dots */}
        <div className="relative flex flex-col items-center w-5">
          <div className="absolute top-[40vh] bottom-[40vh] w-px bg-border" aria-hidden="true" />
          {items.map((item, i) => (
            <div
              key={item.time}
              className="h-[80vh] flex items-center justify-center relative z-10"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-700 ${
                  activeIndex === i ? 'bg-accent' : 'bg-border'
                }`}
              />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN — ODD titles (scrolling) + EVEN descriptions (sticky overlay) */}
        <div className="relative">
          {/* Scrolling titles for ODD items */}
          <div className="flex flex-col">
            {items.map((item, i) => (
              <div key={item.time} className="h-[80vh] flex items-center pl-6 lg:pl-10">
                {i % 2 === 1 && (
                  <motion.div
                    animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
                    transition={TRANSITION}
                  >
                    <span className="text-sm tracking-[0.2em] uppercase text-accent font-serif mb-1 block">
                      {item.time}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-normal text-foreground">
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
                    {items[0].description}
                  </p>
                  {items.map((item, i) =>
                    i % 2 === 0 ? (
                      <motion.p
                        key={item.time}
                        animate={{ opacity: activeIndex === i ? 1 : 0 }}
                        transition={TRANSITION_FAST}
                        className="absolute inset-0 text-base md:text-lg leading-relaxed font-serif text-muted-foreground text-left"
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
  )
}
