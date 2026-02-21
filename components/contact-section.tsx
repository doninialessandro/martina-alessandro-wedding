"use client"

import { useState, type FormEvent } from "react"
import { ScrollReveal } from "./scroll-reveal"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!privacyAccepted) return
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-28 md:py-44 px-8 sm:px-12 md:px-16">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal translateY={50} start={0} end={0.3}>
          <h2
            className="text-3xl md:text-5xl font-serif font-normal text-[#1A1A1A] mb-4 text-center"
          >
            {"Let's keep in touch"}
          </h2>
        </ScrollReveal>
        <ScrollReveal translateY={40} start={0.05} end={0.35}>
          <p className="text-base md:text-lg text-[#6B6B6B] font-serif text-center mb-14">
            For more information or inquiries, please feel free to contact us.
          </p>
        </ScrollReveal>

        {submitted ? (
          <ScrollReveal translateY={30} start={0} end={0.3}>
            <div className="text-center py-16">
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-3">
                Thank you for reaching out!
              </h3>
              <p className="text-base text-[#6B6B6B] font-serif">
                Our team will be in contact with you shortly.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal translateY={50} start={0.08} end={0.4}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="firstName" className="block text-xs tracking-[0.2em] uppercase text-[#6B6B6B] font-serif mb-3">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-[#E0DCD5] pb-2 text-[#1A1A1A] font-serif text-base focus:outline-none focus:border-[#C4A882] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs tracking-[0.2em] uppercase text-[#6B6B6B] font-serif mb-3">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-[#E0DCD5] pb-2 text-[#1A1A1A] font-serif text-base focus:outline-none focus:border-[#C4A882] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs tracking-[0.2em] uppercase text-[#6B6B6B] font-serif mb-3">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-[#E0DCD5] pb-2 text-[#1A1A1A] font-serif text-base focus:outline-none focus:border-[#C4A882] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-xs tracking-[0.2em] uppercase text-[#6B6B6B] font-serif mb-3">
                  Organization / Company / Institution
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  className="w-full bg-transparent border-b border-[#E0DCD5] pb-2 text-[#1A1A1A] font-serif text-base focus:outline-none focus:border-[#C4A882] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-[0.2em] uppercase text-[#6B6B6B] font-serif mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-[#E0DCD5] pb-2 text-[#1A1A1A] font-serif text-base focus:outline-none focus:border-[#C4A882] transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={privacyAccepted}
                  onClick={() => setPrivacyAccepted(!privacyAccepted)}
                  className={`mt-1 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${
                    privacyAccepted
                      ? "bg-[#1A1A1A] border-[#1A1A1A]"
                      : "bg-transparent border-[#E0DCD5]"
                  }`}
                >
                  {privacyAccepted && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#FAF9F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <label className="text-sm text-[#6B6B6B] font-serif leading-relaxed">
                  <span className="text-xs tracking-[0.15em] uppercase">Privacy</span>
                  <br />
                  By submitting this form, you agree to our{" "}
                  <button
                    type="button"
                    className="text-[#1A1A1A] border-b border-[#C4A882] hover:opacity-60 transition-opacity"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!privacyAccepted}
                  className={`text-sm tracking-[0.2em] uppercase font-serif border-b pb-0.5 transition-all ${
                    privacyAccepted
                      ? "text-[#1A1A1A] border-[#C4A882] hover:opacity-60 cursor-pointer"
                      : "text-[#E0DCD5] border-[#E0DCD5] cursor-not-allowed"
                  }`}
                >
                  Send
                </button>
              </div>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
