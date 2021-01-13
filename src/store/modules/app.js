'use strict'

import { setLocal, getLocal } from '/@/utils/persistent'

import { PERSISTENT_KEYS } from '/@/utils/persistent/keys'
import { MUTATION_TYPES } from '../mutationTypes'

export const appModule = {
  namespaced: true,

  state: {
    lang: getLocal(PERSISTENT_KEYS.APP.LOCALE) || 'en',
  },

  mutations: {
    [MUTATION_TYPES.APP.TOGGLE_LANG]: (state, lang) => {
      state.lang = lang
      setLocal(PERSISTENT_KEYS.APP.LOCALE, lang)
    },
  },

  actions: {
    toggleLang({ commit }, lang) {
      commit(MUTATION_TYPES.APP.TOGGLE_LANG, lang)
    },
  },
}
