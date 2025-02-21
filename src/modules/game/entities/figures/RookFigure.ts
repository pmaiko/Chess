import Figure from '~/modules/game/entities/figures/Figure.ts'
import { FIGURE, GRID_SIZE } from '~/modules/game/constants.ts'
import type { MoveInterface, MovesByDirection } from '~/modules/game/services/PositionService.ts'
import { PositionService } from '~/modules/game/services/PositionService.ts'

export default class RookFigure extends Figure {
  name = FIGURE.rook

  getAllMoves = (): MoveInterface => {
    const { x, y } = this.position
    const movesByDirection: MovesByDirection = {
      'top': [],
      'bottom': [],
      'right': [],
      'left': [],
    }

    for (let i = y - 1; i >= 0; i--) {
      const position = new PositionService(x, i)
      movesByDirection['top']?.push(position)
    }
    for (let i = y + 1; i < GRID_SIZE; i++) {
      const position = new PositionService(x, i)
      movesByDirection['bottom']?.push(position)
    }
    for (let i = x + 1; i < GRID_SIZE; i++) {
      const position = new PositionService(i, y)
      movesByDirection['right']?.push(position)
    }
    for (let i = x - 1; i >= 0; i--) {
      const position = new PositionService(i, y)
      movesByDirection['left']?.push(position)
    }

    return {
      moves: Object.values(movesByDirection).flat(),
      movesByDirection,
    }
  }
}
