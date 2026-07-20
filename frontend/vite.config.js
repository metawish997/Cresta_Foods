import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://crestafoods.in', // Local Backend URI
        // target: 'http://localhost:5001', // Production URI
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://crestafoods.in', // Local Backend URI
        // target: 'https://crestafoods.in', // Production URI
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'https://crestafoods.in', // Local Backend URI
        // target: 'https://crestafoods.in', // Production URI
        ws: true,
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react-simple-maps', 'prop-types']
  },
  build: {
    commonjsOptions: {
      include: [/react-simple-maps/, /node_modules/]
    }
  }
})