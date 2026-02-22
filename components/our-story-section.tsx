'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { NoiseRevealImage } from './noise-reveal-image'
import { ScrollReveal } from './scroll-reveal'

const storyBlocks = [
  {
    title: 'Il Big Bang del 2006',
    body: 'Era il lontano 2006 e, onestamente, i dettagli sono un po’ annebbiati. Non perché sia passato un decennio, ma perché il tasso alcolemico era decisamente sopra la soglia della dignità. Ci siamo incrociati in mezzo al caos, tra un drink di troppo e battute che facevano ridere solo noi (o forse erano solo l’effetto dell’alcol). Nessun colpo di fulmine da film, solo due disperati che barcollavano nella stessa direzione. Eppure, in quel disagio etilico, abbiamo capito che i nostri due neuroni rimasti viaggiavano sulla stessa, assurda frequenza.',
    photo: 'Foto 1',
    photoColor: '#F2F0EB',
    src: '',
  },
  {
    title: 'Flashback 2011: Il Disagio delle Origini',
    body: 'Fermi tutti, facciamo un salto in avanti: era il 2011. Per qualche motivo cosmico e inspiegabile, dopo ben 5 anni dal primo incrocio alcolico, siamo finiti al nostro primissimo, vero appuntamento. Un mix letale tra ‘cosa sto facendo della mia vita?’ e il tentativo disperato di sembrare persone vagamente normali. Abbiamo sudato freddo cercando di fare i fighi in un posto che, col senno di poi, era clamorosamente sbagliato. È stato un disastro epico e imbarazzante, ma in fondo quel disagio condiviso era l’inizio di una roba pazzesca che non si è più fermata.',
    photo: 'Foto 2',
    photoColor: '#E8EDE7',
    src: '',
  },
  {
    title: 'La Sopravvivenza in Quota',
    body: 'Il battesimo del fuoco. Invece del classico cinema o cena pettinata, abbiamo deciso di testare subito i limiti di sopravvivenza (e di sopportazione reciproca) buttandoci su un sentiero spacca-gambe. Tra fiato corto, sudore freddo e la costante sensazione di aver fatto una cazzata clamorosa, abbiamo scoperto una cosa fondamentale: se riesci a non odiare l’altro mentre arranchi in salita imprecando contro la pendenza, allora c’è speranza. Un’avventura pazzesca che ha settato il livello di disagio per tutto quello che sarebbe venuto dopo.',
    photo: 'Foto 3',
    photoColor: '#E8EDE7',
    src: '',
  },
  {
    title: 'Il Salto nel Vuoto del 2017: Destinazione Monza',
    body: 'A un certo punto, nel 2017, ci siamo guardati e abbiamo pensato: ‘Perché non testiamo se riusciamo a sopravvivere sotto lo stesso tetto senza ammazzarci?’. Così abbiamo caricato scatoloni a caso e fatto il grande salto: direzione Monza, la nostra prima vera avventura di convivenza. Un esperimento sociale fatto di mobili IKEA montati malissimo, guerre per lo spazio vitale negli armadi e la scoperta che condividere un bagno è più estremo di un trekking nel Borneo. Non avevamo idea di cosa stessimo facendo, ma tra un disastro domestico e l’altro abbiamo iniziato a costruire il nostro primo, vero quartier generale',
    photo: 'Foto 4',
    photoColor: '#E8EDE7',
    src: '',
  },
  {
    title: 'L’Arrivo del Maestro Jedi a Quattro Zampe',
    body: 'L’arrivo della vera scheggia impazzita dell’equipaggio. Obi-Wan sulla carta è un Cavalier King, una razza che dovrebbe essere tutta moine e nobiltà. Invece no: lui odia l’umanità intera, abbaia a qualsiasi cosa si muova ed ha più fobie di un gatto circondato da aspirapolveri accesi. Tra passeggiate all’alba con temperature polari e le sue famigerate, letali scoregge radioattive di quando era cucciolo, ci ha addestrati lui alla sopravvivenza in trincea. Gestirlo è peggio che guidare un TukTuk bendati, ma le sue fobie allucinanti ci hanno resi ufficialmente un branco a prova di bomba.',
    photo: 'Foto 5',
    photoColor: '#E8EDE7',
    src: '',
  },
  {
    title: ' Campo Base Finale: Gorgonzola (Senza Formaggio)',
    body: 'L’ultimo step prima del delirio totale. Abbiamo alzato l’asticella, fatto i bagagli per l’ennesima volta e spostato il campo base a Gorgonzola. Niente battute sul formaggio, per favore. Qui abbiamo trovato il nostro habitat naturale, un posto dove parcheggiare l’ansia e organizzare le missioni future. Traslocare è stato uno sbattimento epico, roba da farti passare la voglia di viaggiare per sei mesi, ma ora che le scatole sono (quasi) tutte svuotate, questo è ufficialmente il nostro rifugio. Pronti a ripartire, ma con un posto figo in cui tornare.',
    photo: 'Foto 6',
    photoColor: '#EDE8E4',
    src: '',
  },
  {
    title: 'La proposta',
    body: 'Niente ristorantini a lume di candela o sceneggiate in ginocchio. La proposta è arrivata lassù, alla Capanna Margherita, a quota 4.554 metri esatti (contati uno per uno con i polmoni in fiamme). Diciamocelo chiaramente: l’ho presa per sfinimento. Tra l’ipossia, il freddo cane e la fatica bestia, lei non aveva più le forze per scappare o dire di no. Era l’unico modo per riuscirci, visto quanto tempo ho aspettato. Una vittoria tattica, ottenuta con sudore, fiato corto e una vista allucinante che ti toglieva quel poco di ossigeno rimasto.',
    photo: 'Foto 6',
    photoColor: '#EDE8E4',
    src: '',
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
    <section className="py-24 md:py-40 px-8 sm:px-12 md:px-16">
      <div className="max-w-[1100px] mx-auto">
        {/* Mobile: stacked layout (no sticky) */}
        <div className="md:hidden">
          <ScrollReveal translateY={18} start={0} end={0.35}>
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-16">
              La nostra storia
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-24">
            {storyBlocks.map((block, _index) => (
              <div key={block.title}>
                <ScrollReveal translateY={14} start={0} end={0.35} offset={0.1}>
                  <h3 className="text-2xl font-serif font-normal text-[#1A1A1A] mb-4">
                    {block.title}
                  </h3>
                </ScrollReveal>
                <ScrollReveal translateY={14} start={0.05} end={0.4} offset={0.1}>
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
          <ScrollReveal translateY={18} start={0} end={0.35}>
            <h2 className="text-sm tracking-[0.3em] uppercase text-[#8E9E8C] font-serif text-center mb-20">
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
            style={{ height: `${COUNT * 100}vh`, gridTemplateColumns: '1fr 380px' }}
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
                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
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

            {/* RIGHT — sticky photo, crossfades on activeIndex change */}
            <div className="sticky top-0 h-screen self-start flex items-center">
              <div className="relative w-full aspect-[3/4]">
                <AnimatePresence>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <NoiseRevealImage
                      key={activeIndex}
                      src={storyBlocks[activeIndex]?.src || undefined}
                      background="#FDFCFA"
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backgroundColor: storyBlocks[activeIndex]?.photoColor ?? '#F2F0EB',
                        }}
                      >
                        <span className="text-sm tracking-[0.2em] uppercase text-[#8E9E8C] font-serif">
                          {storyBlocks[activeIndex]?.photo}
                        </span>
                      </div>
                    </NoiseRevealImage>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
