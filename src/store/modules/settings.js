
'use strict'

// import variables from '@/assets/styles/element-variables.scss'

import defaultSettings from '@/settings'
console.log(defaultSettings);

const {
  headerFixed,
  footerFixed,

  headerRender,
  logoRender,
  sidebarRender,
  tagsRender,
  footerRender
} = defaultSettings

const state = {
  // theme: variables.theme,
  headerFixed,
  footerFixed,

  headerRender,
  logoRender,
  sidebarRender,
  tagsRender,
  footerRender,

  sidebarCollapse: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSettings({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

