'use client'

import { useQuery } from 'convex/react'
// import { Crown } from 'lucide-react'

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

export default function GroupMembersDialog() {
  const users = useQuery(api.users.getUsers)

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-left text-xs text-muted-foreground">Ver miembros</p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-2">Miembros actuales</DialogTitle>

          <DialogDescription>
            <section className="flex flex-col gap-3">
              {users?.map((user) => (
                <section key={user._id} className={`flex items-center gap-3 rounded p-2`}>
                  <Avatar className="overflow-visible">
                    {user.online && (
                      <div className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-foreground bg-green-500" />
                    )}

                    <AvatarImage src={user.image} className="rounded-full object-cover" />
                    <AvatarFallback>
                      <div className="h-full w-full animate-pulse rounded-full bg-gray-tertiary"></div>
                    </AvatarFallback>
                  </Avatar>

                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <h3 className="text-md font-medium">{user.name || user.email.split('@')[0]}</h3>

                      {/* {user.admin && <Crown size={16} className="text-yellow-400" />} */}
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
