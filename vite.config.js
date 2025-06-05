
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: '07129ea9-3cd4-4eab-9d03-6914e237747a-00-2wfd2i0qib3e5.pike.replit.dev'
  }
})
