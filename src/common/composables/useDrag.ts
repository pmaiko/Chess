type ParamsType = {
  dragStartFunction: (data: unknown) => void
  dropFunction: (data: unknown) => void
}
export const useDrag = (params: ParamsType) => {
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

  const handlerDragStart = (event: DragEvent, data: unknown) => {
    if (!event.dataTransfer) {
      return
    }
    event.dataTransfer.effectAllowed = 'move'
    if (event.target instanceof HTMLElement) {
      event.target.classList.remove('invisible')
    }

    params.dragStartFunction(data)
  }

  const handlerDrop = (event: DragEvent, data: unknown) => {
    handlerDropLeave(event)

    params.dropFunction(data)
  }

  return {
    handlerDropEnter,
    handlerDropLeave,
    handlerDragStart,
    handlerDrop,
  }
}
