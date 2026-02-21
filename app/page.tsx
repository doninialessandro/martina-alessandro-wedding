import { HeroSection } from "@/components/hero-section"
import { OurStorySection } from "@/components/our-story-section"
import { ProgramSection } from "@/components/program-section"
import { LocationSection } from "@/components/location-section"
import { RsvpSection } from "@/components/rsvp-section"
import { ListaNozzeSection } from "@/components/lista-nozze-section"
import { SiteFooter } from "@/components/site-footer"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
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
