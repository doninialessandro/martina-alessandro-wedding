import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RsvpSearchForm } from './search-form'

// Mock scroll-reveal to pass through children
vi.mock('@/components/scroll-reveal', () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const copy = {
  firstNameLabel: 'Nome',
  lastNameLabel: 'Cognome',
  firstNamePlaceholder: 'Mario',
  lastNamePlaceholder: 'Rossi',
  submitButton: 'Cerca',
}

describe('RsvpSearchForm', () => {
  it('renders labels and placeholders from copy', () => {
    render(
      <RsvpSearchForm
        copy={copy}
        firstName=""
        setFirstName={vi.fn()}
        lastName=""
        setLastName={vi.fn()}
        search={vi.fn()}
      />
    )

    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Cognome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Mario')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Rossi')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cerca' })).toBeInTheDocument()
  })

  it('calls setFirstName on input change', async () => {
    const setFirstName = vi.fn()
    const user = userEvent.setup()

    render(
      <RsvpSearchForm
        copy={copy}
        firstName=""
        setFirstName={setFirstName}
        lastName=""
        setLastName={vi.fn()}
        search={vi.fn()}
      />
    )

    await user.type(screen.getByLabelText('Nome'), 'M')
    expect(setFirstName).toHaveBeenCalledWith('M')
  })

  it('calls setLastName on input change', async () => {
    const setLastName = vi.fn()
    const user = userEvent.setup()

    render(
      <RsvpSearchForm
        copy={copy}
        firstName=""
        setFirstName={vi.fn()}
        lastName=""
        setLastName={setLastName}
        search={vi.fn()}
      />
    )

    await user.type(screen.getByLabelText('Cognome'), 'R')
    expect(setLastName).toHaveBeenCalledWith('R')
  })

  it('trims firstName on blur', async () => {
    const setFirstName = vi.fn()
    const user = userEvent.setup()

    render(
      <RsvpSearchForm
        copy={copy}
        firstName="  Mario  "
        setFirstName={setFirstName}
        lastName=""
        setLastName={vi.fn()}
        search={vi.fn()}
      />
    )

    await user.click(screen.getByLabelText('Nome'))
    await user.tab()

    expect(setFirstName).toHaveBeenCalledWith('Mario')
  })

  it('trims lastName on blur', async () => {
    const setLastName = vi.fn()
    const user = userEvent.setup()

    render(
      <RsvpSearchForm
        copy={copy}
        firstName=""
        setFirstName={vi.fn()}
        lastName="  Rossi  "
        setLastName={setLastName}
        search={vi.fn()}
      />
    )

    await user.click(screen.getByLabelText('Cognome'))
    await user.tab()

    expect(setLastName).toHaveBeenCalledWith('Rossi')
  })

  it('calls search on form submit', async () => {
    const search = vi.fn()
    const user = userEvent.setup()

    render(
      <RsvpSearchForm
        copy={copy}
        firstName="Mario"
        setFirstName={vi.fn()}
        lastName="Rossi"
        setLastName={vi.fn()}
        search={search}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Cerca' }))
    expect(search).toHaveBeenCalledOnce()
  })

  it('has required attribute on both inputs', () => {
    render(
      <RsvpSearchForm
        copy={copy}
        firstName=""
        setFirstName={vi.fn()}
        lastName=""
        setLastName={vi.fn()}
        search={vi.fn()}
      />
    )

    expect(screen.getByLabelText('Nome')).toBeRequired()
    expect(screen.getByLabelText('Cognome')).toBeRequired()
  })
})
