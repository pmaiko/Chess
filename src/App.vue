<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">
          Go to Home
        </RouterLink>
        <RouterLink to="/game">
          Go to Game
        </RouterLink>
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme } from 'naive-ui'
</script>
<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
