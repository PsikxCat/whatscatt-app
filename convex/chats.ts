import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createChat = mutation({
  args: {
    members: v.array(v.id('users')),
    isGroup: v.boolean(),
    chatImage: v.optional(v.id('_storage')),
    chatName: v.optional(v.string()),
    admin: v.optional(v.id('users')),
  },
  handler: async ({ auth, db, storage }, { members, isGroup, chatImage, chatName, admin }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) throw new ConvexError('No autorizado')

    const sortedMembers = [...members].sort()

    // Verificar si ya existe un chat con los mismos miembros
    const existingChats = await db.query('chats').collect()
    const existingChat = existingChats.find((chat) => {
      const sortedChatMembers = [...chat.members].sort()
      return JSON.stringify(sortedChatMembers) === JSON.stringify(sortedMembers)
    })

    // Si ya existe un chat con los mismos miembros, retornar su ID
    if (existingChat) return existingChat._id

    // Si es un grupo, capturar la imagen
    let groupImage
    if (isGroup && chatImage) {
      groupImage = (await storage.getUrl(chatImage)) as string
    }

    // Crear el chat
    const chatId = await db.insert('chats', {
      members,
      isGroup,
      chatImage: groupImage,
      chatName,
      admin,
    })

    return chatId
  },
})

export const getUserChats = query({
  handler: async ({ auth, db }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) throw new ConvexError('No autorizado')

    const user = await db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()

    if (!user) throw new ConvexError('Usuario no encontrado')

    const chats = await db.query('chats').collect()
    // Filtrar los chats en los que el usuario es miembro
    const userChats = chats.filter((chat) => chat.members.includes(user._id))

    // Complementar los chats con información requerida
    const detailChats = await Promise.all(
      userChats.map(async (chat) => {
        let chatName = chat.chatName
        let chatImage = chat.chatImage
        let online

        if (!chat.isGroup) {
          const otherMemberId = chat.members.find((memberId) => memberId !== user._id)
          const otherMember = await db
            .query('users')
            .filter((q) => q.eq(q.field('_id'), otherMemberId))
            .take(1)

          chatName = otherMember[0].name
          chatImage = otherMember[0].image
          online = otherMember[0].online
        }

        const lastMessage = await db
          .query('messages')
          .withIndex('by_chat', (q) => q.eq('chat', chat._id))
          .order('desc')
          .take(1)

        return {
          ...chat,
          chatName: chatName || null,
          chatImage: chatImage || null,
          online: online || null,
          admin: chat.admin || null,
          lastMessage: lastMessage[0] || null,
        }
      }),
    )

    return detailChats
  },
})

export const generateUploadUrl = mutation(async ({ storage }) => await storage.generateUploadUrl())
