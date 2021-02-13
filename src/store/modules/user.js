'use strict'

import router from '/@/router'
import { signin } from '/@/api/auth'

import { setToken, getToken } from '/@/utils/auth'
import { setLocal } from '/@/utils/persistent'
import { PERSISTENT_KEYS } from '/@/utils/persistent/keys'
import { MUTATION_TYPES } from '../mutationTypes'

export const userModule = {
  namespaced: true,

  state: {
    token: getToken(),
  },

  mutations: {
    [MUTATION_TYPES.USER.SET_TOKEN]: (state, token) => {
      state.token = token
      setToken(token)
    },
  },

  actions: {
    async Signin({ commit }, payload) {
      const res = await signin(payload)

      commit(MUTATION_TYPES.USER.SET_TOKEN, res.token)

      if (payload.rememberMe) {
        setLocal(PERSISTENT_KEYS.USER.USERNAME, payload.username)
        setLocal(PERSISTENT_KEYS.USER.PASSWORD, payload.password)
      }

      router.push('/index')
    },
  },
}
