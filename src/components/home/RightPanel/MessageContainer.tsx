'use client'

import { useContext } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@cx/_generated/api'

import { GlobalContext } from '@/context/GlobalContext'
import { ChatBubble } from '@/components'

export default function MessageContainer() {
  const { selectedChat } = useContext(GlobalContext)

  const messages = useQuery(api.messages.getMessages, { chatId: selectedChat!._id })
  const actualUser = useQuery(api.users.getActualUser)

  return (
    <section className="relative h-full flex-1 overflow-auto bg-chat-tile-light py-4 dark:bg-chat-tile-dark">
      <div className="flex h-full w-full flex-col-reverse gap-3 overflow-auto">
        <div className="flex flex-col gap-3 px-4">
          {messages?.map((msg, index) => (
            <div key={msg._id}>
              <ChatBubble
                message={msg}
                prevMessage={index > 0 ? messages[index - 1] : undefined}
                actualUser={actualUser!}
                selectedChat={selectedChat!}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
