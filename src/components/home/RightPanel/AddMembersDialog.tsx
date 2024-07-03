'use client'

import { useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { Plus } from 'lucide-react'

import { UserType } from '@/types'
import { Id } from '@cx/_generated/dataModel'
import { api } from '@cx/_generated/api'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface AddMembersDialogProps {
  chatId: Id<'chats'>
  chatMembers: UserType[]
}

export default function AddMembersDialog({ chatId, chatMembers }: AddMembersDialogProps) {
  const [selectedUsers, setSelectedUsers] = useState<Id<'users'>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const { toast } = useToast()

  const users = useQuery(api.users.getUsers)
  const actualUser = useQuery(api.users.getActualUser)
  const addUsersToChat = useMutation(api.chats.addUsersToChat)

  const handleUserSelect = (userId: Id<'users'>) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId],
    )
  }

  const handleAddMembers = async () => {
    if (selectedUsers.length === 0) return
    setIsLoading(true)

    try {
      await addUsersToChat({
        chatId,
        newMembers: selectedUsers,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo agregar usuarios al chat',
      })
    }

    setIsLoading(false)
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    setSelectedUsers([])
    dialogCloseRef.current?.click()
  }

  const renderUsers = (user: UserType) => (
    <section
      key={user._id}
      className={`flex cursor-pointer items-center gap-3 rounded p-2 transition-all duration-300 ease-in-out active:scale-95 ${selectedUsers.includes(user._id) ? 'bg-green-primary' : ''}`}
      onClick={() => handleUserSelect(user._id)}
    >
      {/* Avatar */}
      <Avatar className="overflow-visible">
        {user.online && (
          <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-green-500" />
        )}
        <AvatarImage src={user.image} className="rounded-full object-cover" />
        <AvatarFallback>
          <div className="h-full w-full animate-pulse rounded-full bg-gray-tertiary"></div>
        </AvatarFallback>
      </Avatar>

      {/* Nombre de usuario */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-md font-medium">{user.name || user.email.split('@')[0]}</p>
        </div>
      </div>
    </section>
  )

  return (
    <Dialog>
      <DialogTrigger className="flex_center_column mr-8 font-light">
        <Plus size={20} />
        <p className="text-[11px]">Agregar</p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogClose ref={dialogCloseRef} />
          <DialogTitle>Agregar usuario(s) a grupo</DialogTitle>
        </DialogHeader>

        <section className="flex max-h-60 flex-col gap-3 overflow-auto">
          {users
            ?.filter((user) => user._id !== actualUser?._id && !chatMembers.some((member) => member._id === user._id))
            .map(renderUsers)}
        </section>

        <section className="flex justify-between">
          <Button variant={'outline'} onClick={handleCloseDialog}>
            Cancelar
          </Button>

          <Button disabled={selectedUsers.length === 0 || isLoading} onClick={handleAddMembers}>
            {/* spinner */}
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2" />
            ) : (
              'Agregar miembro(s)'
            )}
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  )
}
