import { SectionDivider } from '@/components/section-divider'
import { SiteFooter } from '@/sections/footer'
import { HeroSection } from '@/sections/hero'
import { ListaNozzeSection } from '@/sections/lista-nozze'
import { LocationSection } from '@/sections/location'
import { OurStorySection } from '@/sections/our-story'
import { ProgramSection } from '@/sections/program'
import { RsvpSection } from '@/sections/rsvp'

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-background text-foreground">
      <HeroSection />
      <SectionDivider />
      <OurStorySection />
      <SectionDivider />
      <LocationSection />
      <SectionDivider />
      <ProgramSection />
      <SectionDivider />
      <RsvpSection />
      <SectionDivider />
      <ListaNozzeSection />
      <SiteFooter />
    </main>
  )
}
