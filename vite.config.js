import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      // 'localhost',
      '180.93.52.86',
      '127.0.0.1',
    ]
  }
})
