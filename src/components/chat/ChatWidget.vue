<script setup lang="ts">
import { ChatService } from '@/services/chatService.ts'
import { nextTick, ref, watch } from 'vue'
import { useChatStore } from '@/stores/chat.ts'
import ChatWidgetBar from '@/components/chat/ChatWidgetBar.vue'
import ChatWidgetMessage from '@/components/chat/ChatWidgetMessage.vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import imgAvatarAssistant from '@/assets/images/assistant.png'

const isOpen = defineModel('isOpen', { type: Boolean })
const messagesContainer = ref<HTMLDivElement | null>(null)

const chatStore = useChatStore()
chatStore.loadMessages()

const messageText = ref<string>('')
const submitMessage = async () => {
  if (!messageText.value.trim()) return

  const userMessage = chatStore.createUserMessage(messageText.value)

  chatStore.addMessage(userMessage)
  messageText.value = ''

  const assistantMessage = await ChatService.getAssistantMessage(userMessage.text)
  if (assistantMessage) chatStore.addMessage(assistantMessage)
}
const scrollMessagesContainerToBottom = () => {
  const container = messagesContainer.value
  if (container) container.scrollTop = container.scrollHeight
}
watch(
  () => chatStore.messages,
  () => {
    nextTick(() => scrollMessagesContainerToBottom())
  },
  { deep: true },
)
</script>

<template>
  <main class="chat-widget">
    <div class="chat-widget__header">
      <div class="chat-widget__header-info">
        <img class="chat-widget__header-avatar" :src="imgAvatarAssistant" />
        <div class="chat-widget__header-name">Дмитрий - Euronics</div>
        <div class="chat-widget__header-status">Онлайн</div>
      </div>
      <div class="chat-widget__header-actions">
        <ButtonWithIcon
          class="chat-widget__header-button-close"
          :icon="IconArrowDown"
          @click="isOpen = false"
        />
      </div>
    </div>

    <div v-if="chatStore.messages.length === 0" class="chat-widget__hero">
      <p>У вас пока нет сообщений с консультантом. Если мы можем вам чем-то помочь - пишите</p>
    </div>

    <div v-if="chatStore.messages.length > 0" class="chat-widget__body" ref="messagesContainer">
      <ChatWidgetMessage
        v-for="message in chatStore.messages"
        :key="message.id"
        :id="message.id"
        :sender="message.sender"
        :text="message.text"
        :timestamp="message.timestamp"
      />
    </div>

    <ChatWidgetBar
      class="chat-widget__bar"
      v-model="messageText"
      @submitMessage="submitMessage"
      :disabled="!chatStore.isCanSendMessages"
    />
  </main>
</template>

<style lang="scss" scoped>
.chat-widget {
  background-color: var(--color-bg-surface-1);
  border: 1px solid var(--color-border-default);
  overflow: hidden;
  border-radius: 0.5rem;
  display: inline-flex;
  flex-direction: column;
  box-shadow:
    0 10px 30px rgba(#3b435c, 0.2),
    0 20px 60px rgba(#3b435c, 0.1);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 0.75rem;
    border-bottom: 1px solid var(--color-border-default);

    &-info {
      display: grid;
      grid-template-areas: 'Avatar Name' 'Avatar Status';
      grid-template-columns: auto 1fr;
      align-items: center;
      align-content: center;
      gap: 0.3rem 0.75rem;
    }

    &-avatar {
      grid-area: Avatar;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 2px solid var(--c-primary);
    }

    &-name {
      grid-area: Name;
      align-self: end;
      font-size: 1rem;
      line-height: 1.2;
      font-weight: 600;
      color: var(--color-text-default);
    }

    &-status {
      grid-area: Status;
      align-self: start;
      font-size: 0.85rem;
      font-weight: 500;
      line-height: 1.2;
      color: var(--c-success);
    }

    &-button-close {
      font-size: 3rem;
    }
  }

  &__hero {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    text-align: center;
    font-size: 1rem;
    color: var(--color-text-default);
  }

  &__body {
    scroll-behavior: smooth;
    overflow: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    flex-grow: 1;
    overflow-y: scroll;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  &__bar {
    border-top: 1px solid var(--color-border-default);
  }
}
</style>
