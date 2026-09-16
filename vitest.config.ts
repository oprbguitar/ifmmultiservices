import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['dist/**', 'coverage/**', '**/*.test.ts', '*.config.ts', '*.config.js', 'src/App.tsx', 'src/main.tsx', 'src/components/**', 'src/hooks/**', 'src/types/**', 'src/vite-env.d.ts'],
      thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
    },
  },
})
