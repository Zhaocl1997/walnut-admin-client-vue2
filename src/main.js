'use strict'

import { createApp } from 'vue'
import App from './App.vue'

import './index.css'
import './assets/style/index.scss'

import { setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { setupElementPlus } from '/@/components'
import { setupI18n } from '/@/locales'
import { setupGlobalConfig } from './app'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupElementPlus(app)
setupI18n(app)
setupGlobalConfig(app)

app.mount('#app')
