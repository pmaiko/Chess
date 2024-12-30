import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'

export const getKeyByPosition = (position: PositionInterface): string => {
  return `x${position.x}.y${position.y}`
}
