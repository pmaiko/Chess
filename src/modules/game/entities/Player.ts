import { v4 as uuidv4 } from 'uuid'

import type { COLOR } from '~/modules/game/constants.ts'

export class Player {
  readonly id: string = uuidv4()

  constructor (
    public name: string,
    public color: COLOR,
  ) {
    this.name = name
  }
}
