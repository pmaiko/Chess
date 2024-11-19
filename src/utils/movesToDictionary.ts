import { PositionInterface } from '~/figures/types/PositionInterface.ts'
import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'

export const movesToDictionary = (moves: PositionInterface[]) => {
  return Object.fromEntries(moves.map(position => [getKeyByPosition(position), true]))
}
