import { supabase } from '@/lib/supabase/client'

export async function searchFamilyMember(firstName: string, lastName: string) {
  return supabase
    .from('family_members')
    .select('*')
    .ilike('first_name', firstName)
    .ilike('last_name', lastName)
}

export async function getFamilyMembers(familyId: string) {
  return supabase.from('family_members').select('*').eq('family_id', familyId)
}

export async function getExistingRsvp(familyId: string) {
  return supabase.from('rsvps').select('*').eq('family_id', familyId).maybeSingle()
}

export async function upsertRsvp(payload: {
  family_id: string
  attending_members: string[]
  declined: boolean
  notes: string | null
  updated_at: string
}) {
  return supabase.from('rsvps').upsert(payload, { onConflict: 'family_id' })
}
