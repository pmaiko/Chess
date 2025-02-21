import _ from 'lodash'

import Figure from '~/modules/game/entities/figures/Figure.ts'
import { FIGURE } from '~/modules/game/constants.ts'
import type {
  MoveInterface,
  MovesByDirection,
  PositionInterface,
} from '~/modules/game/services/PositionService.ts'
import { PositionService } from '~/modules/game/services/PositionService.ts'
import type { CellsMap } from '~/modules/game/entities/Board.ts'
import { FindValidCapturePositionService } from '~/modules/game/services/FindValidCapturePositionService.ts'
import { FindValidPositionService } from '~/modules/game/services/FindValidPositionService.ts'

export default class KingFigure extends Figure {
  name = FIGURE.king

  getCaptureMoves = (cells: CellsMap): MoveInterface => {
    const allMoves = this.getAllMoves()
    const enemyFiguresDangerousMoves = this.getEnemyFiguresDangerousMoves(cells)
    const excludedMoves = excludePositions(allMoves, enemyFiguresDangerousMoves)

    const validMovesByDirection = FindValidCapturePositionService.findValid(this, excludedMoves.movesByDirection, cells)
    const moves = Object.values(validMovesByDirection).flat()

    return {
      moves,
      movesByDirection: validMovesByDirection,
    }
  }

  getValidMoves = (cells: CellsMap): MoveInterface => {
    const allMoves = this.getAllMoves()
    const enemyFiguresDangerousMoves = this.getEnemyFiguresDangerousMoves(cells)
    const excludedMoves = excludePositions(allMoves, enemyFiguresDangerousMoves)

    const validMovesByDirection = FindValidPositionService.findValid(this, excludedMoves.movesByDirection, cells)
    const moves = Object.values(validMovesByDirection).flat()

    return {
      moves,
      movesByDirection: validMovesByDirection,
    }
  }


  // TODO взятие пешки на проходе
  getAllMoves = (): MoveInterface => {
    const { x, y } = this.position

    const movesByDirection: MovesByDirection = {
      'top': [new PositionService(x, 1 + y )],
      'bottom': [new PositionService(x, -1 + y )],
      'right': [new PositionService(1 + x, y )],
      'left': [new PositionService(-1 + x, y )],
      'top_right': [new PositionService(1 + x, 1 + y )],
      'bottom_right': [new PositionService(1 + x, -1 + y )],
      'top_left': [new PositionService(-1 + x, 1 + y )],
      'bottom_left': [new PositionService(-1 + x, -1 + y )],
    }

    return {
      moves: Object.values(movesByDirection).flat(),
      movesByDirection,
    }
  }

  private getEnemyFiguresDangerousMoves = (cells: CellsMap): PositionService[] => {
    return Object.values(cells).reduce<PositionService[]>((acc, cell) => {
      const figure = cell.figure

      if (figure && figure.color !== this.color) {
        const figureMoves = cell.figure?.getDangerousMoves(cells).moves

        acc = [...acc, ...figureMoves]
      }
      return acc
    }, [])
  }
}

function excludePositions (
  moveData: MoveInterface,
  positionsToExclude: PositionInterface[],
): MoveInterface {
  return {
    moves: _.differenceWith(moveData.moves, positionsToExclude, _.isEqual),
    movesByDirection: _.mapValues(moveData.movesByDirection, positions =>
      _.differenceWith(positions, positionsToExclude, _.isEqual),
    ),
  }
}
