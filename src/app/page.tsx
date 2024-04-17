import { Button } from '@/components/ui/button'
import { ChevronRight, Copyright, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import bazzadev from '@/../public/bazzadev.png'
import { experimentsData } from '@/data/experiments'
import Experiment from '@/components/experiment'
import { Separator } from '@/components/ui/separator'
import Keywords from './keywords'
import Subtitle from './subtitle'

export default function Page() {
  return (
    <div className="p-4 py-10 max-w-screen-xl w-full mx-auto flex flex-col flex-1 gap-36">
      <div className="flex flex-col gap-16">
        <Header />
        <div className="text-4xl sm:text-5xl md:text-6xl min-h-24 text-center font-semibold tracking-tighter bg-gradient-to-t from-zinc-800 to-zinc-900 bg-clip-text text-transparent">
          A collection of UI/UX experiments.
        </div>
      </div>
      <div className="flex-1">
        <Experiments />
      </div>
      <Footer />
    </div>
  )
}

const Experiments = () => {
  return (
    <div className="h-full">
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
    <div className="inline-flex items-center gap-2">
      <Link href="https://bazza.dev">
        <Image
          src={bazzadev}
          alt="BazzaDEV"
          className="size-8 md:size-12"
        />
      </Link>
      <h1 className="text-2xl font-semibold tracking-tighter">ui labs.</h1>
    </div>
    <div className="hidden sm:inline">
      <Keywords />
    </div>
    <div className="flex gap-2">
      <Button
        asChild
        variant="secondary"
        className="inline-flex items-center gap-1.5 tracking-tight shadow-md bg-white hover:bg-white/60"
      >
        <Link href="https://bazza.dev">
          <ChevronRight className="-ml-1 size-5" />
          <span className="font-mono hidden md:inline">curl bazza.dev</span>
        </Link>
      </Button>

      <Button
        asChild
        className="inline-flex items-center gap-1.5 tracking-tight shadow-md"
      >
        <Link href="https://github.com/bazzadev/ui">
          <Github className="size-5" />
          <span className="font-mono hidden md:inline">bazzadev/ui</span>
        </Link>
      </Button>
    </div>
  </header>
)

const Footer = () => (
  <footer className="flex flex-col items-center">
    <Separator className="mb-8" />
    <span className="text-sm text-zinc-500 inline-flex items-center gap-1">
      Copyright <Copyright className="size-3" /> {new Date().getFullYear()} by{' '}
      <Link
        className="text-zinc-800"
        href="https://bazza.dev/"
      >
        bazza.dev
      </Link>
    </span>
  </footer>
)
