import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockBoundingClientRect, mockWindowDimensions } from '@/tests/mocks/scroll'
import { SectionDivider } from './section-divider'

describe('SectionDivider', () => {
  beforeEach(() => {
    mockWindowDimensions(1024, 768)
  })

  it('renders an SVG with mountain path', () => {
    mockBoundingClientRect({ top: 400 })
    const { container } = render(<SectionDivider />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg?.getAttribute('aria-label')).toBe('Decorative mountain divider')
  })

  it('renders a path element', () => {
    mockBoundingClientRect({ top: 400 })
    const { container } = render(<SectionDivider />)

    const path = container.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path?.getAttribute('stroke')).toBe('#8E9E8C')
  })

  it('sets data-animate on the wrapper', () => {
    mockBoundingClientRect({ top: 400 })
    const { container } = render(<SectionDivider />)

    const wrapper = container.firstElementChild
    expect(wrapper?.hasAttribute('data-animate')).toBe(true)
  })

  it('applies opacity based on scroll progress', () => {
    // Element at top of viewport — high progress
    mockBoundingClientRect({ top: 0 })
    const { container } = render(<SectionDivider />)

    const svg = container.querySelector('svg') as SVGSVGElement
    expect(svg.style.opacity).toBeDefined()
  })

  it('applies stroke-dashoffset to the path', () => {
    mockBoundingClientRect({ top: 400 })
    const { container } = render(<SectionDivider />)

    const path = container.querySelector('path')
    expect(path?.getAttribute('stroke-dasharray')).toBe('300')
  })
})
