'use client'

import copy from './copy.json'
import { OurStoryDesktop } from './layouts/desktop'
import { OurStoryMobile } from './layouts/mobile'
import { useSectionData } from './use-section-data'

const STORY_IMAGES = [
  { src: '/images/our-story/la_nostra_storia.webp', photoColor: 'var(--photo-placeholder)' },
  {
    src: '/images/our-story/viaggi_nel_mondo.webp',
    photoColor: 'var(--photo-placeholder)',
    photoLabel: 'Viaggi',
  },
  {
    src: '/images/our-story/proposta.webp',
    photoColor: 'var(--photo-placeholder)',
    photoLabel: 'Proposta',
  },
  {
    src: '/images/our-story/prossima_destinazione.webp',
    photoColor: 'var(--photo-placeholder)',
    photoLabel: 'Matrimonio',
  },
]

const stories = copy.stories.map((story, i) => ({
  ...story,
  ...STORY_IMAGES[i],
}))

export function OurStorySection() {
  const { storiaRef, activeIndex } = useSectionData(stories.length)

  return (
    <section className="min-h-[100svh] pt-8 pb-16 md:pb-24 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        <OurStoryMobile sectionTitle={copy.sectionTitle} stories={stories} />
        <OurStoryDesktop
          sectionTitle={copy.sectionTitle}
          stories={stories}
          storiaRef={storiaRef}
          activeIndex={activeIndex}
        />
      </div>
    </section>
  )
}
