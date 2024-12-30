import { computed, ref } from 'vue'

import { createCells } from '../utils/createCells.ts'
import type { CellsByPositionType } from '../Cell.ts'
import type Cell from '../Cell.ts'
import { FIGURES_POSITIONS_KEYS } from '../constants.ts'
import { getKeyByPosition } from '../utils/getKeyByPosition.ts'
import { movesToDictionary } from '../utils/movesToDictionary.ts'

import type Figure from '~/modules/game/figures/Figure.ts'
import { createFigure } from '~/modules/game/utils/createFigure.ts'

export const useGame = () => {
  const cells = ref<Array<Cell>>(createCells())
  const cellsByPosition = computed(() => {
    return cells.value.reduce((acc, cell) => {
      acc[getKeyByPosition(cell.position)] = cell
      return acc
    }, {} as CellsByPositionType)
  })

  const startGame = () => {
    cells.value = cells.value.map((cell) => {
      const key = FIGURES_POSITIONS_KEYS[cell.position.y][cell.position.x]
      if (key) {
        const [color, figure, number] = key.split('.')
        cell.figure = createFigure(figure, { cellId: cell.id, number, color, position: cell.position })
      }

      return cell
    })
  }

  const pickedFigure = ref<Figure | null>(null)

  const captureFigures = ref<Figure[]>([])

  const pickFigure = (cell: Cell) => {
    pickedFigure.value = null

    const figure = cell.figure

    if (figure) {
      const moves = figure.getValidatedMoves(cellsByPosition.value)

      if (moves.length) {
        pickedFigure.value = cell.figure
      }
    }

    console.log('pickFigure', cell.position, pickedFigure.value?.position)
  }

  const putFigure = (cell: Cell) => {
    if (pickedFigure.value) {
      const moves = movesToDictionary(pickedFigure.value.getValidatedMoves(cellsByPosition.value))
      console.log(moves)
      if (moves[getKeyByPosition(cell.position)]) {
        const pickCell = cellsByPosition.value[getKeyByPosition(pickedFigure.value.position)]
        pickCell.figure = null

        pickedFigure.value.position = cell.position

        if (cell.figure) {
          captureFigures.value.push(cell.figure)
        }
        cell.figure = pickedFigure.value
      }
    }
    pickedFigure.value = null
  }

  return {
    cells,
    cellsByPosition,
    pickedFigure,
    captureFigures,

    startGame,
    pickFigure,
    putFigure,
  }
}
