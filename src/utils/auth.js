
'use strict'

import ls from './localStorage'
import config from './config'

export function getToken() {
    return ls.get(config.TOKEN_KEY)
}

export function setToken(token) {
    ls.set(config.TOKEN_KEY, token)
}

export function reMoveToken() {
    ls.remove(config.TOKEN_KEY)
}