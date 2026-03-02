'use client'

import { useEffect, useRef, useState } from 'react'

const VENUE_LNG = 9.4452
const VENUE_LAT = 45.7069
const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Via+Cesare+Cantu+21,+23898+Imbersago+LC'
const GMAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Via+Cesare+Cantu+21%2C+23898+Imbersago+LC%2C+Italy&output=embed&z=16'

const STYLE_OVERRIDES: [layer: string, prop: string, value: string][] = [
  // Land — warm parchment
  ['land', 'background-color', '#FDFCFA'],
  // Parks/greenery — muted stem green (#5A7A56 family, lightened)
  ['landuse', 'fill-color', '#C5D6BF'],
  ['national-park', 'fill-color', '#C5D6BF'],
  // Water — deeper stem green tint (#4A6A46 family, lightened)
  ['water', 'fill-color', '#B5CAB4'],
  ['waterway', 'line-color', '#B5CAB4'],
  // Buildings — subtle petal warmth (#E8845A family, very light)
  ['building', 'fill-color', '#F5EFE6'],
  ['land-structure-polygon', 'fill-color', '#F5EFE6'],
  // Roads — warm gold undertone (#E6AE3E family, muted)
  ['road-simple', 'line-color', '#D4C4A8'],
  ['road-path', 'line-color', '#D4C4A8'],
  ['road-pedestrian', 'line-color', '#D4C4A8'],
  ['bridge-simple', 'line-color', '#D4C4A8'],
  ['bridge-case-simple', 'line-color', '#D4C4A8'],
  ['tunnel-simple', 'line-color', '#D4C4A8'],
]

function GoogleMapsIframe({ venueName }: { venueName: string }) {
  return (
    <iframe
      title={venueName}
      src={GMAPS_EMBED_URL}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="absolute inset-0 h-full w-full"
    />
  )
}

export function VenueMap({ venueName }: { venueName: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const [fallback, setFallback] = useState(false)

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  const hasToken = Boolean(token)

  useEffect(() => {
    if (!hasToken || !containerRef.current || mapInstanceRef.current) return

    let cancelled = false

    async function initMap() {
      const mapboxgl = (await import('mapbox-gl')).default

      if (cancelled || !containerRef.current) return

      mapboxgl.accessToken = token ?? ''

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [VENUE_LNG, VENUE_LAT],
        zoom: 16,
        scrollZoom: false,
        dragRotate: false,
        touchZoomRotate: false,
        doubleClickZoom: false,
        keyboard: false,
        pitchWithRotate: false,
        attributionControl: false,
      })

      map.on('error', () => {
        if (!cancelled) {
          map.remove()
          mapInstanceRef.current = null
          setFallback(true)
        }
      })

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

      map.on('style.load', () => {
        for (const [layer, prop, value] of STYLE_OVERRIDES) {
          if (!map.getLayer(layer)) continue
          // biome-ignore lint/suspicious/noExplicitAny: Mapbox paint property names vary by layer type
          map.setPaintProperty(layer, prop as any, value)
        }
      })

      new mapboxgl.Marker({ color: '#E8845A' }).setLngLat([VENUE_LNG, VENUE_LAT]).addTo(map)

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        // biome-ignore lint/suspicious/noExplicitAny: map instance typed as unknown to avoid top-level mapbox-gl import
        ;(mapInstanceRef.current as any).remove()
        mapInstanceRef.current = null
      }
    }
  }, [hasToken, token])

  const useGoogleMaps = !hasToken || fallback

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] bg-[#F2F0EB]">
      {useGoogleMaps ? (
        <GoogleMapsIframe venueName={venueName} />
      ) : (
        <div
          ref={containerRef}
          role="img"
          data-nojs-hide
          aria-label={`Mappa di ${venueName}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      )}

      {/* Google Maps directions link — only on Mapbox view */}
      {!useGoogleMaps && (
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-nojs-hide
          className="absolute bottom-[10px] right-[10px] z-10 flex items-center gap-1.5 rounded-[50px] border border-[#8E9E8C] bg-[#FDFCFA]/90 px-4 py-2 font-serif text-xs text-[#4A4440] backdrop-blur-sm transition-all duration-200 hover:bg-[#8E9E8C] hover:text-[#FDFCFA] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(142,158,140,0.15)] active:scale-[0.97]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Apri in Google Maps
        </a>
      )}

      {/* No-JS fallback */}
      <noscript>
        <div className="flex h-full items-center justify-center">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-sm text-[#8E9E8C] underline"
          >
            Apri in Google Maps
          </a>
        </div>
      </noscript>
    </div>
  )
}
