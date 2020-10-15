
'use strict'

// import variables from '@/assets/styles/element-variables.scss'

import defaultSettings from '@/settings'

const {
  header,

  headerFixed,
  footerFixed,

  headerRender,
  logoRender,
  sidebarRender,
  tagsRender,
  footerRender,

  footerHeight,
  headerHeight,
  tagsHeight,
  sidebarWidth
} = defaultSettings

const state = {
  headerRender: header.render,
  headerFixed: header.fixed,
  headerHeight: header.height,


  footerFixed,

  logoRender,
  sidebarRender,
  tagsRender,
  footerRender,

  footerHeight,

  tagsHeight,
  sidebarWidth,

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

