import type { Ref } from 'vue'
import { ref } from 'vue'

import type { CellsByPositionType } from '~/modules/game/Cell.ts'
import { movesToDictionary } from '~/modules/game/utils/movesToDictionary.ts'
import { getKeyByPosition } from '~/modules/game/utils/getKeyByPosition.ts'
import type { COLOR } from '~/modules/game/constants.ts'
import { COLOR_REVERSE } from '~/modules/game/constants.ts'
import type Figure from '~/modules/game/figures/Figure.ts'

export interface StatesInterface {
  canMove: boolean,
  canMoveWithCapture: boolean,
}

export const useCellsStates = (cellsByPosition: Ref<CellsByPositionType>, figure: Ref<Figure | null>) => {
  const cellsStates = ref<Record<string, StatesInterface>>({})

  const moves = movesToDictionary(figure.value ? figure.value?.getValidatedMoves(cellsByPosition.value) : [])

  Object.values(cellsByPosition.value).forEach((cell) => {
    const key = getKeyByPosition(cell.position)
    const move = moves[key]

    if (move) {
      cellsStates.value[getKeyByPosition(cell.position)] = {
        canMove: true,
        canMoveWithCapture: cell.figure?.color === COLOR_REVERSE[figure.value?.color as COLOR],
      }
    }
  })

  return cellsStates
}
