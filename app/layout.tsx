import type { Metadata, Viewport } from 'next'
import { EB_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
})

export const metadata: Metadata = {
  title: 'Solomei AI | Human Artificial Intelligence',
  description: 'Our platform for a new generation of websites. Combining human creativity with artificial intelligence.',
}

export const viewport: Viewport = {
  themeColor: '#FAF9F6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={ebGaramond.variable}>
      <body className="font-serif antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
