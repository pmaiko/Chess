<template>
  <div
    class="the-cell"
    :style="{backgroundColor: color}"
  >
    <!--<div class="the-cell__debug">-->
    <!--  {{ cell.position }}-->
    <!--</div>-->
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { COLOR, GRID_SIZE } from '~/constants/constants.ts'
  import type { StatesInterface } from '../composables/useCellsStates.ts'

  import type Cell from '~/features/game/entities/Cell.ts'

  const { cell, states } = defineProps<{
    cell: Cell,
    states?: StatesInterface
  }>()

  const color = computed(() => {
    if (states) {
      if (states.canMoveWithCapture) {
        return '#ff3535'
      }
      if (states.canMove) {
        return 'rgba(34, 255, 127, 0.8)'
      }
    }

    return cell.color === COLOR.white ? '#fff' : '#778e77'
  })
</script>

<style lang="scss">
  .the-cell {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / v-bind(GRID_SIZE));
    height: calc(100% / v-bind(GRID_SIZE));
    color: #1a1a1a;
    border: 1px solid #000;

    &__debug {
      position: absolute;
      inset: 0;
      color: red;
    }
  }
</style>
