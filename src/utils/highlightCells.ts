import Cell from '~/models/Cell.ts'
import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'

export const highlightCells = (cells: Cell[], moves?: PositionInterface[]) => {
  return cells.map((cell) => {
    return {
      ...cell,
      highlight: !!moves && moves.some((move) => {
        return getKeyByPosition(cell.position) === getKeyByPosition(move)
      }),
    }
  })
}
