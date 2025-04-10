<script setup lang="ts">
import { ThemeType, useUIStore } from '@/stores/ui.ts'
import { ref, watch } from 'vue'

const uiStore = useUIStore()
uiStore.initTheme()

const isDarkMode = ref(uiStore.currentTheme === ThemeType.DARK)

watch(isDarkMode, (value) => {
  uiStore.currentTheme = value ? ThemeType.DARK : ThemeType.LIGHT
})
</script>

<template>
  <div
    @click="isDarkMode = !isDarkMode"
    :class="['theme-switcher', isDarkMode && 'theme-switcher--dark']"
  >
    <div class="theme-switcher__circle"></div>
  </div>
</template>

<style scoped lang="scss">
.theme-switcher {
  cursor: pointer;
  font-size: 2rem;
  width: calc(2em - 8px);
  height: 1em;
  padding: 3px;
  border-radius: 1em;
  border: 2px solid var(--color-border-default);
  background-color: var(--color-bg-surface-alpha);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &__circle {
    transition: transform var(--transition-default);
    width: calc(1em - 8px);
    height: calc(1em - 8px);
    border-radius: 50%;
    background-color: var(--c-primary);
  }

  &--dark &__circle {
    transform: translateX(100%);
  }
}
</style>
