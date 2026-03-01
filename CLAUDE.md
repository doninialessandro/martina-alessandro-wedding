# CLAUDE.md

Single-page Italian wedding website (Next.js 16, React 19, TypeScript, Tailwind CSS v4).

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm lint         # Biome check (no auto-fix)
pnpm lint:fix     # Biome check with safe auto-fix
pnpm typecheck    # tsc --noEmit
pnpm check        # lint + typecheck combined
pnpm test          # run all tests (unit + e2e)
pnpm test:unit     # run unit/component tests only
pnpm test:unit:watch # run unit tests in watch mode
pnpm test:e2e      # run Playwright E2E tests only
pnpm test:coverage # run unit tests with coverage
```

Commits: conventional commits enforced via commitlint + husky (`feat:`, `fix:`, `refactor:`, etc.).

## Critical Constraints

- No routing — single page renders all sections in `app/page.tsx`
- No dark mode — warm parchment theme only
- Italian only — all copy lives in co-located `copy.json` files
- EB Garamond only — `font-serif`, loaded in `app/layout.tsx`
- Sharp corners — `--radius: 0rem` everywhere
- Scroll-linked animations only — never CSS transitions triggered by observers
- No `components/ui/` directory — shadcn was removed
- No `styles/` directory — CSS is in `app/globals.css`

## Testing

- Co-located tests: `*.test.{ts,tsx}` files sit next to their source files
- Shared test infra (setup, mocks) lives in `tests/`
- E2E tests live in `e2e/`
- Mock imports use `@/tests/mocks/*`, source imports use relative `./`

## Gotchas

- Biome 2.4.4: `{/* biome-ignore lint/... */}` in JSX children, `// biome-ignore lint/...` in TS/JS
- `useImportType` enforced as error — always `import type` for type-only imports
- `noUnusedImports` and `noUnusedVariables` are errors
- `@media (scripting: none)` + `data-nojs-hide`/`data-nojs-show` for progressive enhancement
- Path alias: `@/*` maps to repo root

## Rules

@architecture .claude/rules/architecture.md
@code-style .claude/rules/code-style.md
@animations .claude/rules/animations.md
@supabase .claude/rules/supabase.md
@rsvp sections/rsvp/CLAUDE.md
