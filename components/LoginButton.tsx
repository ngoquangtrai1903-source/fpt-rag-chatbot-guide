'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { User, LogOut, LogIn } from 'lucide-react'
import Link from 'next/link'

export function LoginButton() {
  const { user, signOut } = useAuth()

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-100 border border-orange-200">
          <User size={16} className="text-orange-600" />
          <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
            {user.displayName || user.email?.split('@')[0]}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="px-2 sm:px-3 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline ml-1">Đăng xuất</span>
        </Button>
      </div>
    )
  }

  return (
    <Link href="/login">
      <Button variant="ghost" size="sm" className="px-2 sm:px-3 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
        <LogIn size={16} />
        <span className="hidden sm:inline ml-1">Đăng nhập</span>
      </Button>
    </Link>
  )
}
