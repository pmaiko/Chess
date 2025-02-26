<template>
  <div class="the-lobby">
    <n-row gutter="12" justify-content="center">
      <n-col :span="8">
        <img
          width="250"
          src="@/assets/logo.webp"
          alt="logo"
        />
        <n-h1>
          <n-text type="success" strong>
            Chess Clash: Battle of Minds
          </n-text>
        </n-h1>
        <n-h4 align-text prefix="bar">
          Step into the ultimate chess battlefield in Chess Clash: Battle of Minds!
          Challenge real players worldwide or test your skills against a smart AI.
          With stunning visuals, intuitive controls, and dynamic gameplay modes,
          this chess game brings classic strategy to the modern era.
          Master the board, outthink your opponents, and become a grandmaster!
        </n-h4>

        <n-row gutter="32">
          <n-col span="12">
            <n-button type="info" size="large" block style="gap: 10px;">
              Demo
              <template #icon>
                <n-icon size="40">
                  <GameControllerOutline />
                </n-icon>
              </template>
            </n-button>
          </n-col>
          <n-col span="12">
            <n-button type="success" size="large" block style="gap: 10px;">
              Search

              <template #icon>
                <n-icon size="40">
                  <GameControllerOutline />
                </n-icon>
              </template>
            </n-button>
          </n-col>
        </n-row>
      </n-col>
    </n-row>
  </div>
</template>

<script setup lang="ts">

import { GameControllerOutline } from '@vicons/ionicons5';
</script>

<style scoped>

</style>
