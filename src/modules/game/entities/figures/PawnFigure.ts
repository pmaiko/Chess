import Figure from '~/modules/game/entities/figures/Figure.ts'
import { COLOR, FIGURE, GRID_SIZE } from '~/modules/game/constants.ts'
import type { MoveInterface, MovesByDirection, PositionInterface } from '~/modules/game/services/PositionService.ts'
import { PositionService } from '~/modules/game/services/PositionService.ts'
import type { CellsMap } from '~/modules/game/entities/Board.ts'
import { FindValidCapturePositionService } from '~/modules/game/services/FindValidCapturePositionService.ts'
import { FindValidPositionService } from '~/modules/game/services/FindValidPositionService.ts'
import { FindDangerPositionService } from '~/modules/game/services/FindDangerPositionService.ts'

export default class PawnFigure extends Figure {
  name = FIGURE.pawn
  isWhite: boolean
  direction: number

  constructor (
    cellId: string,
    number: string,
    color: COLOR,
    position: PositionInterface,
  ) {
    super(cellId, number, color, position)

    this.isWhite = color === COLOR.white
    this.direction = this.isWhite ? -1 : 1
  }

  getDangerousMoves = (cells: CellsMap): MoveInterface => {
    const allMoves = this.getAllMoves()

    const movesByDirection: MovesByDirection = {
      '+1-right': allMoves.movesByDirection['+1-right'],
      '+1-left': allMoves.movesByDirection['+1-left'],
    }

    const validMovesByDirection = FindDangerPositionService.findValid(this, movesByDirection, cells)

    return {
      moves: Object.values(validMovesByDirection).flat(),
      movesByDirection: validMovesByDirection,
    }
  }

  getCaptureMoves = (cells: CellsMap): MoveInterface => {
    const allMoves = this.getAllMoves()

    const movesByDirection: MovesByDirection = {
      '+1-right': allMoves.movesByDirection['+1-right'],
      '+1-left': allMoves.movesByDirection['+1-left'],
    }

    const validMovesByDirection = FindValidCapturePositionService.findValid(this, movesByDirection, cells)
    const moves = Object.values(validMovesByDirection).flat()

    return {
      moves,
      movesByDirection: validMovesByDirection,
    }
  }

  getValidMoves = (cells: CellsMap): MoveInterface => {
    const allMoves = this.getAllMoves()

    const movesByDirection: MovesByDirection = {
      '+1': allMoves.movesByDirection['+1'],
      '+2': allMoves.movesByDirection['+2'],
    }

    const validMovesByDirection = FindValidPositionService.findValid(this, movesByDirection, cells)
    const moves = Object.values(validMovesByDirection).flat()

    return {
      moves,
      movesByDirection: validMovesByDirection,
    }
  }

  getAllMoves = (): MoveInterface => {
    const { x, y } = this.position
    const movesByDirection: MovesByDirection = {
      '+1': [],
      '+2': [],
      '+1-right': [],
      '+1-left': [],
    }

    if (
      y + this.direction >= 0 &&
      y + this.direction < GRID_SIZE) {
      movesByDirection['+1']?.push(new PositionService( x, y + this.direction))
    }

    const startRow = this.isWhite ? 6 : 1
    if (
      y === startRow &&
      y + 2 * this.direction >= 0 &&
      y + 2 * this.direction < GRID_SIZE
    ) {
      movesByDirection['+2']?.push(new PositionService(x, y + 2 * this.direction))
    }

    movesByDirection['+1-right']?.push(new PositionService(x + 1, y + this.direction))
    movesByDirection['+1-left']?.push(new PositionService(x - 1, y + this.direction))

    const moves = Object.values(movesByDirection).flat()

    return {
      moves,
      movesByDirection,
    }
  }
}
