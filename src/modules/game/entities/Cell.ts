import { v4 as uuidv4 } from 'uuid'

import type { COLOR } from '~/modules/game/constants.ts'
import type Figure from '~/modules/game/entities/figures/Figure.ts'
import type { PositionInterface } from '~/modules/game/services/PositionService.ts'

export default class Cell {
  public readonly id: string = uuidv4()
  public position: PositionInterface
  public color: COLOR

  private _figure: Figure | null = null

  get figure () {
    return this._figure
  }

  constructor (position: PositionInterface, color: COLOR) {
    this.position = position
    this.color = color
  }

  setFigure = (figure: Figure) =>  {
    this._figure = figure
  }

  removeFigure = () => {
    this._figure = null
  }
}
