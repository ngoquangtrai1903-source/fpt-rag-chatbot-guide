'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, BookOpen, Users, MessageSquare, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Knowledge Base', href: '/knowledge-base' },
    { label: 'Community', href: '/community' },
    { label: 'AI Assistant', href: '/assistant' },
  ]

  const sections = [
    {
      title: 'English Learning Program',
      description: 'Complete guide to English at FPT University',
      icon: '📚',
      href: '/knowledge-base/english-learning',
      color: 'from-primary to-accent',
    },
    {
      title: 'Vovinam Guide',
      description: 'Master the traditional Vietnamese martial art',
      icon: '🥋',
      href: '/knowledge-base/vovinam',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Music & Arts',
      description: 'Explore cultural and musical traditions',
      icon: '🎵',
      href: '/knowledge-base/music',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Military Training',
      description: 'Physical training and discipline program',
      icon: '💪',
      href: '/knowledge-base/military',
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Student Life',
      description: 'Campus life, accommodations, and tips',
      icon: '🏫',
      href: '/knowledge-base/student-life',
      color: 'from-green-500 to-green-600',
    },
  ]

  const recentUpdates = [
    { title: 'New Vovinam Training Schedule', date: 'Jan 28, 2025', category: 'Training' },
    { title: 'Campus Orientation Guide Updated', date: 'Jan 25, 2025', category: 'Campus' },
    { title: 'Q&A: Best Dormitories Revealed', date: 'Jan 23, 2025', category: 'Community' },
    { title: 'Music Club Events This Week', date: 'Jan 20, 2025', category: 'Culture' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                F
              </div>
              <span className="font-bold text-lg hidden sm:inline">FPTU Survival</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" size="sm">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
            Welcome to FPTU <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Survival Guide</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Your complete resource hub for thriving as a first-year student at FPT University Da Nang. Access guides, connect with the community, and get instant help from our AI assistant.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/knowledge-base">
              <Button size="lg" className="gap-2">
                <BookOpen size={20} />
                Explore Guides
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Users size={20} />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-card/50 border-y border-border py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">Resources & Guides</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">2.5K+</div>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">AI Support</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Free Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Knowledge Base</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guides to help you navigate your first year
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Link key={section.href} href={section.href}>
                <div className="group h-full p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{section.icon}</span>
                    <Zap size={18} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                  <p className="text-muted-foreground text-sm">{section.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Breaking News & Updates */}
      <section className="bg-card/50 border-y border-border py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">Latest Updates</h2>
            <p className="text-muted-foreground">Stay informed with recent announcements and community highlights</p>
          </div>

          <div className="space-y-4">
            {recentUpdates.map((update, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm mb-1">{update.title}</p>
                    <p className="text-xs text-muted-foreground">{update.date}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{update.category}</span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/community">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              View All Updates
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center space-y-6">
          <div className="absolute inset-0 opacity-5 pointer-events-none" />
          <div className="relative space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Need Help?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ask our FPTU Assistant AI any question about student life, training programs, or campus resources.
            </p>
            <Link href="/assistant">
              <Button size="lg" className="gap-2">
                <MessageSquare size={20} />
                Chat with FPTU Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="font-semibold mb-2">FPTU Survival Guide</p>
              <p className="text-sm text-muted-foreground">Supporting first-year students at FPT University Da Nang</p>
            </div>
            <div>
              <p className="font-semibold mb-3">Quick Links</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/knowledge-base" className="text-muted-foreground hover:text-foreground">Knowledge Base</Link></li>
                <li><Link href="/community" className="text-muted-foreground hover:text-foreground">Community</Link></li>
                <li><Link href="/assistant" className="text-muted-foreground hover:text-foreground">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Contact</p>
              <p className="text-sm text-muted-foreground">Email: support@fptusurvival.com</p>
              <p className="text-sm text-muted-foreground">Campus: FPT University Da Nang</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 FPTU Survival Guide. Made for students, by students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
