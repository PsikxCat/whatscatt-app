import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const sendTextMessage = mutation({
  args: {
    senderId: v.union(v.id('users'), v.string()), // <--- string solo si se implementa el chatbot, cambiar a id('users') si no
    content: v.string(),
    chatId: v.id('chats'),
  },
  handler: async ({ auth, db }, { content, senderId, chatId }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) throw new ConvexError('No autenticado')

    const user = await db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()

    if (!user) throw new ConvexError('Usuario no encontrado')

    const chat = await db
      .query('chats')
      .filter((q) => q.eq(q.field('_id'), chatId))
      .first()

    if (!chat) throw new ConvexError('Chat no encontrado')
    if (!chat.members.includes(user._id)) throw new ConvexError('No eres miembro de este chat')

    // Si se encontro el chat y el usuario es miembro, se inserta el mensaje
    await db.insert('messages', {
      content,
      sender: senderId,
      chat: chatId,
      messageType: 'text',
    })
  },
})

export const getMessages = query({
  args: {
    chatId: v.id('chats'),
  },
  handler: async ({ auth, db }, { chatId }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) throw new ConvexError('No autenticado')

    const messages = await db
      .query('messages')
      .withIndex('by_chat', (q) => q.eq('chat', chatId))
      .collect()

    const userProfileCache = new Map()

    const detailMessages = await Promise.all(
      messages.map(async (message) => {
        let sender

        // Verificar si el perfil del usuario ya esta en cache
        if (userProfileCache.has(message.sender)) {
          sender = userProfileCache.get(message.sender)
        } else {
          // Si no esta en cache, se busca en la base de datos
          sender = await db
            .query('users')
            .filter((q) => q.eq(q.field('_id'), message.sender))
            .first()

          // Se guarda en cache para futuras referencias
          userProfileCache.set(message.sender, sender)
        }

        return {
          ...message,
          sender,
        }
      }),
    )

    return detailMessages
  },
})
