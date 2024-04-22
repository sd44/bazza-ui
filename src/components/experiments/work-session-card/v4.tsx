'use client'

import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'
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

export const V4 = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [ref, { height }] = useMeasure()

  const session = data

  return (
    <motion.div
      animate={{
        height: height || 'auto',
        transition: { type: 'spring', duration: 0.6, bounce: 0.3 },
      }}
      className={`w-[750px] bg-background relative overflow-hidden rounded-3xl shadow-zinc-100 transition-shadow ${open ? 'shadow-xl' : 'shadow-sm'}`}
    >
      <motion.div
        layout
        layoutRoot
      >
        <div
          ref={ref}
          className="p-6 md:p-8"
        >
          <AnimatePresence initial={false}>
            <motion.div layout="position">
              <div className="flex items-center gap-4 md:gap-8">
                <div className="max-w-[175px] inline-flex gap-1.5 text-sm items-center text-zinc-400">
                  <span className="select-none">{session.startTime}</span>
                  <ArrowRight className="size-4" />
                  <span className="select-none">{session.endTime}</span>
                </div>
                <div className="max-w-[200px] inline-flex items-center">
                  <Badge
                    variant="secondary"
                    className="text-sm font-medium select-none"
                  >
                    {session.project}
                  </Badge>
                </div>
                <div className="max-w-[150px] inline-flex items-center">
                  <span className="font-medium text-sm select-none">
                    {session.name}
                  </span>
                </div>
                <button
                  onClick={() => setOpen(!open)}
                  className="ml-auto inline-flex items-center gap-1.5 text-zinc-400 text-sm"
                >
                  <span className="select-none">
                    {open ? 'Hide' : 'More'} details
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
                className="mt-10 text-sm"
                key="hidden"
                layout
                initial={{ opacity: 0, filter: 'blur(5px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{
                  userSelect: 'none',
                  position: 'absolute',
                  opacity: 0,
                  filter: 'blur(5px)',
                  transition: {
                    duration: 0.15,
                  },
                }}
              >
                {session.notes}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
