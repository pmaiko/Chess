import { createWebHistory, createRouter } from 'vue-router'

import MainPage from './pages/MainPage.vue'

import TheGame from '~/modules/game/components/TheGame.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/game', component: TheGame },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
