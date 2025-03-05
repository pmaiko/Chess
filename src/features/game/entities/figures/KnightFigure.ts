import Figure from '~/features/game/entities/figures/Figure.ts'
import { FIGURE } from '~/constants/constants.ts'
import type { MoveInterface, MovesByDirection } from '~/features/game/services/PositionService.ts'
import { PositionService } from '~/features/game/services/PositionService.ts'

export default class KnightFigure extends Figure {
  name = FIGURE.knight

  getAllMoves = (): MoveInterface => {
    const { x, y } = this.position
    const movesByDirection: MovesByDirection = {}

    movesByDirection['right_top'] = [new PositionService(x + 2, y + 1)]
    movesByDirection['right_bottom'] = [new PositionService(x + 2, y - 1)]
    movesByDirection['left_top'] = [new PositionService(x - 2, y + 1)]
    movesByDirection['left_bottom'] = [new PositionService(x - 2, y - 1)]
    movesByDirection['top_right'] = [new PositionService(x + 1, y + 2)]
    movesByDirection['bottom_right'] = [new PositionService(x + 1, y - 2)]
    movesByDirection['top_left'] = [new PositionService(x - 1, y + 2)]
    movesByDirection['bottom_left'] = [new PositionService(x - 1, y - 2)]

    return {
      moves: Object.values(movesByDirection).flat(),
      movesByDirection: movesByDirection,
    }
  }
}
