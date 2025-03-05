import { computed, ref } from 'vue'

import { movesToDictionary } from '../utils/movesToDictionary.ts'

import type Figure from '~/features/game/entities/figures/Figure.ts'
import type Cell from '~/features/game/entities/Cell.ts'
import type { CellsMap } from '~/features/game/entities/Board.ts'
import { useGameStore } from '~/features/game/store/gameStore.ts'

export const useGame = () => {
  const gameStore = useGameStore()

  const cells = computed<CellsMap>(() => {
    return gameStore.game!.board.cells
  })

  const startGame = () => {

  }

  const pickedFigure = ref<Figure | null>(null)

  const captureFigures = ref<Figure[]>([])

  const pickFigure = (cell: Cell) => {
    pickedFigure.value = null

    const figure = cell.figure

    if (figure) {
      const moves = figure.getMoves(cells.value)

      if (moves.length) {
        pickedFigure.value = cell.figure
      }
    }

    // console.log('pickFigure', cell.position, pickedFigure.value?.position)
  }

  const putFigure = (cell: Cell) => {
    if (pickedFigure.value) {
      const moves = movesToDictionary(pickedFigure.value.getMoves(cells.value))
      if (moves[cell.position.getKey()]) {
        const pickCell = cells.value[pickedFigure.value.position.getKey()]
        if (pickCell) {
          pickCell.removeFigure()
          pickedFigure.value.position = cell.position

          if (cell.figure) {
            captureFigures.value.push(cell.figure)
          }
          cell.setFigure(pickedFigure.value)
        }
      }
    }
    pickedFigure.value = null
  }

  return {
    cells,
    pickedFigure,
    captureFigures,

    startGame,
    pickFigure,
    putFigure,
  }
}
