import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true,
    }),
    Components({
      dirs: ['./src/shared/ui'],
      dts: true,
    }),
  ],
  publicDir: './src/app/public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: Number(process.env.FRONTEND_PORT) || 5173,
    watch: {
      usePolling: true,
    },
  },
})
