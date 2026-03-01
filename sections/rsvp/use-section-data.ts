'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  getExistingRsvp,
  getFamilyMembers,
  searchFamilyMember,
  upsertRsvp,
} from '@/lib/rsvp/queries'
import type { FamilyMember, Rsvp } from '@/lib/supabase/types'

export type Step =
  | 'search'
  | 'loading'
  | 'notfound'
  | 'select'
  | 'submitting'
  | 'success'
  | 'declined'
  | 'error'

export function useSectionData() {
  const [step, setStep] = useState<Step>('search')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [notes, setNotes] = useState('')
  const [existingRsvp, setExistingRsvp] = useState<Rsvp | null>(null)
  const [deselectedId, setDeselectedId] = useState<string | null>(null)

  const search = useCallback(async () => {
    const trimmedFirst = firstName.trim()
    const trimmedLast = lastName.trim()
    setFirstName(trimmedFirst)
    setLastName(trimmedLast)
    if (!trimmedFirst || !trimmedLast) return

    setStep('loading')

    const { data: matches, error } = await searchFamilyMember(trimmedFirst, trimmedLast)

    if (error || !matches || matches.length === 0) {
      setStep('notfound')
      return
    }

    const familyId = matches[0].family_id

    const { data: members, error: membersError } = await getFamilyMembers(familyId)

    if (membersError || !members) {
      setStep('error')
      return
    }

    setFamilyMembers(members)

    const { data: rsvpData } = await getExistingRsvp(familyId)

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

    const { error } = await upsertRsvp({
      family_id: familyId,
      attending_members: attendingMembers,
      declined: false,
      notes: notes.trim() || null,
      updated_at: new Date().toISOString(),
    })

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

    const { error } = await upsertRsvp({
      family_id: familyId,
      attending_members: [],
      declined: true,
      notes: notes.trim() || null,
      updated_at: new Date().toISOString(),
    })

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

  return {
    step,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    familyMembers,
    selectedIds,
    notes,
    setNotes,
    existingRsvp,
    deselectedId,
    fadeKey,
    search,
    toggleMember,
    submit,
    decline,
    reset,
  }
}
