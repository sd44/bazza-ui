'use client'

import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useState } from 'react'
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

const ENTER_DURATION = 0.6
const EXIT_DURATION = 0.6

export const V2 = () => {
  const [open, setOpen] = useState<boolean>(false)

  const session = data

  return (
    <LayoutGroup id="details-v2">
      <AnimatePresence mode="popLayout">
        {!open ? (
          <motion.div
            key="normal"
            onClick={() => setOpen(!open)}
            className="bg-background rounded-3xl w-full p-8 shadow-zinc-100 shadow-sm"
            layout
            layoutRoot
          >
            <div className="flex items-center gap-4 md:gap-8">
              <motion.div
                layoutId="time"
                className="max-w-[175px] inline-flex gap-1.5 items-center text-xs sm:text-sm text-zinc-400"
              >
                <span>{session.startTime}</span>
                <ArrowRight className="size-4 hidden md:inline" />
                <span className="hidden md:inline">{session.endTime}</span>
              </motion.div>
              <motion.div
                layoutId="project"
                className="max-w-[200px] inline-flex items-center"
              >
                <Badge variant="secondary">{session.project}</Badge>
              </motion.div>

              <motion.div
                layoutId="name"
                className="max-w-[150px] inline-flex items-center"
              >
                <span className="font-medium sm:text-base text-sm">
                  {session.name}
                </span>
              </motion.div>
              <motion.button
                onClick={() => setOpen(!open)}
                className="ml-auto inline-flex items-center gap-1.5 text-zinc-400 text-sm"
                layoutId="details-button"
              >
                <span className="hidden md:inline">
                  Click to {open ? 'hide' : 'show'} details
                </span>
                {open ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            onClick={() => setOpen(!open)}
            className="min-h-[100vh] w-[100vw] fixed top-0 left-0 z-50 bg-background transition-none duration-0"
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            layout
            layoutRoot
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                ease: 'easeInOut',
                duration: ENTER_DURATION,
              },
            }}
            exit={{
              opacity: 0,
              transition: { ease: 'easeInOut', duration: EXIT_DURATION },
            }}
          >
            <motion.div className="flex items-center gap-4 md:gap-8 p-8">
              <motion.div
                layoutId="time"
                transition={{
                  layout: {
                    duration: ENTER_DURATION,
                    ease: 'easeInOut',
                  },
                }}
                exit={{
                  transition: { ease: 'easeInOut', duration: EXIT_DURATION },
                }}
                className="max-w-[175px] inline-flex gap-1.5 items-center text-xs sm:text-sm text-zinc-400"
              >
                <span>{session.startTime}</span>
                <ArrowRight className="size-4 hidden md:inline" />
                <span className="hidden md:inline">{session.endTime}</span>
              </motion.div>
              <motion.div
                transition={{
                  layout: {
                    duration: ENTER_DURATION,
                    ease: 'easeInOut',
                  },
                }}
                layoutId="project"
                exit={{
                  transition: { ease: 'easeInOut', duration: EXIT_DURATION },
                }}
                className="max-w-[200px] inline-flex items-center"
              >
                <Badge variant="secondary">{session.project}</Badge>
              </motion.div>
              <motion.div
                transition={{
                  layout: {
                    duration: ENTER_DURATION,
                    ease: 'easeInOut',
                  },
                }}
                exit={{
                  transition: { ease: 'easeInOut', duration: EXIT_DURATION },
                }}
                layoutId="name"
                className="max-w-[150px] inline-flex items-center"
              >
                <span className="font-medium sm:text-base text-sm">
                  {session.name}
                </span>
              </motion.div>
              <motion.button
                exit={{
                  transition: { ease: 'easeInOut', duration: EXIT_DURATION },
                }}
                transition={{
                  layout: {
                    duration: ENTER_DURATION,
                    ease: 'easeInOut',
                  },
                }}
                layoutId="details-button"
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
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
