
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// import dict from './modules/dict'
import user from './modules/user'
// import tagsView from './modules/tagsView'
import routes from './modules/routes'
import settings from './modules/settings'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    // dict,
    user,
    // tagsView,
    routes,
    settings
  },
  getters
})

export default store
