import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'src/auto-imports.d.ts',
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})