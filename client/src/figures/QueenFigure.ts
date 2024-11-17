import BaseFigure from '~/figures/BaseFigure.ts'
import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import { FIGURE } from '~/constants.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'
import RookFigure from '~/figures/RookFigure.ts'
import BishopFigure from '~/figures/BishopFigure.ts'

export default class QueenFigure extends BaseFigure implements FigureInterface {
  name = FIGURE.queen

  getMoves = (cellsByPosition: CellsByPositionType, withValidation: boolean, underProtection: boolean): PositionInterface[] => {
    const rookFigure = new RookFigure({
      cellId: 'fake',
      number: 'fake',
      color: this.color,
      position: this.position,
    })
    const bishopFigure = new BishopFigure({
      cellId: 'fake',
      number: 'fake',
      color: this.color,
      position: this.position,
    })
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
