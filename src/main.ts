import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '~/plugins/router.ts'
import naive from 'naive-ui'

// https://www.naiveui.com/en-US/os-theme/docs/fonts
import './styles/style.css'
import 'vfonts/Lato.css'

import 'vfonts/FiraCode.css'

import App from './App.vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(naive)
  .mount('#app')
