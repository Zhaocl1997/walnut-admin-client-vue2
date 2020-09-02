
'use strict'

import { signin } from "@/api"
import { TYPES } from '../types'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    // name: '',
    // avatar: '',
    // mesCount: 0,
    // roles: [],
    // permissions: [],
    // userId: ""
  },

  mutations: {
    [TYPES.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    // SET_NAME: (state, name) => {
    //   state.name = name
    // },
    // SET_AVATAR: (state, avatar) => {
    //   state.avatar = avatar
    // },
    // SET_ROLES: (state, roles) => {
    //   state.roles = roles
    // },
    // SET_PERMISSIONS: (state, permissions) => {
    //   state.permissions = permissions
    // },
    // SET_MESCOUNT: (state, mesCount) => {
    //   state.mesCount = mesCount
    // },
    // SET_USERID: (state, userId) => {
    //   state.userId = userId
    // },
  },

  actions: {
    // 登录
    Signin({ commit }, data) {
      return new Promise((resolve, reject) => {
        signin(data).then(res => {
          setToken(res.data.token)
          commit(TYPES.SET_TOKEN, res.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(res => {
    //       const user = res.user
    //       const avatar = user.avatar == "" ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
    //       if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', res.roles)
    //         commit('SET_PERMISSIONS', res.permissions)
    //       } else {
    //         commit('SET_ROLES', ['ROLE_DEFAULT'])
    //       }
    //       commit('SET_NAME', user.userName)
    //       commit('SET_AVATAR', avatar)
    //       commit('SET_USERID', user.userId)
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // // 退出系统
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       commit('SET_PERMISSIONS', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // },
    // // 设置未读消息
    // setMessage({ commit }, mesCount) {
    //   commit('SET_MESCOUNT', mesCount)
    // }
  }
}

export default user
