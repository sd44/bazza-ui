'use client'

import { TPrototype } from '@/data/experiments'
import { useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, FlaskConical } from 'lucide-react'

interface Props {
  prototypes: TPrototype[]
}

export default function PrototypeGallery({ prototypes }: Props) {
  const [index, setIndex] = useState<number>(0)
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="h-full">
        <div className="p-4 relative flex flex-col shadow-sm rounded-3xl">
          <div className="absolute inset-0 bg-graph-paper opacity-[.05]" />
          <div className="flex justify-between items-center">
            <h2 className="text-base font-mono font-medium tracking-tighter">
              <div className="flex gap-2 items-center text-zinc-700">
                <FlaskConical className="size-6" />
                <span className="font-extrabold">Prototype {index + 1}</span>
              </div>
            </h2>
            <div className="space-x-1">
              <Button
                size="icon"
                variant="secondary"
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="secondary"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <div className="flex-1 min-h-[500px] h-full w-full flex flex-col items-center justify-center">
            {prototypes[index].component}
          </div>
        </div>
      </div>
      <div className="flex"></div>
    </div>
  )
}
