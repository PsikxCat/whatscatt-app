import { MessageType } from '@/types'

interface TextMessageProps {
  message: MessageType
}

export default function TextMessage({ message }: TextMessageProps) {
  const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.content)

  return (
    <div className="flex">
      {isLink ? (
        <a
          href={message.content}
          target="_blank"
          rel="noopener noreferrer"
          className="my-1 mr-2 flex text-sm font-light text-blue-400 underline after:w-14 after:content-['']"
        >
          {message.content}
          <div className="w-1" />
        </a>
      ) : (
        <p className="my-1 mr-2 text-sm font-light after:inline-block after:w-14 after:content-['']">
          {message.content}
        </p>
      )}
    </div>
  )
}
