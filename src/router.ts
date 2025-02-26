import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/WelcomePage.vue'

import TheGame from '~/modules/game/components/TheGame.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/game', component: TheGame },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
