import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Game } from '~/features/game/entities/Game.ts'

export const useGameStore = defineStore('game', () => {
  const game = ref<Game | null>(null)

  const setGame = (newGame: Game | null) => {
    game.value = newGame
  }

  return { game, setGame }
})
