import type { COLOR } from '~/constants/constants.ts'
import { FIGURE } from '~/constants/constants.ts'
import type Figure from '~/features/game/entities/figures/Figure.ts'
import RookFigure from '~/features/game/entities/figures/RookFigure.ts'
import KnightFigure from '~/features/game/entities/figures/KnightFigure.ts'
import BishopFigure from '~/features/game/entities/figures/BishopFigure.ts'
import QueenFigure from '~/features/game/entities/figures/QueenFigure.ts'
import KingFigure from '~/features/game/entities/figures/KingFigure.ts'
import PawnFigure from '~/features/game/entities/figures/PawnFigure.ts'
import type { PositionInterface } from '~/features/game/services/PositionService.ts'

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
