import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import { Ref, ref } from 'vue'
import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { movesToDictionary } from '~/utils/movesToDictionary.ts'
import { COLOR, COLOR_REVERSE } from '~/constants.ts'

export interface StatesInterface {
  canMove: boolean,
  canMoveWithCapture: boolean,
}

export const useCellsStates = (cellsByPosition: Ref<CellsByPositionType>, figure: Ref<FigureInterface | null>) => {
  const cellsWithStates = ref<Record<string, StatesInterface>>({})

  const moves = movesToDictionary(figure.value ? figure.value?.getValidatedMoves(cellsByPosition.value) : [])

  Object.values(cellsByPosition.value).forEach((cell) => {
    const key = getKeyByPosition(cell.position)
    const move = moves[key]

    if (move) {
      cellsWithStates.value[getKeyByPosition(cell.position)] = {
        canMove: true,
        canMoveWithCapture: cell.figure?.color === COLOR_REVERSE[figure.value?.color as COLOR],
      }
    }
  })

  return {
    cellsWithStates,
  }
}
