import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '../pages/MainPage.vue'
import GamePage from '../pages/GamePage.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/game', component: GamePage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
