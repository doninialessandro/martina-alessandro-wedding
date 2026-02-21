"use client"

import { useEffect } from "react"

interface PrivacyOverlayProps {
  open: boolean
  onClose: () => void
}

export function PrivacyOverlay({ open, onClose }: PrivacyOverlayProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl max-h-[85vh] mx-4 bg-[#F5F0E3] overflow-y-auto overlay-scrollbar animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 flex items-center justify-center text-[#4A4440] hover:text-[#1A1A1A] transition-colors"
          aria-label="Close privacy policy"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#1A1A1A] mb-8">
            Privacy Policy
          </h2>
          <p className="text-sm leading-relaxed text-[#4A4440] font-serif mb-6 italic">
            (Information notice on the processing of personal data pursuant to Articles 13 and 14 of EU Regulation 679/2016)
          </p>
          <div className="space-y-6 text-sm leading-relaxed text-[#4A4440] font-serif">
            <p>
              Solomei AI S.r.l., in its capacity as Data Controller (hereinafter &quot;Solomei&quot; or &quot;Data Controller&quot;) pursuant to EU Regulation 679/2016 (hereinafter &quot;Regulation&quot;), considers privacy and the protection of personal data to be one of the main objectives of its business.
            </p>
            <p>
              This Privacy Policy shall be deemed to have been made for the site www.solomei.ai (hereinafter referred to as the &apos;Site&apos;), and is made pursuant to Articles 13 and 14 of the Regulation, to those who interact with the Site.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">1. Data Controller</h3>
            <p>
              The Data Controller is Solomei AI S.r.l. with registered office in Piazzetta dei Sapienti no. 1, hamlet of Solomeo, Corciano, Italy, ZIP code 06073.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">2. Personal Data Being Processed</h3>
            <p>
              Personal data means any information capable of directly or indirectly identifying a natural person. The Site does not collect any information associated with the user&apos;s identity except for what is strictly necessary for browsing the Site.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">3. Purpose of Processing</h3>
            <p>Your personal data will be processed to allow browsing the Site, manage the Site, provide services, secure the Site, fulfil legal obligations, and respond to your requests for information and contact.</p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">4. Legal Basis</h3>
            <p>Processing is based on Article 6(1)(b) of the Regulation for service provision, Article 6(1)(f) for legitimate interests in security, Article 6(1)(c) for legal compliance, and Article 6(1)(b) for responding to information requests.</p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">5. Recipients of Personal Data</h3>
            <p>Your personal data may be shared with data processors, authorities as required by law, and authorized persons committed to confidentiality.</p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">6. Transfers of Personal Data</h3>
            <p>Some personal data may be shared with recipients outside the European Economic Area in compliance with Articles 44-49 of the Regulation.</p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">7. Retention of Personal Data</h3>
            <p>Personal data for browsing will be kept for the browsing session. Data for legal obligations will be kept as required by law. Data for information requests will be kept as long as strictly necessary.</p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">8. Rights of the Data Subject</h3>
            <p>You have the right to access, rectification, erasure, restriction, and portability of your personal data. You may also object to processing based on legitimate interest.</p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">9. Changes</h3>
            <p>The Data Controller reserves the right to modify this Privacy Policy due to changes in applicable legislation.</p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-4">10. Contacts</h3>
            <p>To exercise your rights, you may write to the Data Controller at the physical address indicated above, or through the dedicated contact.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
