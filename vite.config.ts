import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { checker } from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
  server: {
    port: 8881,
  },
  plugins: [
    vue(),
    checker({
      vueTsc: {
        tsconfigPath: 'tsconfig.app.json',
      },
    }),
  ],

  resolve: {
    alias: {
      '~': '/src',
    },
  },
})
