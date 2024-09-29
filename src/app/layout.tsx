import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import QueryProviders from '@/lib/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  metadataBase: new URL('https://bmb-project.vercel.app'),
  title: 'bmb',
  description: 'bmb-project(図書管理サイト)',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [
      {
        url: '/og-image.jpg',
        alt: 'bmb-project(図書管理サイト)',
      },
    ],
  },
  twitter: {
    images: [
      {
        url: '/og-image.jpg',
        alt: 'bmb-project(図書管理サイト)',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryProviders>
      <html lang="en">
        <body>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="top-center" />
        </body>
      </html>
    </QueryProviders>
  )
}
