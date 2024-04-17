'use client'

import { useEffect, useState } from 'react'
import { useScramble } from 'use-scramble'

const keywords = [
  '(animations)',
  '(fluid)',
  '(responsive)',
  '(fail fast)',
  '(perfection)',
]

export default function Keywords() {
  const [index, setIndex] = useState(0)
  const { ref } = useScramble({
    text: keywords[index],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % keywords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [index])

  return (
    <span
      ref={ref}
      className="text-zinc-300 font-mono tracking-tighter font-bold text-2xl"
    />
  )
}
