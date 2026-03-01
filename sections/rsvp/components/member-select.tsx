'use client'

import { AnimatePresence, motion } from 'motion/react'
import type { FamilyMember, Rsvp } from '@/lib/supabase/types'

const confettiParticles = [
  { id: 0, x: -14, y: -16, emoji: '🎉' },
  { id: 1, x: 16, y: -12, emoji: '✨' },
  { id: 2, x: -10, y: 14, emoji: '🥂' },
  { id: 3, x: 18, y: 10, emoji: '🎊' },
  { id: 4, x: 0, y: -20, emoji: '💛' },
]

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

interface SelectCopy {
  label: string
  hint: string
  notesLabel: string
  notesOptional: string
  notesPlaceholder: string
  existingConfirmedSingular: string
  existingConfirmedPlural: string
  existingDeclinedSingular: string
  existingDeclinedPlural: string
  confirmButton: string
  updateButton: string
  declineButtonSingular: string
  declineButtonPlural: string
  declineHint: string
  searchAnother: string
}

interface RsvpMemberSelectProps {
  copy: SelectCopy
  familyMembers: FamilyMember[]
  selectedIds: Set<string>
  notes: string
  setNotes: (v: string) => void
  existingRsvp: Rsvp | null
  deselectedId: string | null
  toggleMember: (id: string) => void
  submit: () => void
  decline: () => void
  reset: () => void
}

export function RsvpMemberSelect({
  copy,
  familyMembers,
  selectedIds,
  notes,
  setNotes,
  existingRsvp,
  deselectedId,
  toggleMember,
  submit,
  decline,
  reset,
}: RsvpMemberSelectProps) {
  const isPlural = familyMembers.length > 1

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <p className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-6">
        {copy.label}
        <span className="normal-case tracking-normal text-[#4A4440] ml-2">{copy.hint}</span>
      </p>

      <div className="flex flex-col gap-4 mb-10">
        {familyMembers.map((member) => {
          const checked = selectedIds.has(member.id)
          return (
            <label
              key={member.id}
              className="flex items-center gap-4 cursor-pointer group relative"
            >
              <AnimatePresence>
                {deselectedId === member.id && (
                  <motion.span
                    key="sad"
                    className="absolute -left-7 top-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    😢
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="relative">
                <motion.div
                  className={`w-5 h-5 rounded-[6px] flex items-center justify-center transition-colors duration-200 ${
                    checked
                      ? 'bg-[#8E9E8C] shadow-[0_1px_4px_rgba(142,158,140,0.2)]'
                      : 'border border-[#D5CCBC] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] group-hover:border-[#8E9E8C] group-hover:shadow-[0_1px_4px_rgba(142,158,140,0.12)]'
                  }`}
                  animate={checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' as const }}
                >
                  {checked && (
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="#FDFCFA"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </motion.div>
                {/* Confetti particles on check */}
                <AnimatePresence>
                  {checked &&
                    confettiParticles.map((p) => (
                      <motion.span
                        key={p.id}
                        className="absolute left-1/2 top-1/2 text-xs pointer-events-none"
                        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                        animate={{ x: p.x, y: p.y, scale: 1, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' as const }}
                      >
                        {p.emoji}
                      </motion.span>
                    ))}
                </AnimatePresence>
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleMember(member.id)}
                aria-label={`${member.first_name} ${member.last_name}`}
                className="sr-only"
              />
              <span className="text-base md:text-lg font-serif text-[#1A1A1A]">
                {member.first_name} {member.last_name}
              </span>
            </label>
          )
        })}
      </div>

      <div className="mb-10">
        <label
          htmlFor="rsvp-notes"
          className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3"
        >
          {copy.notesLabel}
          <span className="normal-case tracking-normal text-[#D5CCBC] ml-2">
            {copy.notesOptional}
          </span>
        </label>
        <textarea
          id="rsvp-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-[#D5CCBC] bg-[#FDFCFA] rounded-[12px] p-3 text-base font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors resize-y min-h-[80px] placeholder:text-[#D5CCBC]"
          placeholder={copy.notesPlaceholder}
        />
      </div>

      {existingRsvp && !existingRsvp.declined && (
        <p className="text-sm font-serif text-[#8E9E8C] text-center mb-4">
          {isPlural ? copy.existingConfirmedPlural : copy.existingConfirmedSingular}
        </p>
      )}

      {existingRsvp?.declined && (
        <p className="text-sm font-serif text-[#8E9E8C] text-center mb-4">
          {isPlural ? copy.existingDeclinedPlural : copy.existingDeclinedSingular}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={selectedIds.size === 0}
        className={`w-full px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase rounded-[50px] border transition-all duration-200 ${
          selectedIds.size === 0
            ? 'border-[#D5CCBC] text-[#D5CCBC] cursor-not-allowed'
            : 'border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(142,158,140,0.15)] active:scale-[0.97]'
        }`}
      >
        {existingRsvp ? copy.updateButton : copy.confirmButton}
      </button>

      <button
        type="button"
        onClick={decline}
        disabled={existingRsvp?.declined}
        className={`w-full mt-4 px-10 py-3 text-sm font-serif tracking-[0.15em] rounded-[50px] border transition-all duration-200 ${
          existingRsvp?.declined
            ? 'border-[#D5CCBC] text-[#D5CCBC] cursor-not-allowed'
            : 'border-[#D5CCBC] text-[#4A4440] hover:border-[#4A4440] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] active:scale-[0.97]'
        }`}
      >
        {isPlural ? copy.declineButtonPlural : copy.declineButtonSingular}
      </button>

      {isPlural && (
        <p className="text-xs font-serif text-[#4A4440] text-center mt-4 leading-relaxed">
          {copy.declineHint}
        </p>
      )}

      <button
        type="button"
        onClick={reset}
        className="block mx-auto mt-8 text-xs font-serif text-[#8E9E8C] underline underline-offset-2 hover:text-[#4A4440] transition-colors"
      >
        {copy.searchAnother}
      </button>
    </motion.div>
  )
}
