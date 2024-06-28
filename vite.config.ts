/// <reference types="vitest" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    // globals: true,
    includeSource: ['src/**/*.{ts}'],
    dir: './src/tests',
  },
});
