import { computed, ref } from 'vue'
import { createCells } from '~/utils/createCells.ts'
import Cell from '~/models/Cell.ts'
import { CLASS_BY_FIGURE_DICTIONARY, COLOR, FIGURE, FIGURES_POSITIONS_KEYS } from '~/constants.ts'
import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'
import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import { useCellsStates } from '~/composables/useCellsStates.ts'
import { movesToDictionary } from '~/utils/movesToDictionary.ts'

export type CellsByPositionType = Record<string, Cell>

export const useGame = () => {
  const cells = ref(createCells())
  const cellsByPosition = computed(() => {
    return cells.value.reduce((acc, cell) => {
      acc[getKeyByPosition(cell.position)] = cell
      return acc
    }, {} as CellsByPositionType)
  })

  const startGame = () => {
    cells.value = cells.value.map((cell: Cell) => {
      const key = FIGURES_POSITIONS_KEYS[cell.position.y][cell.position.x]
      if (key) {
        const [color, figure, number]: [COLOR, FIGURE, FigureInterface['number']] = key.split('.')

        cell.figure = new CLASS_BY_FIGURE_DICTIONARY[figure]({ cellId: cell.id, number, color, position: cell.position })
      }

      return cell
    })
  }

  const pickedFigure = ref<FigureInterface | null>(null)

  const captureFigures = ref<FigureInterface[]>([])

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

  const cellsWithStates = computed(() => {
    return useCellsStates(cellsByPosition, pickedFigure).cellsWithStates
  })

  return {
    cells,
    cellsByPosition,

    cellsWithStates,

    pickedFigure,

    captureFigures,

    startGame,
    pickFigure,
    putFigure,
  }
}
