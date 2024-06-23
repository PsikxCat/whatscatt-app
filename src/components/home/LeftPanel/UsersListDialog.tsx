'use client'

import { useEffect, useRef, useState } from 'react'
import { ImageIcon, MessageSquareDiff } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import Image from 'next/image'

import { UserType } from '@/types'
import { Id } from '@cx/_generated/dataModel'
import { api } from '@cx/_generated/api'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function UsersListDialog() {
  const [selectedUsers, setSelectedUsers] = useState<Id<'users'>[]>([])
  const [chatName, setChatName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [renderedImage, setRenderedImage] = useState('')

  const { toast } = useToast()
  const imgRef = useRef<HTMLInputElement>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const users = useQuery(api.users.getUsers)
  const actualUser = useQuery(api.users.getActualUser)
  const createChat = useMutation(api.chats.createChat)
  const generateUploadUrl = useMutation(api.chats.generateUploadUrl)

  useEffect(() => {
    if (!selectedImage) return setRenderedImage('')

    const reader = new FileReader()
    reader.onload = (e) => setRenderedImage(e.target?.result as string)
    reader.readAsDataURL(selectedImage)
  }, [selectedImage])

  // Funciones handlers
  const handleUserSelect = (userId: Id<'users'>) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId],
    )
  }

  const handleCreateChat = async () => {
    if (selectedUsers.length === 0) return
    setIsLoading(true)

    try {
      const isGroup = selectedUsers.length > 1

      // Chat para 2 usuarios
      if (!isGroup) {
        await createChat({
          members: [...selectedUsers, actualUser!._id],
          isGroup: false,
        })
      }
      // Chat para grupo
      else {
        const postUrl = await generateUploadUrl()

        const result = await fetch(postUrl, {
          method: 'POST',
          headers: {
            'Content-Type': selectedImage!.type,
          },
          body: selectedImage,
        })

        const { storageId } = await result.json()

        await createChat({
          members: [...selectedUsers, actualUser!._id],
          isGroup: true,
          chatImage: storageId,
          chatName,
          admin: actualUser!._id,
        })
      }

      handleCloseDialog()

      // ################## TODO: Agregar funcionalidad para redireccionar al chat creado ################## //
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Error al crear chat',
        description: 'Ocurrió un error al intentar crear el chat, por favor intenta de nuevo.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseDialog = () => {
    setSelectedUsers([])
    setChatName('')
    setRenderedImage('')
    setSelectedImage(null)
    dialogCloseRef.current?.click()
  }

  // Funciones render
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

  const renderImageSection = () => (
    <>
      {/* Imagen de grupo cargada */}
      {selectedUsers.length > 1 && renderedImage && (
        <div className="relative mx-auto h-16 w-16">
          <Image src={renderedImage} fill alt="user image" className="rounded-full object-cover" />
        </div>
      )}

      {/* Input de imagen de grupo */}
      {selectedUsers.length > 1 && (
        <>
          <Input placeholder="Nombre de grupo" value={chatName} onChange={(e) => setChatName(e.target.value)} />
          <Button className="flex gap-2" onClick={() => imgRef.current?.click()}>
            <ImageIcon size={20} />
            Imagen de grupo
          </Button>
        </>
      )}

      {/* Input de carga de imagen oculto referenciado */}
      <input type="file" accept="image/*" ref={imgRef} onChange={(e) => setSelectedImage(e.target.files![0])} hidden />
    </>
  )

  return (
    <Dialog>
      {/* Icono Trigger */}
      <DialogTrigger>
        <MessageSquareDiff size={20} className="cursor-pointer" />
      </DialogTrigger>

      {/* Modal */}
      <DialogContent>
        <DialogHeader>
          <DialogClose ref={dialogCloseRef} />
          <DialogTitle>Usuarios en WhatsCatt</DialogTitle>
        </DialogHeader>

        <DialogDescription>Inicia un nuevo chat</DialogDescription>

        {/* Imagen de grupo */}
        {renderImageSection()}

        {/* Lista de usuarios */}
        <section className="flex max-h-60 flex-col gap-3 overflow-auto">
          {users?.filter((user) => user._id !== actualUser?._id).map(renderUsers)}
        </section>

        {/* Botones */}
        <section className="flex justify-between">
          <Button variant={'outline'} onClick={handleCloseDialog}>
            Cancelar
          </Button>

          <Button
            disabled={
              selectedUsers.length === 0 ||
              (selectedUsers.length > 1 && !chatName) ||
              (selectedUsers.length > 1 && !selectedImage) ||
              isLoading
            }
            onClick={handleCreateChat}
          >
            {/* spinner */}
            {isLoading ? <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2" /> : 'Crear Chat'}
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  )
}
