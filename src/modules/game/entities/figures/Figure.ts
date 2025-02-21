import { v4 as uuidv4 } from 'uuid'

import { type COLOR, type FIGURE, COLOR_REVERSE } from '~/modules/game/constants.ts'
import type { ValidationResultType } from '~/modules/game/types/ValidationResultType.ts'
import type { PositionInterface , MoveInterface } from '~/modules/game/services/PositionService.ts'
import type { CellsMap } from '~/modules/game/entities/Board.ts'
import { FindValidCapturePositionService } from '~/modules/game/services/FindValidCapturePositionService.ts'
import { FindValidPositionService } from '~/modules/game/services/FindValidPositionService.ts'
import { FindDangerPositionService } from '~/modules/game/services/FindDangerPositionService.ts'

export default abstract class Figure {
  public readonly id: string = uuidv4()
  public abstract name: FIGURE

  constructor (
    public cellId: string,
    public number: string,
    public color: COLOR,
    public position: PositionInterface,
  ) {
    this.cellId = cellId
    this.number = number
    this.color = color
    this.position = position
  }

  abstract getAllMoves: () => MoveInterface

  // abstract getMoves: (cells: CellsMap) => PositionInterface[]
  //
  // abstract getCaptureMoves: (cells: CellsMap) => MoveInterface
  //
  // abstract getValidMoves: (cells: CellsMap) => MoveInterface

  getMoves = (cells: CellsMap): PositionInterface[] => {
    const validMoves = this.getValidMoves(cells)
    const captureMoves = this.getCaptureMoves(cells)
    return [...validMoves.moves, ...captureMoves.moves]
  }

  getDangerousMoves = (cells: CellsMap): MoveInterface => {
    const allMoves = this.getAllMoves()
    const movesByDirection = FindDangerPositionService.findValid(this, allMoves.movesByDirection, cells)
    const moves = Object.values(movesByDirection).flat()

    return {
      moves,
      movesByDirection,
    }
  }

  getCaptureMoves = (cells: CellsMap): MoveInterface => {
    const allMoves = this.getAllMoves()
    const movesByDirection = FindValidCapturePositionService.findValid(this, allMoves.movesByDirection, cells)
    const moves = Object.values(movesByDirection).flat()

    return {
      moves,
      movesByDirection,
    }
  }

  getValidMoves = (cells: CellsMap): MoveInterface => {
    const allMoves = this.getAllMoves()

    const movesByDirection = FindValidPositionService.findValid(this, allMoves.movesByDirection, cells)
    const moves = Object.values(movesByDirection).flat()

    return {
      moves,
      movesByDirection,
    }
  }

  static validatePosition = (
    position: PositionInterface,
    cells: CellsMap,
    color: COLOR,
    underProtection: boolean,
  ): ValidationResultType => {
    const cell = cells[position.getKey()]

    if (cell?.figure?.color === color) {
      return {
        break: true,
        position: underProtection ? position : null,
      }
    }

    if (cell?.figure?.color === COLOR_REVERSE[color]) {
      return {
        break: true,
        position: position,
      }
    }

    return {
      break: false,
      position,
    }
  }
}
