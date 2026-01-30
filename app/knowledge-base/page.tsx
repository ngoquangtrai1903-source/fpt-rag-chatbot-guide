'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function KnowledgeBasePage() {
  const guides = [
    {
      title: 'Vovinam Training Guide',
      description: 'Learn about vovinam, the traditional Vietnamese martial art. Includes techniques, history, training schedules, and tips for beginners.',
      icon: '🥋',
      href: '/knowledge-base/vovinam',
      sections: ['Basics', 'Techniques', 'Training Schedule', 'FAQ'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Music & Arts Culture',
      description: 'Explore FPTU\'s vibrant music and arts scene. Discover music clubs, traditional instruments, and cultural events.',
      icon: '🎵',
      href: '/knowledge-base/music',
      sections: ['Music Clubs', 'Events', 'Instruments', 'Performances'],
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Military Training Program',
      description: 'Understand the military training requirements and physical education program at FPTU for first-year students.',
      icon: '💪',
      href: '/knowledge-base/military',
      sections: ['Overview', 'Schedule', 'Physical Tests', 'Tips & Tricks'],
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Student Life & Campus',
      description: 'Essential information about campus life, dormitories, dining, transportation, and making the most of your time at FPTU.',
      icon: '🏫',
      href: '/knowledge-base/student-life',
      sections: ['Housing', 'Dining', 'Transportation', 'Campus Map'],
      color: 'from-green-500 to-green-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
              <BookOpen size={24} className="text-primary-foreground" />
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
        <div className="bg-card border border-border rounded-lg p-4 flex gap-2">
          <input
            type="text"
            placeholder="Search guides..."
            className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          <Button>Search</Button>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <div className="group h-full p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:bg-card/80 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{guide.icon}</span>
                  <ArrowRight size={20} className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.sections.map((section) => (
                    <span key={section} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
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
      <section className="bg-card/50 border-y border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground">Ask our AI assistant for personalized help</p>
          <Link href="/assistant">
            <Button>Chat with AI Assistant</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
