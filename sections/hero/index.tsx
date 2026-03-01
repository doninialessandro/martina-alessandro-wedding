'use client'

import { ParallaxFade } from '@/components/scroll-reveal'
import { Countdown } from './components/countdown'
import copy from './copy.json'
import { HeroDesktop } from './layouts/desktop'
import { HeroMobile } from './layouts/mobile'
import { useSectionData } from './use-section-data'

export function HeroSection() {
  const { loaded, days, hours, minutes } = useSectionData()

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-8 sm:px-12 md:px-16 py-16">
      <ParallaxFade speed={0.5} className="w-full max-w-[1000px]">
        <HeroDesktop loaded={loaded} person1={copy.names.person1} person2={copy.names.person2} />
        <HeroMobile loaded={loaded} combined={copy.names.combined} />
      </ParallaxFade>
      <Countdown
        loaded={loaded}
        days={days}
        hours={hours}
        minutes={minutes}
        dateLabel={copy.date}
        labels={copy.countdown}
      />
    </section>
  )
}
