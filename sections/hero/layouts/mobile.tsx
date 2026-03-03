import { MonolineFlower } from '@/components/monoline-flower'

interface HeroMobileProps {
  loaded: boolean
  combined: string
  onFlowerClick?: () => void
}

export function HeroMobile({ loaded, combined, onFlowerClick }: HeroMobileProps) {
  return (
    <div className="flex md:hidden flex-col items-center gap-10 w-full">
      <div
        data-animate
        className={`transition-opacity duration-[2800ms] ease-in-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MonolineFlower
          size={160}
          animate={true}
          showThread={false}
          onClick={onFlowerClick}
          ariaLabel="Cambia tema"
        />
      </div>

      <h1
        data-animate
        className={`font-serif text-foreground uppercase tracking-[0.2em] text-xl text-center transition-all duration-[1200ms] delay-300 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
        style={{
          fontWeight: 400,
          lineHeight: 1.4,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {combined}
      </h1>
    </div>
  )
}
