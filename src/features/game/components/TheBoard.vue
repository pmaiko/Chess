<template>
  <div
    v-if="cells.length"
    class="the-board"
  >
    <GamePlayerCard name="" />
    <div class="the-board__list">
      <TheCell
        v-for="cell in cells"
        :key="`x${cell.position.x}; y${cell.position.y}`"
        :data-position="`x${cell.position.x}; y${cell.position.y}`"
        :cell="cell"
        :states="cellsStates.value[cell.position.getKey()]"
        class="the-board__list-item"
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
    <GamePlayerCard name="" />
  </div>
</template>

<script setup lang="ts">
  import TheCell from './TheCell.vue'
  import TheFigure from './TheFigure.vue'

  import { useDrag } from '~/common/composables/useDrag.ts'
  import GamePlayerCard from '~/features/game/components/player/GamePlayerCard.vue';

  defineProps<{
    cells: any
    cellsStates: any
  }>()

  const $emit = defineEmits(['_dragStart', '_drop'])

  const {
    handlerDropEnter,
    handlerDropLeave,
    handlerDrop,

    handlerDragStart,
  } = useDrag({
    dragStartFunction: (data: unknown) => {
      $emit('_dragStart', data)
    },
    dropFunction: (data: unknown) => {
      $emit('_drop', data)
    },
  })
</script>

<style lang="scss">
  .the-board {
    max-width: calc((1 / 1) * (100dvh));
    aspect-ratio: 1 / 1;
    padding: 1rem;

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
