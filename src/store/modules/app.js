
'use strict'

import ls from '@/utils/localStorage'
import { STORE_TYPES } from '@/utils/constant'

const state = {
  sidebar: {
    isOpened: ls.get('sidebar') ? !!+ls.get('sidebar') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: ls.get('size')
}

const mutations = {
  [STORE_TYPES.TOGGLE_SIDEBAR]: state => {
    state.sidebar.isOpened = !state.sidebar.isOpened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.isOpened) {
      ls.set('sidebar', 1)
    } else {
      ls.set('sidebar', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    ls.set('sidebar', 0)
    state.sidebar.isOpened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  [STORE_TYPES.SET_SIZE]: (state, size) => {
    state.size = size
    ls.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit(STORE_TYPES.TOGGLE_SIDEBAR)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit(STORE_TYPES.SET_SIZE, size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
