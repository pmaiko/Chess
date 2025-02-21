import { COLOR_REVERSE, GRID_SIZE } from '~/modules/game/constants.ts'
import type { CellsMap } from '~/modules/game/entities/Board.ts'
import type Figure from '~/modules/game/entities/figures/Figure.ts'
import type { Direction , MovesByDirection } from '~/modules/game/services/PositionService.ts'

export class FindValidCapturePositionService {
  static findValid (figure: Figure, movesByDirection: MovesByDirection, cells: CellsMap): MovesByDirection {
    return Object.entries(movesByDirection).reduce((acc, [direction, positions]) => {
      let skip = false

      acc[direction as Direction] = positions.filter((position) => {
        if (skip) {
          return false
        }

        const isValidPosition = (position.x >= 0 && position.x < GRID_SIZE && position.y >= 0 && position.y < GRID_SIZE)
        if (!isValidPosition) {
          return false
        }

        const cell = cells[position.getKey()]
        if (cell?.figure) {
          if (cell.figure.color === COLOR_REVERSE[figure.color]) {
            skip = true
            return true // Enemy figure - can be taken
          } else {
            skip = true // Own figure - blocking the way
          }
        }

        return false // Empty cell
      })

      return acc
    }, {} as MovesByDirection)
  }
}
