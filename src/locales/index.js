'use strict'

import { createI18n } from 'vue-i18n'
import store from '/@/store'
import messages from './utils'

const localOptions = {
  legacy: false, // you must set `false`, to use Compostion API

  // locale: store.state.app.lang,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
}

export const i18n = createI18n(localOptions)

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
