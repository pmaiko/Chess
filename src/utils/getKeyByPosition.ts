import { PositionInterface } from '~/figures/types/PositionInterface.ts'

export const getKeyByPosition = (position: PositionInterface): string => {
  return `x${position.x}.y${position.y}`
}
