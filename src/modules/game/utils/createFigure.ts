import type { COLOR } from '~/modules/game/constants.ts'
import { FIGURE } from '~/modules/game/constants.ts'
import type Figure from '~/modules/game/figures/Figure.ts'
import RookFigure from '~/modules/game/figures/RookFigure.ts'
import KnightFigure from '~/modules/game/figures/KnightFigure.ts'
import BishopFigure from '~/modules/game/figures/BishopFigure.ts'
import QueenFigure from '~/modules/game/figures/QueenFigure.ts'
import KingFigure from '~/modules/game/figures/KingFigure.ts'
import PawnFigure from '~/modules/game/figures/PawnFigure.ts'
import type { PositionInterface } from '~/modules/game/types/PositionInterface.ts'

export const createFigure = (
  figure: FIGURE,
  params: {
    cellId: string,
    number: string,
    color: COLOR,
    position: PositionInterface,
  },
): Figure => {
  switch (figure) {
    case FIGURE.rook:
      return new RookFigure(params.cellId, params.number, params.color, params.position)
    case FIGURE.knight:
      return new KnightFigure(params.cellId, params.number, params.color, params.position)
    case FIGURE.bishop:
      return new BishopFigure(params.cellId, params.number, params.color, params.position)
    case FIGURE.queen:
      return new QueenFigure(params.cellId, params.number, params.color, params.position)
    case FIGURE.king:
      return new KingFigure(params.cellId, params.number, params.color, params.position)
    case FIGURE.pawn:
      return new PawnFigure(params.cellId, params.number, params.color, params.position)
    default:
      throw new Error(`Unknown figure: ${figure}`)
  }
}
