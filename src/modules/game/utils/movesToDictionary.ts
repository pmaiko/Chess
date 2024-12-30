import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'
import { getKeyByPosition } from '~/modules/game/utils/getKeyByPosition.ts'

export const movesToDictionary = (moves: PositionInterface[]) => {
  return Object.fromEntries(moves.map(position => [getKeyByPosition(position), true]))
}
