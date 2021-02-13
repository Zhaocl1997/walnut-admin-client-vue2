'use strict'

import { PERSISTENT_KEYS } from '../persistent/keys'
import { getLocal, setLocal } from '../persistent'

export const setToken = (token) => {
  setLocal(PERSISTENT_KEYS.USER.TOKEN, token)
}

export const getToken = () => {
  return getLocal(PERSISTENT_KEYS.USER.TOKEN)
}
