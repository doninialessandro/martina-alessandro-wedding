# Animations

## Scroll-Linked Primitives

All scroll animations use `useScrollProgress` (rAF-throttled), NOT CSS transitions triggered by IntersectionObserver.

### `useScrollProgress(offset)` — `hooks/use-scroll-progress.ts`
- Returns `{ ref, progress }` where progress is 0-1
- progress=0: element bottom at viewport bottom; progress=1: element top at viewport top
- Uses `requestAnimationFrame` for 60fps, passive scroll/resize listeners
- Clamps output to [0, 1]

### `ScrollReveal` — `components/scroll-reveal.tsx`
- Effect `'clip'`: clip-path inset reveal from bottom (default)
- Effect `'slide'`: opacity + transform + blur-in
- Easing: quadratic ease-in-out (`local < 0.5 ? 2*local*local : 1 - (-2*local+2)**2/2`)
- Sets `data-animate` attribute on wrapper div

### `ParallaxFade` — `components/scroll-reveal.tsx`
- Hero-specific: drifts up, scales down, fades to 0.4 opacity
- Starts fading at progress=0.45

## SVG Animations

### `MonolineFlower` — `components/monoline-flower.tsx`
- Stroke-dashoffset draw animation with sequential segment timing
- Two modes: IntersectionObserver trigger (`animate=true`) or continuous loop (`loop=true`)
- Segments: stem > leaves > center spiral > petals
- `showThread` prop adds a trailing vertical line

### `SectionDivider` — `components/section-divider.tsx`
- Mountain profile SVG (Monte Rosa)
- Scroll-driven: opacity fade-in + stroke-dashoffset draw (right to left)
- Uses `useScrollProgress(0.3)`

## Framer Motion (`motion/react`)

Used in: OurStory, Program, RSVP (member-select, status-view, confetti-burst, typewriter)
- `motion.div` with `variants`, `initial="hidden"`, `animate="visible"`
- Easing: `[0.25, 0.46, 0.45, 0.94]` (soft cubic-bezier) for Framer variants
- `AnimatePresence` for enter/exit transitions
- `useAnimationFrame` for confetti physics

## Rules

- Never add CSS transitions on elements that also use scroll hooks
- `data-animate` marks scroll-animated elements
- `data-nojs-hide` / `data-nojs-show` for progressive enhancement
- `willChange` is set inline by scroll primitives — don't add it via CSS
- `@media (scripting: none)` in globals.css hides `data-nojs-hide` and shows `data-nojs-show`
