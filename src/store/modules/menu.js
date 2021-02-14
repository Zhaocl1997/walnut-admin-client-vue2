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
    [MUTATION_TYPES.MENU.SET_MENU]: (state, menu) => {
      state.menus = menu
    },
    [MUTATION_TYPES.MENU.SET_KEEPALIVE]: (state, names) => {
      state.keepAliveRouteNames = names
    },
  },

  actions: {
    async buildAccessableRoutes({ commit }) {
      const {
        menus,
        keepAliveRouteNames,
        routes,
      } = await createDynamicPermissions()

      commit(MUTATION_TYPES.MENU.SET_MENU, menus)
      commit(MUTATION_TYPES.MENU.SET_KEEPALIVE, keepAliveRouteNames)

      return routes
    },
  },
}
