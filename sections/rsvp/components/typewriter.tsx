'use client'

import { motion } from 'motion/react'

const container = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.03, delayChildren: delay },
  }),
}

const child = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const segmenter = new Intl.Segmenter('it', { granularity: 'grapheme' })

export function Typewriter({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const graphemes = [...segmenter.segment(text)].map((s) => s.segment)

  return (
    <motion.p
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      animate="visible"
    >
      {graphemes.map((char, i) => (
        <motion.span key={`${i}-${char}`} variants={child}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.p>
  )
}
