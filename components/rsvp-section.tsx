"use client"

import { useState } from "react"
import { ScrollReveal } from "./scroll-reveal"

export function RsvpSection() {
  const [attending, setAttending] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[480px] mx-auto">

        <ScrollReveal translateY={40} start={0} end={0.35}>
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20 md:mb-28">
            RSVP
          </h2>
        </ScrollReveal>

        {submitted ? (
          <ScrollReveal translateY={20} start={0} end={0.3} effect="slide">
            <div className="text-center">
              <p className="text-xl font-serif text-[#1A1A1A] mb-2">Grazie!</p>
              <p className="text-base font-serif text-[#4A4440]">
                La tua conferma e stata registrata.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal translateY={30} start={0} end={0.4} offset={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">

              {/* Nome e Cognome */}
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3">
                  Nome e Cognome
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors placeholder:text-[#D5CCBC]"
                  placeholder="Mario Rossi"
                />
              </div>

              {/* Numero di persone */}
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3">
                  Numero di persone
                </label>
                <input
                  type="number"
                  min={1}
                  max={2}
                  defaultValue={1}
                  required
                  className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors"
                />
              </div>

              {/* Intolleranze */}
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3">
                  Intolleranze alimentari
                  <span className="normal-case tracking-normal text-[#D5CCBC] ml-2">(facoltativo)</span>
                </label>
                <textarea
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors resize-none placeholder:text-[#D5CCBC]"
                  placeholder="Eventuali allergie o intolleranze"
                />
              </div>

              {/* Conferma presenza */}
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-4">
                  Conferma presenza
                </label>
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`px-6 py-2 text-sm font-serif tracking-[0.15em] uppercase border transition-colors ${
                      attending === true
                        ? "border-[#8E9E8C] bg-[#8E9E8C] text-[#FDFCFA]"
                        : "border-[#D5CCBC] text-[#4A4440] hover:border-[#8E9E8C]"
                    }`}
                  >
                    {"Si"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`px-6 py-2 text-sm font-serif tracking-[0.15em] uppercase border transition-colors ${
                      attending === false
                        ? "border-[#8E9E8C] bg-[#8E9E8C] text-[#FDFCFA]"
                        : "border-[#D5CCBC] text-[#4A4440] hover:border-[#8E9E8C]"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-4 self-start px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCFA] transition-colors"
              >
                Conferma
              </button>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
