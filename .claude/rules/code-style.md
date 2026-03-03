# Code Style

## TypeScript

- Strict mode enabled (`strict: true` in tsconfig)
- `import type` enforced (`useImportType: error`) — always use for type-only imports
- No implicit any (`noExplicitAny: warn`)
- Props defined via `interface`, not `type`

## React

- Named exports only, no default exports
- `'use client'` directive on components/hooks that use browser APIs or React hooks
- Props via interfaces (e.g., `interface RsvpSearchFormProps { ... }`)

## Biome 2.4.4

Formatter settings:
- Single quotes
- No semicolons (`asNeeded`)
- Trailing commas: ES5
- 2-space indent
- 100-character line width
- LF line endings

Linter rules:
- `noUnusedImports`: error
- `noUnusedVariables`: error
- `useImportType`: error
- `noExcessiveCognitiveComplexity`: warn
- `noArrayIndexKey`: warn
- `noExplicitAny`: warn

Suppress syntax:
- In JSX children: `{/* biome-ignore lint/category/ruleName: reason */}`
- In TS/JS context: `// biome-ignore lint/category/ruleName: reason`

## Import Order

1. External packages (`react`, `motion/react`, `next/...`)
2. `@/` aliased imports (`@/components/...`, `@/lib/...`)
3. Relative imports (`./components/...`, `../use-section-data`)

## Testing Conventions

- Test files are co-located: `foo.test.ts` next to `foo.ts`
- Naming: `{source-file}.test.{ts,tsx}`
- Source imports use relative paths (`./queries`, `./search-form`)
- Mock imports use `@/tests/mocks/*` (`@/tests/mocks/supabase`, `@/tests/mocks/motion`)
- Shared mocks: `tests/mocks/supabase.ts` (chainable Supabase mock), `tests/mocks/motion.ts` (motion/react passthrough), `tests/mocks/scroll.ts` (bounding rect + window dimension mocks)
- Use `vi.mock()` for module mocking, `vi.fn()` for function spies
- Component tests: `@testing-library/react` + `userEvent`

## Color Palette

Light theme (default):
- Background: `#FDFCFA` / Foreground: `#1A1A1A`
- Muted foreground: `#4A4440`
- Accent (sage green): `#8E9E8C`
- Border/muted: `#D5CCBC`

Dark theme (`data-theme="dark"` on `:root`):
- Background: `#1C1714` / Foreground: `#F0EBE3`
- Muted foreground: `#B8AFA5`
- Accent (sage green): `#A4B4A2`
- Border/muted: `#3D342C`

Additional variables: `--photo-placeholder`, `--map-placeholder`, `--shadow-subtle`, `--shadow-hover`
- CSS variables defined in `app/globals.css`, exposed via `@theme inline`
- All component colors must use CSS variables (no hardcoded hex values)
