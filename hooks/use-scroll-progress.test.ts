import { act, render, screen } from '@testing-library/react'
import { createElement, useEffect } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockBoundingClientRect, mockWindowDimensions } from '@/tests/mocks/scroll'
import { useScrollProgress } from './use-scroll-progress'

/**
 * Helper component that attaches the hook's ref to a real DOM element,
 * so getBoundingClientRect mocks actually take effect.
 */
function TestHarness({ offset, onProgress }: { offset?: number; onProgress: (p: number) => void }) {
  const { ref, progress } = useScrollProgress(offset)
  useEffect(() => {
    onProgress(progress)
  }, [progress, onProgress])
  return createElement('div', { ref, 'data-testid': 'hook-el' })
}

function renderWithProgress(offset?: number) {
  let latest = 0
  const onProgress = vi.fn((p: number) => {
    latest = p
  })
  const result = render(createElement(TestHarness, { offset, onProgress }))
  return { ...result, getProgress: () => latest, onProgress }
}

describe('useScrollProgress', () => {
  beforeEach(() => {
    mockWindowDimensions(1024, 768)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns ref and initial progress', () => {
    mockBoundingClientRect({ top: 1000 })
    renderWithProgress()

    expect(screen.getByTestId('hook-el')).toBeInTheDocument()
  })

  it('returns progress 0 when element is below viewport', () => {
    // Element is far below the viewport
    mockBoundingClientRect({ top: 2000 })
    const { getProgress } = renderWithProgress()

    expect(getProgress()).toBe(0)
  })

  it('returns progress 1 when element is above viewport', () => {
    // Element is above the viewport
    mockBoundingClientRect({ top: -500 })
    const { getProgress } = renderWithProgress()

    expect(getProgress()).toBe(1)
  })

  it('returns progress between 0 and 1 for mid-viewport element', () => {
    // Element is in the middle of viewport
    mockBoundingClientRect({ top: 384 }) // half of 768
    const { getProgress } = renderWithProgress()

    expect(getProgress()).toBeGreaterThan(0)
    expect(getProgress()).toBeLessThan(1)
  })

  it('clamps progress to 0 minimum', () => {
    mockBoundingClientRect({ top: 5000 })
    const { getProgress } = renderWithProgress()

    expect(getProgress()).toBe(0)
  })

  it('clamps progress to 1 maximum', () => {
    mockBoundingClientRect({ top: -5000 })
    const { getProgress } = renderWithProgress()

    expect(getProgress()).toBe(1)
  })

  it('accepts a custom offset parameter', () => {
    mockBoundingClientRect({ top: 400 })
    const { getProgress } = renderWithProgress(0.2)

    expect(typeof getProgress()).toBe('number')
    expect(getProgress()).toBeGreaterThanOrEqual(0)
    expect(getProgress()).toBeLessThanOrEqual(1)
  })

  it('removes event listeners on unmount', () => {
    mockBoundingClientRect({ top: 400 })
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderWithProgress()
    act(() => {
      unmount()
    })

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })
})
