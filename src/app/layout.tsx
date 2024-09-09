import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import QueryProviders from '@/lib/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'bmb',
  description: 'bmb-project(図書管理サイト)',
  icons: {
    icon: '/favicon.ico',
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
