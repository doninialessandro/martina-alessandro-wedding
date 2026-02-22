import { HeroSection } from '@/components/hero-section'
import { ListaNozzeSection } from '@/components/lista-nozze-section'
import { LocationSection } from '@/components/location-section'
import { OurStorySection } from '@/components/our-story-section'
import { ProgramSection } from '@/components/program-section'
import { RsvpSection } from '@/components/rsvp-section'
import { SectionDivider } from '@/components/section-divider'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-background text-foreground">
      <HeroSection />
      <SectionDivider />
      <OurStorySection />
      <SectionDivider />
      <ProgramSection />
      <SectionDivider />
      <LocationSection />
      <SectionDivider />
      <RsvpSection />
      <SectionDivider />
      <ListaNozzeSection />
      <SiteFooter />
    </main>
  )
}
