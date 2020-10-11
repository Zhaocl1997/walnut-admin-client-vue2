
'use strict'

import axios from '@/utils/axios'
import BaseAPI from '../base'

export function roleOptions(data) {
    const url = '/api/v1/role/options'
    return axios.post(url, data)
}


const roleBaseAPI = new BaseAPI('role')

export const roleIndex = roleBaseAPI.index()
export const roleCreate = roleBaseAPI.create()
export const roleRead = roleBaseAPI.read()
export const roleUpdate = roleBaseAPI.update()
export const roleDelete = roleBaseAPI.delete()