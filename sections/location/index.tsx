import { ScrollReveal } from '@/components/scroll-reveal'
import { VenueMap } from './components/venue-map'
import copy from './copy.json'

const IMAGE_URL =
  'https://cdn0.matrimonio.com/vendor/5512/3_2/1280/jpeg/b3eec765-ed46-4a59-b18f-907b0710d8fb_2_15512-164931398289049.webp'

export function LocationSection() {
  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center px-8 pt-8 pb-16 sm:px-12 md:px-16">
      <div className="mx-auto max-w-[1100px]">
        {/* Title */}
        <ScrollReveal translateY={20} start={0} end={0.35} effect="slide">
          <h2 className="mb-16 text-center font-serif text-accent text-sm uppercase tracking-[0.3em] md:mb-20">
            {copy.sectionTitle}
          </h2>
        </ScrollReveal>

        {/* Full-width large image */}
        <ScrollReveal className="mb-20 md:mb-24" translateY={0} start={0} end={0.35} effect="slide">
          <div className="w-full aspect-[16/9] relative overflow-hidden rounded-[16px] shadow-subtle">
            {/* biome-ignore lint/performance/noImgElement: decorative venue photo */}
            <img
              src={IMAGE_URL}
              alt={copy.venue.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Two-column grid: text left, map right */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          {/* Left: text */}
          <ScrollReveal translateY={18} start={0} end={0.45} offset={0.1} effect="slide">
            <h3 className="mb-4 font-normal font-serif text-2xl text-foreground md:text-3xl">
              {copy.venue.name}
            </h3>
            <p className="mb-6 font-serif text-accent text-sm uppercase tracking-[0.1em]">
              {copy.venue.address}
            </p>
            <p className="font-serif text-muted-foreground text-base leading-relaxed md:text-lg">
              {copy.venue.description}
            </p>
          </ScrollReveal>

          {/* Right: map */}
          <ScrollReveal
            className="w-full"
            translateY={24}
            start={0}
            end={0.5}
            offset={0.1}
            effect="slide"
          >
            <VenueMap venueName={copy.venue.name} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
