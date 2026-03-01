import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockBoundingClientRect, mockWindowDimensions } from '@/tests/mocks/scroll'
import { ParallaxFade, ScrollReveal } from './scroll-reveal'

describe('ScrollReveal', () => {
  beforeEach(() => {
    mockWindowDimensions(1024, 768)
    // Place element at the top so it gets full progress
    mockBoundingClientRect({ top: 0 })
  })

  it('renders children with clip effect by default', () => {
    render(
      <ScrollReveal>
        <p>Test content</p>
      </ScrollReveal>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies data-animate attribute', () => {
    const { container } = render(
      <ScrollReveal>
        <p>Test</p>
      </ScrollReveal>
    )

    const wrapper = container.firstElementChild
    expect(wrapper?.hasAttribute('data-animate')).toBe(true)
  })

  it('applies clip-path style with clip effect', () => {
    const { container } = render(
      <ScrollReveal effect="clip">
        <p>Test</p>
      </ScrollReveal>
    )

    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.style.clipPath).toBeDefined()
  })

  it('applies opacity style with slide effect', () => {
    const { container } = render(
      <ScrollReveal effect="slide">
        <p>Test</p>
      </ScrollReveal>
    )

    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.style.opacity).toBeDefined()
  })

  it('sets willChange for clip effect', () => {
    const { container } = render(
      <ScrollReveal effect="clip">
        <p>Test</p>
      </ScrollReveal>
    )

    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.style.willChange).toContain('clip-path')
  })

  it('sets willChange for slide effect', () => {
    const { container } = render(
      <ScrollReveal effect="slide">
        <p>Test</p>
      </ScrollReveal>
    )

    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.style.willChange).toContain('opacity')
  })

  it('applies custom className', () => {
    const { container } = render(
      <ScrollReveal className="custom-class">
        <p>Test</p>
      </ScrollReveal>
    )

    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('custom-class')
  })
})

describe('ParallaxFade', () => {
  beforeEach(() => {
    mockWindowDimensions(1024, 768)
    mockBoundingClientRect({ top: 200 })
  })

  it('renders children', () => {
    render(
      <ParallaxFade>
        <p>Parallax content</p>
      </ParallaxFade>
    )

    expect(screen.getByText('Parallax content')).toBeInTheDocument()
  })

  it('applies data-animate attribute', () => {
    const { container } = render(
      <ParallaxFade>
        <p>Test</p>
      </ParallaxFade>
    )

    const wrapper = container.firstElementChild
    expect(wrapper?.hasAttribute('data-animate')).toBe(true)
  })

  it('sets willChange for opacity and transform', () => {
    const { container } = render(
      <ParallaxFade>
        <p>Test</p>
      </ParallaxFade>
    )

    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.style.willChange).toContain('opacity')
    expect(wrapper.style.willChange).toContain('transform')
  })

  it('applies custom className', () => {
    const { container } = render(
      <ParallaxFade className="hero-fade">
        <p>Test</p>
      </ParallaxFade>
    )

    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('hero-fade')
  })
})
