'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ParallaxFade } from '@/components/scroll-reveal'
import { Typewriter } from '@/components/typewriter'
import { Countdown } from './components/countdown'
import { EmojiBurst } from './components/emoji-burst'
import { ScrollHint } from './components/scroll-hint'
import copy from './copy.json'
import { HeroDesktop } from './layouts/desktop'
import { HeroMobile } from './layouts/mobile'
import { useSectionData } from './use-section-data'

export function HeroSection() {
  const { loaded, showScrollHint, days, hours, minutes } = useSectionData()
  const clickCount = useRef(0)
  const burstTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [burstEmoji, setBurstEmoji] = useState<string | null>(null)

  useEffect(() => {
    return () => clearTimeout(burstTimer.current)
  }, [])

  const onFlowerClick = useCallback(() => {
    clickCount.current++
    if (clickCount.current >= 5) {
      clickCount.current = 0
      clearTimeout(burstTimer.current)
      const root = document.documentElement
      const isDark = root.getAttribute('data-theme') === 'dark'
      if (isDark) {
        root.removeAttribute('data-theme')
        setBurstEmoji('❤️')
      } else {
        root.setAttribute('data-theme', 'dark')
        setBurstEmoji('👻')
      }
      burstTimer.current = setTimeout(() => setBurstEmoji(null), 3_000)
    }
  }, [])

  const onScrollHintClick = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-8 sm:px-12 md:px-16 py-16">
      <ParallaxFade speed={0.5} className="w-full max-w-[1000px]">
        <HeroDesktop
          loaded={loaded}
          person1={copy.names.person1}
          person2={copy.names.person2}
          onFlowerClick={onFlowerClick}
        />
        <HeroMobile loaded={loaded} combined={copy.names.combined} onFlowerClick={onFlowerClick} />
        {loaded && (
          <Typewriter
            text={`\u201C${copy.quote}\u201D`}
            className="mt-6 text-center text-sm italic text-muted-foreground font-serif tracking-wide"
            delay={2}
          />
        )}
      </ParallaxFade>
      <Countdown
        loaded={loaded}
        days={days}
        hours={hours}
        minutes={minutes}
        dateLabel={copy.date}
        labels={copy.countdown}
      />
      <ScrollHint visible={showScrollHint} onClick={onScrollHintClick} />
      {burstEmoji && <EmojiBurst emoji={burstEmoji} />}
    </section>
  )
}
