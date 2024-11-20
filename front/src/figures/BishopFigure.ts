import BaseFigure from '~/figures/BaseFigure.ts'
import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import { FIGURE, GRID_SIZE } from '~/constants.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'
import { ValidationResultType } from '~/figures/types/BaseFigureInterface.ts'


export default class BishopFigure extends BaseFigure implements FigureInterface {
  name = FIGURE.bishop

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

    // right top
    for (let i = 1; x + i < GRID_SIZE && y + i < GRID_SIZE; i++) {
      const validation = BaseFigure.validatePosition({ x: x + i, y: y + i }, cellsByPosition, this.color, underProtection)
      if (pushMoves(validation)) {
        break
      }
    }
    // left top
    for (let i = 1; x - i >= 0 && y + i < GRID_SIZE; i++) {
      const validation = BaseFigure.validatePosition({ x: x - i, y: y + i }, cellsByPosition, this.color, underProtection)
      if (pushMoves(validation)) {
        break
      }
    }
    // right bottom
    for (let i = 1; x + i < GRID_SIZE && y - i >= 0; i++) {
      const validation = BaseFigure.validatePosition({ x: x + i, y: y - i }, cellsByPosition, this.color, underProtection)
      if (pushMoves(validation)) {
        break
      }
    }
    // left bottom
    for (let i = 1; x - i >= 0 && y - i >= 0; i++) {
      const validation = BaseFigure.validatePosition({ x: x - i, y: y - i }, cellsByPosition, this.color, underProtection)
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
