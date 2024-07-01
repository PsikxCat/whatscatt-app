import { Id } from '@cx/_generated/dataModel'

export interface UserType {
  _id: Id<'users'>
  _creationTime: number
  name?: string
  email: string
  image: string
  admin?: boolean
  online: boolean
  tokenIdentifier: string
}

interface LastMessageType {
  _id: Id<'messages'>
  chat: Id<'chats'>
  messageType: 'text' | 'image' | 'video'
  content: string
  sender: string | Id<'users'> // el tipo string solo si se implementa el chatbot
  _creationTime: number
}

export interface MessageType extends Omit<LastMessageType, 'sender'> {
  sender: UserType
}

export interface ChatType {
  _id: Id<'chats'>
  isGroup: boolean
  admin: string | null
  chatImage: string | null
  chatName: string | null
  members: Id<'users'>[]
  _creationTime: number
  lastMessage?: LastMessageType
  online: boolean | null
}
