'use client'

import { useState } from 'react'
import { Laugh, Mic, Plus, Send } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function MessageInput() {
  const [msgText, setMsgText] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (msgText.length > 0) {
      console.log('Mensaje enviado:', msgText)
      setMsgText('')
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
