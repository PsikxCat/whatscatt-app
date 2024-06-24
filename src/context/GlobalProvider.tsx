'use client'

import { useState } from 'react'
import { GlobalContext } from './GlobalContext'
import { ChatType } from '@/types'

interface GlobalProviderProps {
  children: React.ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null)

  return <GlobalContext.Provider value={{ selectedChat, setSelectedChat }}>{children}</GlobalContext.Provider>
}
