import type { PositionInterface } from '~/modules/game/services/PositionService.ts'

export type ValidationResultType =
  | { break: true; position: PositionInterface | null }
  | { break: false; position: PositionInterface };
