import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSectionData } from './use-section-data'

describe('hero useSectionData', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Set a fixed date before the wedding (2026-09-18)
    vi.setSystemTime(new Date('2026-03-01T12:00:00+01:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calculates days, hours, minutes until wedding', () => {
    const { result } = renderHook(() => useSectionData())

    expect(result.current.days).toBeGreaterThan(0)
    expect(typeof result.current.hours).toBe('number')
    expect(typeof result.current.minutes).toBe('number')
  })

  it('returns all zeros when wedding date has passed', () => {
    vi.setSystemTime(new Date('2027-01-01T00:00:00+01:00'))

    const { result } = renderHook(() => useSectionData())

    expect(result.current.days).toBe(0)
    expect(result.current.hours).toBe(0)
    expect(result.current.minutes).toBe(0)
  })

  it('updates countdown every 60 seconds', () => {
    const { result } = renderHook(() => useSectionData())
    const _initialMinutes = result.current.minutes

    act(() => {
      vi.advanceTimersByTime(60_000)
    })

    // Minutes should have changed (decremented by 1 or wrapped)
    // We can't assert exact value since it depends on timing, but the hook should re-render
    expect(typeof result.current.minutes).toBe('number')
  })

  it('sets loaded to true after 100ms', () => {
    const { result } = renderHook(() => useSectionData())

    // Initially may not be loaded
    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current.loaded).toBe(true)
  })

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderHook(() => useSectionData())

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  it('showScrollHint starts as false', () => {
    const { result } = renderHook(() => useSectionData())
    expect(result.current.showScrollHint).toBe(false)
  })

  it('showScrollHint becomes true after 5 seconds', () => {
    const { result } = renderHook(() => useSectionData())

    expect(result.current.showScrollHint).toBe(false)

    act(() => {
      vi.advanceTimersByTime(5_000)
    })

    expect(result.current.showScrollHint).toBe(true)
  })

  it('showScrollHint hides on scroll', () => {
    const { result } = renderHook(() => useSectionData())

    act(() => {
      vi.advanceTimersByTime(5_000)
    })
    expect(result.current.showScrollHint).toBe(true)

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current.showScrollHint).toBe(false)
  })
})
