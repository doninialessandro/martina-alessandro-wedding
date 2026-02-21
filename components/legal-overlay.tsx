"use client"

import { useEffect } from "react"

interface LegalOverlayProps {
  open: boolean
  onClose: () => void
}

export function LegalOverlay({ open, onClose }: LegalOverlayProps) {
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
      <div
        className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[85vh] mx-4 bg-[#FAF9F6] overflow-y-auto overlay-scrollbar animate-fade-in-up">
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          aria-label="Close legal information"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#1A1A1A] mb-8">
            Legal
          </h2>
          <div className="space-y-6 text-sm leading-relaxed text-[#6B6B6B] font-serif">
            <p>
              Solomei AI S.r.l., incorporated on July 12, 2024, in Corciano (PG), hamlet of Solomeo, Viale Parco dell&apos;Industria n. 5, by Dr. Francesco Ansidei di Catrano, Notary in Perugia, registered in the Notarial District of the same city.
            </p>
            <p>Registered office: Piazzetta dei Sapienti 1, 06073 Solomeo, Perugia</p>
            <p>Operational office: Via Morimondo 23, 20143 Milan</p>
            <p>
              The Company operates in the field of artificial intelligence, engaging in research, development, production, and commercialization of innovative technological platforms based on artificial intelligence. It provides advanced tools for designing, creating, integrating, and managing websites and digital applications for businesses, brands, technological partners, consultancy firms, independent developers, and designers. Additionally, it develops solutions to enhance content usability and accessibility, significantly enriching the end-user experience.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A] mt-12 mb-8">
            Terms and Conditions of Use
          </h2>
          <div className="space-y-6 text-sm leading-relaxed text-[#6B6B6B] font-serif">
            <h3 className="text-lg font-serif text-[#1A1A1A] pt-2">1. Scope and Effectiveness</h3>
            <p>
              Solomei AI S.r.l. with registered office at Piazzetta dei Sapienti no. 1, hamlet of Solomeo, Corciano, Italy, ZIP code 06073, VAT No. 03950820542 regulates the access to and use of the website www.solomei.ai.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-2">2. Website Activities</h3>
            <p>
              When browsing the Website, the User may ask for contacts, information and details on the activities and services provided by the Owner.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-2">3. Website Content and Intellectual Property</h3>
            <p>
              All Website Content is property of Solomei AI or its assignors and is protected under intellectual property applicable laws.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-2">4. Third-Party Content</h3>
            <p>
              The Owner does not have any control over Third-Party Content and assumes no responsibility for its accuracy, security, or reliability.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-2">5. Warranties</h3>
            <p>
              The Website and Content are provided on an &quot;as is&quot; basis, to the extent and in the manner in which they are available.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-2">6. Limitation of Liability</h3>
            <p>
              Solomei AI shall in no event be liable to Users or any third party for any damage or loss resulting from the use of the Website, subject to mandatory limitations of applicable laws.
            </p>

            <h3 className="text-lg font-serif text-[#1A1A1A] pt-2">7. Contacts</h3>
            <p>
              Solomei AI S.r.l. — Piazzetta dei Sapienti no. 1, hamlet of Solomeo, Corciano, Italy, ZIP code 06073. VAT number 03950820542.
            </p>
            <p>
              E-mail: more@solomei.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
