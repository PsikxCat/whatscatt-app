import { v } from 'convex/values'
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
