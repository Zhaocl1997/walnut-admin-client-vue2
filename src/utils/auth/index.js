'use strict'

import { PERSISTENT_KEYS } from '../persistent/keys'
import { getLocal } from '../persistent'

export const getToken = () => {
  return getLocal(PERSISTENT_KEYS.USER.TOKEN)
}
