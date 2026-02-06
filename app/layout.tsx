import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import RootLayoutClient from '@/components/RootLayoutClient'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FPTU Survival Guide - Cẩm nang tân sinh viên',
  description: 'Cẩm nang giúp bạn sinh tồn và tỏa sáng tại Đại học FPT Đà Nẵng. Xem hướng dẫn, cộng đồng và trợ lý AI.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans antialiased`}>
        <RootLayoutClient>
          {children}
          <Analytics />
        </RootLayoutClient>
      </body>
    </html>
  )
}
