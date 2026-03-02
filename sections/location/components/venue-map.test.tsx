import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

// Mapbox GL is dynamically imported inside useEffect — vi.mock cannot intercept
// dynamic imports in vitest, so the map init silently fails in jsdom (no WebGL).
// These tests verify the static DOM output and progressive enhancement attributes.
vi.mock('mapbox-gl', () => ({
  default: { accessToken: '' },
}))

import { VenueMap } from './venue-map'

describe('VenueMap', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('with Mapbox token', () => {
    it('renders a map container with aria-label', () => {
      vi.stubEnv('NEXT_PUBLIC_MAPBOX_TOKEN', 'pk.test')
      render(<VenueMap venueName="Villa Test" />)
      expect(screen.getByLabelText('Mappa di Villa Test')).toBeInTheDocument()
    })

    it('sets data-nojs-hide on the map container', () => {
      vi.stubEnv('NEXT_PUBLIC_MAPBOX_TOKEN', 'pk.test')
      render(<VenueMap venueName="Villa Test" />)
      const container = screen.getByLabelText('Mappa di Villa Test')
      expect(container).toHaveAttribute('data-nojs-hide')
    })

    it('renders the Google Maps directions link', () => {
      vi.stubEnv('NEXT_PUBLIC_MAPBOX_TOKEN', 'pk.test')
      render(<VenueMap venueName="Villa Test" />)
      const link = screen.getByText('Apri in Google Maps')
      expect(link).toHaveAttribute('href', expect.stringContaining('google.com/maps/dir'))
      expect(link).toHaveAttribute('target', '_blank')
    })

    it('includes venue address in the directions URL', () => {
      vi.stubEnv('NEXT_PUBLIC_MAPBOX_TOKEN', 'pk.test')
      render(<VenueMap venueName="Villa Test" />)
      const link = screen.getByText('Apri in Google Maps')
      expect(link).toHaveAttribute('href', expect.stringContaining('Imbersago'))
    })
  })

  describe('without Mapbox token (fallback)', () => {
    it('renders a Google Maps iframe', () => {
      vi.stubEnv('NEXT_PUBLIC_MAPBOX_TOKEN', '')
      const { container } = render(<VenueMap venueName="Villa Test" />)
      const iframe = container.querySelector('iframe')
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('title', 'Villa Test')
    })

    it('does not render the Mapbox container', () => {
      vi.stubEnv('NEXT_PUBLIC_MAPBOX_TOKEN', '')
      render(<VenueMap venueName="Villa Test" />)
      expect(screen.queryByLabelText('Mappa di Villa Test')).not.toBeInTheDocument()
    })
  })

  it('renders a noscript fallback element', () => {
    const { container } = render(<VenueMap venueName="Villa Test" />)
    const noscript = container.querySelector('noscript')
    expect(noscript).toBeInTheDocument()
  })
})
