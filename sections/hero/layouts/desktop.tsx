import { MonolineFlower } from '@/components/monoline-flower'

interface HeroDesktopProps {
  loaded: boolean
  person1: string
  person2: string
}

export function HeroDesktop({ loaded, person1, person2 }: HeroDesktopProps) {
  return (
    <div className="hidden md:flex items-center justify-center gap-12 lg:gap-16">
      <h1
        data-animate
        className={`font-serif text-[#1A1A1A] uppercase tracking-[0.2em] text-xl lg:text-2xl xl:text-3xl transition-all duration-[1200ms] ${
          loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
        style={{
          fontWeight: 400,
          lineHeight: 1.1,
          textAlign: 'right',
          flex: '1 1 0%',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {person1}
      </h1>

      <div
        data-animate
        className={`shrink-0 transition-opacity duration-[2800ms] ease-in-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MonolineFlower size={220} animate={true} showThread={false} />
      </div>

      <h1
        data-animate
        className={`font-serif text-[#1A1A1A] uppercase tracking-[0.2em] text-xl lg:text-2xl xl:text-3xl transition-all duration-[1200ms] delay-200 ${
          loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
        style={{
          fontWeight: 400,
          lineHeight: 1.1,
          textAlign: 'left',
          flex: '1 1 0%',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {person2}
      </h1>
    </div>
  )
}
