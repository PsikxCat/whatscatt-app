import { Lock } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function ChatPlaceHolder() {
  return (
    <section className="flex_center_column w-3/4 bg-gray-secondary py-10">
      <div className="flex_center_column w-full gap-4 py-10">
        <Image src={'/desktop-hero.webp'} alt="Hero" width={320} height={188} />

        <p className="mb-2 mt-5 text-center text-3xl font-extralight">Descarga WhatsCatt</p>

        <p className="text-gray-primary w-1/2 text-center text-sm text-muted-foreground">
          Haz llamadas, comparte tu pantalla y obtén una experiencia más rápida.
        </p>

        <Button className="my-5 rounded-full bg-green-primary hover:bg-green-secondary" asChild>
          <a href="https://github.com/psikxcat" target="_blank">
            Obtener de Psikocat Store
          </a>
        </Button>
      </div>

      <p className="text-gray-primary flex_center mt-auto w-1/2 gap-1 text-center text-xs text-muted-foreground">
        <Lock size={10} /> Tus mensajes personales están cifrados de extremo a extremo
      </p>
    </section>
  )
}
