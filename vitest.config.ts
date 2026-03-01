import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
    coverage: {
      provider: 'istanbul',
      include: ['lib/**', 'hooks/**', 'sections/rsvp/**'],
      exclude: ['**/*.test.*', '**/copy.json', '**/*.md'],
      thresholds: {
        'lib/': { statements: 100, branches: 100, functions: 100, lines: 100 },
        'hooks/': { statements: 100, branches: 100, functions: 100, lines: 100 },
        'sections/rsvp/': { statements: 100, branches: 100, functions: 100, lines: 100 },
      },
    },
  },
})
