import { messages } from '@/dummy-data/db'
import { ChatBubble } from '@/components'

export default function MessageContainer() {
  return (
    <section className="relative h-full flex-1 overflow-auto bg-chat-tile-light px-6 py-4 dark:bg-chat-tile-dark">
      <div className="flex h-full w-full flex-col-reverse gap-3 overflow-auto">
        <div className="flex flex-col-reverse gap-3">
          {messages?.map((msg) => (
            <div key={msg._id}>
              <ChatBubble />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
