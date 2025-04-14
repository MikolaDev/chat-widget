<script setup lang="ts">
import { type IMessage, MessageSenderEnum } from '@/types/message.ts'
import imgAvatarAssistant from '@/assets/images/assistant.png'
import imgAvatarUser from '@/assets/images/user.png'
import { DateTime } from 'luxon'

defineProps<IMessage>()
</script>

<template>
  <div
    :key="id"
    :class="[
      'chat-widget-message',
      `chat-widget-message--${sender === MessageSenderEnum.ASSISTANT ? 'left' : 'right'}`,
    ]"
  >
    <div class="chat-widget-message__info">
      <img
        class="chat-widget-message__info-avatar"
        :src="sender === MessageSenderEnum.ASSISTANT ? imgAvatarAssistant : imgAvatarUser"
        width="40"
        height="40"
      />
      <div class="chat-widget-message__info-time">
        {{ DateTime.fromISO(timestamp).toLocaleString(DateTime.TIME_24_SIMPLE) }}
      </div>
    </div>
    <div class="chat-widget-message__text">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-widget-message {
  display: flex;
  gap: 0.5rem;
  width: min(50rem, 100%);

  &--left {
    --message-color: var(--color-message-in);
    --message-bg-color: var(--color-message-in);
    --avatar-border-color: var(--c-primary);
    flex-direction: row;
    justify-content: flex-start;
    align-self: start;
  }

  &--right {
    --message-color: var(--color-message-out);
    --message-bg-color: var(--color-message-out);
    --avatar-border-color: var(--c-system-300);
    flex-direction: row-reverse;
    align-self: end;
  }

  &__text {
    font-size: 1rem;
    background-color: var(--message-color);
    color: var(--color-text-default);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    align-self: flex-start;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;

    p {
      margin: 0;
    }
  }

  &__info {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15em;

    &-avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 2px solid var(--avatar-border-color);
    }

    &-time {
      font-size: 0.75rem;
      font-weight: 400;
      color: var(--color-text-gray);
    }
  }
}
</style>
