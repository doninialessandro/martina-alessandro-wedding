# Architecture

## Folder Structure

```
app/              # Next.js App Router — layout.tsx, page.tsx, globals.css
components/       # Shared components (scroll-reveal, section-divider, monoline-flower, typewriter)
hooks/            # Custom hooks (use-scroll-progress)
lib/              # Utilities and data access
  rsvp/           #   queries.ts — Supabase RSVP queries
  supabase/       #   client.ts, types.ts — Supabase client and type definitions
sections/         # Page sections, each in its own folder
  hero/           #   index.tsx, copy.json, use-section-data.ts, components/ (countdown, scroll-hint, emoji-burst), layouts/
  our-story/      #   index.tsx, copy.json, use-section-data.ts, components/, layouts/
  location/       #   index.tsx, copy.json, components/ (venue-map with Mapbox GL)
  program/        #   index.tsx, copy.json, use-section-data.ts, components/, layouts/
  rsvp/           #   index.tsx, copy.json, use-section-data.ts, components/
  lista-nozze/    #   index.tsx, copy.json
  footer/         #   index.tsx, copy.json
public/           # Static assets (favicon, images)
tests/            # Shared test infra (setup.ts, mocks/)
e2e/              # Playwright E2E tests
```

## Section Anatomy

Each section folder follows this pattern:
- `index.tsx` — main section component (named export)
- `copy.json` — all Italian text content
- `use-section-data.ts` — optional hook for section-specific state/logic
- `components/` — optional sub-components
- `layouts/` — optional responsive layout variants (desktop.tsx, mobile.tsx)

## Section Rendering Order

`app/page.tsx` renders: Hero > SectionDivider > OurStory > SectionDivider > Location > SectionDivider > Program > SectionDivider > RSVP > SectionDivider > ListaNozze > Footer

## Naming Conventions

- Files: kebab-case (`use-section-data.ts`, `member-select.tsx`)
- Components: PascalCase (`RsvpSearchForm`, `MonolineFlower`)
- Exports: named exports only, no default exports (except `app/page.tsx`)
- Path alias: `@/*` maps to repository root

## Testing

Tests are co-located next to the source files they test:

```
hooks/
  use-scroll-progress.ts
  use-scroll-progress.test.ts       # co-located test
lib/rsvp/
  queries.ts
  queries.test.ts
sections/rsvp/
  use-section-data.ts
  use-section-data.test.ts
  components/
    search-form.tsx
    search-form.test.tsx
    member-select.tsx
    member-select.test.tsx
    status-view.tsx
    status-view.test.tsx
sections/location/
  components/
    venue-map.tsx
    venue-map.test.tsx
sections/hero/
  use-section-data.ts
  use-section-data.test.ts
  components/
    countdown.tsx
    countdown.test.tsx
components/
  scroll-reveal.tsx
  scroll-reveal.test.tsx
  section-divider.tsx
  section-divider.test.tsx
  typewriter.tsx
```

Shared test infrastructure stays in `tests/`:

```
tests/
  setup.ts                           # jsdom setup, global mocks
  mocks/
    supabase.ts                      # Supabase client mock with chainable API
    motion.ts                        # motion/react mock (renders plain HTML)
    scroll.ts                        # getBoundingClientRect + window dimension mocks
```

E2E tests live in `e2e/` (separate from unit tests).

## Key Absences

- No `components/ui/` directory (shadcn/Radix removed)
- No `styles/` directory (CSS in `app/globals.css`)
- No `useScrollytelling` hook (removed)
- No API routes or server actions — all data access is client-side
