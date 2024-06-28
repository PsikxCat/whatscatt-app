'use client'

import { Dispatch, SetStateAction } from 'react'
import ReactPlayer from 'react-player'
import { MessageType } from '@/types'

interface VideoMessageProps {
  message: MessageType
  handleOpenVideo: Dispatch<SetStateAction<boolean>>
}

export default function VideoMessage({ message, handleOpenVideo }: VideoMessageProps) {
  return (
    <section>
      <ReactPlayer url={message.content} width="250px" height="250px" light onClick={() => handleOpenVideo(false)} />
    </section>
  )
}
