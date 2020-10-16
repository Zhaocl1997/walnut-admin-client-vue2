
'use strict'

// import variables from '@/assets/styles/element-variables.scss'

import defaultSettings from '@/settings'

const {
  header,
  sidebar,
  tags,
  footer
} = defaultSettings

const state = {
  headerRender: header.render,
  headerFixed: header.fixed,
  headerHeight: header.height,

  sidebarRender: sidebar.render,
  sidebarFixed: sidebar.fixed,
  sidebarWidth: sidebar.width,

  tagsRender: tags.render,
  tagsFixed: tags.fixed,
  tagsHeight: tags.height,

  footerRender: footer.render,
  footerFixed: footer.fixed,
  footerHeight: footer.height,

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

