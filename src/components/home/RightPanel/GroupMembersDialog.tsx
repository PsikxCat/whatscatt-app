'use client'

import { useMutation, useQuery } from 'convex/react'
import { LogOut, Crown } from 'lucide-react'

import { Id } from '@cx/_generated/dataModel'
import { api } from '@cx/_generated/api'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AddMembersDialog } from '@/components'

interface GroupMembersDialogProps {
  admin: string | null
  chatId: Id<'chats'>
}

export default function GroupMembersDialog({ admin, chatId }: GroupMembersDialogProps) {
  const chatMembers = useQuery(api.users.getGroupMembers, { chatId })
  const actualUser = useQuery(api.users.getActualUser)
  const throwOutUserFromChat = useMutation(api.chats.throwOutUserFromChat)

  const handleKickUser = async (userId: Id<'users'>) => await throwOutUserFromChat({ chatId, userToThrowOutId: userId })

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-left text-xs text-muted-foreground">Ver miembros</p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-2 mb-3 flex items-center justify-between">
            <h3>Miembros actuales</h3>

            <AddMembersDialog chatId={chatId} chatMembers={chatMembers!} />
          </DialogTitle>

          <DialogDescription>
            <section className="flex flex-col gap-3">
              {chatMembers?.map((member) => (
                <section key={member._id} className={`flex items-center gap-3 rounded p-2`}>
                  <Avatar className="overflow-visible">
                    {member.online && (
                      <div className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-foreground bg-green-500" />
                    )}

                    <AvatarImage src={member.image} className="rounded-full object-cover" />
                    <AvatarFallback>
                      <div className="h-full w-full animate-pulse rounded-full bg-gray-tertiary"></div>
                    </AvatarFallback>
                  </Avatar>

                  {/* Nombre e insignia de admin o icono eliminar miembro */}
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <h3 className="text-md font-medium">{member.name || member.email.split('@')[0]}</h3>

                      {member._id === admin ? (
                        <Crown size={16} className="text-yellow-400" />
                      ) : admin === actualUser?._id ? (
                        <LogOut
                          width={18}
                          className="cursor-pointer text-red-500/50 transition-colors hover:text-red-600"
                          onClick={() => handleKickUser(member._id)}
                        />
                      ) : null}
                    </div>
                  </div>
                </section>
              ))}
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
