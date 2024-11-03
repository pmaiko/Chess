import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import BaseFigure from '~/figures/BaseFigure.ts'
import { COLOR, COLOR_REVERSE, FIGURE, GRID_SIZE } from '~/constants.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'
import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'

export interface PawnFigureInterface extends FigureInterface {
  isWhite: boolean,
  direction: number
}

export default class PawnFigure extends BaseFigure implements PawnFigureInterface {
  name = FIGURE.pawn
  isWhite
  direction

  constructor ({ cellId, number, color, position }: {cellId: FigureInterface['cellId'], number: FigureInterface['number'], color: FigureInterface['color'], position: FigureInterface['position']}) {
    super({
      cellId,
      number,
      color,
      position,
    })

    this.isWhite = this.color === COLOR.white
    this.direction = this.isWhite ? -1 : 1
  }

  getMoves = (cellsByPosition: CellsByPositionType) => {
    const moves: PositionInterface[] = []
    const { x, y } = this.position

    const validate = (position: PositionInterface) => {
      const key = getKeyByPosition(position)
      if (!cellsByPosition[key].figure) {
        moves.push(position)
      }
    }

    // + 1
    if (
      y + this.direction >= 0 &&
      y + this.direction < GRID_SIZE) {
      validate({ x: x, y: y + this.direction })
    }
    // + 2
    const startRow = this.isWhite ? 6 : 1
    if (
      y === startRow &&
      y + 2 * this.direction >= 0 &&
      y + 2 * this.direction < GRID_SIZE
    ) {
      validate({ x, y: y + 2 * this.direction })
    }

    return [
      ...moves,
      ...this.getDangerousMoves(cellsByPosition, false),
    ]
  }

  getDangerousMoves = (cellsByPosition: CellsByPositionType, withoutValidation: boolean = true): PositionInterface[] => {
    const moves: PositionInterface[] = []
    const { x, y } = this.position

    const validate = (position: PositionInterface) => {
      const key = getKeyByPosition(position)
      if (cellsByPosition[key].figure?.color === COLOR_REVERSE[this.color] || withoutValidation) {
        moves.push(position)
      }
    }

    // right
    if (
      y + this.direction >= 0 &&
      y + this.direction < GRID_SIZE &&
      x + 1 < GRID_SIZE
    ) {
      validate({ x: x + 1, y: y + this.direction })
    }
    // left
    if (
      y + this.direction >= 0 &&
      y + this.direction < GRID_SIZE &&
      x - 1 >= 0
    ) {
      validate({ x: x - 1, y: y + this.direction })
    }

    return moves
  }
}
