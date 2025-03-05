import { v4 as uuidv4 } from 'uuid'
import { COLOR } from '~/constants/constants.ts';

export class Player {
  readonly id: string = uuidv4()
  name: string
  color: COLOR | null = null

  constructor (name?: string) {
    this.name = name || ('guest' + this.id.slice(0, 8));
  }

  setColor (color: COLOR) {
    this.color = color
  }
}
