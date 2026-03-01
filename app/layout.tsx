import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { EB_Garamond } from 'next/font/google'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://martina-alessandro.wedding'),
  title: 'Martina & Alessandro — 18 Settembre 2026',
  description:
    'Sito del matrimonio di Martina e Alessandro, 18 Settembre 2026 — Villa Castelbarco Pindemonte Rezzonico, Imbersago (LC)',
  openGraph: {
    title: 'Martina & Alessandro — 18 Settembre 2026',
    description:
      'Sito del matrimonio di Martina e Alessandro, 18 Settembre 2026 — Villa Castelbarco Pindemonte Rezzonico, Imbersago (LC)',
    url: 'https://martina-alessandro.wedding',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martina & Alessandro — 18 Settembre 2026',
    description:
      'Sito del matrimonio di Martina e Alessandro, 18 Settembre 2026 — Villa Castelbarco Pindemonte Rezzonico, Imbersago (LC)',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
    <html lang="it" className={ebGaramond.variable}>
      <head>
        <noscript>
          <style>{`[data-animate]{opacity:1!important;clip-path:none!important;transform:none!important;filter:none!important}[data-animate] path,[data-animate] line{stroke-dashoffset:0!important;animation:none!important}[data-nojs-hide]{display:none!important}[data-nojs-show]{display:block!important}`}</style>
        </noscript>
      </head>
      <body className="font-serif antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
