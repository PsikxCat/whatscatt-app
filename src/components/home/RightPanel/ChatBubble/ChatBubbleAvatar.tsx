import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageType } from '@/types'

interface ChatBubbleAvatarProps {
  message: MessageType
  isMember: boolean
  isGroup: boolean
}

export default function ChatBubbleAvatar({ message, isMember, isGroup }: ChatBubbleAvatarProps) {
  if (!isGroup) return null

  return (
    <Avatar className="overflow-visible">
      {message.sender.online && isMember && (
        <div className="absolute bottom-[8px] right-[8px] h-2 w-2 rounded-full border-2 border-foreground bg-green-500" />
      )}

      <AvatarImage src={message.sender.image} className="h-8 w-8 rounded-full object-cover" />

      <AvatarFallback className="h-8 w-8">
        <div className="animate-pulse rounded-full bg-gray-tertiary" />
      </AvatarFallback>
    </Avatar>
  )
}
