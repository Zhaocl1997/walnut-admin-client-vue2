'use strict'

import { BaseAPI } from '../base'

const menuAPI = new BaseAPI({ model: 'system', section: 'menu' })

export const listMenu = (data) => menuAPI.list(data)

export const createMenu = (data) => menuAPI.create(data)

export const readMenu = (data) => menuAPI.read(data)

export const updateMenu = (data) => menuAPI.update(data)

export const deleteMenu = (data) => menuAPI.delete(data)
