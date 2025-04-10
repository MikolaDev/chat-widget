import { type IMessage } from '@/types/message.ts'
import { MAX_NUMBER_MESSAGES_IN_CHAT, useChatStore } from '@/stores/chat.ts'

const simulateTypingDelay = (min = 1000, max = 1800) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * (max - min) + min))

export const ChatService: {
  isCanSendMessages: boolean
  getAssistantMessage: (message: string) => Promise<IMessage | null>
} = {
  isCanSendMessages: true,
  async getAssistantMessage(message: string): Promise<IMessage | null> {
    const chatStore = useChatStore()

    await simulateTypingDelay()

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
    if (
      ['Привет', 'Tere', 'Hi', 'Hello'].some((greet) =>
        message.toLowerCase().includes(greet.toLowerCase()),
      )
    ) {
      reply = 'Здравствуйте! Чем могу помочь?'
    } else if (message.toLowerCase().includes('clear')) {
      chatStore.clearMessages()
      return null
    } else if (chatStore.messages.length > MAX_NUMBER_MESSAGES_IN_CHAT) {
      chatStore.isCanSendMessages = false
      reply = `Спасибо за обращение! Я вынужден завершить чат, через 5 минут вернусь, но если у вас возникнут дополнительные вопросы, не стесняйтесь обращаться — всегда рад помочь! Напишите нам на почту. Желаю вам всего наилучшего и удачи! До связи! 😊`
    } else {
      const functions = Object.values(answerFunctions)
      reply = functions[Math.floor(Math.random() * functions.length)](message)
    }

    return chatStore.createAssistantMessage(reply)
  },
}
