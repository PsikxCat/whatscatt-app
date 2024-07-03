'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useMutation } from 'convex/react'

import { ChatType, MessageType, UserType } from '@/types'
import { api } from '@cx/_generated/api'
import {
  ChatBubbleAvatar,
  DateIndicator,
  ImageMessage,
  MediaDialog,
  MessageTime,
  TextMessage,
  VideoMessage,
} from '@/components'

interface ChatBubbleProps {
  message: MessageType
  prevMessage?: MessageType
  actualUser: UserType
  selectedChat: ChatType
}

export default function ChatBubble({ message, prevMessage, actualUser, selectedChat }: ChatBubbleProps) {
  const [openMedia, setOpenMedia] = useState(false)
  const { isGroup, members } = selectedChat

  const deleteMessage = useMutation(api.messages.deleteMessage)

  const isMember = members.includes(actualUser._id)
  const isMsgFromActualUser = message.sender._id === actualUser._id
  const bgColor = isMsgFromActualUser ? 'bg-green-chat' : 'bg-white dark:bg-gray-primary'

  const date = new Date(message._creationTime)
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const renderMessageContent = () => (
    <>
      {message.messageType === 'text' && <TextMessage message={message} />}
      {message.messageType === 'image' && <ImageMessage message={message} handleOpenImage={() => setOpenMedia(true)} />}
      {message.messageType === 'video' && <VideoMessage message={message} handleOpenVideo={() => setOpenMedia(true)} />}

      {openMedia && message.messageType !== 'text' && (
        <MediaDialog
          mediaType={message.messageType}
          open={openMedia}
          src={message.content}
          handleClose={() => setOpenMedia(false)}
        />
      )}
    </>
  )

  return (
    <>
      <DateIndicator message={message} prevMessage={prevMessage} />

      <div className={`flex w-full ${isMsgFromActualUser && 'ml-auto'}`}>
        {/* Avatar (otro usuario) */}
        {!isMsgFromActualUser && <ChatBubbleAvatar message={message} isMember={isMember} isGroup={isGroup} />}

        {/* Chat Bubble */}
        <section
          className={`group relative z-20 flex w-2/3 max-w-fit flex-col rounded-md p-2 shadow-md ${bgColor} ${isMsgFromActualUser && 'ml-auto'}`}
        >
          {/* Flechita */}
          {isMsgFromActualUser ? <SelfMsgIndicator /> : <OtherMsgIndicator />}
          {/* Nombre del otro usuario (grupo) */}
          {isGroup && !isMsgFromActualUser && (
            <>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">{message.sender.name}</p>
              {/* Boton de eliminar mensaje */}
              {selectedChat.admin === actualUser._id && (
                <button
                  onClick={() => deleteMessage({ messageId: message._id })}
                  className="absolute -right-2 -top-1 rounded-full bg-red-500/50 p-1 text-white opacity-0 transition-colors hover:bg-red-600 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </>
          )}
          {/* Mensaje */}
          {renderMessageContent()}
          {/* Hora */}
          <MessageTime time={time} isMsgFromActualUser={isMsgFromActualUser} />
          {/* Botón de eliminar mensaje */}
          {isMsgFromActualUser && (
            <button
              onClick={() => deleteMessage({ messageId: message._id })}
              className="absolute -right-2 -top-1 rounded-full bg-red-500/50 p-1 text-white opacity-0 transition-colors hover:bg-red-600 group-hover:opacity-100"
            >
              <Trash2 size={16} />
            </button>
          )}
        </section>
      </div>
    </>
  )
}

function OtherMsgIndicator() {
  return <div className="absolute left-[-4px] top-0 h-3 w-3 rounded-bl-full bg-white dark:bg-gray-primary" />
}

function SelfMsgIndicator() {
  return <div className="absolute right-[-4px] top-0 h-3 w-3 overflow-hidden rounded-br-full bg-green-chat" />
}
