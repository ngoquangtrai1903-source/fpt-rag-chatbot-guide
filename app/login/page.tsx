'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Github, 
  Chrome, 
  Mail, 
  Lock, 
  User,
  ArrowRight,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react'

export default function LoginPage() {
  const { user, loading, signInWithGoogle, signInWithGithub } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Chào mừng trở lại!</h1>
          <p className="text-gray-600">Bạn đã đăng nhập với tư cách là:</p>
          <div className="bg-white p-4 rounded-xl border border-orange-200">
            <p className="font-medium text-gray-800">{user.displayName || user.email}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <Link href="/">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Tiếp tục đến trang chủ
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
            <span className="font-bold text-gray-800">FPTU Survival Guide</span>
          </Link>
          <div className="text-sm text-gray-600">
            Chưa có tài khoản? 
            <Link href="/register" className="text-orange-600 hover:underline ml-1">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full space-y-8">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto">
                <Lock size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Đăng nhập</h1>
              <p className="text-gray-600">
                Chào mừng đến với FPTU Survival Guide
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                onClick={signInWithGoogle}
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
              >
                <Chrome size={20} className="mr-3" />
                <span className="font-medium">Đăng nhập với Google</span>
              </Button>

              <Button
                onClick={signInWithGithub}
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
              >
                <Github size={20} className="mr-3" />
                <span className="font-medium">Đăng nhập với GitHub</span>
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Hoặc tiếp tục với</span>
              </div>
            </div>

            {/* Email Form */}
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="nhập email của bạn"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="nhập mật khẩu của bạn"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                  <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-orange-600 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button 
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium"
              >
                Đăng nhập
              </Button>
            </form>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
              <Shield size={24} className="mx-auto mb-2 text-orange-500" />
              <p className="text-xs font-medium text-gray-700">Bảo mật</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
              <Zap size={24} className="mx-auto mb-2 text-orange-500" />
              <p className="text-xs font-medium text-gray-700">Nhanh chóng</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
              <Sparkles size={24} className="mx-auto mb-2 text-orange-500" />
              <p className="text-xs font-medium text-gray-700">Thông minh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
