import { ImageIcon, Users, VideoIcon } from 'lucide-react'

import { formatDate } from '@/lib/utils'
import { MessageSeenSvg } from '@/lib/svgs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ConversationType } from '@/types'

interface ConversationProps {
  conversation: ConversationType
}

export default function Conversation({ conversation }: ConversationProps) {
  const authUser = { _id: 'user1' } // ! <-- Simulación de usuario autenticado

  const conversationImage = conversation?.chatImage || '/placeholder.webp'
  const conversationName = conversation?.chatName || 'Chat P2P'
  const lastMessage = conversation?.lastMessage
  const lastMessageType = conversation?.lastMessage?.messageType
  const lastMessageContent = conversation?.lastMessage?.content
  const lastMessageSender = conversation?.lastMessage?.sender

  return (
    <>
      {/* Conversacion */}
      <section className={`flex cursor-pointer items-center gap-2 p-3 hover:bg-chat-hover`}>
        {/* Avatar */}
        <Avatar className="relative overflow-visible border border-gray-900">
          {/* Indicador de conexión */}
          {conversation.isOnline && (
            <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-green-500" />
          )}

          {/* Imagen de perfil */}
          <AvatarImage src={conversationImage || '/placeholder.webp'} className="rounded-full object-cover" />
          <AvatarFallback>
            <div className="h-full w-full animate-pulse rounded-full bg-gray-tertiary" />
          </AvatarFallback>
        </Avatar>

        {/* Detalles de la conversación */}
        <section className="w-full">
          {/* Nombre de la conversación y última hora */}
          <div className="flex items-center">
            <h3 className="text-sm font-medium">{conversationName}</h3>
            <span className="ml-auto text-xs text-gray-500">
              {formatDate(lastMessage?._creationTime || conversation._creationTime)}
            </span>
          </div>

          {/* Último mensaje */}
          <p className="mt-1 flex items-center gap-1 text-[12px] text-gray-500">
            {/* Icono de grupo y mensaje leído */}
            {conversation.isGroup && <Users size={16} />}
            {lastMessageSender === authUser?._id && <MessageSeenSvg />}

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
