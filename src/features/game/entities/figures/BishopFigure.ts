import Figure from '~/features/game/entities/figures/Figure.ts'
import { FIGURE, GRID_SIZE } from '~/constants/constants.ts'
import type { MoveInterface, MovesByDirection } from '~/features/game/services/PositionService.ts'
import { PositionService } from '~/features/game/services/PositionService.ts'

export default class BishopFigure extends Figure {
  name = FIGURE.bishop

  getAllMoves = (): MoveInterface => {
    const { x, y } = this.position
    const movesByDirection: MovesByDirection = {
      'right_top': [],
      'left_top': [],
      'right_bottom': [],
      'left_bottom': [],
    }

    for (let i = 1; x + i < GRID_SIZE && y + i < GRID_SIZE; i++) {
      const position = new PositionService(x + i, y + i)
      movesByDirection['right_top']?.push(position)
    }
    for (let i = 1; x - i >= 0 && y + i < GRID_SIZE; i++) {
      const position = new PositionService(x - i, y + i)
      movesByDirection['left_top']?.push(position)
    }
    for (let i = 1; x + i < GRID_SIZE && y - i >= 0; i++) {
      const position = new PositionService(x + i, y - i)
      movesByDirection['right_bottom']?.push(position)
    }
    for (let i = 1; x - i >= 0 && y - i >= 0; i++) {
      const position = new PositionService(x - i, y - i)
      movesByDirection['left_bottom']?.push(position)
    }

    return {
      moves: Object.values(movesByDirection).flat(),
      movesByDirection,
    }
  }
}
