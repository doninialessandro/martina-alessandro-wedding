import { motion } from 'motion/react'
import type { RefObject } from 'react'
import { ScrollReveal } from '@/components/scroll-reveal'

export interface Story {
  title: string
  body: string
  src: string
  photoColor: string
  photoLabel?: string
}

interface OurStoryDesktopProps {
  sectionTitle: string
  stories: Story[]
  storiaRef: RefObject<HTMLDivElement | null>
  activeIndex: number
}

export function OurStoryDesktop({
  sectionTitle,
  stories,
  storiaRef,
  activeIndex,
}: OurStoryDesktopProps) {
  const COUNT = stories.length

  return (
    <div className="hidden md:block">
      <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
        <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20 md:mb-24">
          {sectionTitle}
        </h2>
      </ScrollReveal>

      <div
        ref={storiaRef}
        className="relative grid gap-16 lg:gap-24"
        style={{ height: `${COUNT * 100}vh`, gridTemplateColumns: '1fr 1fr' }}
      >
        {/* LEFT — text blocks scroll with the page */}
        <div className="flex flex-col">
          {stories.map((block, index) => (
            <div key={block.title} className="h-screen flex items-center">
              <motion.div
                className="py-12"
                animate={{
                  opacity: activeIndex === index ? 1 : 0.3,
                  scale: activeIndex === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A] mb-4">
                  {block.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440]">
                  {block.body}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* RIGHT — sticky photo */}
        <div className="sticky top-0 h-screen self-start flex items-center">
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            {stories.map((block, index) => (
              <motion.div
                key={block.title}
                animate={{ opacity: index === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`absolute inset-0 ${index === activeIndex ? 'z-10' : 'z-0'}`}
              >
                {block.src ? (
                  // biome-ignore lint/performance/noImgElement: decorative wedding photo
                  <img
                    src={block.src}
                    alt={block.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: block.photoColor ?? '#F2F0EB' }}
                  >
                    <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                      {block.photoLabel}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
