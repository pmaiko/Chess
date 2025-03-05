import { merge } from 'lodash'

import Figure from '~/features/game/entities/figures/Figure.ts'
import { FIGURE } from '~/constants/constants.ts'
import RookFigure from '~/features/game/entities/figures/RookFigure.ts'
import BishopFigure from '~/features/game/entities/figures/BishopFigure.ts'
import type { MoveInterface } from '~/features/game/services/PositionService.ts'

export default class QueenFigure extends Figure {
  name = FIGURE.queen

  getAllMoves = (): MoveInterface => {
    const rookFigure = new RookFigure('fake', 'fake', this.color, this.position)
    const bishopFigure = new BishopFigure('fake', 'fake', this.color, this.position)

    return merge({}, rookFigure.getAllMoves(), bishopFigure.getAllMoves())
  }
}
