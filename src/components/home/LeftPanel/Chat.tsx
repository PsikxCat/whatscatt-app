'use client'

import { useContext } from 'react'
import { ImageIcon, Users, VideoIcon } from 'lucide-react'
import { useQuery } from 'convex/react'

import { api } from '@cx/_generated/api'
import { GlobalContext } from '@/context/GlobalContext'
import { ChatType } from '@/types'
import { formatDate } from '@/lib/utils'
import { MessageSeenSvg } from '@/lib/svgs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ChatProps {
  chat: ChatType
}

export default function Chat({ chat }: ChatProps) {
  const { selectedChat, setSelectedChat } = useContext(GlobalContext)

  const actualUser = useQuery(api.users.getActualUser)
  const activeChat = selectedChat?._id === chat._id

  const chatImage = chat?.chatImage
  const chatName = chat?.chatName
  const lastMessage = chat?.lastMessage
  const lastMessageType = chat?.lastMessage?.messageType
  const lastMessageContent = chat?.lastMessage?.content
  const lastMessageSender = chat?.lastMessage?.sender

  return (
    <>
      {/* Chat */}
      <section
        className={`flex cursor-pointer items-center gap-2 p-3 hover:bg-chat-hover ${activeChat && 'bg-gray-tertiary'}`}
        onClick={() => setSelectedChat(chat)}
      >
        {/* Avatar */}
        <Avatar className="relative overflow-visible border border-gray-900">
          {/* Indicador de conexión (chats P2P) */}
          {chat.online && (
            <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-green-500" />
          )}

          {/* Imagen de perfil */}
          <AvatarImage src={chatImage || '/placeholder.webp'} className="rounded-full object-cover" />
          <AvatarFallback>
            <div className="h-full w-full animate-pulse rounded-full bg-gray-tertiary" />
          </AvatarFallback>
        </Avatar>

        {/* Detalles de la conversación */}
        <section className="w-full">
          {/* Nombre de la conversación y última hora */}
          <div className="flex items-center">
            <h3 className="text-sm font-medium">{chatName}</h3>
            <span className="ml-auto text-xs text-gray-500">
              {formatDate(lastMessage?._creationTime || chat._creationTime)}
            </span>
          </div>

          {/* Último mensaje */}
          <p className="mt-1 flex items-center gap-1 text-[12px] text-gray-500">
            {/* Icono de grupo y mensaje leído */}
            {chat.isGroup && <Users size={16} />}
            {lastMessageSender === actualUser?._id && <MessageSeenSvg />}

            {/* Último mensaje opciones */}
            {!lastMessage && 'Saluda a tu amigo!'}
            {lastMessageType === 'text' && lastMessageContent && (
              <span className="text-xs">
                {lastMessageContent.length > 30 ? `${lastMessageContent.slice(0, 30)}...` : lastMessageContent}
              </span>
            )}
            {lastMessageType === 'image' && <ImageIcon size={16} className="mx-1" />}
            {lastMessageType === 'video' && <VideoIcon size={16} className="mx-1" />}
          </p>
        </section>
      </section>

      {/* Separador */}
      <hr className="mx-10 h-[1px] bg-gray-primary" />
    </>
  )
}
