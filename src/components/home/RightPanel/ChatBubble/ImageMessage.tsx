import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { MessageType } from '@/types'

interface ImageMessageProps {
  message: MessageType
  handleOpenImage: Dispatch<SetStateAction<boolean>>
}

export default function ImageMessage({ message, handleOpenImage }: ImageMessageProps) {
  return (
    <section className="relative m-2 h-[250px] w-[250px]">
      <Image
        src={message.content}
        alt="imagen"
        fill
        className="cursor-pointer rounded object-cover"
        onClick={() => handleOpenImage(true)}
      />
    </section>
  )
}
