'use client'

import { motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { FamilyMember, Rsvp } from '@/lib/supabase/types'
import { MonolineFlower } from './monoline-flower'
import { ScrollReveal } from './scroll-reveal'
import { Typewriter } from './typewriter'

type Step =
  | 'search'
  | 'loading'
  | 'notfound'
  | 'select'
  | 'submitting'
  | 'success'
  | 'declined'
  | 'error'

export function RsvpSection() {
  const [step, setStep] = useState<Step>('search')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [notes, setNotes] = useState('')
  const [existingRsvp, setExistingRsvp] = useState<Rsvp | null>(null)

  const search = useCallback(async () => {
    const trimmedFirst = firstName.trim()
    const trimmedLast = lastName.trim()
    if (!trimmedFirst || !trimmedLast) return

    setStep('loading')

    const { data: matches, error } = await supabase
      .from('family_members')
      .select('*')
      .ilike('first_name', trimmedFirst)
      .ilike('last_name', trimmedLast)

    if (error || !matches || matches.length === 0) {
      setStep('notfound')
      return
    }

    const familyId = matches[0].family_id

    const { data: members, error: membersError } = await supabase
      .from('family_members')
      .select('*')
      .eq('family_id', familyId)

    if (membersError || !members) {
      setStep('error')
      return
    }

    setFamilyMembers(members)

    const { data: rsvpData } = await supabase
      .from('rsvps')
      .select('*')
      .eq('family_id', familyId)
      .maybeSingle()

    if (rsvpData) {
      setExistingRsvp(rsvpData)
      setSelectedIds(new Set(rsvpData.attending_members ?? []))
      setNotes(rsvpData.notes ?? '')
    } else {
      const searchedMember = matches[0]
      setSelectedIds(new Set([searchedMember.id]))
      setNotes('')
      setExistingRsvp(null)
    }

    setStep('select')
  }, [firstName, lastName])

  const toggleMember = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const submit = useCallback(async () => {
    if (familyMembers.length === 0) return

    setStep('submitting')

    const familyId = familyMembers[0].family_id
    const attendingMembers = Array.from(selectedIds)

    const { error } = await supabase.from('rsvps').upsert(
      {
        family_id: familyId,
        attending_members: attendingMembers,
        declined: false,
        notes: notes.trim() || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'family_id' }
    )

    if (error) {
      setStep('error')
      return
    }

    setStep('success')
  }, [familyMembers, selectedIds, notes])

  const decline = useCallback(async () => {
    if (familyMembers.length === 0) return

    setStep('submitting')

    const familyId = familyMembers[0].family_id

    const { error } = await supabase.from('rsvps').upsert(
      {
        family_id: familyId,
        attending_members: [],
        declined: true,
        notes: notes.trim() || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'family_id' }
    )

    if (error) {
      setStep('error')
      return
    }

    setStep('declined')
  }, [familyMembers, notes])

  const reset = useCallback(() => {
    setStep('search')
    setFirstName('')
    setLastName('')
    setFamilyMembers([])
    setSelectedIds(new Set())
    setNotes('')
    setExistingRsvp(null)
  }, [])

  // Bump key on step change to re-trigger animations
  const [fadeKey, setFadeKey] = useState(0)
  // biome-ignore lint/correctness/useExhaustiveDependencies: step is intentionally used to trigger re-render for animation
  useEffect(() => {
    setFadeKey((k) => k + 1)
  }, [step])

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
  }

  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center pt-8 pb-16 px-8 sm:px-12 md:px-16">
      <div className="max-w-[650px] w-full mx-auto">
        <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-16 md:mb-20">
            RSVP
          </h2>
        </ScrollReveal>

        <div key={fadeKey}>
          {/* Search */}
          {step === 'search' && (
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
                    Nome
                  </label>
                  <input
                    id="rsvp-first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors placeholder:text-[#D5CCBC]"
                    placeholder="Mario"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rsvp-last-name"
                    className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3"
                  >
                    Cognome
                  </label>
                  <input
                    id="rsvp-last-name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors placeholder:text-[#D5CCBC]"
                    placeholder="Rossi"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase border border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] transition-colors"
                >
                  Cerca
                </button>
              </form>
            </ScrollReveal>
          )}

          {/* Loading */}
          {step === 'loading' && (
            <motion.div
              className="flex flex-col items-center justify-center gap-6"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <MonolineFlower size={120} loop />
              <Typewriter
                text="Ricerca in corso... 🔍"
                className="text-sm font-serif text-[#4A4440] tracking-wide"
              />
            </motion.div>
          )}

          {/* Not Found */}
          {step === 'notfound' && (
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Typewriter
                text="Non ti abbiamo trovato nella lista degli invitati 😕"
                className="text-base font-serif text-[#1A1A1A] mb-2"
              />
              <Typewriter
                text="Controlla di aver scritto correttamente nome e cognome."
                className="text-sm font-serif text-[#4A4440] mb-10"
                delay={1.2}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.4 }}
              >
                <button
                  type="button"
                  onClick={reset}
                  className="px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase border border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] transition-colors"
                >
                  Riprova
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Select family members */}
          {step === 'select' && (
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              {existingRsvp && !existingRsvp.declined && (
                <Typewriter
                  text="Hai già confermato la tua presenza ✅ Puoi modificare la tua risposta."
                  className="text-sm font-serif text-[#8E9E8C] text-center mb-8"
                />
              )}

              {existingRsvp?.declined && (
                <Typewriter
                  text="Avevi indicato che non potevi partecipare. Puoi cambiare idea! 🤞"
                  className="text-sm font-serif text-[#8E9E8C] text-center mb-8"
                />
              )}

              <p className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-6">
                Chi partecipa?
              </p>

              <div className="flex flex-col gap-4 mb-10">
                {familyMembers.map((member) => (
                  <label key={member.id} className="flex items-center gap-4 cursor-pointer group">
                    <span
                      className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                        selectedIds.has(member.id)
                          ? 'border-[#8E9E8C] bg-[#8E9E8C]'
                          : 'border-[#D5CCBC] group-hover:border-[#8E9E8C]'
                      }`}
                    >
                      {selectedIds.has(member.id) && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="#FDFCFA"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(member.id)}
                      onChange={() => toggleMember(member.id)}
                      className="sr-only"
                    />
                    <span className="text-base font-serif text-[#1A1A1A]">
                      {member.first_name} {member.last_name}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mb-10">
                <label
                  htmlFor="rsvp-notes"
                  className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-3"
                >
                  Hai qualche allergia, intolleranza, o altre informazioni che dovremmo sapere?
                  <span className="normal-case tracking-normal text-[#D5CCBC] ml-2">
                    (facoltativo)
                  </span>
                </label>
                <textarea
                  id="rsvp-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors resize-none placeholder:text-[#D5CCBC]"
                  placeholder="Allergie, intolleranze, o altre informazioni"
                />
              </div>

              <button
                type="button"
                onClick={submit}
                className="w-full px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase border border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] transition-colors"
              >
                Conferma Presenza
              </button>

              <button
                type="button"
                onClick={decline}
                disabled={existingRsvp?.declined}
                className={`w-full mt-4 px-10 py-3 text-sm font-serif tracking-[0.15em] border transition-colors ${
                  existingRsvp?.declined
                    ? 'border-[#D5CCBC] text-[#D5CCBC] cursor-not-allowed'
                    : 'border-[#D5CCBC] text-[#4A4440] hover:border-[#4A4440]'
                }`}
              >
                Purtroppo non riusciamo a partecipare 😢
              </button>

              {familyMembers.length > 1 && (
                <p className="text-xs font-serif text-[#4A4440] text-center mt-4 leading-relaxed">
                  Cliccando &ldquo;Purtroppo non riusciamo a partecipare&rdquo; tutti verranno
                  segnati come assenti. Se solo alcuni partecipano, seleziona chi viene e usa
                  &ldquo;Conferma Presenza&rdquo;.
                </p>
              )}
            </motion.div>
          )}

          {/* Submitting */}
          {step === 'submitting' && (
            <motion.div
              className="flex flex-col items-center justify-center gap-6"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <MonolineFlower size={120} loop />
            </motion.div>
          )}

          {/* Success */}
          {step === 'success' && (
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Typewriter text="Grazie! 🎉" className="text-xl font-serif text-[#1A1A1A] mb-2" />
              <Typewriter
                text="Non vediamo l'ora di festeggiare con voi! 🥂"
                className="text-base font-serif text-[#4A4440]"
                delay={0.5}
              />
            </motion.div>
          )}

          {/* Declined */}
          {step === 'declined' && (
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Typewriter
                text="Ci mancherete! 😢"
                className="text-xl font-serif text-[#1A1A1A] mb-2"
              />
              <Typewriter
                text="Speriamo di rivedervi presto ❤️"
                className="text-base font-serif text-[#4A4440]"
                delay={0.7}
              />
            </motion.div>
          )}

          {/* Error */}
          {step === 'error' && (
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Typewriter
                text="Qualcosa è andato storto 😥"
                className="text-base font-serif text-[#1A1A1A] mb-2"
              />
              <Typewriter
                text="Per favore riprova tra qualche istante."
                className="text-sm font-serif text-[#4A4440] mb-10"
                delay={1}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.4 }}
              >
                <button
                  type="button"
                  onClick={reset}
                  className="px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase border border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] transition-colors"
                >
                  Riprova
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
