'use client'

import { ScrollReveal } from '@/components/scroll-reveal'
import { RsvpMemberSelect } from './components/member-select'
import { RsvpSearchForm } from './components/search-form'
import { RsvpStatusView } from './components/status-view'
import copy from './copy.json'
import { useSectionData } from './use-section-data'

export function RsvpSection() {
  const rsvp = useSectionData()

  return (
    <section className="min-h-[100svh] flex flex-col pt-8 pb-16 px-8 sm:px-12 md:px-16">
      <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
        <h2 className="text-sm tracking-[0.3em] uppercase text-accent font-serif text-center mb-20 md:mb-24">
          {copy.sectionTitle}
        </h2>
      </ScrollReveal>

      <noscript>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-serif text-muted-foreground leading-relaxed max-w-md mx-auto">
            {copy.noJs.message}
          </p>
        </div>
      </noscript>

      <div className="flex-1 flex flex-col items-center justify-center" data-nojs-hide>
        <div className="max-w-[650px] w-full mx-auto" key={rsvp.fadeKey}>
          {rsvp.step === 'search' && (
            <RsvpSearchForm
              copy={copy.search}
              firstName={rsvp.firstName}
              setFirstName={rsvp.setFirstName}
              lastName={rsvp.lastName}
              setLastName={rsvp.setLastName}
              search={rsvp.search}
            />
          )}

          {rsvp.step === 'select' && (
            <RsvpMemberSelect
              copy={copy.select}
              familyMembers={rsvp.familyMembers}
              selectedIds={rsvp.selectedIds}
              notes={rsvp.notes}
              setNotes={rsvp.setNotes}
              existingRsvp={rsvp.existingRsvp}
              deselectedId={rsvp.deselectedId}
              toggleMember={rsvp.toggleMember}
              submit={rsvp.submit}
              decline={rsvp.decline}
              reset={rsvp.reset}
            />
          )}

          {!['search', 'select'].includes(rsvp.step) && (
            <RsvpStatusView
              copy={copy}
              step={rsvp.step}
              familyMembers={rsvp.familyMembers}
              search={rsvp.search}
              reset={rsvp.reset}
            />
          )}
        </div>
      </div>
    </section>
  )
}
