'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra xác thực...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto">
            <Lock size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Yêu cầu đăng nhập</h1>
          <p className="text-gray-600">
            Bạn cần đăng nhập để truy cập trang này. Vui lòng đăng nhập để tiếp tục.
          </p>
          <Link href="/login">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Đăng nhập ngay
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link href="/" className="text-sm text-orange-600 hover:underline">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
