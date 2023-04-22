import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
		alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/') },
			{ find: '@components', replacement: path.resolve(__dirname, 'src/components/') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages/') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets/') },
      { find: '@typings', replacement: path.resolve(__dirname, 'src/typings/') },
		]
	}
})
