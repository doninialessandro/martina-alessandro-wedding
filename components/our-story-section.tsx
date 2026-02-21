"use client"

import { ScrollReveal } from "./scroll-reveal"

const storyBlocks = [
  {
    title: "Come ci siamo conosciuti",
    body: "[Testo da inserire — racconta come vi siete incontrati per la prima volta, il luogo, le circostanze, cosa vi ha colpito l'uno dell'altra.]",
    imagePosition: "right" as const,
  },
  {
    title: "Il primo appuntamento",
    body: "[Testo da inserire — il vostro primo vero appuntamento, dove siete andati, cosa avete fatto, le emozioni di quella giornata.]",
    imagePosition: "left" as const,
  },
  {
    title: "La proposta",
    body: "[Testo da inserire — il momento della proposta di matrimonio, come è avvenuta, le parole dette, la reazione.]",
    imagePosition: "right" as const,
  },
]

export function OurStorySection() {
  return (
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1000px] mx-auto">

        <ScrollReveal translateY={40} start={0} end={0.35}>
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20 md:mb-28">
            La nostra storia
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-24 md:gap-36">
          {storyBlocks.map((block, index) => (
            <StoryBlock key={index} {...block} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryBlock({
  title,
  body,
  imagePosition,
  index,
}: {
  title: string
  body: string
  imagePosition: "left" | "right"
  index: number
}) {
  const isImageRight = imagePosition === "right"

  return (
    <div className={`flex flex-col ${isImageRight ? "md:flex-row" : "md:flex-row-reverse"} gap-10 md:gap-16 items-center`}>
      {/* Text */}
      <div className="flex-1">
        <ScrollReveal translateY={30} start={0} end={0.35} offset={0.1}>
          <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A] mb-4">
            {title}
          </h3>
        </ScrollReveal>
        <ScrollReveal translateY={30} start={0.05} end={0.4} offset={0.1}>
          <p className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440]">
            {body}
          </p>
        </ScrollReveal>
      </div>

      {/* Photo placeholder */}
      <ScrollReveal className="flex-1 w-full" translateY={40} start={0} end={0.4} offset={0.1} effect="slide">
        <div className="w-full aspect-[4/5] md:aspect-[3/4] bg-[#EDE8DA] flex items-center justify-center">
          <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
            Foto {index + 1}
          </span>
        </div>
      </ScrollReveal>
    </div>
  )
}
