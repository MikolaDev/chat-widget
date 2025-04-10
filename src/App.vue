<script setup lang="ts">
import Chat from '@/components/chat/Chat.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useUIStore } from '@/stores/ui.ts'

const uiStore = useUIStore()
uiStore.initTheme()
</script>

<template>
  <div class="page-home" :class="['theme-' + uiStore.currentTheme?.toLowerCase()]">
    <div class="page-home__hero">
      <h1 class="page-home__hero-title">Chat Widget</h1>
      <h2 class="page-home__hero-subtitle">By <a href="https://mikoladev.ee/">@MikolaDev</a></h2>
      <ThemeSwitcher class="page-home__hero-theme-switcher" />
    </div>
    <Chat class="page-home__chat" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/main';

.page-home {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-default);

  &__hero {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;

    &-title {
      font-size: 4rem;
      font-weight: 800;
      color: var(--color-text-gray);
    }

    &-subtitle {
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--color-text-muted);
    }

    &-theme-switcher {
      margin-top: 1rem;
      font-size: 2rem;
    }
  }

  &__chat {
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0;
    margin: 2rem;
    width: min(400px, 100%);
    height: min(700px, 100dvh);
  }

  @media (max-width: 460px) {
    &__chat {
      bottom: 1rem;
      right: 1rem;
      margin: 0;
      width: calc(100% - 2rem);
      height: calc(100dvh - 2rem);
    }
  }
}
</style>
