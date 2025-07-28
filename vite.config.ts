import path from 'path'
import { defineConfig } from 'vite'

// plugins
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
     port: 3000 
  },
  plugins: [
    
    tanstackStart({ customViteReactPlugin: true }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
})