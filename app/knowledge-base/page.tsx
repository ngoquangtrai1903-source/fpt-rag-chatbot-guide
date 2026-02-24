'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Lock, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function KnowledgeBasePage() {
  const { user } = useAuth()

  const guides = [
    {
      title: 'English Learning Program',
      description: 'Hướng dẫn hoàn chỉnh về tiếng Anh tại Đại học FPT. Từ bài kiểm tra xếp lớp đến các khóa học nâng cao, làm chủ kỹ năng tiếng Anh của bạn.',
      icon: '📚',
      href: '/knowledge-base/english-learning',
      sections: ['Placement Test', 'Course Levels', 'Study Tips', 'Resources'],
      color: 'from-orange-400 to-orange-500',
      requiresAuth: true
    },
    {
      title: 'Vovinam Guide',
      description: 'Làm chủ võ thuật truyền thống Việt Nam. Học các kỹ thuật, hệ thống đai và lịch tập luyện.',
      icon: '🥋',
      href: '/knowledge-base/vovinam',
      sections: ['Belt System', 'Techniques', 'Training Schedule', 'FAQ'],
      color: 'from-orange-500 to-orange-600',
      requiresAuth: true
    },
    {
      title: 'Music & Arts',
      description: 'Khám phá truyền thống văn hóa và âm nhạc. Tìm hiểu các câu lạc bộ nhạc, nhạc cụ và sự kiện văn hóa.',
      icon: '🎵',
      href: '/knowledge-base/music',
      sections: ['Music Clubs', 'Instruments', 'Cultural Events', 'Performances'],
      color: 'from-orange-600 to-orange-700',
      requiresAuth: true
    },
    {
      title: 'Military Training',
      description: 'Chương trình huấn luyện thể chất và kỷ luật. Hiểu yêu cầu và giáo dục thể chất cho sinh viên năm nhất.',
      icon: '💪',
      href: '/knowledge-base/military',
      sections: ['Overview', 'Schedule', 'Physical Tests', 'Tips & Tricks'],
      color: 'from-orange-700 to-orange-800',
      requiresAuth: true
    },
    {
      title: 'Student Life',
      description: 'Đời sống campus, chỗ ở và mẹo. Thông tin thiết yếu về ký túc xá, ăn uống và di chuyển.',
      icon: '🏫',
      href: '/knowledge-base/student-life',
      sections: ['Housing', 'Dining', 'Transportation', 'Campus Map'],
      color: 'from-amber-600 to-orange-600',
      requiresAuth: true
    },
    {
      title: 'Academic Mastery',
      description: 'FAP, FLM, SEB, EOS và thói quen học tập. Làm chủ hệ thống FPT và phát triển kỹ thuật học tập hiệu quả.',
      icon: '🎓',
      href: '/knowledge-base/academic-mastery',
      sections: ['The Big 4', 'Study Habits', 'Exam Tips'],
      color: 'from-amber-500 to-orange-500',
      requiresAuth: true
    },
  ]

  const handleGuideClick = (e: React.MouseEvent, requiresAuth: boolean) => {
    if (requiresAuth && !user) {
      e.preventDefault()
      alert('Bạn cần đăng nhập để khám phá nội dung chi tiết!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-orange-50/20 to-orange-100/10">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xl">
              <BookOpen size={24} className="text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">Knowledge Base</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hướng dẫn toàn diện bao gồm mọi khía cạnh của đời sống sinh viên tại FPTU. Tìm câu trả lời cho các câu hỏi phổ biến và học hỏi từ sinh viên có kinh nghiệm.
          </p>
          {!user && (
            <div className="bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 text-orange-800">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Lock size={18} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Đăng nhập để khám phá</div>
                  <div className="text-sm opacity-80">Truy cập tất cả nội dung chi tiết và hướng dẫn</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Search/Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4 flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm hướng dẫn..."
            className="flex-1 bg-white/80 border border-orange-200 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-500 outline-none focus:border-orange-400 transition-colors"
          />
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">Tìm kiếm</Button>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <div key={guide.href} className="group relative">
              <Link href={guide.href}>
                <div 
                  className="group h-full p-6 rounded-xl border-2 border-orange-200/50 bg-gradient-to-br from-orange-50/50 to-orange-100/30 hover:border-orange-400 hover:shadow-lg hover:from-orange-100/50 hover:to-orange-200/40 transition-all cursor-pointer"
                  onClick={(e) => handleGuideClick(e, guide.requiresAuth)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <span className="text-5xl drop-shadow-sm">{guide.icon}</span>
                      {guide.requiresAuth && !user && (
                        <Lock size={16} className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full p-1" />
                      )}
                    </div>
                    <ArrowRight size={20} className="text-orange-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                    {guide.title}
                    {guide.requiresAuth && !user && (
                      <LogIn size={14} className="text-orange-500" />
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.sections.map((section) => (
                      <span key={section} className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800 font-medium border border-orange-300/50">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-100 to-orange-200 border-y-2 border-orange-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {user ? "Không tìm thấy thứ bạn cần?" : "Sẵn sàng khám phá thêm?"}
          </h2>
          <p className="text-gray-600">
            {user ? "Hỏi trợ lý AI của chúng tôi để được giúp đỡ cá nhân hóa" : "Đăng nhập để truy cập tất cả hướng dẫn và nhận giúp đỡ cá nhân hóa"}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {user ? (
              <Link href="/assistant">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                  Chat với AI Assistant
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/community">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                    Đăng nhập để khám phá
                  </Button>
                </Link>
                <Link href="/assistant">
                  <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    Thử AI Assistant
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
