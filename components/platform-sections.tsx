"use client"

import { ScrollReveal, WordReveal } from "./scroll-reveal"

interface PlatformCardProps {
  name: string
  subtitle: string
  description: string
  align?: "left" | "right"
}

function PlatformCard({ name, subtitle, description, align = "left" }: PlatformCardProps) {
  const xShift = align === "right" ? -30 : 30

  return (
    <div className={`py-24 md:py-36 px-8 sm:px-12 md:px-16 ${align === "right" ? "md:text-right" : "md:text-left"}`}>
      <div className="max-w-[1000px] mx-auto">
        <div className={`max-w-2xl ${align === "right" ? "md:ml-auto" : ""}`}>

          <ScrollReveal translateY={40} translateX={xShift} start={0} end={0.3}>
            <h2
              className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-3"
              style={{ fontWeight: 400 }}
            >
              {name}
            </h2>
          </ScrollReveal>

          <ScrollReveal translateY={30} start={0.05} end={0.35}>
            <h3 className="text-lg md:text-xl font-serif italic text-[#C4A882] mb-8">
              {subtitle}
            </h3>
          </ScrollReveal>

          <WordReveal
            text={description}
            className="text-base md:text-lg leading-relaxed font-serif"
            offset={0.08}
            mutedColor="#D5CDC2"
            activeColor="#6B6B6B"
          />
        </div>
      </div>
    </div>
  )
}

export function PlatformSections() {
  return (
    <section id="platform" className="relative">
      <PlatformCard
        name="Socrates"
        subtitle={'"I know that I know nothing"'}
        description={'The platform we have created operates thanks to an orchestra of AI-based components and agents. Among them is Socrates, our agent who reads, understands, learns, knows how to say "I don\'t know," and is tasked with seeking the truth in dialogue with visitors.'}
        align="left"
      />
      <PlatformCard
        name="Demosthenes"
        subtitle="The Identity"
        description="Then there is Demosthenes, who writes and knows how to express himself with words and tones of voice consistent with the represented identity and the goal of each project, in the chosen languages."
        align="right"
      />
      <PlatformCard
        name="The Dioscuri"
        subtitle="The Protection"
        description="To protect the dialogues between the website and the visitor, we have created the Dioscuri, a pair of agents that monitor the correctness of the conversations and know when to intervene."
        align="left"
      />
      <PlatformCard
        name="Thamyr"
        subtitle="The Painter"
        description={'A very important component of our platform is Thamyr, named in honour of the great painter of ancient Greece. This component draws "impromptu" what each visitor sees, capturing their intent and guiding their exploration of the site.'}
        align="right"
      />
      <PlatformCard
        name="Theano"
        subtitle="The Architect"
        description="Theano, named after the Pythagorean philosopher, is our architect, the one who gives order to what the other components design and create. She is the technological engine of the project and was conceived to overcome the need for manual content loading."
        align="left"
      />
      <CallimacusSection />
    </section>
  )
}

function CallimacusSection() {
  return (
    <div className="py-24 md:py-36 px-8 sm:px-12 md:px-16 text-center">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal translateY={50} start={0} end={0.35}>
          <h2
            className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-8"
            style={{ fontWeight: 400 }}
          >
            Callimacus
          </h2>
        </ScrollReveal>
        <WordReveal
          text="The combination of these components and the orchestra of agents they coordinate constitutes Callimacus, our platform, named after the great philologist of ancient times. Thanks to the dialogic interaction that continuously interweaves each contribution, Callimacus assists and guides all phases of website creation: it verifies, reconstructs, modifies, corrects, and optimizes the content."
          className="text-base md:text-lg leading-relaxed font-serif"
          offset={0.08}
          mutedColor="#D5CDC2"
          activeColor="#6B6B6B"
        />
      </div>
    </div>
  )
}
