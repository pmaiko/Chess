import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'

export type ValidationResultType =
  | { break: true; position: PositionInterface | null }
  | { break: false; position: PositionInterface };
