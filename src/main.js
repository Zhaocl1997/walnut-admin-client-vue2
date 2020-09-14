
'use strict'

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/icons' // icon
import './assets/styles/index.scss' // style

import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/element-variables.scss'
Vue.use(Element, {
  size: localStorage.getItem("size")
})

import Print from 'vue-print-nb'
Vue.use(Print)

import directive from '@/directive'
Vue.use(directive)

import log from './utils/logs'
import copy from './utils/clipboard'
import { checkBox, openLoading } from '@/components/UI/Message'
Vue.prototype.$log = log
Vue.prototype.$copy = copy
Vue.prototype.$checkBox = checkBox
Vue.prototype.$openLoading = openLoading

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
