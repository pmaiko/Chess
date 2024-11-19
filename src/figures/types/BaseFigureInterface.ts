import { COLOR } from '~/constants.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'

export type ValidationResultType =
  | { break: true; position: PositionInterface | null }
  | { break: false; position: PositionInterface };

export interface BaseFigureInterface {
  id: string
  cellId: string
  number: string
  color: COLOR
  position: PositionInterface
}
