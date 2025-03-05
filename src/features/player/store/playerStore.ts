import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Player } from '~/features/player/entities/Player.ts'


export const usePlayerStore = defineStore('player', () => {
  const player = ref<Player>(new Player())

  return { player }
})
