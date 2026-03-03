import { ScrollReveal } from '@/components/scroll-reveal'
import { StoryPhoto } from '../components/story-photo'
import type { Story } from './desktop'

interface OurStoryMobileProps {
  sectionTitle: string
  stories: Story[]
}

export function OurStoryMobile({ sectionTitle, stories }: OurStoryMobileProps) {
  return (
    <div className="md:hidden">
      <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
        <h2 className="text-sm tracking-[0.3em] uppercase text-accent font-serif text-center mb-20">
          {sectionTitle}
        </h2>
      </ScrollReveal>

      <div className="flex flex-col gap-24">
        {stories.map((block) => (
          <div key={block.title}>
            <ScrollReveal translateY={14} start={0} end={0.35} offset={0.1} effect="slide">
              <h3 className="text-2xl font-serif font-normal text-foreground mb-4">
                {block.title}
              </h3>
            </ScrollReveal>
            <ScrollReveal translateY={14} start={0.05} end={0.4} offset={0.1} effect="slide">
              <p className="text-base leading-relaxed font-serif text-muted-foreground mb-8">
                {block.body}
              </p>
            </ScrollReveal>
            <ScrollReveal translateY={18} start={0} end={0.4} offset={0.1} effect="slide">
              <StoryPhoto
                src={block.src}
                alt={block.title}
                photoColor={block.photoColor}
                photoLabel={block.photoLabel}
                className="w-full aspect-[4/5]"
              />
            </ScrollReveal>
          </div>
        ))}
      </div>
    </div>
  )
}
