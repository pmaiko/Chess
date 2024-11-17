<template>
  <div
    v-if="cells.length"
    class="the-grid"
  >
    <div class="the-grid__list">
      <TheCell
        v-for="cell in cells"
        :key="`x${cell.position.x}; y${cell.position.y}`"
        :data-position="`x${cell.position.x}; y${cell.position.y}`"
        :cell="cell"
        :states="cellsWithStates.value[getKeyByPosition(cell.position)]"
        class="the-grid__list-item"
        @dragover.prevent
        @dragenter.prevent="handlerDropEnter"
        @dragleave.prevent="handlerDropLeave"
        @drop="handlerDrop($event, cell)"
      >
        <TheFigure
          v-if="cell.figure"
          :figure="cell.figure"
          class="draggable"
          draggable="true"
          @dragstart="handlerDragStart($event, cell)"
        />
      </TheCell>
    </div>
  </div>
  <pre>{{ captureFigures }}</pre>
</template>

<script setup lang="ts">
  import TheCell from './TheCell.vue'
  import TheFigure from '~/components/TheFigure.vue'
  import { useGame } from '~/composables/useGame.ts'
  import { onMounted } from 'vue'
  import { useDrag } from '~/composables/useDrag.ts'
  import { getKeyByPosition } from '~/utils/getKeyByPosition.ts'

  const { cells, cellsWithStates, captureFigures, startGame, pickFigure, putFigure } = useGame()

  onMounted(() => {
    startGame()
  })

  const {
    handlerDropEnter,
    handlerDropLeave,
    handlerDrop,

    handlerDragStart,
  } = useDrag({
    handlerPickFigure: pickFigure,
    handlerPutFigure: putFigure,
  })
</script>

<style lang="scss">
  .the-grid {
    max-width: calc((1 / 1) * (100dvh));
    padding: 2rem;
    aspect-ratio: 1 / 1;

    &__list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #eee;
    }
  }

  .draggable {
    cursor: grab;
  }

  .draggable:active {
    cursor: grabbing;
  }

  .hovered {
    border: 1px solid yellow;
  }

  .invisible {
    display: none;
  }
</style>
