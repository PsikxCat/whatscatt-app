import React from 'react'
import { MessageType } from '@/types'

interface TextMessageProps {
  message: MessageType
}

export default function TextMessage({ message }: TextMessageProps) {
  const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.content)

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ))
  }

  return (
    <div className="flex">
      {isLink ? (
        <a
          href={message.content}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 mr-2 flex text-sm font-light text-blue-400 underline after:w-14 after:content-['']"
        >
          {message.content}
          <div className="w-1" />
        </a>
      ) : (
        <p className="mb-2 mr-2 text-sm font-light after:inline-block after:w-14 after:content-['']">
          {formatMessage(message.content)}
        </p>
      )}
    </div>
  )
}
