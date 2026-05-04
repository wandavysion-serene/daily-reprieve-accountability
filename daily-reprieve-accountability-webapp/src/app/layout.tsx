import './globals.css'
import { ReactNode } from 'react'
import { Bodoni_Moda_SC, Bodoni_Moda, Anonymous_Pro } from 'next/font/google'

const headingFont = Bodoni_Moda_SC({
  subsets: ['latin'],
  weight: ['400', '500','600','700','800','900'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
})

const bodyFont = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500','600','700','800','900'],
  style: ['normal', 'italic'],
  variable: '--font-body',
})

const monoFont = Anonymous_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
})

export const metadata = {
  title: 'Daily Reprieve Accountability',
  description: 'Host tool for SAA-style meeting flow',

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
    ],
  },

  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}