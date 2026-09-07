import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line
      '@': path.resolve(import.meta.dirname, './src')
    }
  },
  server: {
    port: 5173,
    open: true, // <-- essa linha abre o navegador automaticamente
  },
})
