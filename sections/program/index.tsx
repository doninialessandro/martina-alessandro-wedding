'use client'

import copy from './copy.json'
import { ProgramDesktop } from './layouts/desktop'
import { ProgramMobile } from './layouts/mobile'
import { useSectionData } from './use-section-data'

export function ProgramSection() {
  const { programmaRef, activeIndex } = useSectionData(copy.items.length)

  return (
    <section className="min-h-[100svh] pt-8 pb-16 px-8 sm:px-12 md:px-16">
      <ProgramMobile sectionTitle={copy.sectionTitle} items={copy.items} />
      <ProgramDesktop
        sectionTitle={copy.sectionTitle}
        items={copy.items}
        programmaRef={programmaRef}
        activeIndex={activeIndex}
      />
    </section>
  )
}
