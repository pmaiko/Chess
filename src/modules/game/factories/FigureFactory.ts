import type { COLOR } from '~/modules/game/constants.ts'
import { FIGURE } from '~/modules/game/constants.ts'
import type Figure from '~/modules/game/entities/figures/Figure.ts'
import RookFigure from '~/modules/game/entities/figures/RookFigure.ts'
import KnightFigure from '~/modules/game/entities/figures/KnightFigure.ts'
import BishopFigure from '~/modules/game/entities/figures/BishopFigure.ts'
import QueenFigure from '~/modules/game/entities/figures/QueenFigure.ts'
import KingFigure from '~/modules/game/entities/figures/KingFigure.ts'
import PawnFigure from '~/modules/game/entities/figures/PawnFigure.ts'
import type { PositionInterface } from '~/modules/game/services/PositionService.ts'

type FigureParams = {
  cellId: string
  number: string
  color: COLOR
  position: PositionInterface
}

export class FigureFactory {
  private static readonly FIGURE_MAP: Record<FIGURE, new (cellId: string, number: string, color: COLOR, position: PositionInterface) => Figure> = {
    [FIGURE.rook]: RookFigure,
    [FIGURE.knight]: KnightFigure,
    [FIGURE.bishop]: BishopFigure,
    [FIGURE.queen]: QueenFigure,
    [FIGURE.king]: KingFigure,
    [FIGURE.pawn]: PawnFigure,
  }

  /**
   * Создаёт экземпляр фигуры
   * @param figure - Тип фигуры
   * @param params - Параметры фигуры
   * @returns Экземпляр класса фигуры
   * @throws Ошибка, если фигура неизвестна
   */
  public static create (figure: FIGURE, params: FigureParams): Figure {
    const FigureClass = this.FIGURE_MAP[figure]
    if (!FigureClass) {
      throw new Error(`Unknown figure type: ${figure}`)
    }

    return new FigureClass(params.cellId, params.number, params.color, params.position)
  }
}
