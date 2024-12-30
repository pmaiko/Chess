import Figure from '~/modules/game/figures/Figure.ts'
import { FIGURE } from '~/modules/game/constants.ts'
import type { CellsByPositionType } from '~/modules/game/Cell.ts'
import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'
import RookFigure from '~/modules/game/figures/RookFigure.ts'
import BishopFigure from '~/modules/game/figures/BishopFigure.ts'

export default class QueenFigure extends Figure {
  name = FIGURE.queen

  getMoves = (cellsByPosition: CellsByPositionType, withValidation: boolean, underProtection: boolean): PositionInterface[] => {
    const rookFigure = new RookFigure('fake', 'fake', this.color, this.position)
    const bishopFigure = new BishopFigure('fake', 'fake', this.color, this.position)

    return [
      ...rookFigure.getMoves(cellsByPosition, withValidation, underProtection),
      ...bishopFigure.getMoves(cellsByPosition, withValidation, underProtection),
    ]
  }

  getDangerousMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, true, true)
  }

  getValidatedMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, true, false)
  }
}
