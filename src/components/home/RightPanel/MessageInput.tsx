'use client'

import { useContext, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { Laugh, Mic, Plus, Send } from 'lucide-react'

import { GlobalContext } from '@/context/GlobalContext'
import { api } from '@cx/_generated/api'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function MessageInput() {
  const [msgText, setMsgText] = useState<string>('')
  const { selectedChat } = useContext(GlobalContext)
  const { toast } = useToast()

  const sendTextMessage = useMutation(api.messages.sendTextMessage)
  const actualUser = useQuery(api.users.getActualUser)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
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

  return (
    <section className="flex items-center gap-4 bg-gray-primary p-2">
      {/*  Emojis y adjuntos */}
      <div className="relative ml-2 flex gap-2">
        {/* EMOJI PICKER AQUI */}
        <Laugh className="text-gray-600 dark:text-gray-400" />
        <Plus className="text-gray-600 dark:text-gray-400" />
      </div>

      <form className="flex w-full gap-3" onSubmit={handleSubmit}>
        {/* Input del mensaje */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Type a message"
            className="w-full rounded-lg bg-gray-tertiary py-2 text-sm shadow-sm focus-visible:ring-transparent"
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
          />
        </div>

        {/* Botón de envío o mensaje de voz */}
        <div className="mr-4 flex items-center gap-3">
          {msgText.length > 0 ? (
            <Button type="submit" size={'sm'} className="bg-transparent text-foreground hover:bg-transparent">
              <Send />
            </Button>
          ) : (
            <Button type="submit" size={'sm'} className="bg-transparent text-foreground hover:bg-transparent">
              <Mic />
            </Button>
          )}
        </div>
      </form>
    </section>
  )
}
