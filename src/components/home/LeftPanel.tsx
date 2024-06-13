import { ListFilter, LogOut, MessageSquareDiff, Search, User } from 'lucide-react'

import { Conversation, ThemeSwitch } from '@/components'
import { Input } from '../ui/input'
import { conversations } from '@/dummy-data/db'

export default function LeftPanel() {
  return (
    <section className="w-1/4 border-r border-gray-600">
      {/* Header //# TODOS */}
      <section className="sticky top-0 z-10 bg-left-panel">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-primary p-3">
          <User size={24} />

          <div className="flex items-center gap-3">
            <MessageSquareDiff size={20} /> {/* Reemplazar por componente */}
            <ThemeSwitch />
            <LogOut size={20} className="cursor-pointer" /> {/* Reemplazar por componente */}
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center p-3">
          <div className="relative mx-3 h-10 flex-1">
            <Search className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-500" size={18} />
            <Input
              type="text"
              placeholder="Buscar o iniciar un nuevo chat"
              className="w-full rounded bg-gray-primary py-2 pl-10 text-sm shadow-sm focus-visible:ring-transparent"
            />
          </div>
          <ListFilter className="cursor-pointer" />
        </div>
      </section>

      {/* Chat List //# TODOS */}
      <section className="my-3 flex max-h-[80%] flex-col gap-0 overflow-auto">
        {conversations?.length === 0 && (
          <>
            <p className="mx-1 mt-3 text-center text-sm text-gray-500">Aún no tienes conversaciones</p>
            <p className="mx-1 mt-3 text-center text-sm text-gray-500">
              Entendemos que eres introvertido, pero tienes que empezar en algún lugar 😊
            </p>
          </>
        )}

        {conversations?.map((conversation) => <Conversation key={conversation._id} conversation={conversation} />)}
      </section>
    </section>
  )
}
