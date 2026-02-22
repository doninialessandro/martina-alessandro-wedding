'use client'

import { useEffect, useState } from 'react'
import { MonolineFlower } from './monoline-flower'
import { ParallaxFade } from './scroll-reveal'

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calc() {
      const now = Date.now()
      const diff = targetDate.getTime() - now
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }
    setTimeLeft(calc())
    const interval = setInterval(() => setTimeLeft(calc()), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const weddingDate = new Date('2026-09-18T16:00:00+02:00')
  const { days, hours, minutes, seconds } = useCountdown(weddingDate)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-16">
      <ParallaxFade speed={0.5} className="w-full max-w-[1000px]">
        {/* Desktop: side-by-side row */}
        <div className="hidden md:flex items-center justify-center gap-12 lg:gap-16">
          <h1
            className={`text-[#0E0E0E] text-3xl lg:text-4xl xl:text-5xl transition-all duration-[2000ms] ease-in-out ${
              loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            style={{
              fontFamily: 'var(--font-great-vibes), cursive',
              fontWeight: 400,
              lineHeight: 1.1,
              textAlign: 'right',
              flex: '1 1 0%',
            }}
          >
            Martina
          </h1>

          <div
            className={`shrink-0 transition-opacity duration-[2800ms] ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <MonolineFlower size={220} animate={true} showThread={false} />
          </div>

          <h1
            className={`font-serif text-[#1A1A1A] uppercase tracking-[0.2em] text-xl lg:text-2xl xl:text-3xl transition-all duration-[2000ms] ease-in-out delay-300 ${
              loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            style={{ fontWeight: 400, lineHeight: 1.1, textAlign: 'left', flex: '1 1 0%' }}
          >
            Alessandro
          </h1>
        </div>

        {/* Mobile: flower on top, names stacked below */}
        <div className="flex md:hidden flex-col items-center gap-10 w-full">
          <div
            className={`transition-opacity duration-[2800ms] ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <MonolineFlower size={160} animate={true} showThread={false} />
          </div>

          <h1
            className={`font-serif text-[#1A1A1A] uppercase tracking-[0.2em] text-xl text-center transition-all duration-[2000ms] ease-in-out delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ fontWeight: 400, lineHeight: 1.4 }}
          >
            Martina & Alessandro
          </h1>
        </div>
      </ParallaxFade>

      {/* Countdown — bottom-right, small and light */}
      <div
        className={`absolute bottom-8 right-8 sm:bottom-10 sm:right-10 md:bottom-12 md:right-12 flex flex-col items-start transition-opacity duration-[2800ms] ease-in-out delay-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-1.5">
          18 Settembre 2026
        </p>
        <div className="flex items-start gap-2 sm:gap-2.5 font-serif text-[#4A4440]">
          <span className="flex flex-col items-center">
            <span className="text-xs tabular-nums leading-none">
              {String(days).padStart(2, '0')}
            </span>
            <span className="text-[6px] sm:text-[7px] uppercase tracking-[0.1em] text-[#8E9E8C] mt-0.5">
              giorni
            </span>
          </span>
          <span className="flex flex-col items-center">
            <span className="text-xs tabular-nums leading-none">
              {String(hours).padStart(2, '0')}
            </span>
            <span className="text-[6px] sm:text-[7px] uppercase tracking-[0.1em] text-[#8E9E8C] mt-0.5">
              ore
            </span>
          </span>
          <span className="flex flex-col items-center">
            <span className="text-xs tabular-nums leading-none">
              {String(minutes).padStart(2, '0')}
            </span>
            <span className="text-[6px] sm:text-[7px] uppercase tracking-[0.1em] text-[#8E9E8C] mt-0.5">
              min
            </span>
          </span>
          <span className="flex flex-col items-center">
            <span className="text-xs tabular-nums leading-none">
              {String(seconds).padStart(2, '0')}
            </span>
            <span className="text-[6px] sm:text-[7px] uppercase tracking-[0.1em] text-[#8E9E8C] mt-0.5">
              sec
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
