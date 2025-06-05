import type { Metadata } from 'next'
import { Fredoka, Prompt } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap'
})

const prompt = Prompt({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-prompt',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'ระบบโหวตคำคม คำกวนๆ',
  description: 'Voting System for Quotes - Pretest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={`${fredoka.variable} ${prompt.variable}`}>
      <body className="font-fredoka antialiased">{children}</body>
    </html>
  )
}