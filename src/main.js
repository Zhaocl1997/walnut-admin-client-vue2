
'use strict'

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './router/guard' // route guard

import './assets/icons' // icon
import './assets/styles/main.scss' // style

import Element from 'element-ui'
import './assets/styles/vendors/_element.scss'

Vue.use(Element, {
  size: store.getters.size
})

import Print from 'vue-print-nb'
Vue.use(Print)

import directive from '@/directive'
Vue.use(directive)

import wIcon from '@/components/UI/Base/Icons'
Vue.component('w-icon', wIcon)

import log from 'easy-fns/lib/Log'
import copy from 'easy-fns/lib/Copy'
import { checkBox, openLoading } from '@/components/UI/Base/Message'

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
