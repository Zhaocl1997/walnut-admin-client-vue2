'use strict'

import axios from '/@/utils/axios'

export const hello = () => {
  return axios.request({
    method: 'GET',
  })
}
