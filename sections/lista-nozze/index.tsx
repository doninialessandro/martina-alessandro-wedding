import { ScrollReveal } from '@/components/scroll-reveal'
import copy from './copy.json'

const IMAGE_URL = '/images/lista_nozze/lista_nozze.webp'
const IMAGE_ALT = 'Lista nozze'

export function ListaNozzeSection() {
  return (
    <section className="px-8 pt-8 pb-20 sm:px-12 md:pb-24 md:px-16">
      <div className="mx-auto max-w-[1100px]">
        <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
          <h2 className="mb-20 font-serif text-[#8E9E8C] text-sm uppercase tracking-[0.3em] text-center md:mb-24">
            {copy.sectionTitle}
          </h2>
        </ScrollReveal>

        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal translateY={10} start={0.05} end={0.4} offset={0.1} effect="slide">
            <p className="select-text font-serif text-[#4A4440] text-base tracking-[0.05em] md:text-lg">
              {copy.body}
              <br />
              <br />
              <strong>{copy.iban}</strong>.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          className="mt-20 md:mt-24 max-w-[800px] mx-auto"
          translateY={18}
          start={0}
          end={0.4}
          offset={0.1}
          effect="slide"
        >
          <div className="w-full aspect-[16/9] relative overflow-hidden rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            {/* biome-ignore lint/performance/noImgElement: decorative photo */}
            <img
              src={IMAGE_URL}
              alt={IMAGE_ALT}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
