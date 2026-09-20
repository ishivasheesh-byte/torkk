import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import './route-styles.css'
import './ride/ride.css'
import './motion-upgrade.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://torkk.in'),
  title: 'Torkk — Fairer Rides. Safer Journeys. | Delhi NCR',
  description: 'Torkk is a safety-focused mobility platform offering bikes, autos, cabs, EV cabs and XL cabs across Delhi NCR.',
  keywords: ['Torkk', 'Torkk rides', 'Torkk app', 'Torkk Delhi NCR', 'bike taxi Delhi NCR', 'cab Delhi NCR', 'Torkk Driver', 'Torkk Parcel'],
  openGraph: { title: 'Torkk — Fairer Rides. Safer Journeys.', description: 'A smarter, safer and more transparent way to move across Delhi NCR.', url: 'https://torkk.in', siteName: 'Torkk', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Torkk — Fairer Rides. Safer Journeys.', description: 'Move together across Delhi NCR.' },
  alternates: { canonical: 'https://torkk.in' },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
