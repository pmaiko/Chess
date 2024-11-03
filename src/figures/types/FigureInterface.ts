import { FIGURE } from '~/constants.ts'
import { CellsByPositionType } from '~/composables/useGame.ts'
import RookFigure from '~/figures/RookFigure.ts'
import KnightFigure from '~/figures/KnightFigure.ts'
import BishopFigure from '~/figures/BishopFigure.ts'
import QueenFigure from '~/figures/QueenFigure.ts'
import PawnFigure from '~/figures/PawnFigure.ts'
import KingFigure from '~/figures/KingFigure.ts'
import { PositionInterface } from '~/figures/types/PositionInterface.ts'
import { BaseFigureInterface } from '~/figures/types/BaseFigureInterface.ts'

export interface FigureInterface extends BaseFigureInterface {
  name: FIGURE
  getMoves: (cellsByPosition: CellsByPositionType) => PositionInterface[]
  getDangerousMoves: (cellsByPosition: CellsByPositionType, withoutValidation?: boolean) => PositionInterface[]
}
export type FigureType = typeof RookFigure | typeof KnightFigure | typeof BishopFigure | typeof QueenFigure | typeof PawnFigure | typeof KingFigure
