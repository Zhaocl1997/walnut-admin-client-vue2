'use strict'

import { createI18n } from 'vue-i18n'
import messages from './utils'

const localOptions = {
  legacy: false, // you must set `false`, to use Compostion API
  locale: 'en',
  fallbackLocale: 'en',
  messages,
}

export const i18n = createI18n(localOptions)

export const setupI18n = (app) => {
  app.use(i18n)
}

export const langLists = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'zh_CN',
    label: '简体中文',
  },
]
