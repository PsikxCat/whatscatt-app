'use client'

import { useConvexAuth, useQuery } from 'convex/react'
import { SignOutButton, UserButton } from '@clerk/nextjs'
import { ListFilter, LogOut, Search } from 'lucide-react'

import { api } from '@cx/_generated/api'
import { Chat, ThemeSwitch, UsersListDialog } from '@/components'
import { Input } from '@/components/ui/input'

export default function LeftPanel() {
  const { isAuthenticated } = useConvexAuth()
  const chats = useQuery(api.chats.getUserChats, isAuthenticated ? undefined : 'skip')

  return (
    <section className="w-1/4 min-w-[300px] border-r border-gray-600">
      {/* Header  */}
      <section className="sticky top-0 z-10 bg-left-panel">
        {/* Header */}
        <div className="flex h-[60px] items-center justify-between bg-gray-primary p-3">
          <div>
            <UserButton />
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && <UsersListDialog />}
            <ThemeSwitch />
            <SignOutButton>
              <LogOut size={20} className="cursor-pointer" />
            </SignOutButton>
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

      {/* Chat List */}
      <section className="my-3 flex max-h-[80%] flex-col gap-0 overflow-auto">
        {chats?.length === 0 && (
          <>
            <p className="mx-1 mt-3 text-center text-sm text-gray-500">Aún no tienes conversaciones</p>
            <p className="mx-1 mt-3 text-center text-sm text-gray-500">
              Entendemos que eres introvertido, pero tienes que empezar en algún lugar 😊
            </p>
          </>
        )}

        {chats?.map((chat) => <Chat key={chat._id} chat={chat} />)}
      </section>
    </section>
  )
}
