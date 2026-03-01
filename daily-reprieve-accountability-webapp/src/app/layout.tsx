import './globals.css'
import { ReactNode } from 'react'
import { Bodoni_Moda_SC, Bodoni_Moda } from 'next/font/google'

const headingFont = Bodoni_Moda_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
})

const bodyFont = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
})

export const metadata = {
  title: 'Daily Reprieve Accountability',
  description: 'Host tool for SAA-style meeting flow',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}