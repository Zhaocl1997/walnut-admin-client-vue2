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
}

export default ({ command, mode }) => {
  return {
    root,

    alias,

    server,

    plugins: [vue()],

    optimizeDeps: {
      include: [
        // 'element-plus/lib/locale/lang/zh-cn',
        // 'element-plus/lib/locale',
        'mockjs',
        'element-plus',
        // 'easy-fns-ts'
      ],
    },
  }
}
