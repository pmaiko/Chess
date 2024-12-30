import { v4 as uuidv4 } from 'uuid'

import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'
import type { COLOR } from '~/modules/game/constants.ts'
import type Figure from '~/modules/game/figures/Figure.ts'

export type CellsByPositionType = Record<string, Cell>

export default class Cell {
  id: string = uuidv4()
  position: PositionInterface
  color: COLOR
  figure: Figure | null = null

  constructor (position: PositionInterface, color: COLOR) {
    this.position = position
    this.color = color
  }
}
