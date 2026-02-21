"use client"

import { useState } from "react"
import { MonolineFlower } from "./monoline-flower"
import { PrivacyOverlay } from "./privacy-overlay"
import { LegalOverlay } from "./legal-overlay"

export function SiteFooter() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-[#D5CCBC] py-16 md:py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Top section with flower */}
          <div className="flex justify-center mb-12">
            <MonolineFlower size={48} animate={false} />
          </div>

          {/* Names */}
          <div className="text-center mb-4">
            <span className="text-sm tracking-[0.3em] uppercase text-[#1A1A1A] font-serif">
              Martina & Alessandro
            </span>
          </div>

          {/* Date */}
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
              18 Settembre 2026
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-xs tracking-[0.15em] uppercase text-[#4A4440] font-serif hover:text-[#1A1A1A] transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#D5CCBC]">|</span>
            <button
              onClick={() => setLegalOpen(true)}
              className="text-xs tracking-[0.15em] uppercase text-[#4A4440] font-serif hover:text-[#1A1A1A] transition-colors"
            >
              Legal
            </button>
          </div>
        </div>
      </footer>

      <PrivacyOverlay open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <LegalOverlay open={legalOpen} onClose={() => setLegalOpen(false)} />
    </>
  )
}
