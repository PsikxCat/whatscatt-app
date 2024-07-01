'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { Laugh, Mic, Send } from 'lucide-react'
import EmojiPicker, { Theme, EmojiStyle } from 'emoji-picker-react'

import { GlobalContext } from '@/context/GlobalContext'
import { useComponentVisible } from '@/hooks'
import { api } from '@cx/_generated/api'
import { MediaDropdown } from '@/components'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function MessageInput() {
  const [msgText, setMsgText] = useState<string>('')
  const { selectedChat } = useContext(GlobalContext)
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  const sendTextMessage = useMutation(api.messages.sendTextMessage)
  const actualUser = useQuery(api.users.getActualUser)

  useEffect(() => {
    ;(() => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = '20px'
        textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
      }
    })()
  }, [msgText])

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()

    try {
      if (!msgText.trim()) return

      await sendTextMessage({
        senderId: actualUser!._id,
        content: msgText,
        chatId: selectedChat!._id,
      })

      setMsgText('')
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Error al enviar el mensaje',
        description: 'Ocurrió un error al enviar el mensaje, por favor intenta de nuevo',
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <section className="flex items-center gap-4 bg-gray-primary p-2">
      {/*  Emojis y adjuntos */}
      <section className="relative ml-2 flex gap-2">
        <div ref={ref} onClick={() => setIsComponentVisible(true)}>
          {isComponentVisible && (
            <EmojiPicker
              onEmojiClick={({ emoji }) => setMsgText(msgText + emoji)}
              theme={Theme.DARK}
              emojiStyle={EmojiStyle.TWITTER}
              searchDisabled={true}
              skinTonesDisabled={true}
              style={{ position: 'absolute', bottom: '37px', left: '-16px', zIndex: 50 }}
            />
          )}

          <Laugh className="text-gray-600 dark:text-gray-400" />
        </div>

        <MediaDropdown />
      </section>

      <form className="flex w-full gap-3" onSubmit={handleSubmit}>
        {/* Input del mensaje */}
        <Textarea
          ref={textareaRef}
          placeholder="Escribe un mensaje..."
          className="w-full resize-none rounded-lg bg-gray-tertiary py-2 text-sm shadow-sm focus-visible:ring-transparent"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        {/* Botón de envío o mensaje de voz */}
        <div className="mr-4 flex items-center gap-3">
          {msgText.length > 0 ? (
            <Button type="submit" size={'sm'} className="bg-transparent text-foreground hover:bg-transparent">
              <Send />
            </Button>
          ) : (
            // # TODO: Implementar funcionalidad de mensaje de voz
            <Button type="submit" size={'sm'} className="bg-transparent text-foreground hover:bg-transparent">
              <Mic />
            </Button>
          )}
        </div>
      </form>
    </section>
  )
}
