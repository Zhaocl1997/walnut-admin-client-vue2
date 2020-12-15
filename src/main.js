import { createApp } from 'vue'
import App from './App.vue'

import './index.css'
import './assets/style/index.scss'

import { setupRouter } from './setup/router'
import { setupStore } from './setup/store'
import { setupElementPlus } from './setup/element-plus'

import wIcon from './components/UI/Icon/index.vue'

const app = createApp(App)


setupRouter(app)
setupStore(app)
setupElementPlus(app)

app.component('w-icon', wIcon)

app.config.isCustomElement = tag => tag.startsWith('w-')

app.mount('#app')
