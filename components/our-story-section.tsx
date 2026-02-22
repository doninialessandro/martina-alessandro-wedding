'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { NoiseRevealImage } from './noise-reveal-image'
import { ScrollReveal } from './scroll-reveal'

const storyBlocks = [
  {
    title: 'La Nostra Storia',
    body: 'Il nostro viaggio è partito nel 2006, quasi per caso: sguardi incrociati e battute complici come scintille inaspettate. Dopo anni di amicizia, in cui le nostre strade si incrociavano come in una lunga esplorazione, cinque anni dopo siamo finalmente arrivati al primo appuntamento ufficiale: emozione palpabile, sorrisi imbarazzati e il goffo tentativo di sembrare perfetti. Quella sera abbiamo tracciato le coordinate per una rotta speciale. Tappa dopo tappa, abbiamo costruito il nostro porto sicuro: prima Monza, con un divano di dubbia comodità, poi Gorgonzola, il rifugio dove tornare dopo ogni avventura.',
    photoColor: '#EDE8DC',
    src: 'images/our-story/la_nostra_storia.webp',
  },
  {
    title: 'I Viaggi nel Mondo',
    body: 'La nostra passione per l’avventura ci ha spinto a solcare il mondo, riempiendo il passaporto di tappe indimenticabili: Portogallo, Islanda, Giordania, Francia, Giappone, Perù, Egitto e molte altre. Ma quando non esploriamo culture lontane, ci trovate quasi sempre su qualche sentiero di montagna: tra scarponi infangati, sveglie all’alba e vette da conquistare, ogni chilometro macinato insieme ci ha unito di più, riempiendo la valigia di ricordi che ci terranno compagnia per tutta la vita.',
    photoColor: '#EDE8DC',
    photo: 'Viaggi',
    src: 'images/our-story/viaggi_nel_mondo.webp',
  },
  {
    title: 'Una Proposta a 4.554 Metri',
    body: "Niente classiche cene a lume di candela per noi: la vetta più alta del nostro itinerario è arrivata alla Capanna Margherita, a quota 4.554 metri (contati uno per uno con i polmoni in fiamme). Diciamocelo, Ale ha usato una strategia geniale: la conquista per sfinimento. Tra l'ipossia e la fatica immensa, Marti non aveva letteralmente le forze per scappare! Ma tattiche a parte, lassù, abbracciati dal silenzio assoluto e dal tetto del mondo, la fatica è sparita davanti a quella domanda. Una vetta sudata e bellissima, che ci ha tolto definitivamente quel poco di fiato rimasto.",
    photoColor: '#EDE8DC',
    photo: 'Proposta',
    src: '/images/our-story/proposta.webp',
  },
  {
    title: 'E Ora... La Prossima Destinazione!',
    body: "Ed eccoci qui, pronti per l'inizio del viaggio più lungo! Il 18 Settembre 2026 celebriamo la partenza ufficiale per il resto della nostra vita insieme. Vogliamo festeggiare questo traguardo con tutte le persone che ci hanno accompagnato fin qui. Preparate i bagagli per il giorno più importante: andiamo a scrivere il nostro prossimo capitolo!",
    photoColor: '#EDE8DC',
    photo: 'Matrimonio',
    src: '/images/our-story/prossima_destinazione.webp',
  },
]

const COUNT = storyBlocks.length

export function OurStorySection() {
  const storiaRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: storiaRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(Math.round(v * (COUNT - 1)), COUNT - 1))
  })

  return (
    <section className="min-h-[100svh] py-16 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        {/* Mobile: stacked layout (no sticky) */}
        <div className="md:hidden">
          <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-16">
              La nostra storia
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-24">
            {storyBlocks.map((block, _index) => (
              <div key={block.title}>
                <ScrollReveal translateY={14} start={0} end={0.35} offset={0.1} effect="slide">
                  <h3 className="text-2xl font-serif font-normal text-[#1A1A1A] mb-4">
                    {block.title}
                  </h3>
                </ScrollReveal>
                <ScrollReveal translateY={14} start={0.05} end={0.4} offset={0.1} effect="slide">
                  <p className="text-base leading-relaxed font-serif text-[#4A4440] mb-8">
                    {block.body}
                  </p>
                </ScrollReveal>
                <ScrollReveal translateY={18} start={0} end={0.4} offset={0.1} effect="slide">
                  <div className="w-full aspect-[4/5] relative bg-[#FDFCFA]">
                    <NoiseRevealImage
                      key={block.src || block.title}
                      src={block.src || undefined}
                      background="#FDFCFA"
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: block.photoColor }}
                      >
                        <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                          {block.photo}
                        </span>
                      </div>
                    </NoiseRevealImage>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: scrollytelling */}
        <div className="hidden md:block">
          <ScrollReveal translateY={18} start={0} end={0.35} effect="slide">
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-16 md:mb-20">
              La nostra storia
            </h2>
          </ScrollReveal>

          {/*
           * Grid layout: left column scrolls (text), right column is sticky (photo).
           * Height = COUNT × 100vh so every text block gets exactly one viewport of scroll
           * space; sticky releases naturally when the container exits the viewport.
           * self-start on the sticky column prevents grid from stretching it to full height.
           * offset ["start start","end end"]: progress 0→1 over (COUNT−1)×100vh of scroll.
           * activeIndex = round(v × (COUNT−1)) — correct midpoint transition per block.
           */}
          <div
            ref={storiaRef}
            className="relative grid gap-16 lg:gap-24"
            style={{ height: `${COUNT * 100}vh`, gridTemplateColumns: '1fr 1fr' }}
          >
            {/* LEFT — text blocks scroll with the page */}
            <div className="flex flex-col">
              {storyBlocks.map((block, index) => (
                <div key={block.title} className="h-screen flex items-center">
                  <motion.div
                    className="py-12"
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.3,
                      scale: activeIndex === index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#1A1A1A] mb-4">
                      {block.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed font-serif text-[#4A4440]">
                      {block.body}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* RIGHT — sticky photo */}
            <div className="sticky top-0 h-screen self-start flex items-center">
              <div className="relative w-full aspect-[3/4]">
                <AnimatePresence>
                  {storyBlocks.map((block, index) =>
                    index === activeIndex ? (
                      <motion.div
                        key={block.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0"
                      >
                        <NoiseRevealImage
                          src={block.src || undefined}
                          background="#FDFCFA"
                          className="absolute inset-0"
                        >
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ backgroundColor: block.photoColor ?? '#F2F0EB' }}
                          >
                            <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                              {block.photo}
                            </span>
                          </div>
                        </NoiseRevealImage>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
