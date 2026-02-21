"use client"

import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { BeginningsSection, CreativitySection, NewGenerationSection } from "@/components/story-sections"
import { PlatformSections } from "@/components/platform-sections"
import { FirstProjectSection } from "@/components/first-project-section"
import { ContactSection } from "@/components/contact-section"
import { ShareSection } from "@/components/share-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main className="relative bg-[#FAF9F6] text-[#1A1A1A] overflow-x-hidden">
      <SiteHeader />
      <HeroSection />

      {/* Story / About sections */}
      <div className="relative">
        <div className="flex justify-center">
          <div className="w-px h-24 bg-[#E0DCD5]" />
        </div>
        <BeginningsSection />
        <div className="flex justify-center">
          <div className="w-px h-24 bg-[#E0DCD5]" />
        </div>
        <CreativitySection />
        <div className="flex justify-center">
          <div className="w-px h-24 bg-[#E0DCD5]" />
        </div>
        <NewGenerationSection />
      </div>

      {/* Platform components */}
      <PlatformSections />

      {/* First project */}
      <FirstProjectSection />

      {/* Contact */}
      <div className="flex justify-center">
        <div className="w-px h-24 bg-[#E0DCD5]" />
      </div>
      <ContactSection />

      {/* Share */}
      <ShareSection />

      {/* Footer */}
      <SiteFooter />
    </main>
  )
}
