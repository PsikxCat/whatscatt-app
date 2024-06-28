'use client'

import ReactPlayer from 'react-player'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'

interface MediaVideoDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedVideo: File
  isLoading: boolean
  handleSendMedia: (type: 'image' | 'video') => void
}

export default function MediaVideoDialog({
  isOpen,
  onClose,
  selectedVideo,
  isLoading,
  handleSendMedia,
}: MediaVideoDialogProps) {
  const renderedVideo = URL.createObjectURL(new Blob([selectedVideo], { type: 'video/mp4' }))

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex_center_column gap-6">
        <DialogDescription>
          <p>Preview del video seleccionado:</p>
        </DialogDescription>

        <div className="w-full overflow-hidden rounded-md border">
          {renderedVideo && <ReactPlayer url={renderedVideo} controls width={'100%'} />}
        </div>

        <Button className="w-full" disabled={isLoading} onClick={() => handleSendMedia('video')}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
