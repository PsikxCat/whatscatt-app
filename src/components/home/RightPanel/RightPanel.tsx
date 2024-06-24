'use client'

import { useContext } from 'react'
import { useConvexAuth } from 'convex/react'
import { Video, X } from 'lucide-react'

import { GlobalContext } from '@/context/GlobalContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChatPlaceHolder, GroupMembersDialog, MessageContainer, MessageInput } from '@/components'

export default function RightPanel() {
  const { selectedChat, setSelectedChat } = useContext(GlobalContext)
  const { isAuthenticated } = useConvexAuth()

  if (!selectedChat) return <ChatPlaceHolder />

  return (
    <section className="flex w-3/4 flex-col">
      <section className="sticky top-0 z-50 w-full">
        <div className="flex h-[60px] justify-between bg-gray-primary p-2">
          {/* Avatar y nombre del chat */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={(selectedChat.chatImage as string) || '/placeholder.webp'} className="object-cover" />
              <AvatarFallback>
                <div className="h-full w-full animate-pulse rounded-full bg-gray-tertiary" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p>{selectedChat.chatName}</p>
              {selectedChat.isGroup && isAuthenticated && (
                <GroupMembersDialog admin={selectedChat.admin} chatId={selectedChat._id} />
              )}
            </div>
          </div>

          {/* Iconos Video y Cerrar */}
          <div className="mr-5 flex items-center gap-7">
            <a href="/video-call" target="_blank">
              <Video size={23} />
            </a>

            <X size={16} className="cursor-pointer" onClick={() => setSelectedChat(null)} />
          </div>
        </div>
      </section>

      {/* Mensajes del chat */}
      <MessageContainer />

      {/* Input del chat */}
      <MessageInput />
    </section>
  )
}
