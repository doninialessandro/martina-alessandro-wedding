"use client"

import { HeroSection } from "@/components/hero-section"
import { BeginningsSection, CreativitySection, NewGenerationSection } from "@/components/story-sections"
import { PlatformSections } from "@/components/platform-sections"
import { FirstProjectSection } from "@/components/first-project-section"
import { ContactSection } from "@/components/contact-section"
import { ShareSection } from "@/components/share-section"
import { SiteFooter } from "@/components/site-footer"
import { FlowingThread } from "@/components/flowing-thread"

export default function Home() {
  return (
    <main className="relative bg-[#FAF9F6] text-[#1A1A1A] overflow-x-hidden">

      {/* Single continuous flowing line behind all content */}
      <FlowingThread />

      {/* All sections — z-index above the thread */}
      <div className="relative" style={{ zIndex: 2 }}>
        <HeroSection />
        <BeginningsSection />
        <CreativitySection />
        <NewGenerationSection />
        <PlatformSections />
        <FirstProjectSection />
        <ContactSection />
        <ShareSection />
        <SiteFooter />
      </div>
    </main>
  )
}
