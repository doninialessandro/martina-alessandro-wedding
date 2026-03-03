'use client'

import { motion } from 'motion/react'

interface ProgramModalProps {
  item: { time: string; title: string; description: string }
  onClose: () => void
}

export function ProgramModal({ item, onClose }: ProgramModalProps) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Centered modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 bg-card rounded-[16px] p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-4 right-4 text-muted-foreground font-serif text-lg"
        >
          ✕
        </button>
        <span className="text-xs tracking-[0.2em] uppercase text-accent font-serif block mb-1">
          {item.time}
        </span>
        <h3 className="text-2xl font-serif font-normal text-foreground mb-4">{item.title}</h3>
        <p className="text-base font-serif text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </>
  )
}
