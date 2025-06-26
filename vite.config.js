import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
=======
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: [
<<<<<<< HEAD
      '5173-ia9b2j459lmam5k7fsfml-aa04639f.manusvm.computer',
=======
      '5173-1a9b2j4591mam5k7fsfml-aa04639f.manusvm.computer',
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
      'localhost',
      '127.0.0.1'
    ]
  }
})

