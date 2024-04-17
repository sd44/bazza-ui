'use client'

import { useState } from 'react'
import { useScramble } from 'use-scramble'

const easterEggs = [
  'beautiful UI/UX experiments.',
  'me failing.',
  'sucking real bad.',
  'mostly failures.',
]

export default function Subtitle() {
  const [hovering, setHovering] = useState(false)
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(easterEggs[0])

  const { ref } = useScramble({
    text: text,
  })

  const handleEnter = () => {
    setHovering(true)
    let newIndex = (index + 1) % easterEggs.length

    if (newIndex === 0) {
      newIndex++
    }

    setText(easterEggs[newIndex])
  }

  const handleLeave = () => {
    setHovering(false)
    setText(easterEggs[0])
    inc()
  }

  const inc = () => setIndex((index + 1) % easterEggs.length)

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="text-6xl min-h-24 text-center font-semibold tracking-tighter bg-gradient-to-t from-zinc-200 to-zinc-300 bg-clip-text text-transparent"
    >
      A collection of <span ref={ref} />
    </div>
  )
}
