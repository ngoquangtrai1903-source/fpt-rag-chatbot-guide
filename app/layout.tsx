import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
        {/* Thanh điều hướng chung */}
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                  F
                </div>
                <span className="font-bold text-sm sm:text-base">FPTU Survival Guide</span>
              </Link>
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                    Trang chủ
                  </Button>
                </Link>
                <Link href="/knowledge-base">
                  <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                    Knowledge Base
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                    Cộng đồng
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                    Events
                  </Button>
                </Link>
                <Link href="/assistant">
                  <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                    AI Assistant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
