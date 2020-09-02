
'use strict'

import ls from './localStorage'
import config from './config'

export function getToken() {
    const user = ls.get(config.TOKEN_KEY)
    if (user && user.token) {
        return user.token
    }
}

export function setToken(token) {
    ls.set(config.TOKEN_KEY, token)
}

export function reMoveToken() {
    ls.remove(config.TOKEN_KEY)
}