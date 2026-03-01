'use client'

import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { MonolineFlower } from '@/components/monoline-flower'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ProgramModal } from '../components/modal'
import type { ProgramItem } from './desktop'

interface ProgramMobileProps {
  sectionTitle: string
  items: ProgramItem[]
}

export function ProgramMobile({ sectionTitle, items }: ProgramMobileProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <div className="md:hidden max-w-[1100px] mx-auto" data-nojs-show>
      <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
        <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20">
          {sectionTitle}
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Vertical line — spans only between the first and last dots */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[20vh] bottom-[20vh] w-px bg-[#D5CCBC]"
          aria-hidden="true"
        />

        {items.map((item, i) => (
          <ScrollReveal
            key={item.time}
            translateY={14}
            start={0}
            end={0.35}
            offset={0.1}
            effect="slide"
          >
            <button
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
          </ScrollReveal>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem !== null && (
          <ProgramModal item={items[selectedItem]} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
