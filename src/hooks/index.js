'use strict'

// hook 全局导出
import { set } from 'lodash-es'

const hooksModules = import.meta.globEager('./**/*.js')

function genHooks(h) {
  const obj = {}

  Object.keys(h).forEach((key) => {
    const hookName = key.split('/').slice(-1)[0].split('.')[0]
    const hookFn = h[key][hookName]
    set(obj, hookName, hookFn)
  })

  return obj
}

const hooks = genHooks(hooksModules)

export default hooks
