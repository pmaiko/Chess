import BaseFigure from '~/figures/BaseFigure.ts'
import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import { FIGURE, GRID_SIZE } from '~/constants.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'
import { ValidationResultType } from '~/figures/types/BaseFigureInterface.ts'

export default class RookFigure extends BaseFigure implements FigureInterface {
  name = FIGURE.rook

  getMoves = (cellsByPosition: CellsByPositionType, withValidation: boolean, underProtection: boolean): PositionInterface[] => {
    const moves: PositionInterface[] = []
    const { x, y } = this.position

    const pushMoves = (validation: ValidationResultType) => {
      if (validation.break && withValidation) {
        if (validation.position) {
          moves.push(validation.position)
        }
        return true
      } else {
        if (validation.position) {
          moves.push(validation.position)
        }
      }
    }

    // top
    for (let i = y + 1; i < GRID_SIZE; i++) {
      const validation = BaseFigure.validatePosition({ x: x, y: i }, cellsByPosition, this.color, underProtection)
      if (pushMoves(validation)) {
        break
      }
    }
    // bottom
    for (let i = y - 1; i >= 0; i--) {
      const validation = BaseFigure.validatePosition({ x: x, y: i }, cellsByPosition, this.color, underProtection)
      if (pushMoves(validation)) {
        break
      }
    }
    // right
    for (let i = x + 1; i < GRID_SIZE; i++) {
      const validation = BaseFigure.validatePosition({ x: i, y: y }, cellsByPosition, this.color, underProtection)
      if (pushMoves(validation)) {
        break
      }
    }
    // left
    for (let i = x - 1; i >= 0; i--) {
      const validation = BaseFigure.validatePosition({ x: i, y: y }, cellsByPosition, this.color, underProtection)
      if (pushMoves(validation)) {
        break
      }
    }

    return moves
  }

  getDangerousMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, true, true)
  }

  getValidatedMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, true, false)
  }
}
