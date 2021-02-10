'use strict'

import axios from '/@/utils/axios'

export const signin = (params) => {
  return axios.request({
    method: 'POST',
    url: '/auth/signin',
    params,
  })
}

export const getPermissionMenus = () => {
  return axios.request({
    method: 'GET',
    url: '/auth/permissionMenus',
  })
}
