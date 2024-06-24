import { type ChatType } from '@/types'
import { type Dispatch, type SetStateAction, createContext } from 'react'

export interface GlobalContextType {
  selectedChat: ChatType | null
  setSelectedChat: Dispatch<SetStateAction<ChatType | null>>
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)
