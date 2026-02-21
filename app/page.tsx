import { HeroSection } from "@/components/hero-section"
import { BeginningsSection, CreativitySection, NewGenerationSection } from "@/components/story-sections"
import { PlatformSections } from "@/components/platform-sections"
import { FirstProjectSection } from "@/components/first-project-section"
import { ContactSection } from "@/components/contact-section"
import { ShareSection } from "@/components/share-section"
import { SiteFooter } from "@/components/site-footer"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <main className="relative bg-[#FAF9F6] text-[#1A1A1A] overflow-x-hidden">
      <HeroSection />
      <SectionDivider />
      <BeginningsSection />
      <SectionDivider />
      <CreativitySection />
      <SectionDivider />
      <NewGenerationSection />
      <SectionDivider />
      <PlatformSections />
      <SectionDivider />
      <FirstProjectSection />
      <SectionDivider />
      <ContactSection />
      <SectionDivider />
      <ShareSection />
      <SiteFooter />
    </main>
  )
}
