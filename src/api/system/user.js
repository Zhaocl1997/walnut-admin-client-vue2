
'use strict'

import axios from '@/utils/axios'
import BaseAPI from '../base'

export function signin(data) {
    const url = '/api/v1/user/login'
    return axios.post(url, data)
}

const userBaseAPI = new BaseAPI('user')

export const userIndex = userBaseAPI.index()
export const userCreate = userBaseAPI.create()
export const userRead = userBaseAPI.read()
export const userUpdate = userBaseAPI.update()
export const userDelete = userBaseAPI.delete()