'use strict'

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { loadEnv } from './src/utils/env'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

const root = process.cwd()
const alias = {
  '/@/': `${pathResolve('src')}/`,
}

const { VITE_PORT } = loadEnv()

export default ({ command, mode }) => {
  return {
    root,
    alias,

    plugins: [vue()],

    port: VITE_PORT,

    optimizeDeps: {
      include: [
        'element-plus/lib/locale/lang/zh-cn',
        'element-plus/lib/locale',
        'mockjs',
      ],
    },
  }
}
