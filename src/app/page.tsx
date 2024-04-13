import { Button } from '@/components/ui/button'
import { ChevronRight, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import bazzadev from '@/../public/bazzadev.png'
import { experimentsData } from '@/data/experiments'
import Experiment from '@/components/experiment'

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <Header />
      <Title />
      <Experiments />
    </div>
  )
}

const Experiments = () => {
  return (
    <div>
      {experimentsData.map((e) => (
        <Experiment
          key={e.title}
          experiment={e}
        />
      ))}
    </div>
  )
}

const Header = () => (
  <header className="flex justify-between items-center">
    <Image
      src={bazzadev}
      alt="BazzaDEV"
      className="size-16"
    />
    <div className="flex gap-2">
      <Button
        asChild
        variant="secondary"
        className="inline-flex items-center gap-1.5 tracking-tight shadow-md bg-white hover:bg-white/60"
      >
        <Link href="https://bazza.dev">
          <ChevronRight className="-ml-1 size-5" />
          <span className="font-mono">curl bazza.dev</span>
        </Link>
      </Button>

      <Button
        asChild
        className="inline-flex items-center gap-1.5 tracking-tight shadow-md"
      >
        <Link href="https://github.com/bazzadev/ui">
          <Github className="size-5" />
          <span className="font-mono">bazzadev/ui</span>
        </Link>
      </Button>
    </div>
  </header>
)

const Title = () => (
  <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter">
    My sandbox for UI experiments.
  </h1>
)
