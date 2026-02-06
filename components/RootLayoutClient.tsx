'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AuthProvider } from '@/contexts/AuthContext'
import { LoginButton } from '@/components/LoginButton'
import { Navigation } from '@/components/Navigation'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <AuthProvider>
      {/* Thanh điều hướng chung */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-105">
                F
              </div>
              <span className="font-bold text-sm sm:text-base text-foreground group-hover:text-orange-600 transition-colors">
                FPTU Survival Guide
              </span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <Navigation currentPath={pathname} />
              <LoginButton />
            </div>
          </div>
        </div>
      </nav>

      {children}
    </AuthProvider>
  )
}
