<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />
    <div class="wrapper">
      <main>
        <RouterView />
      </main>
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { usePlayerStore } from '~/features/player/store/playerStore.ts'

const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)

console.log(player)
</script>
<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
