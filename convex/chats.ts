import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'

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

export const generateUploadUrl = mutation(async ({ storage }) => await storage.generateUploadUrl())
