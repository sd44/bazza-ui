'use client'

import { TPrototype } from '@/data/experiments'
import { useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, FlaskConical } from 'lucide-react'
import { useScramble } from 'use-scramble'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

interface Props {
  prototypes: TPrototype[]
}

export default function PrototypeGallery({ prototypes }: Props) {
  const [index, setIndex] = useState<number>(0)
  const n = prototypes.length
  const { ref: prototypeTitleRef } = useScramble({
    text: `Prototype 0${index + 1}`,
  })
  const { ref: prototypeDescRef } = useScramble({
    text: prototypes[index].description,
  })
  const { ref: sepRef } = useScramble({
    text: '/',
  })

  function next() {
    if (index + 1 < n) {
      setIndex(index + 1)
    }
  }

  function prev() {
    if (index > 0) {
      setIndex(index - 1)
    }
  }
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="h-full">
        <div className="p-4 relative flex flex-col shadow-sm rounded-3xl bg-graph">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-mono font-medium tracking-tighter">
              <div className="flex flex-col lg:flex-row gap-2.5 lg:items-center text-zinc-700">
                <div className="inline-flex gap-2.5">
                  <FlaskConical className="size-6" />
                  <span
                    className="font-extrabold"
                    ref={prototypeTitleRef}
                  />
                </div>
                <span
                  className="hidden lg:inline"
                  ref={sepRef}
                />
                <span ref={prototypeDescRef} />
              </div>
            </h2>
            <div className="space-x-1">
              <Button
                size="icon"
                variant="secondary"
                onClick={prev}
                disabled={index === 0}
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={next}
                disabled={index === n - 1}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <div className="flex-1 min-h-[500px] h-full w-full flex flex-col items-center justify-center">
            <LayoutGroup id="my-secret-experiment">
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  key={index}
                >
                  {prototypes[index].component}
                </motion.div>
              </AnimatePresence>
            </LayoutGroup>
          </div>
        </div>
      </div>
      <div className="flex"></div>
    </div>
  )
}
