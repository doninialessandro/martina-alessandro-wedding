import { vi } from 'vitest'

export function mockBoundingClientRect(rect: Partial<DOMRect>) {
  const fullRect: DOMRect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...rect,
  }
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(fullRect)
  return fullRect
}

export function mockWindowDimensions(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true })
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true })
}
