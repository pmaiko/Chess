<template>
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
</template>
<script setup lang="ts">
</script>
<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
