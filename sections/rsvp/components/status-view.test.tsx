import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import '@/tests/mocks/motion'
import { RsvpStatusView } from './status-view'

// Mock MonolineFlower since it uses IntersectionObserver and SVG animation
vi.mock('@/components/monoline-flower', () => ({
  MonolineFlower: ({ size, loop }: { size?: number; loop?: boolean }) => (
    <div data-testid="monoline-flower" data-size={size} data-loop={loop} />
  ),
}))

// Mock Typewriter to render text immediately
vi.mock('@/sections/rsvp/components/typewriter', () => ({
  Typewriter: ({ text, className }: { text: string; className?: string }) => (
    <p className={className}>{text}</p>
  ),
}))

// Mock ConfettiBurst
vi.mock('@/sections/rsvp/components/confetti-burst', () => ({
  ConfettiBurst: () => <div data-testid="confetti-burst" />,
}))

const copy = {
  loading: { message: 'Ricerca in corso...' },
  notFound: {
    title: 'Non ti abbiamo trovato',
    subtitle: 'Controlla nome e cognome.',
    retryButton: 'Riprova',
  },
  success: {
    title: 'Grazie!',
    messageSingular: 'Non vediamo l\u2019ora di festeggiare con te!',
    messagePlural: 'Non vediamo l\u2019ora di festeggiare con voi!',
    editPrompt: 'Hai cambiato idea? ',
    editLink: 'Modifica la tua risposta',
  },
  declined: {
    titleSingular: 'Ci mancherai!',
    titlePlural: 'Ci mancherete!',
    messageSingular: 'Speriamo di rivederti presto',
    messagePlural: 'Speriamo di rivedervi presto',
    editPrompt: 'Hai cambiato idea? ',
    editLink: 'Modifica la tua risposta',
  },
  error: {
    title: 'Qualcosa e andato storto',
    subtitle: 'Per favore riprova.',
    retryButton: 'Riprova',
  },
}

const singleMember = [
  { id: 'm1', family_id: 'f1', first_name: 'Mario', last_name: 'Rossi', created_at: '' },
]

const pluralMembers = [
  { id: 'm1', family_id: 'f1', first_name: 'Mario', last_name: 'Rossi', created_at: '' },
  { id: 'm2', family_id: 'f1', first_name: 'Anna', last_name: 'Rossi', created_at: '' },
]

describe('RsvpStatusView', () => {
  describe('loading step', () => {
    it('renders loading state with flower and message', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="loading"
          familyMembers={singleMember}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByTestId('monoline-flower')).toBeInTheDocument()
      expect(screen.getByText('Ricerca in corso...')).toBeInTheDocument()
    })
  })

  describe('notfound step', () => {
    it('renders not found message with retry button', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="notfound"
          familyMembers={[]}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByText('Non ti abbiamo trovato')).toBeInTheDocument()
      expect(screen.getByText('Controlla nome e cognome.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Riprova' })).toBeInTheDocument()
    })

    it('calls reset on retry click', async () => {
      const reset = vi.fn()
      const user = userEvent.setup()

      render(
        <RsvpStatusView
          copy={copy}
          step="notfound"
          familyMembers={[]}
          search={vi.fn()}
          reset={reset}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Riprova' }))
      expect(reset).toHaveBeenCalledOnce()
    })
  })

  describe('submitting step', () => {
    it('renders loading flower', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="submitting"
          familyMembers={singleMember}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByTestId('monoline-flower')).toBeInTheDocument()
    })
  })

  describe('success step', () => {
    it('renders confetti burst', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="success"
          familyMembers={singleMember}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByTestId('confetti-burst')).toBeInTheDocument()
    })

    it('shows singular message for single member', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="success"
          familyMembers={singleMember}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByText('Grazie!')).toBeInTheDocument()
      expect(screen.getByText(/Non vediamo l\u2019ora di festeggiare con te/)).toBeInTheDocument()
    })

    it('shows plural message for multiple members', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="success"
          familyMembers={pluralMembers}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByText(/Non vediamo l\u2019ora di festeggiare con voi/)).toBeInTheDocument()
    })

    it('shows edit link that calls search', async () => {
      const search = vi.fn()
      const user = userEvent.setup()

      render(
        <RsvpStatusView
          copy={copy}
          step="success"
          familyMembers={singleMember}
          search={search}
          reset={vi.fn()}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Modifica la tua risposta' }))
      expect(search).toHaveBeenCalledOnce()
    })
  })

  describe('declined step', () => {
    it('shows singular title for single member', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="declined"
          familyMembers={singleMember}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByText('Ci mancherai!')).toBeInTheDocument()
      expect(screen.getByText('Speriamo di rivederti presto')).toBeInTheDocument()
    })

    it('shows plural title for multiple members', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="declined"
          familyMembers={pluralMembers}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByText('Ci mancherete!')).toBeInTheDocument()
      expect(screen.getByText('Speriamo di rivedervi presto')).toBeInTheDocument()
    })

    it('shows edit link that calls search', async () => {
      const search = vi.fn()
      const user = userEvent.setup()

      render(
        <RsvpStatusView
          copy={copy}
          step="declined"
          familyMembers={singleMember}
          search={search}
          reset={vi.fn()}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Modifica la tua risposta' }))
      expect(search).toHaveBeenCalledOnce()
    })
  })

  describe('error step', () => {
    it('renders error message with retry button', () => {
      render(
        <RsvpStatusView
          copy={copy}
          step="error"
          familyMembers={singleMember}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(screen.getByText('Qualcosa e andato storto')).toBeInTheDocument()
      expect(screen.getByText('Per favore riprova.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Riprova' })).toBeInTheDocument()
    })

    it('calls reset on retry click', async () => {
      const reset = vi.fn()
      const user = userEvent.setup()

      render(
        <RsvpStatusView
          copy={copy}
          step="error"
          familyMembers={singleMember}
          search={vi.fn()}
          reset={reset}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Riprova' }))
      expect(reset).toHaveBeenCalledOnce()
    })
  })

  describe('unknown step', () => {
    it('renders nothing for unhandled step', () => {
      const { container } = render(
        <RsvpStatusView
          copy={copy}
          step={'search' as 'loading'}
          familyMembers={singleMember}
          search={vi.fn()}
          reset={vi.fn()}
        />
      )

      expect(container.innerHTML).toBe('')
    })
  })
})
