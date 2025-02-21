import type { PositionInterface } from '~/modules/game/services/PositionService.ts'

export const movesToDictionary = (moves: PositionInterface[]) => {
  return Object.fromEntries(moves.map(position => [position.getKey(), true]))
}
