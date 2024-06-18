import { ConvexError, v } from 'convex/values'
import { internalMutation } from './_generated/server'

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
