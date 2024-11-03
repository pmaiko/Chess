import { v4 as uuidv4 } from 'uuid'
import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'
import { COLOR, COLOR_REVERSE } from '~/constants.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import { BaseFigureInterface, ValidationResultType } from '~/figures/types/BaseFigureInterface.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'

export default class BaseFigure implements BaseFigureInterface {
  id: string = uuidv4()
  cellId
  number
  color
  position

  constructor ({ cellId, number, color, position }: Omit<BaseFigureInterface, 'id'>) {
    this.cellId = cellId
    this.number = number
    this.color = color
    this.position = position
  }

  static validatePosition = (position: PositionInterface, cellsByPosition: CellsByPositionType, color: COLOR): ValidationResultType => {
    const key = getKeyByPosition(position)

    if (cellsByPosition[key].figure?.color === color) {
      return {
        break: true,
        position: null,
      }
    }

    if (cellsByPosition[key].figure?.color === COLOR_REVERSE[color]) {
      return {
        break: true,
        position: position,
      }
    }

    return {
      break: false,
      position,
    }
  }
}
