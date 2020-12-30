'use strict'

import { createI18n } from 'vue-i18n'
import messages from 'globby?locale!/@/locales/lang/**/*.@(js)'

const localOptions = {
  legacy: false, // you must set `false`, to use Compostion API

  locale: 'en',
  fallbackLocale: 'en',
  messages,
}

export const i18n = createI18n(localOptions)
