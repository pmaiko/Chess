<template>
  <div class="the-game">
    <div class="the-game__col the-game__col_left">
      left
    </div>
    <div class="the-game__col the-game__col_center">
      <TheGrid
        :cells="cells"
        :cellsStates="cellsStates"
        @_dragStart="pickFigure"
        @_drop="putFigure"
      />
    </div>
    <div class="the-game__col the-game__col_right">
      <TheDashboard
        :captureFigures="captureFigures"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'

  import { useGame } from '../composables/useGame.ts'
  import { useCellsStates } from '../composables/useCellsStates.ts'

  import TheGrid from './TheGrid.vue'
  import TheDashboard from './TheDashboard.vue'

  const { cells, cellsByPosition, pickedFigure, captureFigures, startGame, pickFigure, putFigure } = useGame()

  const cellsStates = computed(() => {
    return useCellsStates(cellsByPosition, pickedFigure)
  })

  onMounted(() => {
    startGame()
  })
</script>
<style lang="scss">
  .the-game {
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr;
    gap: 24px;

    &__col {
      display: grid;
      justify-content: center;
    }
  }
</style>
