import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Tenzies Game',
        short_name: 'Tenzies',
        description: "Tenzies Game built with love by Deesa Consulting Services",
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color:"#ffffff",
        lang: 'en',
        scope: '/',
        icons: [
          {
              "src": "/android-chrome-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
          },
          {
              "src": "/android-chrome-512x512.png",
              "sizes": "512x512",
              "type": "image/png"
          }
        ]
      }
     })
  ],
  server: {
    port: 5000
  }
})
