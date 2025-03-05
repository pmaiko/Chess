import { usePlayerStore } from '~/features/player/store/playerStore.ts'
import { useGameStore } from '~/features/game/store/gameStore.ts'
import { Game } from '~/features/game/entities/Game.ts'
import { Player } from '~/features/player/entities/Player.ts'

export const useDemo = () => {
  const playerStore = usePlayerStore()
  const gameStore = useGameStore()

  const game = new Game([
    new Player('BOT'),
    playerStore.player,
  ])

  gameStore.setGame(game)
}
