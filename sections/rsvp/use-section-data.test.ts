import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { FamilyMember, Rsvp } from '@/lib/supabase/types'

// Mock the queries module
const mockSearchFamilyMember = vi.fn()
const mockGetFamilyMembers = vi.fn()
const mockGetExistingRsvp = vi.fn()
const mockUpsertRsvp = vi.fn()

vi.mock('@/lib/rsvp/queries', () => ({
  searchFamilyMember: (...args: unknown[]) => mockSearchFamilyMember(...args),
  getFamilyMembers: (...args: unknown[]) => mockGetFamilyMembers(...args),
  getExistingRsvp: (...args: unknown[]) => mockGetExistingRsvp(...args),
  upsertRsvp: (...args: unknown[]) => mockUpsertRsvp(...args),
}))

// Import after mocks are set up
// @ts-expect-error vitest supports top-level await
const { useSectionData } = await import('./use-section-data')

const member1: FamilyMember = {
  id: 'm1',
  family_id: 'f1',
  first_name: 'Mario',
  last_name: 'Rossi',
  created_at: '2026-01-01',
}

const member2: FamilyMember = {
  id: 'm2',
  family_id: 'f1',
  first_name: 'Anna',
  last_name: 'Rossi',
  created_at: '2026-01-01',
}

const existingRsvp: Rsvp = {
  id: 'r1',
  family_id: 'f1',
  attending_members: ['m1', 'm2'],
  declined: false,
  notes: 'No allergies',
  created_at: '2026-01-01',
  updated_at: '2026-01-01',
}

const declinedRsvp: Rsvp = {
  id: 'r2',
  family_id: 'f1',
  attending_members: [],
  declined: true,
  notes: null,
  created_at: '2026-01-01',
  updated_at: '2026-01-01',
}

describe('useSectionData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with search step', () => {
    const { result } = renderHook(() => useSectionData())
    expect(result.current.step).toBe('search')
    expect(result.current.firstName).toBe('')
    expect(result.current.lastName).toBe('')
    expect(result.current.familyMembers).toEqual([])
    expect(result.current.selectedIds.size).toBe(0)
    expect(result.current.notes).toBe('')
    expect(result.current.existingRsvp).toBeNull()
  })

  describe('search', () => {
    it('does nothing with empty first name', async () => {
      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('search')
      expect(mockSearchFamilyMember).not.toHaveBeenCalled()
    })

    it('does nothing with empty last name', async () => {
      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('search')
      expect(mockSearchFamilyMember).not.toHaveBeenCalled()
    })

    it('does nothing with whitespace-only input', async () => {
      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('   ')
        result.current.setLastName('   ')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('search')
      expect(mockSearchFamilyMember).not.toHaveBeenCalled()
    })

    it('trims whitespace from names before searching', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: null, error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('  Mario  ')
        result.current.setLastName('  Rossi  ')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(mockSearchFamilyMember).toHaveBeenCalledWith('Mario', 'Rossi')
    })

    it('transitions to notfound when no matches', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [], error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Nobody')
        result.current.setLastName('Here')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('notfound')
    })

    it('transitions to notfound on search error', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: null, error: { message: 'fail' } })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('notfound')
    })

    it('transitions to error when getFamilyMembers fails', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: null, error: { message: 'DB error' } })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('error')
    })

    it('transitions to select with searched member pre-selected (no existing RSVP)', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1, member2], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: null, error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('select')
      expect(result.current.familyMembers).toEqual([member1, member2])
      expect(result.current.selectedIds.has('m1')).toBe(true)
      expect(result.current.selectedIds.has('m2')).toBe(false)
      expect(result.current.notes).toBe('')
      expect(result.current.existingRsvp).toBeNull()
    })

    it('loads existing confirmed RSVP data', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1, member2], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: existingRsvp, error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('select')
      expect(result.current.selectedIds.has('m1')).toBe(true)
      expect(result.current.selectedIds.has('m2')).toBe(true)
      expect(result.current.notes).toBe('No allergies')
      expect(result.current.existingRsvp).toEqual(existingRsvp)
    })

    it('loads existing declined RSVP with empty selectedIds', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1, member2], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: declinedRsvp, error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('select')
      expect(result.current.selectedIds.size).toBe(0)
      expect(result.current.existingRsvp).toEqual(declinedRsvp)
    })
  })

  describe('toggleMember', () => {
    it('adds a member to selectedIds', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1, member2], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: null, error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.selectedIds.has('m2')).toBe(false)

      await act(async () => {
        result.current.toggleMember('m2')
      })

      expect(result.current.selectedIds.has('m2')).toBe(true)
    })

    it('removes a member and sets deselectedId for 1 second', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1, member2], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: existingRsvp, error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.selectedIds.has('m1')).toBe(true)

      await act(async () => {
        result.current.toggleMember('m1')
      })

      expect(result.current.selectedIds.has('m1')).toBe(false)
      expect(result.current.deselectedId).toBe('m1')

      await act(async () => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.deselectedId).toBeNull()
    })
  })

  describe('submit', () => {
    it('does nothing when no family members', async () => {
      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        await result.current.submit()
      })

      expect(result.current.step).toBe('search')
      expect(mockUpsertRsvp).not.toHaveBeenCalled()
    })

    it('transitions to success on successful upsert', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1, member2], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: null, error: null })
      mockUpsertRsvp.mockResolvedValue({ error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })
      await act(async () => {
        result.current.toggleMember('m2')
      })
      await act(async () => {
        result.current.setNotes('Vegetarian')
      })
      await act(async () => {
        await result.current.submit()
      })

      expect(result.current.step).toBe('success')
      expect(mockUpsertRsvp).toHaveBeenCalledWith(
        expect.objectContaining({
          family_id: 'f1',
          declined: false,
          notes: 'Vegetarian',
        })
      )
      // Verify attending_members contains both IDs
      const call = mockUpsertRsvp.mock.calls[0][0]
      expect(call.attending_members).toContain('m1')
      expect(call.attending_members).toContain('m2')
    })

    it('transitions to error on upsert failure', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: null, error: null })
      mockUpsertRsvp.mockResolvedValue({ error: { message: 'Upsert failed' } })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })
      await act(async () => {
        await result.current.submit()
      })

      expect(result.current.step).toBe('error')
    })

    it('trims notes and sends null if empty', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: null, error: null })
      mockUpsertRsvp.mockResolvedValue({ error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })
      await act(async () => {
        result.current.setNotes('   ')
      })
      await act(async () => {
        await result.current.submit()
      })

      expect(mockUpsertRsvp).toHaveBeenCalledWith(expect.objectContaining({ notes: null }))
    })
  })

  describe('decline', () => {
    it('does nothing when no family members', async () => {
      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        await result.current.decline()
      })

      expect(result.current.step).toBe('search')
      expect(mockUpsertRsvp).not.toHaveBeenCalled()
    })

    it('transitions to declined on success', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1, member2], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: null, error: null })
      mockUpsertRsvp.mockResolvedValue({ error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })
      await act(async () => {
        await result.current.decline()
      })

      expect(result.current.step).toBe('declined')
      expect(mockUpsertRsvp).toHaveBeenCalledWith(
        expect.objectContaining({
          family_id: 'f1',
          attending_members: [],
          declined: true,
        })
      )
    })

    it('transitions to error on decline failure', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: null, error: null })
      mockUpsertRsvp.mockResolvedValue({ error: { message: 'Decline failed' } })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })
      await act(async () => {
        await result.current.decline()
      })

      expect(result.current.step).toBe('error')
    })
  })

  describe('reset', () => {
    it('clears all state back to initial', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [member1], error: null })
      mockGetFamilyMembers.mockResolvedValue({ data: [member1], error: null })
      mockGetExistingRsvp.mockResolvedValue({ data: existingRsvp, error: null })

      const { result } = renderHook(() => useSectionData())

      await act(async () => {
        result.current.setFirstName('Mario')
        result.current.setLastName('Rossi')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.step).toBe('select')

      await act(async () => {
        result.current.reset()
      })

      expect(result.current.step).toBe('search')
      expect(result.current.firstName).toBe('')
      expect(result.current.lastName).toBe('')
      expect(result.current.familyMembers).toEqual([])
      expect(result.current.selectedIds.size).toBe(0)
      expect(result.current.notes).toBe('')
      expect(result.current.existingRsvp).toBeNull()
    })
  })

  describe('fadeKey', () => {
    it('increments on step change', async () => {
      mockSearchFamilyMember.mockResolvedValue({ data: [], error: null })

      const { result } = renderHook(() => useSectionData())
      const initialFadeKey = result.current.fadeKey

      await act(async () => {
        result.current.setFirstName('Nobody')
        result.current.setLastName('Here')
      })
      await act(async () => {
        await result.current.search()
      })

      expect(result.current.fadeKey).toBeGreaterThan(initialFadeKey)
    })
  })
})
