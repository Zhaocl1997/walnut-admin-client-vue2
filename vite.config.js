import { resolve } from 'path'
import { loadEnv } from './src/utils/env'
import globbyTransform from './build/vite/globby/index.js'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

const root = process.cwd()
const alias = {
  '/@/': pathResolve('src'),
}
const resolvers = []

const { VITE_PORT } = loadEnv()

module.exports = {
  root,
  alias,

  /**
   * @description port
   * @default 80
   */
  port: VITE_PORT,

  /**
   * @description
   * Configure dep optimization behavior.
   */
  optimizeDeps: {
    include: [
      'element-plus/lib/locale/lang/zh-cn',
      'element-plus/lib/locale',
      'mockjs',
    ],
  },

  proxy: {
    // 代理
    // // string shorthand
    // "/foo": "http://localhost:4567/foo",
    // // with options
    // "/api": {
    //     target: "http://jsonplaceholder.typicode.com",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    // },
  },

  plugins: [],

  transforms: [
    globbyTransform({
      resolvers: resolvers,
      root: root,
      alias: alias,
      includes: [resolve('src/router'), resolve('src/locales')],
    }),
  ],
}
