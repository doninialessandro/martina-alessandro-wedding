# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm lint         # Biome check (no auto-fix)
pnpm lint:fix     # Biome check with safe auto-fix
pnpm typecheck    # tsc --noEmit
pnpm check        # lint + typecheck combined
```

For unsafe Biome fixes: `pnpm biome check --write --unsafe .`

Commits are enforced by commitlint (conventional commits) via husky. Use `feat:`, `fix:`, `refactor:`, `style:`, `chore:`, etc.

## Architecture

Single-page Italian wedding site (Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4). No routing — `app/page.tsx` renders all sections in order: Hero → OurStory → Program → Location → RSVP → ListaNozze → Footer.

**Fonts:** EB Garamond (`--font-eb-garamond`, mapped to `font-serif`) for body text; Great Vibes (`--font-great-vibes`) for decorative script headings. Both loaded via `next/font/google` in `app/layout.tsx`.

**Color palette** (warm parchment theme, no dark mode):
- Background: `#FDFCFA` · Foreground: `#1A1A1A`
- Muted foreground: `#4A4440` · Accent (sage green): `#8E9E8C`
- Border/muted: `#D5CCBC` · `--radius: 0rem` (sharp corners everywhere)

CSS variables are defined in `app/globals.css` and exposed to Tailwind via `@theme inline`.

### Animation System

All scroll animations are **scroll-linked** (not CSS transitions triggered by intersection):

- **`useScrollProgress(offset)`** (`hooks/use-scroll-progress.ts`) — rAF-throttled hook that returns a `{ ref, progress }` where `progress` is 0→1 as the element scrolls from viewport bottom to top.
- **`ScrollReveal`** — wraps children with a clip-path mask (effect `'clip'`) or opacity+transform (effect `'slide'`) driven by `useScrollProgress`.
- **`WordReveal`** — animates each word from a muted hex color to its active color as the user scrolls.
- **`ParallaxFade`** — used in the hero; drifts element upward and fades it out as the user scrolls past.
- **`useScrollytelling(count)`** (`hooks/use-scrollytelling.ts`) — tracks which of N stacked items is closest to the viewport center; used in OurStory and Program sections to highlight the active item.

All primitives live in `components/scroll-reveal.tsx`. They use inline `style` transforms with `willChange` — avoid adding CSS transitions on elements that also use these hooks.

### Key Components

- **`MonolineFlower`** — custom animated SVG sunflower (stroke-dashoffset draw animation, triggered by IntersectionObserver). Accepts `size`, `animate`, `showThread` props. Used as a decorative element in the hero and section dividers.
- **`SectionDivider`** — thin decorative separator between page sections.
- **`components/ui/`** — shadcn-style Radix UI primitives (accordion, dialog, select, etc.). These are generic and rarely need modification.

### Linting (Biome 2.4.4)

- `noArrayIndexKey` and `noDangerouslySetInnerHtml` cannot be suppressed inline for certain files — use `overrides` in `biome.json` instead (already done for `chart.tsx` and `slider.tsx`).
- Use `{/* biome-ignore lint/... */}` inside JSX children; use `// biome-ignore lint/...` in TS/JS context.
- `useImportType` is enforced as an error — always use `import type` for type-only imports.
- `noUnusedImports` and `noUnusedVariables` are errors.
