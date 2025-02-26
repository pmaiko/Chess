import { createApp } from 'vue'
import naive from 'naive-ui'

// https://www.naiveui.com/en-US/os-theme/docs/fonts
import './style.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import App from './App.vue'

import { router } from '~/router.ts'

createApp(App)
  .use(router)
  .use(naive)
  .mount('#app')
