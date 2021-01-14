'use strict'

import wIcon from './components/UI/Icon/index.vue'

export const setupGlobalConfig = (app) => {
  app.component('WIcon', wIcon)

  app.config.isCustomElement = (tag) => tag.startsWith('w-')
}
