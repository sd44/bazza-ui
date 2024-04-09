import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import '@/app/globals.css'

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
      className={`${inter.className} ${GeistMono.variable}`}
    >
      <body className="p-4 md:p-12 max-w-screen-lg mx-auto">{children}</body>
    </html>
  )
}
