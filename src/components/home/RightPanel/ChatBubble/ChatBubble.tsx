import { ChatType, MessageType, UserType } from '@/types'
import { ChatBubbleAvatar, DateIndicator, MessageTime, TextMessage } from '@/components'

interface ChatBubbleProps {
  message: MessageType
  prevMessage?: MessageType
  actualUser: UserType
  selectedChat: ChatType
}

export default function ChatBubble({ message, prevMessage, actualUser, selectedChat }: ChatBubbleProps) {
  const { isGroup, members } = selectedChat
  const isMember = members.includes(actualUser._id)
  const isMsgFromActualUser = message.sender._id === actualUser._id
  const bgColor = isMsgFromActualUser ? 'bg-green-chat' : 'bg-white dark:bg-gray-primary'

  const date = new Date(message._creationTime)
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  if (!isMsgFromActualUser) {
    return (
      <>
        <DateIndicator message={message} prevMessage={prevMessage} />

        <div className="flex w-full">
          <ChatBubbleAvatar message={message} isMember={isMember} isGroup={isGroup} />

          <div className={`relative z-20 flex w-2/3 max-w-fit flex-col rounded-md p-2 shadow-md ${bgColor}`}>
            <OtherMsgIndicator />
            <TextMessage message={message} />
            <MessageTime time={time} isMsgFromActualUser={isMsgFromActualUser} />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <DateIndicator message={message} prevMessage={prevMessage} />

      <div className="ml-auto flex w-full">
        <div className={`relative z-20 ml-auto flex w-2/3 max-w-fit flex-col rounded-md p-2 shadow-md ${bgColor}`}>
          <SelfMsgIndicator />
          <TextMessage message={message} />
          <MessageTime time={time} isMsgFromActualUser={isMsgFromActualUser} />
        </div>
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
