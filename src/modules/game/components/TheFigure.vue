<template>
  <div
    class="the-figure"
  >
    <img
      :src="`/figures/${figure.color}-${figure.name}.png`"
      alt=""
    >
    <!--<div class="the-figure__debug">-->
    <!--  x{{ figure.position.x }}-->
    <!--  y{{ figure.position.y }}-->
    <!--</div>-->
  </div>
</template>

<script setup lang="ts">
  import type Figure from '~/modules/game/entities/figures/Figure.ts'

  const { figure } = defineProps<{
    figure: Figure
  }>()
</script>

<style lang="scss">
  .the-figure {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center center;
    }

    &__debug {
      padding: 5px;
      font-size: 10px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: white;
    }
  }
</style>
