import { Video, X } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChatPlaceHolder, GroupMembersDialog, MessageContainer, MessageInput } from '@/components'

export default function RightPanel() {
  const selectedConversation = true // ! <-- Simulación de conversación seleccionada
  const conversationName = 'Psikocat' // ! <-- Simulación de nombre de conversación
  const isGroup = true // ! <-- Simulación de grupo

  if (!selectedConversation) return <ChatPlaceHolder />

  return (
    <section className="flex w-3/4 flex-col">
      <section className="sticky top-0 z-50 w-full">
        <div className="flex h-[60px] justify-between bg-gray-primary p-2">
          {/* Avatar y nombre del chat */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={'/placeholder.webp'} className="object-cover" />
              <AvatarFallback>
                <div className="h-full w-full animate-pulse rounded-full bg-gray-tertiary" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p>{conversationName}</p>
              {isGroup && <GroupMembersDialog />}
            </div>
          </div>

          {/* Iconos Video y Cerrar */}
          <div className="mr-5 flex items-center gap-7">
            <a href="/video-call" target="_blank">
              <Video size={23} />
            </a>

            <X size={16} className="cursor-pointer" />
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
