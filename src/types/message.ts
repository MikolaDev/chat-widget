export enum MessageSenderEnum {
  ASSISTANT = 'ASSISTANT',
  USER = 'USER',
}

export interface IMessage {
  id: string
  text: string
  sender: MessageSenderEnum
  timestamp: string
}
