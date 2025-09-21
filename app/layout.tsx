import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ForkMaster - Ethically Forge Your Next Big Thing',
  description: 'Helps builders identify opportunities to ethically fork existing projects and build differentiated, valuable MiniApps on Base.',
  openGraph: {
    title: 'ForkMaster - Ethically Forge Your Next Big Thing',
    description: 'Helps builders identify opportunities to ethically fork existing projects and build differentiated, valuable MiniApps on Base.',
    type: 'website',
  },
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

