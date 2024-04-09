import SessionDetails from '@/experiments/logbook/session-details'
import Image from 'next/image'
import bazzadev from '@/../public/bazzadev.png'
import { FlaskConical, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col gap-8 md:gap-12">
      <header>
        <Image
          src={bazzadev}
          alt="BazzaDEV"
          className="size-24 md:size-48"
        />
      </header>
      <div className="flex flex-col gap-4 md:gap-6">
        <Button
          asChild
          className="w-fit inline-flex items-center gap-1.5 tracking-tighter shadow-md"
        >
          <Link href="https://github.com/bazzadev/ui">
            <Github />
            <span className="text-lg font-mono">bazzadev/ui</span>
          </Link>
        </Button>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter">
          A sandbox of UI experiments.
        </h1>
        <h2 className="text-xl md:text-3xl tracking-tight text-zinc-400">
          Things may be broken - proceed with optimism.
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="inline-flex gap-1.5 font-mono text-lg tracking-tighter">
          <FlaskConical />
          <span className="font-semibold">Experiment 01:</span> Expanding
          session details
        </h2>
        <SessionDetails />
      </div>
    </main>
  )
}
