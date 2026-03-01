'use client'

import { ScrollReveal } from '@/components/scroll-reveal'

interface SearchCopy {
  firstNameLabel: string
  lastNameLabel: string
  firstNamePlaceholder: string
  lastNamePlaceholder: string
  submitButton: string
}

interface RsvpSearchFormProps {
  copy: SearchCopy
  firstName: string
  setFirstName: (v: string) => void
  lastName: string
  setLastName: (v: string) => void
  search: () => void
}

export function RsvpSearchForm({
  copy,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  search,
}: RsvpSearchFormProps) {
  return (
    <ScrollReveal translateY={14} start={0} end={0.4} offset={0.1} effect="slide">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          search()
        }}
        className="flex flex-col gap-10"
      >
        <div>
          <label
            htmlFor="rsvp-first-name"
            className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3"
          >
            {copy.firstNameLabel}
          </label>
          <input
            id="rsvp-first-name"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => setFirstName(firstName.trim())}
            className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base md:text-lg font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors placeholder:text-[#D5CCBC]"
            placeholder={copy.firstNamePlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="rsvp-last-name"
            className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3"
          >
            {copy.lastNameLabel}
          </label>
          <input
            id="rsvp-last-name"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => setLastName(lastName.trim())}
            className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base md:text-lg font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors placeholder:text-[#D5CCBC]"
            placeholder={copy.lastNamePlaceholder}
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase rounded-[50px] border border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(142,158,140,0.15)] active:scale-[0.97] transition-all duration-200"
        >
          {copy.submitButton}
        </button>
      </form>
    </ScrollReveal>
  )
}
