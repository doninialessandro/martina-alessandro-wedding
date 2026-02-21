"use client"

import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { BeginningsSection, CreativitySection, NewGenerationSection } from "@/components/story-sections"
import { PlatformSections } from "@/components/platform-sections"
import { FirstProjectSection } from "@/components/first-project-section"
import { ContactSection } from "@/components/contact-section"
import { ShareSection } from "@/components/share-section"
import { SiteFooter } from "@/components/site-footer"
import { ThreadLine } from "@/components/thread-line"

export default function Home() {
  return (
    <main className="relative bg-[#FAF9F6] text-[#1A1A1A] overflow-x-hidden">
      <SiteHeader />
      <HeroSection />

      {/* Continuous thread flowing through sections */}
      <ThreadLine />
      <BeginningsSection />
      <ThreadLine />
      <CreativitySection />
      <ThreadLine />
      <NewGenerationSection />
      <ThreadLine />

      {/* Platform components */}
      <PlatformSections />

      {/* First project */}
      <FirstProjectSection />

      {/* Contact */}
      <ThreadLine />
      <ContactSection />

      {/* Share */}
      <ShareSection />

      {/* Footer */}
      <SiteFooter />
    </main>
  )
}
