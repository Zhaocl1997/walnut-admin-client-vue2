'use strict'

import { useI18n as VueUseI18n } from 'vue-i18n'

export function useI18n() {
  const { t } = VueUseI18n()
  return { t }
}
