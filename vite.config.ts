import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      input: {
        index: resolve(rootDir, 'index.html'),
        termgui: resolve(rootDir, 'termgui.html'),
      },
    },
  },
})