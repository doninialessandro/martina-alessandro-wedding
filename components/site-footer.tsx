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
      <footer className="border-t border-[#E0DCD5] py-16 md:py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Top section with flower */}
          <div className="flex justify-center mb-12">
            <MonolineFlower size={48} animate={false} color="#C4A882" />
          </div>

          {/* Logo */}
          <div className="text-center mb-10">
            <span className="text-sm tracking-[0.3em] uppercase text-[#1A1A1A] font-serif">
              Solomei AI
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B] font-serif hover:text-[#1A1A1A] transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#E0DCD5]">|</span>
            <button
              onClick={() => setLegalOpen(true)}
              className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B] font-serif hover:text-[#1A1A1A] transition-colors"
            >
              Legal
            </button>
            <span className="text-[#E0DCD5]">|</span>
            <a
              href="mailto:more@solomei.ai"
              className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B] font-serif hover:text-[#1A1A1A] transition-colors"
            >
              more@solomei.ai
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-[#6B6B6B] font-serif tracking-wide">
            Solomei AI S.r.l. — Piazzetta dei Sapienti 1, 06073 Solomeo, Perugia
          </p>
        </div>
      </footer>

      <PrivacyOverlay open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <LegalOverlay open={legalOpen} onClose={() => setLegalOpen(false)} />
    </>
  )
}
