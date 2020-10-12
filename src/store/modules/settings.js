
'use strict'

// import variables from '@/assets/styles/element-variables.scss'
// import defaultSettings from '@/settings'

// const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  // theme: variables.theme,
  // showSettings: showSettings,
  // tagsView: tagsView,
  // fixedHeader: fixedHeader,
  // sidebarLogo: sidebarLogo

  headerFixed: false,
  headerRender: true,
  logoRender: true,
  sidebarRender: true,
  tagsRender: true,
  footerRender: true,
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

