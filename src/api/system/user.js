
'use strict'

import axios from '@/utils/axios'
import BaseAPI from '../base'

export function signin(data) {
    const url = '/api/v1/user/login'
    return axios.post(url, data)
}

const userBaseAPI = new BaseAPI('user', 'index')

export const getUserList = userBaseAPI.list()