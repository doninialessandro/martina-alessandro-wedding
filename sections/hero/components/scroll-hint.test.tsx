import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ScrollHint } from './scroll-hint'

describe('ScrollHint', () => {
  it('renders as a button with aria-label', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const button = container.firstElementChild as HTMLButtonElement
    expect(button.tagName).toBe('BUTTON')
    expect(button.getAttribute('aria-label')).toBe('Scorri giù')
  })

  it('has data-nojs-hide attribute', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const button = container.firstElementChild as HTMLElement
    expect(button.hasAttribute('data-nojs-hide')).toBe(true)
  })

  it('has data-animate attribute', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const button = container.firstElementChild as HTMLElement
    expect(button.hasAttribute('data-animate')).toBe(true)
  })

  it('starts with opacity-0 when not visible', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const button = container.firstElementChild as HTMLElement
    expect(button.className).toContain('opacity-0')
    expect(button.className).not.toContain('opacity-100')
  })

  it('shows with opacity-100 when visible', () => {
    const { container } = render(<ScrollHint visible={true} />)
    const button = container.firstElementChild as HTMLElement
    expect(button.className).toContain('opacity-100')
    expect(button.className).not.toContain('opacity-0')
  })

  it('renders a chevron SVG', () => {
    render(<ScrollHint visible={false} />)
    const svg = document.querySelector('svg')
    expect(svg).not.toBeNull()
    const polyline = svg?.querySelector('polyline')
    expect(polyline).not.toBeNull()
    expect(polyline?.getAttribute('points')).toBe('6 9 12 15 18 9')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const { container } = render(<ScrollHint visible={true} onClick={onClick} />)
    const button = container.firstElementChild as HTMLButtonElement
    button.click()
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has pointer-events-none when not visible', () => {
    const { container } = render(<ScrollHint visible={false} />)
    const button = container.firstElementChild as HTMLElement
    expect(button.className).toContain('pointer-events-none')
  })
})
