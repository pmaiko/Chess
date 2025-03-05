import type { Player } from '~/features/player/entities/Player.ts'
import { Board } from '~/features/game/entities/Board.ts'

export class Game {
  public readonly board: Board

  constructor (public readonly players: Player[]) {
    this.players = players
    this.board = new Board()
  }
}
