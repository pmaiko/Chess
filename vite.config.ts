import type { ResolvedConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { checker } from 'vite-plugin-checker'

// https://vite.dev/config/
export default ({ mode }: ResolvedConfig) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
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
      port: Number(process.env.VITE_SERVER_PORT) || 3000,
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
        '@': '/src',
      },
    },
  })
}

