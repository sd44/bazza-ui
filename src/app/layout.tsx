import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import BreakpointVisualizer from '@/components/breakpoint-visualizer'

export const metadata: Metadata = {
  title: 'bazzadev/ui',
  description: 'A sandbox where I play around with UI animations.',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(
          'min-h-screen bg-zinc-50',
          inter.className,
          GeistMono.variable,
        )}
      >
        <div vaul-drawer-wrapper="">
          <div className="relative flex min-h-screen flex-col bg-zinc-50">
            {children}
            <BreakpointVisualizer />
          </div>
        </div>
      </body>
    </html>
  )
}
