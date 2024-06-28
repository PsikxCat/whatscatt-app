'use client'

import { useState } from 'react'

import { ChatType, MessageType, UserType } from '@/types'
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
        {!isMsgFromActualUser && <ChatBubbleAvatar message={message} isMember={isMember} isGroup={isGroup} />}

        <section
          className={`relative z-20 flex w-2/3 max-w-fit flex-col rounded-md p-2 shadow-md ${bgColor} ${isMsgFromActualUser && 'ml-auto'}`}
        >
          {isMsgFromActualUser ? <SelfMsgIndicator /> : <OtherMsgIndicator />}

          {renderMessageContent()}

          <MessageTime time={time} isMsgFromActualUser={isMsgFromActualUser} />
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
