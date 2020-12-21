'use strict'

import { createApp } from 'vue'
import App from './App.vue'

import './index.css'
import './assets/style/index.scss'

import { setupRouter } from './setup/router'
import { setupStore } from './setup/store'
import { setupElementPlus } from './setup/element-plus'
import { setupGlobalConfig } from './setup/global'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupElementPlus(app)
setupGlobalConfig(app)

app.mount('#app')
