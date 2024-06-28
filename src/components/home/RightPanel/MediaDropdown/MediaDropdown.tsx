'use client'

import { useContext, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { ImageIcon, Plus, Video } from 'lucide-react'

import { GlobalContext } from '@/context/GlobalContext'
import { api } from '@cx/_generated/api'
import { useToast } from '@/components/ui/use-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MediaImageDialog, MediaVideoDialog } from '@/components'

export default function MediaDropdown() {
  const { toast } = useToast()
  const { selectedChat } = useContext(GlobalContext)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const imageInput = useRef<HTMLInputElement>(null)
  const videoInput = useRef<HTMLInputElement>(null)

  const generateUploadUrl = useMutation(api.chats.generateUploadUrl)
  const actualUser = useQuery(api.users.getActualUser)
  const sendImage = useMutation(api.messages.sendImageMessage)
  const sendVideo = useMutation(api.messages.sendVideoMessage)

  const handleSendMedia = async (type: 'image' | 'video') => {
    setIsLoading(true)

    const selectedFile = type === 'image' ? selectedImage : selectedVideo
    const sendMedia = type === 'image' ? sendImage : sendVideo

    try {
      const postUrl = await generateUploadUrl()
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': selectedFile!.type,
        },
        body: selectedFile,
      })

      const { storageId } = await result.json()

      await sendMedia({
        senderId: actualUser!._id,
        chatId: selectedChat!._id,
        media: storageId,
      })

      type === 'image' ? setSelectedImage(null) : setSelectedVideo(null)
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: `Error al enviar el ${type === 'image' ? 'la imagen' : 'el video'}`,
        description: `Ocurrió un error al enviar ${type === 'image' ? 'la imagen' : 'el video'}, por favor intenta de nuevo`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Plus className="text-gray-600 dark:text-gray-400" />
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={15} align="start" alignOffset={-46}>
          <DropdownMenuItem onClick={() => imageInput.current!.click()}>
            <ImageIcon size={18} className="mr-1" />
            Foto
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => videoInput.current!.click()}>
            <Video size={18} className="mr-1" />
            Video
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedImage && (
        <MediaImageDialog
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          selectedImage={selectedImage}
          isLoading={isLoading}
          handleSendMedia={handleSendMedia}
        />
      )}

      {selectedVideo && (
        <MediaVideoDialog
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          selectedVideo={selectedVideo}
          isLoading={isLoading}
          handleSendMedia={handleSendMedia}
        />
      )}

      {/* Hidden inputs para seleccionar archivos */}
      <>
        <input
          type="file"
          ref={imageInput}
          accept="image/*"
          hidden
          onChange={(e) => setSelectedImage(e.target.files![0])}
        />

        <input
          type="file"
          ref={videoInput}
          accept="video/mp4"
          hidden
          onChange={(e) => setSelectedVideo(e.target.files![0])}
        />
      </>
    </>
  )
}
