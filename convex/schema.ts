import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.string(),
    tokenIdentifier: v.string(),
    // admin: v.optional(v.boolean()), // ! PENDIENTE
    online: v.boolean(),
  }).index('by_tokenIdentifier', ['tokenIdentifier']),
  chats: defineTable({
    members: v.array(v.id('users')),
    isGroup: v.boolean(),
    chatImage: v.optional(v.string()),
    chatName: v.optional(v.string()),
    //lastMessage: v.optional(v.id('messages')), // ! PENDIENTE
    admin: v.optional(v.id('users')),
  }),
  messages: defineTable({
    chat: v.id('chats'),
    sender: v.union(v.id('users'), v.string()), // <--- string solo si se implementa el chatbot, cambiar a id('users') si no
    content: v.string(),
    messageType: v.union(v.literal('text'), v.literal('image'), v.literal('video')),
  }).index('by_chat', ['chat']),
})
