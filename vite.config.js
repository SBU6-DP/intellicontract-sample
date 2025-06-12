import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.xlsx'],
  plugins: [react()],
  server: {
    port: 3000, // 👈 Set your desired port here
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 👇 This is important for client-side routing
  base: '/',
})
