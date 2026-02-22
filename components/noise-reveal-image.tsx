'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// Simplex 2D — inline, no external dependency
// ---------------------------------------------------------------------------
const F2 = 0.5 * (Math.sqrt(3) - 1)
const G2 = (3 - Math.sqrt(3)) / 6
const GRAD: [number, number][] = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]

// Randomised Fisher-Yates permutation — unique noise pattern per reveal
function buildPerm(): Uint8Array {
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = p[i]
    p[i] = p[j]
    p[j] = tmp
  }
  const perm = new Uint8Array(512)
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
  return perm
}

function simplex2(xin: number, yin: number, perm: Uint8Array): number {
  const s = (xin + yin) * F2
  const i = Math.floor(xin + s)
  const j = Math.floor(yin + s)
  const t = (i + j) * G2
  const x0 = xin - (i - t)
  const y0 = yin - (j - t)
  const i1 = x0 > y0 ? 1 : 0
  const j1 = x0 > y0 ? 0 : 1
  const x1 = x0 - i1 + G2
  const y1 = y0 - j1 + G2
  const x2 = x0 - 1 + 2 * G2
  const y2 = y0 - 1 + 2 * G2
  const ii = i & 255
  const jj = j & 255
  const gi0 = perm[ii + perm[jj]] % 8
  const gi1 = perm[ii + i1 + perm[jj + j1]] % 8
  const gi2 = perm[ii + 1 + perm[jj + 1]] % 8
  let n0 = 0
  let n1 = 0
  let n2 = 0
  let t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 >= 0) {
    t0 *= t0
    const [gx, gy] = GRAD[gi0]
    n0 = t0 * t0 * (gx * x0 + gy * y0)
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 >= 0) {
    t1 *= t1
    const [gx, gy] = GRAD[gi1]
    n1 = t1 * t1 * (gx * x1 + gy * y1)
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 >= 0) {
    t2 *= t2
    const [gx, gy] = GRAD[gi2]
    n2 = t2 * t2 * (gx * x2 + gy * y2)
  }
  return 70 * (n0 + n1 + n2)
}

// 6-octave fBm; v/maxAmp normalises to [-1, 1] regardless of starting amplitude
function fbm(x: number, y: number, perm: Uint8Array): number {
  const FREQ = 1 / 160
  let v = 0
  let amp = 0.5
  let f = 1
  let maxAmp = 0
  for (let _o = 0; _o < 6; _o++) {
    v += amp * simplex2(x * f * FREQ, y * f * FREQ, perm)
    maxAmp += amp
    amp *= 0.5
    f *= 2.1
  }
  return Math.min(255, Math.max(0, Math.round((v / maxAmp + 1) * 0.5 * 255)))
}

// ---------------------------------------------------------------------------
// Animation constants
// ---------------------------------------------------------------------------
const SOFT_EDGE = 80
const DURATION = 4000

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface NoiseRevealImageProps {
  src?: string
  background?: string
  alt?: string
  className?: string
  /** Rendered as the bottom layer when no src is provided (e.g. placeholder divs) */
  children?: ReactNode
}

export function NoiseRevealImage({
  src,
  background = '#FDFCFA',
  alt = '',
  className,
  children,
}: NoiseRevealImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const W = wrapper.offsetWidth
    const H = wrapper.offsetHeight
    if (W === 0 || H === 0) return

    canvas.width = W
    canvas.height = H

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Fill immediately with background colour before the noise computation so
    // the content below is never visible during the (potentially slow) setup.
    ctx.fillStyle = background
    ctx.fillRect(0, 0, W, H)

    // Parse background hex → [r, g, b] for ImageData use
    const hex = background.replace('#', '')
    const bgR = Number.parseInt(hex.slice(0, 2), 16)
    const bgG = Number.parseInt(hex.slice(2, 4), 16)
    const bgB = Number.parseInt(hex.slice(4, 6), 16)

    // Fresh permutation + random spatial offset → unique reveal per mount
    const perm = buildPerm()
    const noiseSeed = Math.random() * 1000

    // Precompute noise field (canvas stays opaque during this work)
    const noiseField = new Uint8Array(W * H)
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        noiseField[y * W + x] = fbm(x + noiseSeed, y + noiseSeed, perm)
      }
    }

    const imgData = ctx.createImageData(W, H)
    const data = imgData.data
    // Pre-fill RGB channels and start fully opaque
    for (let i = 0; i < W * H; i++) {
      data[4 * i] = bgR
      data[4 * i + 1] = bgG
      data[4 * i + 2] = bgB
      data[4 * i + 3] = 255
    }

    const startTime = performance.now()

    function tick() {
      const elapsed = performance.now() - startTime
      const rawT = Math.min(elapsed / DURATION, 1)
      const eased = easeOutCubic(rawT)
      const T = -SOFT_EDGE + eased * (255 + 2 * SOFT_EDGE)
      const lo = T - SOFT_EDGE
      const hi = T

      for (let i = 0; i < W * H; i++) {
        const n = noiseField[i]
        let a: number
        if (n <= lo) {
          a = 0
        } else if (n >= hi) {
          a = 255
        } else {
          const tt = (n - lo) / (hi - lo)
          const s = tt * tt * (3 - 2 * tt)
          a = Math.round(s * 255)
        }
        data[4 * i + 3] = a
      }

      ctx?.putImageData(imgData, 0, 0)

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [background])

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {src ? (
        // biome-ignore lint/performance/noImgElement: base layer under canvas mask
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        children
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}
