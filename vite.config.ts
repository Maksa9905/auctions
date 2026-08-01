/// <reference types="vitest/config" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '');
  const mockPort = env.MOCK_PORT || '3001';

  return {
    plugins: [react(), tailwindcss()],
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
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${mockPort}`,
          changeOrigin: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{ts,tsx}', 'mock-server/**/*.{test,spec}.ts'],
      css: true,
      restoreMocks: true,
      clearMocks: true,
      server: {
        deps: {
          inline: ['mock-server'],
        },
      },
    },
  };
});
