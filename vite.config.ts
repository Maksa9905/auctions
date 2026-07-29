/// <reference types="vitest/config" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
      '@app': path.resolve(root, 'src/app'),
      '@pages': path.resolve(root, 'src/pages'),
      '@widgets': path.resolve(root, 'src/widgets'),
      '@features': path.resolve(root, 'src/features'),
      '@entities': path.resolve(root, 'src/entities'),
      '@shared': path.resolve(root, 'src/shared'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    css: true,
    restoreMocks: true,
    clearMocks: true,
  },
});
