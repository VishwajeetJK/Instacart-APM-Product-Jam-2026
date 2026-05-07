import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages project URL: /<repo-name>/connected-delivery-pitch/
  base: '/Instacart-APM-Product-Jam-2026/connected-delivery-pitch/',
})
