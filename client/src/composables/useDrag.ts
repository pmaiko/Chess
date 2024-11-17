import Cell from '~/models/Cell.ts'
// import { Ref } from 'vue'
// import { highlightCells } from '~/utils/highlightCells.ts'
// import { CellsByPositionType } from '~/composables/useGame.ts'

export const useDrag = ({
  handlerPickFigure,
  handlerPutFigure,
}: any) => {
  const handlerDropEnter = (event: DragEvent) => {
    if (event.target instanceof HTMLElement) {
      event.target.classList.add('hovered')
    }
  }
  const handlerDropLeave = (event: DragEvent) => {
    if (event.target instanceof HTMLElement) {
      event.target.classList.remove('hovered')
    }
  }

  const handlerDragStart = (event: DragEvent, cell: Cell) => {
    if (!event.dataTransfer || !cell.figure) {
      return
    }
    event.dataTransfer.effectAllowed = 'move'
    if (event.target instanceof HTMLElement) {
      event.target.classList.remove('invisible')
    }

    handlerPickFigure(cell)
    //
    // event.dataTransfer.setData('figureId', cell.figure.id)
    //
    // if (cell.figure) {
    //   const possibleMoves = cell.figure.getMoves(cellsByPosition.value)
    //   cells.value = highlightCells(cells.value, possibleMoves)
    // }
  }

  const handlerDrop = (event: DragEvent, cell: Cell) => {
    handlerDropLeave(event)

    handlerPutFigure(cell)
    //
    // if (!event.dataTransfer) {
    //   return
    // }

    // event.dataTransfer.clearData('figureId')
    //
    // if (cell) { // higlig
    //   const figureId = event.dataTransfer.getData('figureId')
    //   const draggedCell = cells.value.find((element: Cell) => element.figure?.id === figureId)
    //   const draggedFigure = draggedCell?.figure
    //
    //   if (draggedFigure) {
    //     draggedFigure.position = cell.position
    //     cell.figure = draggedFigure
    //     draggedCell.figure = null
    //   }
    // }
    //
    // cells.value = highlightCells(cells.value)
  }

  return {
    handlerDropEnter,
    handlerDropLeave,
    handlerDragStart,
    handlerDrop,
  }
}
