'use strict'

import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from './src/utils/env'

const { VITE_PORT, VITE_PROXY, VITE_API_PREFIX, VITE_API_VERSION } = loadEnv()
const apiPrefix = VITE_API_PREFIX + VITE_API_VERSION

const resolvePath = (dir) => {
  return resolve(__dirname, '.', dir)
}

export default ({ command, mode }) => {
  const root = process.cwd()

  const alias = [
    {
      // /@/xxxx  =>  src/xxx
      find: /^\/@\//,
      replacement: resolvePath('src') + '/',
    },
  ]

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

  return {
    root,

    resolve: {
      alias,
    },

    server,

    plugins: [vue()],
  }
}
