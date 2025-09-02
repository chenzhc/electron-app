import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' },
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [vue()]
  }
})
