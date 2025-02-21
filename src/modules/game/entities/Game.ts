import type { Player } from '~/modules/game/entities/Player.ts'
import { Board } from '~/modules/game/entities/Board.ts'

export class Game {
  public readonly board: Board

  constructor (public readonly players: Player[]) {
    this.players = players
    this.board = new Board()
  }
}
