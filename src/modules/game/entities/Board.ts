import { COLOR, GRID_SIZE, INITIAL_FIGURE_POSITIONS } from '~/modules/game/constants.ts'
import { PositionService } from '~/modules/game/services/PositionService.ts'
import Cell from '~/modules/game/entities/Cell.ts'
import { FigureFactory } from '~/modules/game/factories/FigureFactory.ts'

export type CellsMap = Record<string, Cell>;

export class Board {
  cells: CellsMap = {}

  constructor () {
    this.init()
  }

  private init (): void {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const cell = this.createCell(x, y)
        this.placeFigure(cell)
        this.cells[cell.position.getKey()] = cell
      }
    }
  }

  private createCell (x: number, y: number): Cell {
    const position = new PositionService(x, y)
    const cellColor = (x + y) % 2 !== 0 ? COLOR.black : COLOR.white
    return new Cell(position, cellColor)
  }

  private placeFigure (cell: Cell): void {
    const figureData = INITIAL_FIGURE_POSITIONS[cell.position.y]?.[cell.position.x]
    if (!figureData) { return }

    const [color, name, number] = figureData.split('.')
    if (!name) { return }

    const figure = FigureFactory.create(name, {
      cellId: cell.id,
      number,
      color,
      position: cell.position,
    })

    cell.setFigure(figure)
  }
}
