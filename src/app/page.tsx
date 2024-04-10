import SessionDetails from '@/experiments/logbook/session-details'
import Image from 'next/image'
import bazzadev from '@/../public/bazzadev.png'
import { ChevronRight, FlaskConical, Github, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SessionDetailsMobile from '@/experiments/logbook/session-details-v2'
import SessionDetailsMobileV2 from '@/experiments/logbook/session-details-v3'

export default function Home() {
  return (
    <main className="flex flex-col gap-8 md:gap-12">
      <header className="flex sm:flex-row flex-col gap-10 items-center">
        <Image
          src={bazzadev}
          alt="BazzaDEV"
          className="size-16"
        />
        <div className="w-full flex gap-2">
          <Button
            asChild
            variant="secondary"
            className="w-full inline-flex items-center gap-1.5 tracking-tighter shadow-md bg-gradient-to-r from-zinc-100/50 to-zinc-100/80"
          >
            <Link href="https://bazza.dev">
              <ChevronRight className="-ml-1 size-5" />
              <span className="text-base sm:text-lg font-mono">
                curl bazza.dev
              </span>
            </Link>
          </Button>

          <Button
            asChild
            className="w-full inline-flex items-center gap-1.5 tracking-tighter shadow-md"
          >
            <Link href="https://github.com/bazzadev/ui">
              <Github className="size-5" />
              <span className="text-base sm:text-lg font-mono">
                bazzadev/ui
              </span>
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-col gap-4 md:gap-6">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter">
          My sandbox for UI experiments.
        </h1>
        <h2 className="text-xl md:text-3xl tracking-tighter text-zinc-400">
          Things may be broken -{' '}
          <span className="font-semibold">proceed with optimism.</span>
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="inline-flex items-center gap-1.5 font-mono text-base md:text-lg tracking-tighter">
          <FlaskConical />
          <span className="font-semibold">
            <span className="hidden sm:inline">Experiment</span> 01 /
          </span>{' '}
          Expanding session details
        </h2>
        <SessionDetails />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="inline-flex items-center gap-1.5 font-mono text-base md:text-lg tracking-tighter">
          <FlaskConical />
          <span className="font-semibold">
            <span className="hidden sm:inline">Experiment</span> 02 /
          </span>{' '}
          Making it <strong>better</strong> on mobile
        </h2>
        <SessionDetailsMobile />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="inline-flex items-center gap-1.5 font-mono text-base md:text-lg tracking-tighter">
          <FlaskConical />
          <span className="font-semibold">
            <span className="hidden sm:inline">Experiment</span> 03 /
          </span>{' '}
          Using Vaul for mobile clients
        </h2>
        <SessionDetailsMobileV2 />
      </div>
    </main>
  )
}
