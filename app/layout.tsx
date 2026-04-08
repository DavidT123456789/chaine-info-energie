import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Chaînes Info Énergie | Exercices Interactifs',
  description: 'Apprenez les concepts clés de l\'énergie avec nos exercices interactifs. Testez vos connaissances et progressez à votre rythme.',
  generator: 'v0.app',
  keywords: 'énergie, exercices, chaînes, apprentissage, interactif',
  authors: [{ name: 'v0 App' }],
  openGraph: {
    title: 'Chaînes Info Énergie | Exercices Interactifs',
    description: 'Apprenez les concepts clés de l\'énergie avec nos exercices interactifs.',
    type: 'website',
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
