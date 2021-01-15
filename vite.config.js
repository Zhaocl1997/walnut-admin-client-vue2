'use strict'

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { loadEnv } from './src/utils/env'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

const { VITE_PORT, VITE_PROXY, VITE_API_PREFIX, VITE_API_VERSION } = loadEnv()

const apiPrefix = VITE_API_PREFIX + VITE_API_VERSION

const root = process.cwd()
const alias = {
  '/@/': `${pathResolve('src')}/`,
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

  open: '/auth',
}

export default ({ command, mode }) => {
  return {
    root,

    alias,

    server,

    plugins: [vue()],

    optimizeDeps: {
      include: ['mockjs', 'element-plus'],
    },
  }
}
