import { computed, ref } from 'vue'

import { movesToDictionary } from '../utils/movesToDictionary.ts'

import type Figure from '~/modules/game/entities/figures/Figure.ts'
import { Game } from '~/modules/game/entities/Game.ts'
import type Cell from '~/modules/game/entities/Cell.ts'
import type { CellsMap } from '~/modules/game/entities/Board.ts'
import { Player } from '~/modules/game/entities/Player.ts'
import { COLOR } from '~/modules/game/constants.ts'

export const useGame = () => {
  const game = ref(new Game([
    new Player('Petro', COLOR.white),
    new Player('Test', COLOR.black),
  ]))

  const cells = computed<CellsMap>(() => {
    return game.value.board.cells
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
