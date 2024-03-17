import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import bg from './assets/bgtrain.jpeg'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Train Tracker',
  description: 'Track disruptions and arrival time of tfl trains',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
