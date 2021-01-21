'use strict'

import { createApp } from 'vue'
import App from './App.vue'

import './index.css'
import './assets/style/index.scss'

import { setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { setupI18n } from '/@/locales'
import { setupElementPlus } from '/@/components'
import { setupGlobalConfig } from './app'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupI18n(app)
setupElementPlus(app)
setupGlobalConfig(app)

app.mount('#app')
