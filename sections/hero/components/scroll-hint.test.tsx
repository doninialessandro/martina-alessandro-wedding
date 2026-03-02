import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ScrollHint } from './scroll-hint'

describe('ScrollHint', () => {
  it('renders with aria-hidden', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.getAttribute('aria-hidden')).toBe('true')
  })

  it('has data-nojs-hide attribute', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.hasAttribute('data-nojs-hide')).toBe(true)
  })

  it('has data-animate attribute', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.hasAttribute('data-animate')).toBe(true)
  })

  it('starts with opacity-0 when not visible', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain('opacity-0')
    expect(wrapper.className).not.toContain('opacity-100')
  })

  it('shows with opacity-100 when visible', () => {
    const { container } = render(<ScrollHint visible={true} />)
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain('opacity-100')
    expect(wrapper.className).not.toContain('opacity-0')
  })

  it('renders a chevron SVG', () => {
    render(<ScrollHint visible={false} />)
    const svg = document.querySelector('svg')
    expect(svg).not.toBeNull()
    const polyline = svg?.querySelector('polyline')
    expect(polyline).not.toBeNull()
    expect(polyline?.getAttribute('points')).toBe('6 9 12 15 18 9')
  })
})
