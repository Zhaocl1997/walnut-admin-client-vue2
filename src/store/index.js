'use strict'

import { createStore } from 'vuex'
import { appModule } from './modules/app'
import { userModule } from './modules/user'
import { menuModule } from './modules/menu'
import { isDevMode } from '/@/utils/mode'

const store = createStore({
  strict: !!isDevMode,

  modules: {
    app: appModule,
    user: userModule,
    menu: menuModule,
  },
})

export default store

export const setupStore = (app) => {
  app.use(store)
}
