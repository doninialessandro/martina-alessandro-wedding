import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import '@/tests/mocks/motion'
import type { Rsvp } from '@/lib/supabase/types'
import { RsvpMemberSelect } from './member-select'

const copy = {
  label: 'Chi partecipa?',
  hint: '(seleziona)',
  notesLabel: 'Allergie?',
  notesOptional: '(facoltativo)',
  notesPlaceholder: 'Allergie, intolleranze',
  existingConfirmedSingular: 'Hai gia confermato',
  existingConfirmedPlural: 'Avete gia confermato',
  existingDeclinedSingular: 'Avevi indicato no',
  existingDeclinedPlural: 'Avevate indicato no',
  confirmButton: 'Conferma Presenza',
  updateButton: 'Aggiorna Informazioni',
  declineButtonSingular: 'Non riesco a partecipare',
  declineButtonPlural: 'Non riusciamo a partecipare',
  declineHint: 'Cliccando tutti verranno segnati come assenti.',
  searchAnother: 'Cerca un altro nominativo',
}

const members = [
  { id: 'm1', family_id: 'f1', first_name: 'Mario', last_name: 'Rossi', created_at: '' },
  { id: 'm2', family_id: 'f1', first_name: 'Anna', last_name: 'Rossi', created_at: '' },
]

const singleMember = [members[0]]

const confirmedRsvp: Rsvp = {
  id: 'r1',
  family_id: 'f1',
  attending_members: ['m1', 'm2'],
  declined: false,
  notes: null,
  created_at: '',
  updated_at: '',
}

const declinedRsvp: Rsvp = {
  id: 'r2',
  family_id: 'f1',
  attending_members: [],
  declined: true,
  notes: null,
  created_at: '',
  updated_at: '',
}

const defaultProps = {
  copy,
  familyMembers: members,
  selectedIds: new Set(['m1']),
  notes: '',
  setNotes: vi.fn(),
  existingRsvp: null as Rsvp | null,
  deselectedId: null as string | null,
  toggleMember: vi.fn(),
  submit: vi.fn(),
  decline: vi.fn(),
  reset: vi.fn(),
}

describe('RsvpMemberSelect', () => {
  it('renders all family members as checkboxes', () => {
    render(<RsvpMemberSelect {...defaultProps} />)

    expect(screen.getByLabelText('Mario Rossi')).toBeInTheDocument()
    expect(screen.getByLabelText('Anna Rossi')).toBeInTheDocument()
  })

  it('shows checked state for selected members', () => {
    render(<RsvpMemberSelect {...defaultProps} />)

    expect(screen.getByLabelText('Mario Rossi')).toBeChecked()
    expect(screen.getByLabelText('Anna Rossi')).not.toBeChecked()
  })

  it('calls toggleMember when checkbox is clicked', async () => {
    const toggleMember = vi.fn()
    const user = userEvent.setup()

    render(<RsvpMemberSelect {...defaultProps} toggleMember={toggleMember} />)

    await user.click(screen.getByLabelText('Anna Rossi'))
    expect(toggleMember).toHaveBeenCalledWith('m2')
  })

  it('renders notes textarea', () => {
    render(<RsvpMemberSelect {...defaultProps} />)

    expect(screen.getByLabelText(/Allergie/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Allergie, intolleranze')).toBeInTheDocument()
  })

  it('calls setNotes on textarea change', async () => {
    const setNotes = vi.fn()
    const user = userEvent.setup()

    render(<RsvpMemberSelect {...defaultProps} setNotes={setNotes} />)

    await user.type(screen.getByPlaceholderText('Allergie, intolleranze'), 'V')
    expect(setNotes).toHaveBeenCalled()
  })

  it('shows confirm button (not update) when no existing RSVP', () => {
    render(<RsvpMemberSelect {...defaultProps} />)

    expect(screen.getByRole('button', { name: 'Conferma Presenza' })).toBeInTheDocument()
  })

  it('shows update button when existing RSVP', () => {
    render(<RsvpMemberSelect {...defaultProps} existingRsvp={confirmedRsvp} />)

    expect(screen.getByRole('button', { name: 'Aggiorna Informazioni' })).toBeInTheDocument()
  })

  it('disables confirm button when no members selected', () => {
    render(<RsvpMemberSelect {...defaultProps} selectedIds={new Set()} />)

    const confirmBtn = screen.getByRole('button', { name: 'Conferma Presenza' })
    expect(confirmBtn).toBeDisabled()
  })

  it('enables confirm button when members are selected', () => {
    render(<RsvpMemberSelect {...defaultProps} />)

    const confirmBtn = screen.getByRole('button', { name: 'Conferma Presenza' })
    expect(confirmBtn).not.toBeDisabled()
  })

  it('calls submit on confirm click', async () => {
    const submit = vi.fn()
    const user = userEvent.setup()

    render(<RsvpMemberSelect {...defaultProps} submit={submit} />)

    await user.click(screen.getByRole('button', { name: 'Conferma Presenza' }))
    expect(submit).toHaveBeenCalledOnce()
  })

  it('shows plural decline button for multiple members', () => {
    render(<RsvpMemberSelect {...defaultProps} />)

    expect(screen.getByRole('button', { name: 'Non riusciamo a partecipare' })).toBeInTheDocument()
  })

  it('shows singular decline button for single member', () => {
    render(<RsvpMemberSelect {...defaultProps} familyMembers={singleMember} />)

    expect(screen.getByRole('button', { name: 'Non riesco a partecipare' })).toBeInTheDocument()
  })

  it('calls decline on decline click', async () => {
    const decline = vi.fn()
    const user = userEvent.setup()

    render(<RsvpMemberSelect {...defaultProps} decline={decline} />)

    await user.click(screen.getByRole('button', { name: 'Non riusciamo a partecipare' }))
    expect(decline).toHaveBeenCalledOnce()
  })

  it('disables decline button when existing RSVP is already declined', () => {
    render(<RsvpMemberSelect {...defaultProps} existingRsvp={declinedRsvp} />)

    const declineBtn = screen.getByRole('button', { name: 'Non riusciamo a partecipare' })
    expect(declineBtn).toBeDisabled()
  })

  it('shows decline hint for plural families', () => {
    render(<RsvpMemberSelect {...defaultProps} />)

    expect(screen.getByText(/Cliccando tutti verranno segnati/)).toBeInTheDocument()
  })

  it('hides decline hint for single member', () => {
    render(<RsvpMemberSelect {...defaultProps} familyMembers={singleMember} />)

    expect(screen.queryByText(/Cliccando tutti verranno segnati/)).not.toBeInTheDocument()
  })

  it('shows existing confirmed status for plural', () => {
    render(<RsvpMemberSelect {...defaultProps} existingRsvp={confirmedRsvp} />)

    expect(screen.getByText('Avete gia confermato')).toBeInTheDocument()
  })

  it('shows existing confirmed status for singular', () => {
    render(
      <RsvpMemberSelect
        {...defaultProps}
        familyMembers={singleMember}
        existingRsvp={confirmedRsvp}
      />
    )

    expect(screen.getByText('Hai gia confermato')).toBeInTheDocument()
  })

  it('shows existing declined status for plural', () => {
    render(<RsvpMemberSelect {...defaultProps} existingRsvp={declinedRsvp} />)

    expect(screen.getByText('Avevate indicato no')).toBeInTheDocument()
  })

  it('shows existing declined status for singular', () => {
    render(
      <RsvpMemberSelect
        {...defaultProps}
        familyMembers={singleMember}
        existingRsvp={declinedRsvp}
      />
    )

    expect(screen.getByText('Avevi indicato no')).toBeInTheDocument()
  })

  it('calls reset on search another click', async () => {
    const reset = vi.fn()
    const user = userEvent.setup()

    render(<RsvpMemberSelect {...defaultProps} reset={reset} />)

    await user.click(screen.getByRole('button', { name: 'Cerca un altro nominativo' }))
    expect(reset).toHaveBeenCalledOnce()
  })
})
