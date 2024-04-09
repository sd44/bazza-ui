'use client'

import { ArrowRight, Clock2, Eye, EyeOff, MoveRight } from 'lucide-react'
import { AnimatePresence, LayoutGroup, Variants, motion } from 'framer-motion'
import { useState } from 'react'
import useMeasure from 'react-use-measure'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type Session = {
  id: number
  name: string
  startTime: string
  endTime: string
  project: string
  notes: string
}

const data: Session = {
  id: 1,
  startTime: '10:30 AM',
  endTime: '12:00 PM',
  project: 'IdAM/SAT Integration',
  name: 'Session 1',
  notes: 'Here are some additional notes I took for this session!',
}

export default function SessionDetails() {
  return (
    <div className="border border-accent rounded-3xl h-[750px] md:h-[500px] shadow-sm p-8 flex flex-col justify-center">
      <SessionCard session={data} />
    </div>
  )
}

const SessionCard = ({ session }: { session: Session }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [ref, { height }] = useMeasure()

  return (
    <motion.div
      animate={{
        height: height || 'auto',
        transition: { type: 'spring', duration: 0.6, bounce: 0.3 },
      }}
      className={`relative overflow-hidden rounded-3xl w-full border border-accent shadow-zinc-100 transition-shadow ${open ? 'shadow-xl' : 'shadow-sm'}`}
      onClick={() => setOpen(!open)}
    >
      <motion.div
        layout
        layoutRoot
      >
        <div
          ref={ref}
          className="p-6 md:p-8"
        >
          <AnimatePresence
            initial={false}
            mode="sync"
          >
            <motion.div layout="position">
              <div className="flex items-center gap-4 md:gap-8">
                <div className="max-w-[175px] inline-flex gap-1.5 items-center text-sm text-zinc-400">
                  <span>{session.startTime}</span>
                  <ArrowRight className="size-4 hidden md:inline" />
                  <span className="hidden md:inline">{session.endTime}</span>
                </div>
                <div className="max-w-[200px] inline-flex items-center">
                  <Badge variant="secondary">{session.project}</Badge>
                </div>
                <div className="max-w-[150px] inline-flex items-center">
                  <span className="font-medium">{session.name}</span>
                </div>
                <button
                  onClick={() => setOpen(!open)}
                  className="ml-auto inline-flex items-center gap-1.5 text-zinc-400 text-sm"
                >
                  <span className="hidden md:inline">
                    Click to {open ? 'hide' : 'show'} details
                  </span>
                  {open ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </motion.div>
            {open && (
              <motion.div
                className="mt-10"
                key="hidden"
                layout
                initial={{ opacity: 0, filter: 'blur(5px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{
                  position: 'absolute',
                  opacity: 0,
                  filter: 'blur(5px)',
                  transition: {
                    duration: 0.15,
                  },
                }}
              >
                <ul className="list-inside *:list-disc space-y-1">
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                  <li>Vestibulum auctor dapibus neque.</li>
                  <li>Nunc dignissim risus id metus.</li>
                  <li>Cras ornare tristique elit.</li>
                  <li>Vivamus vestibulum ntulla nec ante.</li>
                  <li>Praesent placerat risus quis eros.</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

const _SessionCard = ({ session }: { session: Session }) => {
  let [ref, { height }] = useMeasure()
  const [open, setOpen] = useState<boolean>(false)

  console.log(height)

  return (
    <motion.div animate={{ height: height || 'auto' }}>
      <div ref={ref}>
        <motion.div className="w-full border border-accent rounded-xl py-2 px-4 flex flex-col gap-8 shadow-sm">
          <div className="flex items-center gap-8">
            <div className="max-w-[175px] inline-flex gap-1.5 items-center text-sm">
              <span>{session.startTime}</span>
              <ArrowRight className="size-4" />
              <span>{session.endTime}</span>
            </div>
            <div className="max-w-[200px]">
              <span className="">{session.project}</span>
            </div>
            <div className="max-w-[150px]">
              <span className="font-medium">{session.name}</span>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="ml-auto inline-flex items-center gap-1.5 text-zinc-400 text-sm"
            >
              <span>Click to {open ? 'hide' : 'show'} details</span>
              <Eye className="size-4" />
            </button>
          </div>
          {open && <div>{session.notes}</div>}
        </motion.div>
      </div>
    </motion.div>
  )
}
