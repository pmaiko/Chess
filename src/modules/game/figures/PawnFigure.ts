import Figure from '~/modules/game/figures/Figure.ts'
import { COLOR, COLOR_REVERSE, FIGURE, GRID_SIZE } from '~/modules/game/constants.ts'
import type { CellsByPositionType } from '~/modules/game/Cell.ts'
import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'
import { getKeyByPosition } from '~/modules/game/utils/getKeyByPosition.ts'

export default class PawnFigure extends Figure {
  name = FIGURE.pawn
  isWhite: boolean
  direction: number

  constructor (
    cellId: string,
    number: string,
    color: COLOR,
    position: PositionInterface,
  ) {
    super(cellId, number, color, position)

    this.isWhite = color === COLOR.white
    this.direction = this.isWhite ? -1 : 1
  }

  getMoves = (cellsByPosition: CellsByPositionType, withValidation: boolean = false) => {
    const moves: PositionInterface[] = []
    const { x, y } = this.position

    const validate = (position: PositionInterface) => {
      const key = getKeyByPosition(position)
      if (!cellsByPosition[key].figure && withValidation) {
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
      ...this.getDangerousMoves(cellsByPosition, withValidation),
    ]
  }

  getDangerousMoves = (cellsByPosition: CellsByPositionType, withValidation: boolean = false): PositionInterface[] => {
    const moves: PositionInterface[] = []
    const { x, y } = this.position

    const validate = (position: PositionInterface) => {
      const key = getKeyByPosition(position)
      if (cellsByPosition[key].figure?.color === COLOR_REVERSE[this.color] && withValidation) {
        moves.push(position)
      } else if (!withValidation) {
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

  getValidatedMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, true)
  }
}
