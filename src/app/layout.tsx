import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopMenu from '@/components/TopMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Path Pioneer',
  //description: 'Generated by create next app',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body className={inter.className}>
            <TopMenu></TopMenu>
              {children}
      </body>
    </html>
  )
}
