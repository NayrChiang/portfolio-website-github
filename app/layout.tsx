import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | Chen Hsin Chiang',
  description: 'Mechanical and robotics engineer passionate about autonomous systems, embedded control, and intelligent mechatronic design. Graduate student at University of Pennsylvania.',
  keywords: ['portfolio', 'mechanical engineer', 'robotics engineer', 'mechatronics', 'embedded systems', 'autonomous systems', 'University of Pennsylvania'],
  authors: [{ name: 'Chen Hsin Chiang' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: 'Portfolio | Chen Hsin Chiang',
    description: 'Mechanical and robotics engineer passionate about autonomous systems, embedded control, and intelligent mechatronic design.',
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
      <body className={inter.className}>
        <Script
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
          strategy="lazyOnload"
        />
        {children}
      </body>
    </html>
  )
}
