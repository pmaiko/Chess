import { COLOR, GRID_SIZE } from '~/modules/game/constants.ts'
import Cell from '~/modules/game/Cell.ts'

export const createCells = () => {
  const cells = []
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      cells.push(
        new Cell({
          x,
          y,
        }, (x + y) % 2 !== 0 ? COLOR.black : COLOR.white),
      )
    }
  }

  return cells
}
