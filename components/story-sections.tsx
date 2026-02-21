"use client"

import { useInView } from "@/hooks/use-in-view"

interface StorySectionProps {
  title: string
  children: React.ReactNode
  id?: string
}

function StorySection({ title, children, id }: StorySectionProps) {
  const { ref, isInView } = useInView()

  return (
    <section id={id} ref={ref} className="py-24 md:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <h2
          className={`text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A] mb-8 md:mb-12 transition-all duration-800 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {title}
        </h2>
        <div
          className={`transition-all duration-800 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

export function BeginningsSection() {
  return (
    <StorySection title="The Beginnings" id="about">
      <p className="text-base md:text-lg leading-relaxed text-[#6B6B6B] font-serif">
        In late summer 2021, we formed a team of researchers from mathematics, engineering, philosophy, and arts to explore possible ways to adopt artificial intelligence in our activities, respecting the human values we believe in. We named this working group Solomei AI, inspired by the Latin name of the ancient village that hosts us.
      </p>
    </StorySection>
  )
}

export function CreativitySection() {
  return (
    <StorySection title="Human Creativity and Artificial Intelligence">
      <p className="text-base md:text-lg leading-relaxed text-[#6B6B6B] font-serif">
        A year later, towards the end of 2022, we had the idea of trying to use AI to innovate the way websites are designed and built, aiming to combine human creativity with the new potential offered by technology.
      </p>
    </StorySection>
  )
}

export function NewGenerationSection() {
  return (
    <StorySection title="A New Generation of Websites">
      <p className="text-base md:text-lg leading-relaxed text-[#6B6B6B] font-serif">
        We have envisioned new websites where content, no longer confined within pages, can flow freely. A new technology that supports websites capable of composing and organizing content in real time as users navigate. In naming the concepts and main technological components we developed, we have been inspired by some significant figures from our beloved ancient Greece.
      </p>
    </StorySection>
  )
}
