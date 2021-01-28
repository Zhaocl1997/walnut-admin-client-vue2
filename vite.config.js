'use strict'

import vue from '@vitejs/plugin-vue'
import { loadEnv } from './src/utils/env'

const { VITE_PORT, VITE_PROXY, VITE_API_PREFIX, VITE_API_VERSION } = loadEnv()
const apiPrefix = VITE_API_PREFIX + VITE_API_VERSION

const root = process.cwd()
const alias = {
  '/@/': `${require('path').resolve(__dirname, '.', 'src')}/`,
}
const server = {
  port: VITE_PORT,

  proxy: {
    [apiPrefix]: {
      target: VITE_PROXY,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${apiPrefix}`), ''),
    },
  },

  hmr: {
    overlay: true,
  },

  // open: '/auth',
}

export default ({ command, mode }) => {
  return {
    root,

    alias,

    server,

    plugins: [vue()],
  }
}
