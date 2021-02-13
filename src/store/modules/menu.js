'use strict'

import { createDynamicPermissions } from '/@/router/utils'

import { MUTATION_TYPES } from '../mutationTypes'

export const menuModule = {
  namespaced: true,

  state: {
    menus: [],
    keepAliveRouteNames: [],
  },

  mutations: {
    [MUTATION_TYPES.MENU.BUILD_MENU]: (state, menu) => {
      state.menus = menu
    },
    [MUTATION_TYPES.MENU.SET_KEEPALIVE]: (state, names) => {
      state.keepAliveRouteNames = names
    },
  },

  actions: {
    async buildAccessableMenus({ commit }) {
      const {
        menus,
        keepAliveRouteNames,
        routes,
      } = await createDynamicPermissions()

      commit(MUTATION_TYPES.MENU.BUILD_MENU, routes)
      commit(MUTATION_TYPES.MENU.SET_KEEPALIVE, keepAliveRouteNames)

      return routes
    },
  },
}
