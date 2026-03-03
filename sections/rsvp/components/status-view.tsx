'use client'

import { motion } from 'motion/react'
import { MonolineFlower } from '@/components/monoline-flower'
import { Typewriter } from '@/components/typewriter'
import type { FamilyMember } from '@/lib/supabase/types'
import type { Step } from '../use-section-data'
import { ConfettiBurst } from './confetti-burst'

interface StatusCopy {
  loading: { message: string }
  notFound: { title: string; subtitle: string; retryButton: string }
  success: {
    title: string
    messageSingular: string
    messagePlural: string
    editPrompt: string
    editLink: string
  }
  declined: {
    titleSingular: string
    titlePlural: string
    messageSingular: string
    messagePlural: string
    editPrompt: string
    editLink: string
  }
  error: { title: string; subtitle: string; retryButton: string }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

interface RsvpStatusViewProps {
  copy: StatusCopy
  step: Step
  familyMembers: FamilyMember[]
  search: () => void
  reset: () => void
}

export function RsvpStatusView({ copy, step, familyMembers, search, reset }: RsvpStatusViewProps) {
  const isPlural = familyMembers.length > 1

  if (step === 'loading') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-6"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <MonolineFlower size={120} loop />
        <Typewriter
          text={copy.loading.message}
          className="text-sm font-serif text-muted-foreground tracking-wide"
        />
      </motion.div>
    )
  }

  if (step === 'notfound') {
    return (
      <motion.div
        className="text-center"
        aria-live="polite"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Typewriter
          text={copy.notFound.title}
          className="text-base md:text-lg font-serif text-foreground mb-2"
        />
        <Typewriter
          text={copy.notFound.subtitle}
          className="text-sm font-serif text-muted-foreground mb-10"
          delay={1.2}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
        >
          <button
            type="button"
            onClick={reset}
            className="px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase rounded-[50px] border border-accent text-accent hover:bg-accent hover:text-background hover:-translate-y-0.5 hover:shadow-hover active:scale-[0.97] transition-all duration-200"
          >
            {copy.notFound.retryButton}
          </button>
        </motion.div>
      </motion.div>
    )
  }

  if (step === 'submitting') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-6"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <MonolineFlower size={120} loop />
      </motion.div>
    )
  }

  if (step === 'success') {
    return (
      <motion.div
        className="text-center"
        aria-live="polite"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <ConfettiBurst />
        <Typewriter
          text={copy.success.title}
          className="text-base md:text-lg leading-relaxed font-serif text-muted-foreground mb-1"
        />
        <Typewriter
          text={isPlural ? copy.success.messagePlural : copy.success.messageSingular}
          className="text-base md:text-lg leading-relaxed font-serif text-muted-foreground"
          delay={0.5}
        />
        <motion.p
          className="text-sm font-serif text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
        >
          {copy.success.editPrompt}
          <button
            type="button"
            onClick={search}
            className="underline underline-offset-2 text-accent hover:text-muted-foreground transition-colors"
          >
            {copy.success.editLink}
          </button>
        </motion.p>
      </motion.div>
    )
  }

  if (step === 'declined') {
    return (
      <motion.div
        className="text-center"
        aria-live="polite"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Typewriter
          text={isPlural ? copy.declined.titlePlural : copy.declined.titleSingular}
          className="text-base md:text-lg leading-relaxed font-serif text-muted-foreground mb-1"
        />
        <Typewriter
          text={isPlural ? copy.declined.messagePlural : copy.declined.messageSingular}
          className="text-base md:text-lg leading-relaxed font-serif text-muted-foreground"
          delay={0.7}
        />
        <motion.p
          className="text-sm font-serif text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
        >
          {copy.declined.editPrompt}
          <button
            type="button"
            onClick={search}
            className="underline underline-offset-2 text-accent hover:text-muted-foreground transition-colors"
          >
            {copy.declined.editLink}
          </button>
        </motion.p>
      </motion.div>
    )
  }

  if (step === 'error') {
    return (
      <motion.div
        className="text-center"
        aria-live="polite"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Typewriter
          text={copy.error.title}
          className="text-base md:text-lg font-serif text-foreground mb-2"
        />
        <Typewriter
          text={copy.error.subtitle}
          className="text-sm font-serif text-muted-foreground mb-10"
          delay={1}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.4 }}
        >
          <button
            type="button"
            onClick={reset}
            className="px-10 py-3 text-sm font-serif tracking-[0.2em] uppercase rounded-[50px] border border-accent text-accent hover:bg-accent hover:text-background hover:-translate-y-0.5 hover:shadow-hover active:scale-[0.97] transition-all duration-200"
          >
            {copy.error.retryButton}
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return null
}
