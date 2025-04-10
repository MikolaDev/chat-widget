import { type IMessage, MessageSenderEnum } from '@/types/message.ts'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { DateTime } from 'luxon'
import Cookies from 'js-cookie'

export const MAX_NUMBER_MESSAGES_IN_CHAT = 20
const COOKIE_KEY = 'chat/messages'
const COOKIE_EXPIRATION_TIME = 5 / (60 * 24)

export const useChatStore = defineStore('chat', () => {
  const messages = ref<IMessage[]>([])
  const isCanSendMessages = ref<boolean>(true)

  const loadMessages = () => {
    try {
      const raw = Cookies.get(COOKIE_KEY)
      messages.value = raw ? JSON.parse(raw) : []
    } catch (error) {
      console.warn('Error loading messages', error)
      messages.value = []
    }

    isCanSendMessages.value = messages.value.length < MAX_NUMBER_MESSAGES_IN_CHAT
  }

  watch(
    messages,
    () => {
      Cookies.set(COOKIE_KEY, JSON.stringify(messages.value), { expires: COOKIE_EXPIRATION_TIME })
      isCanSendMessages.value = messages.value.length < MAX_NUMBER_MESSAGES_IN_CHAT
    },
    { deep: true },
  )

  const addMessage = (message: IMessage) => {
    messages.value.push(message)
  }

  const clearMessages = () => {
    messages.value = []
    Cookies.remove(COOKIE_KEY)
  }

  const createUserMessage = (text: string): IMessage => ({
    id: Math.random().toString(36),
    text,
    sender: MessageSenderEnum.USER,
    timestamp: DateTime.now().toISO(),
  })

  const createAssistantMessage = (text: string): IMessage => ({
    id: Math.random().toString(36),
    text,
    sender: MessageSenderEnum.ASSISTANT,
    timestamp: DateTime.now().toISO(),
  })

  return {
    isCanSendMessages,
    messages,
    loadMessages,
    addMessage,
    clearMessages,
    createUserMessage,
    createAssistantMessage,
  }
})
