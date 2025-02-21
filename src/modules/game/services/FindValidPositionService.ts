import { GRID_SIZE } from '~/modules/game/constants.ts'
import type { CellsMap } from '~/modules/game/entities/Board.ts'
import type Figure from '~/modules/game/entities/figures/Figure.ts'
import type { Direction , MovesByDirection } from '~/modules/game/services/PositionService.ts'

export class FindValidPositionService {
  static findValid (figure: Figure, movesByDirection: MovesByDirection, cells: CellsMap) {
    return Object.entries(movesByDirection).reduce((acc: MovesByDirection, [direction , positions]) => {
      let skip = false

      acc[direction as Direction] = positions.filter((position) => {
        if (skip) {
          return false
        }

        if (!(
          position.x >= 0 && position.x < GRID_SIZE &&
          position.y >= 0 && position.y < GRID_SIZE
        )) {
          return false
        }

        const cell = cells[position.getKey()]
        if (cell.figure && figure) {
          skip = true
          return false
        } else {
          return true
        }
      })

      return acc
    }, {})
  }
}
