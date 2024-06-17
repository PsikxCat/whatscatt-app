'use node'

import { v } from 'convex/values'
import { Webhook } from 'svix'
import type { WebhookEvent } from '@clerk/clerk-sdk-node'

import { internalAction } from './_generated/server'

const WEB_HOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string // seteado en las variables de entorno en Convex

export const fulfill = internalAction({
  args: {
    headers: v.any(),
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    const wh = new Webhook(WEB_HOOK_SECRET)
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent
    console.log('Webhook Payload', payload)
    return payload
  },
})

// https://docs.convex.dev/functions/internal-functions
