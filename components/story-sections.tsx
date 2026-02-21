"use client"

import { ScrollReveal, WordReveal } from "./scroll-reveal"

interface StorySectionProps {
  title: string
  body: string
  id?: string
}

function StorySection({ title, body, id }: StorySectionProps) {
  return (
    <section id={id} className="py-28 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal translateY={50} start={0} end={0.35}>
          <h2
            className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-10 md:mb-14"
            style={{ fontWeight: 400 }}
          >
            {title}
          </h2>
        </ScrollReveal>
        <WordReveal
          text={body}
          className="text-base md:text-lg leading-relaxed font-serif"
          offset={0.1}
          mutedColor="#C0B5A6"
          activeColor="#3A3530"
        />
      </div>
    </section>
  )
}

export function BeginningsSection() {
  return (
    <StorySection
      title="The Beginnings"
      id="about"
      body="In late summer 2021, we formed a team of researchers from mathematics, engineering, philosophy, and arts to explore possible ways to adopt artificial intelligence in our activities, respecting the human values we believe in. We named this working group Solomei AI, inspired by the Latin name of the ancient village that hosts us."
    />
  )
}

export function CreativitySection() {
  return (
    <StorySection
      title="Human Creativity and Artificial Intelligence"
      body="A year later, towards the end of 2022, we had the idea of trying to use AI to innovate the way websites are designed and built, aiming to combine human creativity with the new potential offered by technology."
    />
  )
}

export function NewGenerationSection() {
  return (
    <StorySection
      title="A New Generation of Websites"
      body="We have envisioned new websites where content, no longer confined within pages, can flow freely. A new technology that supports websites capable of composing and organizing content in real time as users navigate. In naming the concepts and main technological components we developed, we have been inspired by some significant figures from our beloved ancient Greece."
    />
  )
}
