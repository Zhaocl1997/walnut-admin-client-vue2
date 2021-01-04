'use strict'

import { setLocal, getLocal } from '/@/utils/persistent'

const APP_LOCALE = 'APP_LOCALE'

const APP_MUTATIONS = {
  TOGGLE_LANG: 'TOGGLE_LANG',
}

export const appModule = {
  namespaced: true,

  state: {
    lang: getLocal(APP_LOCALE) || 'zh_CN',
  },

  mutations: {
    [APP_MUTATIONS.TOGGLE_LANG]: (state, lang) => {
      state.lang = lang
      setLocal(APP_LOCALE, lang)
    },
  },

  actions: {
    toggleLang({ commit }, lang) {
      commit(APP_MUTATIONS.TOGGLE_LANG, lang)
    },
  },
}
