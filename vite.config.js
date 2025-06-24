import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '5173-1a9b2j4591mam5k7fsfml-aa04639f.manusvm.computer',
      'localhost',
      '127.0.0.1'
    ]
  }
})

