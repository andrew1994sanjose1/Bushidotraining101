import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Nilinis natin ang config para sa final deployment
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'bushidotraining101.onrender.com'
    ]
  },
  build: {
    // Sinisiguro nito na ang output folder ay laging 'dist'
    outDir: 'dist',
    sourcemap: false
  }
})
