export type Family = {
  id: string
  code: string
  created_at: string
}

export type FamilyMember = {
  id: string
  family_id: string
  first_name: string
  last_name: string
  created_at: string
}

export type Rsvp = {
  id: string
  family_id: string
  attending_members: string[]
  notes: string | null
  created_at: string
  updated_at: string
}
