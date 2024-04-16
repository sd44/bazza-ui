'use client'

import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Session = {
  id: number
  name: string
  startTime: string
  endTime: string
  project: string
  notes: React.ReactNode
}

const data: Session = {
  id: 1,
  startTime: '10:30 AM',
  endTime: '12:00 PM',
  project: 'IdAM/SAT Integration',
  name: 'Session 1',
  notes: (
    <ul className="list-inside *:list-disc space-y-1 text-sm sm:text-base">
      <li>Lorem ipsum dolor sit amet.</li>
      <li>Aliquam tincidunt mauris eu risus.</li>
      <li>Vestibulum auctor dapibus neque.</li>
      <li>Nunc dignissim risus id metus.</li>
      <li>Cras ornare tristique elit.</li>
      <li>Vivamus vestibulum ntulla nec ante.</li>
      <li>Praesent placerat risus quis eros.</li>
    </ul>
  ),
}

export const V3 = () => {
  const [open, setOpen] = useState<boolean>(false)

  const session = data

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      shouldScaleBackground
    >
      <DrawerTrigger asChild>
        <div className="rounded-2xl w-full p-4 shadow-zinc-100 shadow-sm bg-background">
          <div className="flex items-center gap-4">
            <div className="max-w-[175px] inline-flex gap-1.5 items-center text-xs sm:text-sm text-zinc-400">
              <span>{session.startTime}</span>
              <ArrowRight className="size-4 hidden md:inline" />
              <span className="hidden md:inline">{session.endTime}</span>
            </div>
            <div className="max-w-[200px] inline-flex items-center">
              <Badge variant="secondary">{session.project}</Badge>
            </div>
            {/* <div className="max-w-[150px] inline-flex items-center"> */}
            {/*   <span className="font-medium sm:text-base text-sm"> */}
            {/*     {session.name} */}
            {/*   </span> */}
            {/* </div> */}
            <button
              onClick={() => setOpen(!open)}
              className="ml-auto inline-flex items-center gap-1.5 text-zinc-400 text-sm"
            >
              {open ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col">
        <DrawerHeader className="gap-4">
          <DrawerTitle className="text-left">{session.name}</DrawerTitle>
          <DrawerDescription
            asChild
            className="flex flex-col gap-2"
          >
            <div>
              <div className="inline-flex gap-1.5 items-center text-sm">
                <span>{session.startTime}</span>
                <ArrowRight className="size-4" />
                <span>{session.endTime}</span>
              </div>
              <div className="inline-flex">
                <Badge variant="secondary">{session.project}</Badge>
              </div>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{session.notes}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="inline-flex gap-1.5 w-full"
            >
              <span>Close</span>
              <EyeOff className="size-4" />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
