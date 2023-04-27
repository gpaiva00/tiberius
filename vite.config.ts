import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components/') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages/') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets/') },
      { find: '@typings', replacement: path.resolve(__dirname, 'src/typings/') },
      { find: '@services', replacement: path.resolve(__dirname, 'src/services/') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets/') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks/') },
    ],
  },
})
