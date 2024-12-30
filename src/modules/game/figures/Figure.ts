import { v4 as uuidv4 } from 'uuid'

import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'
import type { CellsByPositionType } from '~/modules/game/Cell.ts'
import { type COLOR, type FIGURE, COLOR_REVERSE } from '~/modules/game/constants.ts'
import { getKeyByPosition } from '~/modules/game/utils/getKeyByPosition.ts'
import type { ValidationResultType } from '~/modules/game/types/ValidationResultType.ts'

export default abstract class Figure {
  public readonly id: string = uuidv4()
  public abstract name: FIGURE

  constructor (
    public cellId: string,
    public number: string,
    public color: COLOR,
    public position: PositionInterface,
  ) {
    this.cellId = cellId
    this.number = number
    this.color = color
    this.position = position
  }

  abstract getMoves: (cellsByPosition: CellsByPositionType, withValidation: boolean, underProtection: boolean) => PositionInterface[]

  abstract getDangerousMoves: (cellsByPosition: CellsByPositionType) => PositionInterface[]

  abstract getValidatedMoves: (cellsByPosition: CellsByPositionType) => PositionInterface[]

  static validatePosition = (
    position: PositionInterface,
    cellsByPosition: CellsByPositionType,
    color: COLOR,
    underProtection: boolean,
  ): ValidationResultType => {
    const key = getKeyByPosition(position)

    if (cellsByPosition[key].figure?.color === color) {
      return {
        break: true,
        position: underProtection ? position : null,
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
