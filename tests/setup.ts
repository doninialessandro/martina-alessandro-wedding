import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: readonly number[] = []
  constructor(
    private callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {}
  observe(_target: Element) {
    // Immediately trigger as visible for tests
    this.callback(
      [{ isIntersecting: true, intersectionRatio: 1 } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// Mock requestAnimationFrame / cancelAnimationFrame
let rafId = 0
vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
  rafId++
  cb(rafId)
  return rafId
})
vi.stubGlobal('cancelAnimationFrame', (_id: number) => {})

// Mock window.scrollTo
vi.stubGlobal('scrollTo', vi.fn())

// Mock Intl.Segmenter for typewriter tests
if (!globalThis.Intl?.Segmenter) {
  class MockSegmenter {
    segment(text: string) {
      const segments = [...text].map((char, index) => ({
        segment: char,
        index,
        input: text,
      }))
      return {
        [Symbol.iterator]: () => segments[Symbol.iterator](),
      }
    }
  }
  vi.stubGlobal('Intl', {
    ...globalThis.Intl,
    Segmenter: MockSegmenter,
  })
}
