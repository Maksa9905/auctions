import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const root = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
      '@app': path.resolve(root, 'src/app'),
      '@pages': path.resolve(root, 'src/pages'),
      '@shared': path.resolve(root, 'src/shared'),
    },
  },
})
