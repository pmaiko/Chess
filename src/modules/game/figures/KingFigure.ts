import { toRaw } from 'vue'

import type { CellsByPositionType } from '~/modules/game/Cell.ts'
import Figure from '~/modules/game/figures/Figure.ts'
import { COLOR_REVERSE, FIGURE, GRID_SIZE } from '~/modules/game/constants.ts'
import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'
import { movesToDictionary } from '~/modules/game/utils/movesToDictionary.ts'
import { getKeyByPosition } from '~/modules/game/utils/getKeyByPosition.ts'

export default class KingFigure extends Figure {
  name = FIGURE.king

  // TODO взятие пешки на проходе
  getMoves = (cellsByPosition: CellsByPositionType, withValidation: boolean = false, underProtection: boolean): PositionInterface[] => {
    const { x, y } = this.position
    const moves = [
      { x: 0, y: 1 },   // top
      { x: 0, y: -1 },  // bottom
      { x: 1, y: 0 },   // right
      { x: -1, y: 0 },  // left
      { x: 1, y: 1 },   // top right
      { x: 1, y: -1 },  // bottom right
      { x: -1, y: 1 },  // top left
      { x: -1, y: -1 }, // bottom left
    ]

    const enemyFiguresMoves = Object.values(cellsByPosition).reduce<Record<string, boolean>>((acc, cell) => {
      if (
        cell.figure &&
        this.color === COLOR_REVERSE[cell.figure.color] &&
        cell.figure.name !== FIGURE.king &&
        toRaw(cell.figure) !== this
      ) {
        const positions = cell.figure.getDangerousMoves(cellsByPosition)
        acc = {
          ...acc,
          ...movesToDictionary(positions),
        }
      }
      return acc
    }, {})

    return moves.reduce<PositionInterface[]>((acc, item) => {
      const move = { x: x + item.x, y: y + item.y }

      if (
        move.x >= 0 && move.x < GRID_SIZE &&
        move.y >= 0 && move.y < GRID_SIZE &&
        !!Figure.validatePosition(move, cellsByPosition, this.color, underProtection).position &&
        !enemyFiguresMoves[getKeyByPosition(move)] &&
        withValidation
      ) {
        acc.push(move)
      }
      return acc
    }, [])
  }

  getDangerousMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, false, false)
  }

  getValidatedMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition, true, false)
  }
}
