'use strict'

import { createStore } from 'vuex'
import { appModule } from './modules/app'
import { userModule } from './modules/user'
import { isDevMode } from '/@/utils/mode'

const store = createStore({
  strict: !!isDevMode,

  modules: {
    app: appModule,
    user: userModule,
  },
})

export default store

export const setupStore = (app) => {
  app.use(store)
}
