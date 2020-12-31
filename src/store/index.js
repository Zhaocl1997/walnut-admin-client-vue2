'use strict'

import { createStore } from 'vuex'
import { appModule } from './modules/app'
import { isDevMode } from '/@/utils/mode'

const store = createStore({
  strict: !!isDevMode,

  modules: {
    app: appModule,
  },
})

export default store
