import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      vueTsc: {
        tsconfigPath: "tsconfig.app.json",
      }
    }),
  ],

  resolve: {
    alias: {
      '~': '/src',
    }
  },
})
