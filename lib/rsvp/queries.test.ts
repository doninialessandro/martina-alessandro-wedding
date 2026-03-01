import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { resetMocks, setMockResult } from '@/tests/mocks/supabase'
import { getExistingRsvp, getFamilyMembers, searchFamilyMember, upsertRsvp } from './queries'

describe('rsvp queries', () => {
  beforeEach(() => {
    resetMocks()
  })

  afterEach(() => {
    resetMocks()
  })

  describe('searchFamilyMember', () => {
    it('calls supabase with ilike on first_name and last_name', async () => {
      const members = [{ id: '1', family_id: 'f1', first_name: 'Mario', last_name: 'Rossi' }]
      const chain = setMockResult({ data: members, error: null })

      const result = await searchFamilyMember('Mario', 'Rossi')

      expect(chain.select).toHaveBeenCalledWith('*')
      expect(chain.ilike).toHaveBeenCalledWith('first_name', 'Mario')
      expect(chain.ilike).toHaveBeenCalledWith('last_name', 'Rossi')
      expect(result.data).toEqual(members)
      expect(result.error).toBeNull()
    })

    it('returns error when supabase fails', async () => {
      setMockResult({ data: null, error: { message: 'Network error' } })

      const result = await searchFamilyMember('Mario', 'Rossi')

      expect(result.data).toBeNull()
      expect(result.error).toEqual({ message: 'Network error' })
    })

    it('returns empty array when no matches', async () => {
      setMockResult({ data: [], error: null })

      const result = await searchFamilyMember('Nobody', 'Here')

      expect(result.data).toEqual([])
    })
  })

  describe('getFamilyMembers', () => {
    it('queries family_members by family_id', async () => {
      const members = [
        { id: '1', family_id: 'f1', first_name: 'Mario', last_name: 'Rossi' },
        { id: '2', family_id: 'f1', first_name: 'Anna', last_name: 'Rossi' },
      ]
      const chain = setMockResult({ data: members, error: null })

      const result = await getFamilyMembers('f1')

      expect(chain.select).toHaveBeenCalledWith('*')
      expect(chain.eq).toHaveBeenCalledWith('family_id', 'f1')
      expect(result.data).toEqual(members)
    })

    it('returns error when query fails', async () => {
      setMockResult({ data: null, error: { message: 'DB error' } })

      const result = await getFamilyMembers('f1')

      expect(result.data).toBeNull()
      expect(result.error).toEqual({ message: 'DB error' })
    })
  })

  describe('getExistingRsvp', () => {
    it('returns existing RSVP via maybeSingle', async () => {
      const rsvp = {
        id: 'r1',
        family_id: 'f1',
        attending_members: ['1'],
        declined: false,
        notes: null,
      }
      const chain = setMockResult({ data: rsvp, error: null })

      const result = await getExistingRsvp('f1')

      expect(chain.select).toHaveBeenCalledWith('*')
      expect(chain.eq).toHaveBeenCalledWith('family_id', 'f1')
      expect(chain.maybeSingle).toHaveBeenCalled()
      expect(result.data).toEqual(rsvp)
    })

    it('returns null when no existing RSVP', async () => {
      const chain = setMockResult({ data: null, error: null })

      const result = await getExistingRsvp('f1')

      expect(chain.maybeSingle).toHaveBeenCalled()
      expect(result.data).toBeNull()
    })

    it('returns error on failure', async () => {
      setMockResult({ data: null, error: { message: 'Query failed' } })

      const result = await getExistingRsvp('f1')

      expect(result.error).toEqual({ message: 'Query failed' })
    })
  })

  describe('upsertRsvp', () => {
    it('upserts with onConflict family_id', async () => {
      const chain = setMockResult({ data: null, error: null })
      const payload = {
        family_id: 'f1',
        attending_members: ['1', '2'],
        declined: false,
        notes: 'No allergies',
        updated_at: '2026-09-01T00:00:00.000Z',
      }

      const result = await upsertRsvp(payload)

      expect(chain.upsert).toHaveBeenCalledWith(payload, { onConflict: 'family_id' })
      expect(result.error).toBeNull()
    })

    it('upserts declined RSVP with empty attending_members', async () => {
      const chain = setMockResult({ data: null, error: null })
      const payload = {
        family_id: 'f1',
        attending_members: [] as string[],
        declined: true,
        notes: null,
        updated_at: '2026-09-01T00:00:00.000Z',
      }

      const result = await upsertRsvp(payload)

      expect(chain.upsert).toHaveBeenCalledWith(payload, { onConflict: 'family_id' })
      expect(result.error).toBeNull()
    })

    it('returns error on failure', async () => {
      setMockResult({ data: null, error: { message: 'Upsert failed' } })
      const payload = {
        family_id: 'f1',
        attending_members: ['1'],
        declined: false,
        notes: null,
        updated_at: '2026-09-01T00:00:00.000Z',
      }

      const result = await upsertRsvp(payload)

      expect(result.error).toEqual({ message: 'Upsert failed' })
    })
  })
})
