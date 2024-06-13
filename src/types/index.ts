export interface UserType {
  _id: string
  // tipado por completar
}

export enum Message {
  Text = 'text',
  Image = 'image',
  Video = 'video',
}

export interface MessageType {
  _id: string
  messageType: Message
  content: string
  sender: string
  _creationTime: number
}

export interface ConversationType {
  _id: string
  isGroup: boolean // <---- Pendiente de revisar
  admin: string | null
  chatImage: string | null
  chatName: string | null
  participants: string[]
  _creationTime: number
  lastMessage?: MessageType
  sender: string
  isOnline: boolean
}
