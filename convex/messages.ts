import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'

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
