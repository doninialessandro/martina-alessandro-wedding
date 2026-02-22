# Martina & Alessandro Wedding Website

This repository contains a single-page wedding site built with **Next.js 16 App Router**, **React 19**, and **TypeScript**. The design is focused on a warm parchment aesthetic and scroll‑linked animations to create an elegant, story‑driven experience.

## 🚀 Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Use the provided `commitlint` hooks and linting scripts before committing changes.

## 📁 Project Structure

- `app/` – Next.js App Router folder; `page.tsx` orchestrates the entire one‑page layout.
- `components/` – Reusable UI sections (Hero, Our Story, Program, Location, RSVP, Lista Nozze, Footer) and animation primitives.
- `hooks/` – Custom hooks powering scroll animations (`useScrollProgress`, `useScrollytelling`).
- `styles/` – Tailwind and global CSS settings.
- `public/` – Static assets.

## 🎨 Design & Styles

- **Colors:** Background `#FDFCFA`, Foreground `#1A1A1A`, Accent `#8E9E8C`, with muted tones for text and borders.
- **Fonts:** EB Garamond (`font-serif`) globally via `next/font/google`.
- **Animations:** Scroll‑linked reveals, parallax, word reveals, and a custom SVG `MonolineFlower` animation.

## ✨ Animation System

- `useScrollProgress(offset)` returns a ref + progress value (0→1) as an element scrolls through the viewport.
- `ScrollReveal`, `WordReveal`, `ParallaxFade` components use this hook for clip masks or transforms.
- `useScrollytelling(count)` tracks the active item in vertical storytelling sections.

See `components/scroll-reveal.tsx` for implementation details.

## 🛠 Tooling & Scripts

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "pnpm biome check",
  "lint:fix": "pnpm biome check --write --unsafe .",
  "typecheck": "tsc --noEmit",
  "check": "pnpm lint && pnpm typecheck"
}
```

Linting is powered by **Biome** with custom overrides for specific files. Commit messages follow conventional commit rules enforced via Husky.

## 📌 Notes

- No routing; the page contains all sections in order.
- Sharp corners (`--radius: 0rem`) and a muted color palette reflect a parchment theme.
- UI primitives under `components/ui/` follow the shadcn/Radix pattern but are generic.

## ✅ Contributing

Make sure to run `pnpm check` before committing. Use descriptive conventional commit messages (`feat:`, `fix:`, `refactor:`, etc.).

---

*Created on 21 febbraio 2026.*
