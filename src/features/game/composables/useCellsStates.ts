import type { Ref } from 'vue'
import { ref } from 'vue'

import { movesToDictionary } from '~/features/game/utils/movesToDictionary.ts'
import type { COLOR } from '~/constants/constants.ts'
import { COLOR_REVERSE } from '~/constants/constants.ts'
import type Figure from '~/features/game/entities/figures/Figure.ts'
import type { CellsMap } from '~/features/game/entities/Board.ts'

export interface StatesInterface {
  canMove: boolean,
  canMoveWithCapture: boolean,
}

export const useCellsStates = (cells: Ref<CellsMap>, figure: Ref<Figure | null>) => {
  const cellsStates = ref<Record<string, StatesInterface>>({})

  const moves = movesToDictionary(figure.value ? figure.value?.getMoves(cells.value) : [])

  Object.values(cells.value).forEach((cell) => {
    const key = cell.position.getKey()
    const move = moves[key]

    if (move) {
      cellsStates.value[cell.position.getKey()] = {
        canMove: true,
        canMoveWithCapture: cell.figure?.color === COLOR_REVERSE[figure.value?.color as COLOR],
      }
    }
  })

  return cellsStates
}
