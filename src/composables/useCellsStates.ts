import { FigureInterface } from '~/figures/types/FigureInterface.ts'
import { Ref, ref } from 'vue'
import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { movesToDictionary } from '~/utils/movesToDictionary.ts'

export interface StatesInterface {
  canMove: boolean,
  canMoveWithCapture: boolean,
}

export const useCellsStates = (cellsByPosition: Ref<CellsByPositionType>, figure: Ref<FigureInterface | null>) => {
  const cellsWithStates = ref<Record<string, StatesInterface>>({})

  const moves = movesToDictionary(figure.value ? figure.value.getMoves(cellsByPosition.value) : [])

  Object.values(cellsByPosition.value).forEach((cell) => {
    const key = getKeyByPosition(cell.position)
    if (moves[key]) {
      cellsWithStates.value[getKeyByPosition(cell.position)] = {
        canMove: true,
        canMoveWithCapture: false,
      }
    }
  })

  return cellsWithStates
}
