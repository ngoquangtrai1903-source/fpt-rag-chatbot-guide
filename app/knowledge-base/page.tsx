'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function KnowledgeBasePage() {
  const guides = [
    {
      title: 'English Learning Program',
      description: 'Complete guide to English at FPT University. From placement tests to advanced courses, master your English skills.',
      icon: '📚',
      href: '/knowledge-base/english-learning',
      sections: ['Placement Test', 'Course Levels', 'Study Tips', 'Resources'],
      color: 'from-orange-400 to-orange-500',
    },
    {
      title: 'Vovinam Guide',
      description: 'Master the traditional Vietnamese martial art. Learn techniques, belt system, and training schedules.',
      icon: '🥋',
      href: '/knowledge-base/vovinam',
      sections: ['Belt System', 'Techniques', 'Training Schedule', 'FAQ'],
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Music & Arts',
      description: 'Explore cultural and musical traditions. Discover music clubs, instruments, and cultural events.',
      icon: '🎵',
      href: '/knowledge-base/music',
      sections: ['Music Clubs', 'Events', 'Instruments', 'Performances'],
      color: 'from-orange-600 to-orange-700',
    },
    {
      title: 'Military Training',
      description: 'Physical training and discipline program. Understand requirements and physical education for first-years.',
      icon: '💪',
      href: '/knowledge-base/military',
      sections: ['Overview', 'Schedule', 'Physical Tests', 'Tips & Tricks'],
      color: 'from-orange-700 to-orange-800',
    },
    {
      title: 'Student Life',
      description: 'Campus life, accommodations, and tips. Essential info about dormitories, dining, and transportation.',
      icon: '🏫',
      href: '/knowledge-base/student-life',
      sections: ['Housing', 'Dining', 'Transportation', 'Campus Map'],
      color: 'from-amber-600 to-orange-600',
    },
    {
      title: 'Academic Mastery',
      description: 'FAP, FLM, SEB, EOS & study habits. Master FPT systems and develop effective study techniques.',
      icon: '🎓',
      href: '/knowledge-base/academic-mastery',
      sections: ['The Big 4', 'Study Habits', 'Exam Tips'],
      color: 'from-amber-500 to-orange-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-orange-50/20 to-orange-100/10">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="text-primary hover:underline flex items-center gap-2 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>

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
            Comprehensive guides covering all aspects of student life at FPTU. Find answers to common questions and learn from experienced students.
          </p>
        </div>
      </section>

      {/* Search/Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4 flex gap-2">
          <input
            type="text"
            placeholder="Search guides..."
            className="flex-1 bg-white/80 border border-orange-200 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-500 outline-none focus:border-orange-400 transition-colors"
          />
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">Search</Button>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <div className="group h-full p-6 rounded-xl border-2 border-orange-200/50 bg-gradient-to-br from-orange-50/50 to-orange-100/30 hover:border-orange-400 hover:shadow-lg hover:from-orange-100/50 hover:to-orange-200/40 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl drop-shadow-sm">{guide.icon}</span>
                  <ArrowRight size={20} className="text-orange-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{guide.title}</h3>
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
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-100 to-orange-200 border-y-2 border-orange-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Can't find what you're looking for?</h2>
          <p className="text-gray-600">Ask our AI assistant for personalized help</p>
          <Link href="/assistant">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">Chat with AI Assistant</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
