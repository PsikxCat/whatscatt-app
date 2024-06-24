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

export interface MessageType {
  _id: Id<'messages'> | string // string solo para dummy-data
  chat: Id<'chats'> | string // string solo para dummy-data
  messageType: 'text' | 'image' | 'video'
  content: string
  sender: Id<'users'> | string // string solo para dummy-data
  _creationTime: number
}

export interface ChatType {
  _id: Id<'chats'>
  isGroup: boolean
  admin: string | null
  chatImage: string | null
  chatName: string | null
  members: Id<'users'>[]
  _creationTime: number
  lastMessage?: MessageType
  online: boolean | null
}
