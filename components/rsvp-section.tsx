'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { FamilyMember, Rsvp } from '@/lib/supabase/types'
import { ConfettiBurst } from './confetti-burst'
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

const confettiParticles = [
  { id: 0, x: -14, y: -16, emoji: '🎉' },
  { id: 1, x: 16, y: -12, emoji: '✨' },
  { id: 2, x: -10, y: 14, emoji: '🥂' },
  { id: 3, x: 18, y: 10, emoji: '🎊' },
  { id: 4, x: 0, y: -20, emoji: '💛' },
]

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
    setFirstName(trimmedFirst)
    setLastName(trimmedLast)
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

  const [deselectedId, setDeselectedId] = useState<string | null>(null)

  const toggleMember = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        setDeselectedId(id)
        setTimeout(() => setDeselectedId(null), 1000)
      } else {
        next.add(id)
        setDeselectedId(null)
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
    <section className="min-h-[100svh] flex flex-col pt-8 pb-16 px-8 sm:px-12 md:px-16">
      <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
        <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20 md:mb-24">
          RSVP
        </h2>
      </ScrollReveal>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-[650px] w-full mx-auto" key={fadeKey}>
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
                    onBlur={() => setFirstName((v) => v.trim())}
                    className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base md:text-lg font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors placeholder:text-[#D5CCBC]"
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
                    onBlur={() => setLastName((v) => v.trim())}
                    className="w-full bg-transparent border-0 border-b border-[#D5CCBC] pb-2 text-base md:text-lg font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors placeholder:text-[#D5CCBC]"
                    placeholder="Rossi"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase rounded-[50px] border border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(142,158,140,0.15)] active:scale-[0.97] transition-all duration-200"
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
                className="text-base md:text-lg font-serif text-[#1A1A1A] mb-2"
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
                  className="px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase rounded-[50px] border border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(142,158,140,0.15)] active:scale-[0.97] transition-all duration-200"
                >
                  Riprova
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Select family members */}
          {step === 'select' && (
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <p className="block text-xs tracking-[0.15em] uppercase text-[#8E9E8C] font-serif mb-6">
                Chi partecipa?
                <span className="normal-case tracking-normal text-[#4A4440] ml-2">
                  (seleziona solo chi parteciperà, così possiamo organizzarci al meglio ✌️ Se noti
                  errori contattaci!)
                </span>
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
                  className="w-full border border-[#D5CCBC] bg-[#FDFCFA] rounded-[12px] p-3 text-base font-serif text-[#1A1A1A] outline-none focus:border-[#8E9E8C] transition-colors resize-y min-h-[80px] placeholder:text-[#D5CCBC]"
                  placeholder="Allergie, intolleranze, o altre informazioni"
                />
              </div>

              {existingRsvp && !existingRsvp.declined && (
                <p className="text-sm font-serif text-[#8E9E8C] text-center mb-4">
                  {familyMembers.length > 1
                    ? '⛰ Avete già confermato la vostra presenza ma potete modificare la risposta se ci sono delle novità.'
                    : '⛰ Hai già confermato la tua presenza ma puoi modificare la tua risposta se ci sono delle novità.'}
                </p>
              )}

              {existingRsvp?.declined && (
                <p className="text-sm font-serif text-[#8E9E8C] text-center mb-4">
                  {familyMembers.length > 1
                    ? 'Avevate indicato che non potevate partecipare. Ma siete ancora in tempo per cambiare idea! 🤞'
                    : 'Avevi indicato che non potevi partecipare. Ma sei ancora in tempo per cambiare idea! 🤞'}
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
                {existingRsvp ? 'Aggiorna Informazioni' : 'Conferma Presenza'}
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
                {familyMembers.length > 1
                  ? 'Purtroppo non riusciamo a partecipare 😢'
                  : 'Purtroppo non riesco a partecipare 😢'}
              </button>

              {familyMembers.length > 1 && (
                <p className="text-xs font-serif text-[#4A4440] text-center mt-4 leading-relaxed">
                  Cliccando &ldquo;Purtroppo non riusciamo a partecipare&rdquo; tutti verranno
                  segnati come assenti. Se solo alcuni partecipano, seleziona chi viene e usa
                  &ldquo;Conferma Presenza&rdquo;.
                </p>
              )}

              <button
                type="button"
                onClick={reset}
                className="block mx-auto mt-8 text-xs font-serif text-[#8E9E8C] underline underline-offset-2 hover:text-[#4A4440] transition-colors"
              >
                Cerca un altro nominativo
              </button>
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
              <ConfettiBurst />
              <Typewriter
                text="Grazie! 🎉"
                className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440] mb-1"
              />
              <Typewriter
                text={
                  familyMembers.length > 1
                    ? "Non vediamo l'ora di festeggiare con voi! 🥂"
                    : "Non vediamo l'ora di festeggiare con te! 🥂"
                }
                className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440]"
                delay={0.5}
              />
              <motion.p
                className="text-sm font-serif text-[#4A4440] mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.4 }}
              >
                Hai cambiato idea o sbagliato qualcosa? Nessun panico!{' '}
                <button
                  type="button"
                  onClick={search}
                  className="underline underline-offset-2 text-[#8E9E8C] hover:text-[#4A4440] transition-colors"
                >
                  Modifica la tua risposta
                </button>
              </motion.p>
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
                text={familyMembers.length > 1 ? 'Ci mancherete! 😢' : 'Ci mancherai! 😢'}
                className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440] mb-1"
              />
              <Typewriter
                text={
                  familyMembers.length > 1
                    ? 'Speriamo di rivedervi presto ❤️'
                    : 'Speriamo di rivederti presto ❤️'
                }
                className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440]"
                delay={0.7}
              />
              <motion.p
                className="text-sm font-serif text-[#4A4440] mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.4 }}
              >
                Hai cambiato idea? Nessun panico!{' '}
                <button
                  type="button"
                  onClick={search}
                  className="underline underline-offset-2 text-[#8E9E8C] hover:text-[#4A4440] transition-colors"
                >
                  Modifica la tua risposta
                </button>
              </motion.p>
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
                className="text-base md:text-lg font-serif text-[#1A1A1A] mb-2"
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
                  className="px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase rounded-[50px] border border-[#8E9E8C] text-[#8E9E8C] hover:bg-[#8E9E8C] hover:text-[#FDFCFA] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(142,158,140,0.15)] active:scale-[0.97] transition-all duration-200"
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
