import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider, ConvexClientProvider } from '@/providers/'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WhatsCatt App',
  description: 'A simple app to chat with your friends',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`flex_center ${montserrat.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
