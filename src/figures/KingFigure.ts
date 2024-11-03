import BaseFigure from '~/figures/BaseFigure.ts'
import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import { COLOR_REVERSE, FIGURE, GRID_SIZE } from '~/constants.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'
import { toRaw } from 'vue'
import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'
import { movesToDictionary } from '~/utils/movesToDictionary.ts'

export default class KingFigure extends BaseFigure implements FigureInterface {
  name = FIGURE.king

  // TODO сзделать опасниые ходи для все фигур + взятие пешки на проходе
  getMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
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
        !!BaseFigure.validatePosition(move, cellsByPosition, this.color).position &&
        !enemyFiguresMoves[getKeyByPosition(move)]
      ) {
        acc.push(move)
      }
      return acc
    }, [])
  }

  getDangerousMoves = (cellsByPosition: CellsByPositionType): PositionInterface[] => {
    return this.getMoves(cellsByPosition)
  }
}
