/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
    deps: {
      fallbackCJS: true,
    },
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
  },
  base: '/todo-list-firebase/',
  plugins: [react()],
})
