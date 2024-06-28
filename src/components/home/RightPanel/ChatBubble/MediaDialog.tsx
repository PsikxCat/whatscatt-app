'use client'

import ReactPlayer from 'react-player'

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import Image from 'next/image'

interface MediaDialogProps {
  mediaType: 'image' | 'video'
  open: boolean
  src: string
  handleClose: () => void
}

export default function MediaDialog({ mediaType, open, src, handleClose }: MediaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="min-w-[750px]">
        <DialogDescription className="flex_center relative h-[450px]">
          {mediaType === 'image' && <Image src={src} fill className="rounded-lg object-contain" alt="imagen" />}
          {mediaType === 'video' && <ReactPlayer url={src} controls width="100%" />}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
