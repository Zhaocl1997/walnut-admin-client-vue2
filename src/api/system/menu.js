
'use strict'

import axios from '@/utils/axios'
import BaseAPI from '../base'

export function menuOptions(data) {
    const url = '/api/v1/menu/options'
    return axios.post(url, data)
}

export function getUserMenu(data) {
    const url = '/api/v1/menu/getUserMenu'
    return axios.post(url, data)
}

const menuBaseAPI = new BaseAPI('menu')

export const menuIndex = menuBaseAPI.index()
export const menuCreate = menuBaseAPI.create()
export const menuRead = menuBaseAPI.read()
export const menuUpdate = menuBaseAPI.update()
export const menuDelete = menuBaseAPI.delete()