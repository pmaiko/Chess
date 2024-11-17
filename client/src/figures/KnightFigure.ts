import BaseFigure from '~/figures/BaseFigure.ts'
import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import { FIGURE, GRID_SIZE } from '~/constants.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'

export default class KnightFigure extends BaseFigure implements FigureInterface {
  name = FIGURE.knight

  getMoves = (cellsByPosition: CellsByPositionType, withValidation: boolean, underProtection: boolean): PositionInterface[] => {
    const { x, y } = this.position

    const moves = [
      { x: x + 2, y: y + 1 }, // right top
      { x: x + 2, y: y - 1 }, // right bottom
      { x: x - 2, y: y + 1 }, // left top
      { x: x - 2, y: y - 1 }, // left bottom
      { x: x + 1, y: y + 2 }, // top right
      { x: x + 1, y: y - 2 }, // bottom right
      { x: x - 1, y: y + 2 }, // top left
      { x: x - 1, y: y - 2 }, // bottom left
    ]

    return moves.filter((move) => {
      return (
        move.x >= 0 && move.x < GRID_SIZE &&
        move.y >= 0 && move.y < GRID_SIZE &&
        !!BaseFigure.validatePosition(move, cellsByPosition, this.color, underProtection).position && withValidation
      )
    })
  }

  getDangerousMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, true, true)
  }

  getValidatedMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, true, false)
  }
}
