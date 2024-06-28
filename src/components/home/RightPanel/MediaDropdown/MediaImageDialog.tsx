'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface MediaImageDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedImage: File
  isLoading: boolean
  handleSendMedia: (type: 'image' | 'video') => void
}

export default function MediaImageDialog({
  isOpen,
  onClose,
  selectedImage,
  isLoading,
  handleSendMedia,
}: MediaImageDialogProps) {
  const [renderedImage, setRenderedImage] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedImage) return

    const reader = new FileReader()
    reader.onload = (e) => setRenderedImage(e.target!.result as string)
    reader.readAsDataURL(selectedImage)
  }, [selectedImage])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex_center_column gap-6">
        <DialogDescription>
          <p>Preview de la imagen seleccionada:</p>
        </DialogDescription>

        <div className="flex_center w-full overflow-hidden rounded-md border">
          {renderedImage && <Image src={renderedImage} width={300} height={300} alt="imagen seleccionada" />}
        </div>

        <Button className="w-full" disabled={isLoading} onClick={() => handleSendMedia('image')}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
