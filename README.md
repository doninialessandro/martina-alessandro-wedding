# Martina & Alessandro — Wedding Website

I proposed at 4,554 meters on Capanna Margherita — Marti couldn't run away with no oxygen left. After nearly 20 years of crossing paths, countless passport stamps, and one very strategic altitude proposal, we're finally getting married on September 18, 2026. This is the website I built for the occasion, because apparently planning a marriage wasn't stressful enough, so I also had to argue over font sizes and scroll animations. Built with love, too much caffeine, and an unreasonable number of commits.

## Tech Stack

| Technology | Version |
|------------|---------|
| Next.js | 16.1.6 |
| React | 19.2.4 |
| TypeScript | 5.7.3 |
| Tailwind CSS | 4.2 |
| Biome | 2.4.4 |
| Motion (Framer) | 12.x |
| Supabase | 2.x |
| Vitest | 4.x |
| Playwright | 1.58.x |

## Getting Started

```bash
git clone <repo-url>
cd martina-alessandro-wedding
pnpm install
```

Create a `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Start the development server:

```bash
pnpm dev
```

## Project Structure

```
app/              Next.js App Router (layout, page, global CSS)
components/       Shared components (scroll-reveal, section-divider, monoline-flower)
hooks/            Custom hooks (useScrollProgress)
lib/              Utilities and data access (Supabase client, RSVP queries)
sections/         Page sections, each with index.tsx + copy.json
tests/            Shared test setup and mocks
e2e/              Playwright E2E tests
public/           Static assets (favicon, images)
```

## Sections

| Section | Description |
|---------|-------------|
| Hero | Full-viewport intro with animated sunflower, couple names, and countdown timer |
| Our Story | Timeline of key moments with scroll-driven photo reveals |
| Location | Venue details with embedded map |
| Program | Wedding day schedule with expandable details |
| RSVP | Interactive attendance form with family member selection and Supabase persistence |
| Lista Nozze | Gift registry information |
| Footer | Contact details and credits |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run Biome linter |
| `pnpm lint:fix` | Run Biome with auto-fix |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm check` | Lint + typecheck combined |
| `pnpm test` | Run all tests (unit + e2e) |
| `pnpm test:unit` | Run unit/component tests only |
| `pnpm test:unit:watch` | Run unit tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm test:e2e` | Run Playwright E2E tests only |

## Testing

### Unit & Component Tests

Run with [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/). Test files are co-located next to their source files (`*.test.{ts,tsx}`). Shared test infrastructure (setup, mocks) lives in `tests/`.

```bash
pnpm test:unit         # single run
pnpm test:unit:watch   # watch mode
pnpm test:coverage     # with coverage report
```

### E2E Tests

Run with [Playwright](https://playwright.dev/). Tests live in `e2e/` and exercise the full page against a running dev server.

```bash
pnpm test:e2e          # run all E2E tests (chromium, firefox, webkit)
```

**Structure:**

| File | Tests | Description |
|------|-------|-------------|
| `page-smoke.spec.ts` | 7 | Each section renders key content (all browsers) |
| `rsvp.spec.ts` | 20 | Full RSVP flow: happy path, decline, errors, update existing, form interactions (chromium only) |

Supabase API calls are intercepted at the network layer via `page.route()` — no real database needed. Mock helpers and fixtures live in `e2e/helpers/` and `e2e/fixtures/`.

## CI

GitHub Actions runs on every push to `main` and on pull requests:

1. **Lint & Typecheck** — Biome + `tsc --noEmit`
2. **Unit & Component Tests** — Vitest
3. **E2E Tests** — Playwright (chromium only in CI)

All three jobs run in parallel. Deployment is handled by Vercel on merge to `main`.

## Deployment

Deployed on Vercel. Images are configured as unoptimized (`images.unoptimized: true` in `next.config.mjs`) for static export compatibility.
