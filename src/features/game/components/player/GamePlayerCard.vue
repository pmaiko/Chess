<template>
  <article class="game-player-card">
    <div class="game-player-card__avatar">
      <n-icon size="40">
        <PersonCircleOutline />
      </n-icon>
    </div>
    <div class="game-player-card__content">
      <div class="game-player-card__name">
        {{ name }}
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { PersonCircleOutline } from '@vicons/ionicons5'

defineProps<{
  name: string,
}>()
</script>

<style lang="scss">
.game-player-card {
  display: flex;
}
</style>
