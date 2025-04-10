<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ChatWidget from '@/components/chat/ChatWidget.vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconChat from '@/components/icons/IconChat.vue'

const isOpen = ref<boolean>(false)

onMounted(() => {
  setTimeout(() => {
    isOpen.value = true
  }, 5000)
})
</script>

<template>
  <div class="chat">
    <transition name="chat__widget-transition" mode="out-in">
      <ChatWidget v-if="isOpen" class="chat__widget" v-model:is-open="isOpen" />
    </transition>
    <transition name="chat__button-transition" mode="out-in">
      <ButtonWithIcon
        v-if="!isOpen"
        class="chat__button"
        :icon="isOpen ? IconClose : IconChat"
        @click="isOpen = !isOpen"
      />
    </transition>
  </div>
</template>

<style scoped lang="scss">
.chat {
  --_width: var(--width, 460px);
  --_height: var(--height, 700px);

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 1rem;
  min-height: 4rem;
  min-width: 4rem;
  max-width: min(var(--_width), calc(100% - var(--padding) * 2));
  max-height: min(var(--_height), calc(100dvh - var(--padding) * 2));

  &__widget {
    transform-origin: 100% 100%;
    width: var(--_width);
    height: var(--_height);
    max-width: 100%;
    max-height: 100%;

    &-transition {
      &-enter-active,
      &-leave-active {
        transition:
          opacity var(--transition-default) ease,
          transform var(--transition-default) ease;
      }
      &-enter-from,
      &-leave-to {
        opacity: 0;
        transform: translate(-1.5rem, -1.5rem) scale(0.01);
      }
    }
  }

  &__button {
    position: absolute;
    bottom: 0;
    right: 0;
    flex-shrink: 0;
    align-self: end;
    justify-self: end;
    font-size: 4rem;
    opacity: 1;
    transform: scale(1);

    &-transition {
      &-enter-active,
      &-leave-active {
        transition:
          opacity var(--transition-default) ease,
          transform var(--transition-default) ease;
      }
      &-enter-from,
      &-leave-to {
        opacity: 0;
        transform: scale(0.01) !important;
      }
    }

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
