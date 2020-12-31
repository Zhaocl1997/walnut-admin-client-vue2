'use strict'

const APP_MUTATIONS = {
  TOGGLE_LANG: 'TOGGLE_LANG',
}

export const appModule = {
  namespaced: true,

  state: {
    lang: 'en',
  },

  mutations: {
    [APP_MUTATIONS.TOGGLE_LANG]: (state, lang) => {
      state.lang = lang
    },
  },

  actions: {
    toggleLang({ commit }, lang) {
      commit(APP_MUTATIONS.TOGGLE_LANG, lang)
    },
  },
}
