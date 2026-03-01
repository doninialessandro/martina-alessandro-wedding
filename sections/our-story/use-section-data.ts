'use client'

import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'

export function useSectionData(count: number) {
  const storiaRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: storiaRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(Math.round(v * (count - 1)), count - 1))
  })

  return { storiaRef, activeIndex }
}
