'use strict'

import wIcon from '../components/UI/Icon/index.vue'

export function setupGlobalConfig(app) {
  app.component('WIcon', wIcon)

  app.config.isCustomElement = (tag) => tag.startsWith('w-')
}
