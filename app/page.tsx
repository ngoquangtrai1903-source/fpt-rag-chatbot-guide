'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  Shield, 
  Target,
  Star,
  CheckCircle,
  Rocket,
  Brain,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const { user } = useAuth()

  const features = [
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Tổng hợp hướng dẫn chi tiết về mọi khía cạnh của đời sống sinh viên tại FPTU',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Community Q&A',
      description: 'Kết nối với sinh viên khác và nhận câu trả lời cho các thắc mắc của bạn',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageSquare,
      title: 'AI Assistant',
      description: 'Nhận sự giúp đỡ và hướng dẫn cá nhân hóa 24/7 từ trợ lý AI của chúng tôi',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Cập nhật thông tin với các sự kiện và thông báo mới nhất',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const benefits = [
    '🎯 Lộ trình học tập cá nhân hóa',
    '🤝 Cộng đồng sinh viên năng động',
    '🤖 Trợ giúp AI 24/7',
    '📚 Tài nguyên toàn diện',
    '🏆 Theo dõi tiến độ của bạn',
    '🔒 Bảo mật và riêng tư'
  ]

  const testimonials = [
    {
      name: 'Phạm Tiến Dũng',
      role: 'Sinh viên IT',
      content: 'Nền tảng này đã giúp tôi điều hướng cuộc sống FPTU tốt hơn rất nhiều. Trợ lý AI thật tuyệt vời!',
      rating: 5
    },
    {
      name: 'Lê Hữu Trí',
      role: 'Sinh viên Kinh doanh',
      content: 'Phần Community Q&A đã cứu tôi vô số lần. Tài nguyên tuyệt vời cho tất cả sinh viên!',
      rating: 5
    },
    {
      name: 'Lê Hoàng Dương',
      role: 'Sinh viên Thiết kế',
      content: 'Knowledge Base có mọi thứ tôi cần. Từ tiếng Anh đến Vovinam, tất cả đều ở đây!',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-blue-100 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              <span>Đồng hành cùng FPTU của bạn</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 blur-3xl opacity-50 scale-110"></div>
                <h1 className="relative text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 leading-tight tracking-tight">
                  MASTER YOUR
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 font-black drop-shadow-lg">
                    FPTU JOURNEY
                  </span>
                </h1>
                <div className="absolute -top-4 -right-8 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                  <Zap size={32} className="text-white" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                Người bạn đồng hành toàn diện cho cuộc sống Đại học FPT. 
                <span className="block text-orange-600 font-semibold">Từ học thuật đến đời sống sinh viên, chúng tôi có tất cả.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-medium">
                    <Sparkles size={20} />
                    <span>Chào mừng trở lại! Bạn đã sẵn sàng khám phá</span>
                  </div>
                </div>
              ) : (
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    Bắt đầu ngay
                    <Rocket size={20} className="ml-2" />
                  </Button>
                </Link>
              )}
              
              <Link href="/assistant">
                <Button size="lg" variant="outline" className="border-2 border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold">
                  Thử AI Assistant
                  <Brain size={20} className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16">
              {[
                { number: '10K+', label: 'Sinh viên hoạt động' },
                { number: '500+', label: 'Bài viết kiến thức' },
                { number: '24/7', label: 'Hỗ trợ AI' },
                { number: '98%', label: 'Tỷ lệ hài lòng' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-600">{stat.number}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mọi thứ bạn cần trong một nơi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá các tính năng mạnh mẽ được thiết kế để làm cho hành trình FPTU của bạn thành công và thú vị
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group relative">
                  <div className="text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Why Choose FPTU Survival Guide?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We're not just another student platform. We're your dedicated companion for success at FPT University.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link href="/community">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 font-semibold shadow-lg">
                  Start Your Journey
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <Shield size={40} className="text-orange-500 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900">Secure Platform</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <Target size={40} className="text-blue-500 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900">Goal Oriented</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <Heart size={40} className="text-red-500 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900">Community Driven</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <Zap size={40} className="text-purple-500 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900">Lightning Fast</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by FPTU Students
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our community has to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Ready to Transform Your FPTU Experience?
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Join thousands of students who are already succeeding with FPTU Survival Guide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold shadow-lg">
                  Get Started Free
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/assistant">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold">
                  Try AI Assistant
                  <Brain size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
