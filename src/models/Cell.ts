import { v4 as uuidv4 } from 'uuid'
import { COLOR } from '../constants.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'
import { FigureInterface } from '~/figures/types/FigureInterface.ts'

export default class Cell {
  id: string = uuidv4()
  position: PositionInterface
  color: COLOR
  figure: FigureInterface | null = null

  constructor (position: PositionInterface, color: COLOR) {
    this.position = position
    this.color = color
  }
}
