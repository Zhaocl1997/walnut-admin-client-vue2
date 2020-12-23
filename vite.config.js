import { resolve } from 'path'
import { loadEnv } from './src/utils/env'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

const { VITE_PORT } = loadEnv()

module.exports = {
  /**
   * @description port
   * @default 80
   */
  port: VITE_PORT,

  /**
   * @description
   * Import alias. The entries can either be exact request -> request mappings
   * (exact, no wildcard syntax), or request path -> fs directory mappings.
   * When using directory mappings, the key **must start and end with a slash**.
   */
  alias: {
    '/@/': pathResolve('src'),
  },

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
}
