'use strict'

import wIcon from './components/UI/Icon/index.vue'
import { appError, appWarning } from './utils/log'
import { isDevMode } from '/@/utils/mode'

export const setupAppGlobalConfig = (app) => {
  app.component('WIcon', wIcon)

  app.config.isCustomElement = (tag) => tag.startsWith('w-')

  app.config.errorHandler = (err, vm, info) => {
    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    appError(err)
  }

  app.config.warnHandler = (msg, vm, trace) => {
    // `trace` 是组件的继承关系追踪
    appWarning(msg)
  }

  app.config.performance = isDevMode
}
