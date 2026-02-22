import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { EB_Garamond, Great_Vibes } from 'next/font/google'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
})

export const metadata: Metadata = {
  title: 'Martina & Alessandro — 18 Settembre 2026',
  description:
    'Sito ufficiale del matrimonio di Martina e Alessandro, 18 Settembre 2026 — Villa Castelbarco Pindemonte Rezzonico, Imbersago (LC)',
  openGraph: {
    title: 'Martina & Alessandro — 18 Settembre 2026',
    description:
      'Sito ufficiale del matrimonio di Martina e Alessandro, 18 Settembre 2026 — Villa Castelbarco Pindemonte Rezzonico, Imbersago (LC)',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#FDFCFA',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${ebGaramond.variable} ${greatVibes.variable}`}>
      <body className="font-serif antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
