import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Countdown } from './countdown'

const labels = {
  days: 'giorni',
  hours: 'ore',
  minutes: 'minuti',
}

describe('Countdown', () => {
  it('renders days, hours, and minutes with zero padding', () => {
    render(
      <Countdown
        loaded={true}
        days={5}
        hours={3}
        minutes={7}
        dateLabel="18 Settembre 2026"
        labels={labels}
      />
    )

    expect(screen.getByText('05')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('07')).toBeInTheDocument()
  })

  it('renders labels', () => {
    render(
      <Countdown
        loaded={true}
        days={200}
        hours={12}
        minutes={30}
        dateLabel="18 Settembre 2026"
        labels={labels}
      />
    )

    expect(screen.getByText('giorni')).toBeInTheDocument()
    expect(screen.getByText('ore')).toBeInTheDocument()
    expect(screen.getByText('minuti')).toBeInTheDocument()
  })

  it('renders dateLabel', () => {
    render(
      <Countdown
        loaded={true}
        days={0}
        hours={0}
        minutes={0}
        dateLabel="18 Settembre 2026"
        labels={labels}
      />
    )

    expect(screen.getByText('18 Settembre 2026')).toBeInTheDocument()
  })

  it('renders large numbers correctly', () => {
    render(
      <Countdown
        loaded={true}
        days={200}
        hours={23}
        minutes={59}
        dateLabel="18 Settembre 2026"
        labels={labels}
      />
    )

    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
    expect(screen.getByText('59')).toBeInTheDocument()
  })

  it('has opacity-0 class when not loaded', () => {
    const { container } = render(
      <Countdown
        loaded={false}
        days={5}
        hours={3}
        minutes={7}
        dateLabel="18 Settembre 2026"
        labels={labels}
      />
    )

    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('opacity-0')
  })

  it('has opacity-100 class when loaded', () => {
    const { container } = render(
      <Countdown
        loaded={true}
        days={5}
        hours={3}
        minutes={7}
        dateLabel="18 Settembre 2026"
        labels={labels}
      />
    )

    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('opacity-100')
  })
})
