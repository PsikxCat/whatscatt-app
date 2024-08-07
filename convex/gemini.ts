import { GoogleGenerativeAI } from '@google/generative-ai'
import { internalAction } from './_generated/server'
import { v } from 'convex/values'

import { api, internal } from './_generated/api'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const chat = internalAction({
  args: {
    // history: v.array(v.object({ role: v.string(), parts: v.array(v.object({ text: v.string() })) })),
    chat: v.id('chats'),
    content: v.string(),
  },
  handler: async ({ runQuery, runMutation }, { chat, content }) => {
    console.log('Función chat de Gemini iniciada', { chat, content })
    // # eliminar trycatch al corregir el error
    try {
      const messages = await runQuery(api.messages.getMessages, { chatId: chat })

      const filterMessages: Array<{ role: 'model' | 'user'; parts: Array<{ text: string }> }> = messages
        .slice(-5)
        .map((message) => {
          return {
            role: message.sender === 'Gemini' ? 'model' : 'user',
            parts: [{ text: message.content }],
          }
        })
      console.log('filterMessages', filterMessages)

      const geminiChat = model.startChat({
        history: filterMessages,
        generationConfig: {
          maxOutputTokens: 100,
          temperature: 0.7,
        },
      })

      const msg = content

      const result = await geminiChat.sendMessage(msg)
      const response = result.response
      const text = response.text()
      console.log('response', text)

      await runMutation(internal.messages.sendGeminiMessage, {
        chatId: chat,
        content: text ?? 'Lo siento, no puedo generar una respuesta en este momento',
      })

      console.log('Procesamiento de chat de Gemini completado')
    } catch (error) {
      console.error('Error en la función chat de Gemini:', error)
    }
  },
})
