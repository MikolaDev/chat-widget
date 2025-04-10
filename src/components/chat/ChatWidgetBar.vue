<script setup lang="ts">
import IconSend from '@/components/icons/IconSend.vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import { isDesktop } from '@/utils/device-utils.ts'

const messageText = defineModel({ required: true, type: String })
const emit = defineEmits(['update:messageText', 'submitMessage'])

const inputHandler = (event: KeyboardEvent) => {
  if (isDesktop() && event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault()
    emit('submitMessage')
  }
  if (!isDesktop() && event.keyCode === 13 && event.shiftKey) {
    event.preventDefault()
    emit('submitMessage')
  }
}
</script>

<template>
  <div class="chat-widget-bar">
    <div class="chat-widget-bar__form">
      <textarea
        v-model.trim="messageText"
        @keydown="inputHandler"
        class="chat-widget-bar__form-input form-control"
        placeholder="Напишите сообщение..."
        type="text"
        rows="1"
      ></textarea>

      <ButtonWithIcon
        class="chat-widget-bar__form-button"
        :disabled="messageText.length === 0"
        @click="emit('submitMessage')"
        :icon="IconSend"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-widget-bar {
  padding: 0.75rem;

  &__form {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.5rem;

    &-input {
      transition:
        height var(--transition-default),
        background-color var(--transition-default),
        color var(--transition-default),
        border-color var(--transition-default);
      flex-grow: 1;
      height: 3em;
      padding: 0.75em 0.75em;
      border: 1px solid var(--color-border-default);
      background-color: var(--color-bg-surface-alpha);
      color: var(--color-text-default);
      border-radius: 0.5rem;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      resize: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      &::placeholder {
        color: var(--color-text-default);
      }

      &:focus {
        height: calc(1.5rem * 3 + 0.75em * 2);
      }
    }

    &-button {
      --icon-size: 0.4em;
      font-size: 3rem;

      &:disabled {
        transform: none;
        background: var(--c-primary-muted);
      }
    }
  }
}
</style>
