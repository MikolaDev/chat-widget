import { type IMessage } from '@/types/message.ts'
import { useChatStore } from '@/stores/chat.ts'

const simulateTypingDelay = (min = 1000, max = 1800) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * (max - min) + min))

export const ChatService: {
  getAssistantMessage: (message: string) => Promise<IMessage | null>
} = {
  async getAssistantMessage(message: string): Promise<IMessage | null> {
    await simulateTypingDelay()

    const { createAssistantMessage, clearMessages } = useChatStore()

    const answerFunctions = {
      reverseMessage: (message: string): string => {
        return message.split('').reverse().join('')
      },
      reverseMessageByWords: (message: string): string => {
        return message
          .split(' ')
          .map((item) => item.split('').reverse().join(''))
          .join(' ')
      },
      encodeBase64: (message: string): string => {
        return btoa(unescape(encodeURIComponent(message)))
      },
    }

    let reply = ''
    if (['Привет', 'Tere', 'Hi', 'Hello'].some((greet) => message.toLowerCase().includes(greet.toLowerCase()))) {
      reply = 'Здравствуйте! Чем могу помочь?'
    } else if (message.toLowerCase().includes('clear')) {
      clearMessages()
      return null
    } else {
      const functions = Object.values(answerFunctions)
      reply = functions[Math.floor(Math.random() * functions.length)](message)
    }

    return createAssistantMessage(reply)
  },
}
