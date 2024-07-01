import { ConvexError, v } from 'convex/values'
import { internalMutation, query } from './_generated/server'

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.string(),
  },
  handler: async ({ db }, { tokenIdentifier, email, name, image }) => {
    await db.insert('users', {
      tokenIdentifier,
      email,
      name,
      image,
      online: true,
    })
  },
})

export const updateUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    image: v.string(),
  },
  handler: async ({ db }, { tokenIdentifier, image }) => {
    const user = await db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', tokenIdentifier))
      .unique()

    if (!user) throw new ConvexError('Usuario no encontrado')

    await db.patch(user._id, { image })
  },
})

export const setUserOffline = internalMutation({
  args: {
    tokenIdentifier: v.string(),
  },
  handler: async ({ db }, { tokenIdentifier }) => {
    const user = await db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', tokenIdentifier))
      .unique()

    if (!user) throw new ConvexError('Usuario no encontrado')

    await db.patch(user._id, { online: false })
  },
})

export const setUserOnline = internalMutation({
  args: {
    tokenIdentifier: v.string(),
  },
  handler: async ({ db }, { tokenIdentifier }) => {
    const user = await db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', tokenIdentifier))
      .unique()

    if (!user) throw new ConvexError('Usuario no encontrado')

    await db.patch(user._id, { online: true })
  },
})

export const getUsers = query({
  handler: async ({ auth, db }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) throw new ConvexError('No autorizado')

    const users = await db.query('users').collect()

    return users
  },
})

export const getActualUser = query({
  handler: async ({ auth, db }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) throw new ConvexError('No autorizado')

    const user = await db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()

    if (!user) throw new ConvexError('Usuario no encontrado')

    return user
  },
})

export const getGroupMembers = query({
  args: { chatId: v.id('chats') },
  handler: async ({ auth, db }, { chatId }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) throw new ConvexError('No autorizado')

    const chat = await db.get(chatId)

    if (!chat) throw new ConvexError('Chat no encontrado')

    const users = await db.query('users').collect()
    const groupMembers = users.filter((user) => chat.members.includes(user._id))

    return groupMembers
  },
})
