'use client'

// NOTE: This component is currently not used in the main flow.
// It provides a noise-based canvas dissolve reveal effect and is kept
// here for potential future use if a more elaborate image transition is desired.

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
// T range: T_OPAQUE = all pixels opaque, T_TRANSPARENT = all pixels transparent
const T_OPAQUE = -SOFT_EDGE
const T_TRANSPARENT = 255 + SOFT_EDGE
const T_RANGE = T_TRANSPARENT - T_OPAQUE

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

/** Smooth-step alpha for one noise pixel at threshold T. */
function noiseAlpha(n: number, T: number): number {
  const lo = T - SOFT_EDGE
  const hi = T
  if (n <= lo) return 0
  if (n >= hi) return 255
  const tt = (n - lo) / (hi - lo)
  return Math.round(tt * tt * (3 - 2 * tt) * 255)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface NoiseRevealImageProps {
  src?: string
  background?: string
  alt?: string
  className?: string
  children?: ReactNode
  /**
   * Controls visibility. When true: canvas reveals (opaque→transparent).
   * When false: canvas conceals (transparent→opaque).
   * Animations smoothly interrupt and reverse from the current position.
   * Defaults to true (reveal on mount).
   */
  visible?: boolean
  /** Called when a conceal animation completes (visible went false → animation done). */
  onConcealed?: () => void
}

export function NoiseRevealImage({
  src,
  background = '#FDFCFA',
  alt = '',
  className,
  children,
  visible = true,
  onConcealed,
}: NoiseRevealImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  // Canvas state — populated once by the setup effect, consumed by the animation effect
  const canvasStateRef = useRef<{
    noiseField: Uint8Array
    ctx: CanvasRenderingContext2D
    imgData: ImageData
    data: Uint8ClampedArray
    W: number
    H: number
  } | null>(null)

  // Current position in the T animation space. Persists across effect runs so
  // interrupted animations resume/reverse from where they stopped.
  const currentTRef = useRef(T_OPAQUE)

  // Stable ref for the callback so the animation effect doesn't re-run on re-renders
  const onConcealedRef = useRef(onConcealed)
  onConcealedRef.current = onConcealed

  // -------------------------------------------------------------------------
  // Setup effect — runs once on mount
  // -------------------------------------------------------------------------
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

    ctx.fillStyle = background
    ctx.fillRect(0, 0, W, H)

    const hex = background.replace('#', '')
    const bgR = Number.parseInt(hex.slice(0, 2), 16)
    const bgG = Number.parseInt(hex.slice(2, 4), 16)
    const bgB = Number.parseInt(hex.slice(4, 6), 16)

    const perm = buildPerm()
    const noiseSeed = Math.random() * 1000

    const noiseField = new Uint8Array(W * H)
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        noiseField[y * W + x] = fbm(x + noiseSeed, y + noiseSeed, perm)
      }
    }

    const imgData = ctx.createImageData(W, H)
    const data = imgData.data
    for (let i = 0; i < W * H; i++) {
      data[4 * i] = bgR
      data[4 * i + 1] = bgG
      data[4 * i + 2] = bgB
      data[4 * i + 3] = 255
    }
    ctx.putImageData(imgData, 0, 0)

    canvasStateRef.current = { noiseField, ctx, imgData, data, W, H }
    currentTRef.current = T_OPAQUE

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [background])

  // -------------------------------------------------------------------------
  // Animation effect — runs whenever `visible` changes.
  // Animates T from its current position toward the target, proportionally
  // shortening the duration so interrupted animations don't restart at full length.
  // -------------------------------------------------------------------------
  useEffect(() => {
    cancelAnimationFrame(rafRef.current)

    const state = canvasStateRef.current
    if (!state) return

    const { noiseField, ctx, imgData, data, W, H } = state
    const targetT = visible ? T_TRANSPARENT : T_OPAQUE
    const startT = currentTRef.current
    const distance = Math.abs(targetT - startT)

    if (distance < 1) {
      if (!visible) onConcealedRef.current?.()
      return
    }

    const duration = DURATION * (distance / T_RANGE)
    const startTime = performance.now()

    function tick() {
      const elapsed = performance.now() - startTime
      const rawT = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(rawT)
      const T = startT + (targetT - startT) * eased
      currentTRef.current = T

      for (let i = 0; i < W * H; i++) {
        data[4 * i + 3] = noiseAlpha(noiseField[i], T)
      }

      ctx.putImageData(imgData, 0, 0)

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else if (targetT === T_OPAQUE) {
        onConcealedRef.current?.()
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

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
