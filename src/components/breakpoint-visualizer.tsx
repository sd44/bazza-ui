'use client'

import { useBreakpoint } from '@/hooks/use-breakpoint'
import { useMeasure } from '@/hooks/use-measure'
import { Ruler } from 'lucide-react'
import { useScramble } from 'use-scramble'

export default function BreakpointVisualizer() {
  const breakpoint = useBreakpoint()
  const [width] = useMeasure()

  const { ref: bpRef } = useScramble({
    text: breakpoint,
    speed: 0.4,
  })

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className="fixed bottom-0 left-0 p-2 sm:p-4 md:p-8">
        <div className="flex items-center gap-4 rounded-full bg-background px-4 py-1 font-mono drop-shadow-md">
          <Ruler className="size-4" />
          <span ref={bpRef}></span>
          <span className="text-muted-foreground">{width}px</span>
        </div>
      </div>
    )
  }

  return null
}
