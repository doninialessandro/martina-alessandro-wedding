'use client'

import { useEffect, useId, useRef, useState } from 'react'

interface MonolineFlowerProps {
  className?: string
  size?: number
  animate?: boolean
  showThread?: boolean
  loop?: boolean
}

export function MonolineFlower({
  className = '',
  size = 200,
  animate = true,
  showThread = false,
  loop = false,
}: MonolineFlowerProps) {
  const uid = useId().replace(/:/g, '')
  const svgRef = useRef<SVGSVGElement>(null)
  const [isVisible, setIsVisible] = useState(!animate || loop)

  useEffect(() => {
    if (!animate || loop) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (svgRef.current) observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [animate, loop])

  /*
    Sunflower inspired by the Pinterest monoline reference.
    Single continuous-style line art: thin organic strokes,
    spiral center with seed texture, elongated petals,
    curved stem with veined leaves.

    Drawing order: stem -> leaves -> center spiral -> petals
    This gives the illusion of one continuous hand-drawn line.
  */

  type Segment = {
    id: string
    d: string
    len: number
    group: 'stem' | 'center' | 'petal' | 'detail'
  }

  const segments: Segment[] = [
    // ── STEM ──
    {
      id: 'stem',
      d: 'M100 200 C99 192 98 180 98 170 C98 158 100 148 100 138 C100 130 100 122 100 115',
      group: 'stem',
      len: 90,
    },

    // ── LEAVES ──
    {
      id: 'leaf-l',
      d: 'M99 168 C94 162 84 157 77 158 C70 160 68 166 72 170 C77 175 90 173 99 169',
      group: 'stem',
      len: 60,
    },
    { id: 'vein-l', d: 'M98 168 C91 165 83 162 77 163', group: 'detail', len: 24 },
    {
      id: 'leaf-r',
      d: 'M101 148 C106 142 116 137 123 138 C130 140 132 146 128 150 C123 154 110 153 101 149',
      group: 'stem',
      len: 60,
    },
    { id: 'vein-r', d: 'M102 148 C109 145 117 143 123 143', group: 'detail', len: 24 },

    // ── CENTER: double spiral for seed-head texture ──
    {
      id: 'spiral-1',
      d: 'M103 98 C106 94 104 89 100 89 C95 89 92 93 93 98 C94 103 98 107 103 107 C108 107 111 103 111 98 C111 92 107 87 101 86 C94 86 89 91 89 98 C89 106 94 112 101 112',
      group: 'center',
      len: 140,
    },
    {
      id: 'spiral-2',
      d: 'M101 112 C109 112 114 106 114 98 C114 90 109 84 101 84 C92 84 86 90 86 98 C86 107 92 114 101 114',
      group: 'center',
      len: 120,
    },
    // Seed marks: small curved dashes inside the center
    { id: 's1', d: 'M97 94 C98 93 99 93 100 94', group: 'detail', len: 5 },
    { id: 's2', d: 'M103 97 C104 96 104 95 103 94', group: 'detail', len: 5 },
    { id: 's3', d: 'M100 100 C99 101 98 101 97 100', group: 'detail', len: 5 },
    { id: 's4', d: 'M96 97 C95 96 95 95 96 94', group: 'detail', len: 5 },
    { id: 's5', d: 'M100 96 C101 95 101 94 100 93', group: 'detail', len: 4 },
    { id: 's6', d: 'M103 100 C104 101 103 102 102 101', group: 'detail', len: 5 },

    // ── PETALS: 12 elongated organic petals radiating outward ──
    // Top
    {
      id: 'p1',
      d: 'M100 84 C99 76 97 64 97 55 C97 47 99 42 101 42 C103 42 105 47 105 55 C105 64 103 76 101 84',
      group: 'petal',
      len: 90,
    },
    // Top-right 1
    {
      id: 'p2',
      d: 'M108 86 C113 80 121 70 127 64 C132 60 135 59 137 61 C139 63 137 67 132 72 C126 79 117 87 112 91',
      group: 'petal',
      len: 80,
    },
    // Right-upper
    {
      id: 'p3',
      d: 'M113 93 C120 90 131 86 140 85 C147 85 151 87 151 90 C151 93 147 95 140 96 C131 97 120 96 113 95',
      group: 'petal',
      len: 84,
    },
    // Right
    {
      id: 'p4',
      d: 'M114 100 C122 100 133 101 142 103 C149 105 153 108 152 111 C151 114 147 114 140 113 C132 111 121 107 114 104',
      group: 'petal',
      len: 82,
    },
    // Bottom-right
    {
      id: 'p5',
      d: 'M111 108 C116 114 123 124 127 132 C130 139 129 143 127 144 C125 145 122 142 119 135 C116 127 113 118 111 112',
      group: 'petal',
      len: 78,
    },
    // Bottom
    {
      id: 'p6',
      d: 'M102 114 C103 122 105 133 104 142 C103 149 101 154 100 154 C99 154 97 149 96 142 C95 133 97 122 98 114',
      group: 'petal',
      len: 88,
    },
    // Bottom-left
    {
      id: 'p7',
      d: 'M91 110 C86 116 79 125 75 133 C72 139 73 143 75 144 C77 145 80 142 83 135 C86 127 89 117 91 111',
      group: 'petal',
      len: 78,
    },
    // Left
    {
      id: 'p8',
      d: 'M87 103 C79 105 68 108 59 108 C52 108 48 106 48 103 C48 100 52 97 59 96 C68 95 79 97 87 99',
      group: 'petal',
      len: 84,
    },
    // Left-upper
    {
      id: 'p9',
      d: 'M88 95 C81 92 70 87 62 84 C55 81 51 79 51 76 C51 73 55 73 62 75 C70 78 81 85 88 89',
      group: 'petal',
      len: 80,
    },
    // Top-left
    {
      id: 'p10',
      d: 'M93 87 C88 80 81 71 76 64 C72 59 70 57 68 59 C66 61 68 66 73 72 C79 79 87 87 92 91',
      group: 'petal',
      len: 78,
    },
    // Upper-right inner
    {
      id: 'p11',
      d: 'M106 85 C108 78 112 68 115 60 C117 53 117 49 115 48 C113 47 111 51 110 58 C108 66 107 77 106 85',
      group: 'petal',
      len: 72,
    },
    // Lower-left inner
    {
      id: 'p12',
      d: 'M94 113 C92 120 88 130 85 138 C83 144 83 148 85 149 C87 150 89 146 90 139 C92 131 93 121 94 113',
      group: 'petal',
      len: 72,
    },
  ]

  // Sequential draw timing: each segment starts slightly before the previous finishes
  let cumulativeDelay = 0
  const timings = segments.map((seg) => {
    const delay = cumulativeDelay
    // Speed proportional to length, minimum 0.15s
    const dur = Math.max(0.15, seg.len / 400)
    // Overlap: next segment starts when current is ~55% done
    cumulativeDelay += dur * 0.42
    return { delay, dur }
  })

  const totalDrawTime = cumulativeDelay + 0.5

  // Unique gradient IDs per instance to avoid SVG ID collisions
  const stemGradId = `stemGrad${uid}`
  const centerGradId = `centerGrad${uid}`
  const petalGradId = `petalGrad${uid}`

  // Stroke color per group
  function getStroke(group: string): string {
    switch (group) {
      case 'stem':
        return `url(#${stemGradId})`
      case 'center':
        return `url(#${centerGradId})`
      case 'petal':
        return `url(#${petalGradId})`
      case 'detail':
        return '#BE8520'
      default:
        return '#4A6A46'
    }
  }

  // Stroke width per group
  function getStrokeWidth(group: string): number {
    switch (group) {
      case 'detail':
        return 0.7
      case 'petal':
        return 1.2
      default:
        return 1.5
    }
  }

  // Total loop cycle duration
  const loopDuration = totalDrawTime + 1.5

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`} data-animate>
      {loop && (
        <style>
          {segments
            .map((seg, i) => {
              const { delay, dur } = timings[i]
              const drawStart = ((delay / loopDuration) * 100).toFixed(1)
              const drawEnd = (((delay + dur) / loopDuration) * 100).toFixed(1)
              const holdEnd = ((totalDrawTime / loopDuration) * 100).toFixed(1)
              const eraseEnd = Math.min(
                100,
                Number(holdEnd) + Number(drawEnd) - Number(drawStart)
              ).toFixed(1)
              return `@keyframes loop-${seg.id}{0%{stroke-dashoffset:${seg.len}}${drawStart}%{stroke-dashoffset:${seg.len}}${drawEnd}%{stroke-dashoffset:0}${holdEnd}%{stroke-dashoffset:0}${eraseEnd}%{stroke-dashoffset:${seg.len}}100%{stroke-dashoffset:${seg.len}}}`
            })
            .join('')}
        </style>
      )}
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="-6 -6 212 217"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={stemGradId} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#5A7A56" />
            <stop offset="50%" stopColor="#4A6A46" />
            <stop offset="100%" stopColor="#3B5B38" />
          </linearGradient>
          <radialGradient id={centerGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6AE3E" />
            <stop offset="50%" stopColor="#D49A2C" />
            <stop offset="100%" stopColor="#BE8520" />
          </radialGradient>
          <linearGradient id={petalGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8845A" />
            <stop offset="35%" stopColor="#DC7048" />
            <stop offset="70%" stopColor="#D0603C" />
            <stop offset="100%" stopColor="#BA5030" />
          </linearGradient>
        </defs>

        {segments.map((seg, i) => {
          const { delay, dur } = timings[i]
          return (
            <path
              key={seg.id}
              d={seg.d}
              stroke={getStroke(seg.group)}
              strokeWidth={getStrokeWidth(seg.group)}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={
                loop
                  ? {
                      strokeDasharray: seg.len,
                      strokeDashoffset: seg.len,
                      animation: `loop-${seg.id} ${loopDuration.toFixed(1)}s cubic-bezier(0.33, 1, 0.68, 1) infinite`,
                    }
                  : {
                      strokeDasharray: seg.len,
                      strokeDashoffset: isVisible ? 0 : seg.len,
                      transition: `stroke-dashoffset ${dur.toFixed(2)}s cubic-bezier(0.33, 1, 0.68, 1) ${delay.toFixed(2)}s`,
                    }
              }
            />
          )
        })}
      </svg>

      {/* Thin stroke line continuing from stem tip downward — bridges to the FlowingThread */}
      {showThread && !loop && (
        <svg
          width="2"
          height="120"
          viewBox="0 0 2 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
          aria-hidden="true"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="120"
            stroke="#5A7A56"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 120,
              strokeDashoffset: isVisible ? 0 : 120,
              transition: `stroke-dashoffset 1.5s cubic-bezier(0.33,1,0.68,1) ${totalDrawTime.toFixed(1)}s`,
            }}
          />
        </svg>
      )}
    </div>
  )
}
