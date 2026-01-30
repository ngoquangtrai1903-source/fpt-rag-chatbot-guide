'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, MessageCircle, ThumbsUp, Eye, Plus } from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')

  const questions = [
    {
      id: 1,
      title: 'What\'s the best dormitory to request for first-years?',
      category: 'Housing',
      author: 'Nguyễn Hà',
      answers: 24,
      views: 1200,
      votes: 145,
      timestamp: '2 hours ago',
      tags: ['dorm', 'housing', 'first-year'],
    },
    {
      id: 2,
      title: 'Vovinam training tips - how to improve my kicks',
      category: 'Training',
      author: 'Trần Minh',
      answers: 18,
      views: 856,
      votes: 92,
      timestamp: '5 hours ago',
      tags: ['vovinam', 'training', 'tips'],
    },
    {
      id: 3,
      title: 'Which music clubs are best for beginners?',
      category: 'Clubs',
      author: 'Lê Thu',
      answers: 31,
      views: 1450,
      votes: 187,
      timestamp: '1 day ago',
      tags: ['music', 'clubs', 'beginner'],
    },
    {
      id: 4,
      title: 'How much money should I budget monthly?',
      category: 'Money',
      author: 'Phạm An',
      answers: 42,
      views: 2300,
      votes: 256,
      timestamp: '2 days ago',
      tags: ['budget', 'money', 'expenses'],
    },
    {
      id: 5,
      title: 'Military training physical test - am I ready?',
      category: 'Training',
      author: 'Đỗ Hùng',
      answers: 15,
      views: 623,
      votes: 78,
      timestamp: '3 days ago',
      tags: ['military', 'fitness', 'test'],
    },
    {
      id: 6,
      title: 'Best local restaurants near FPTU campus',
      category: 'Food',
      author: 'Võ Thảo',
      answers: 28,
      views: 1680,
      votes: 203,
      timestamp: '4 days ago',
      tags: ['food', 'restaurants', 'da-nang'],
    },
  ]

  const categories = [
    { name: 'All', count: 234 },
    { name: 'Housing', count: 45 },
    { name: 'Training', count: 52 },
    { name: 'Clubs', count: 38 },
    { name: 'Food', count: 31 },
    { name: 'Money', count: 28 },
    { name: 'Academics', count: 40 },
  ]

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

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
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">Community Q&A</h1>
            <p className="text-lg text-muted-foreground">
              Ask questions, share knowledge, and help fellow first-year students. Join our supportive community!
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
            <Link href="/community/new">
              <Button className="gap-2">
                <Plus size={20} />
                Ask Question
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Categories */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      className="w-full text-left text-sm flex items-center justify-between p-2 rounded hover:bg-secondary/50 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-muted-foreground text-xs">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['first-year', 'dorm', 'vovinam', 'budget', 'food', 'music', 'tips'].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="md:col-span-3 space-y-4">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-border">
              {['recent', 'popular', 'unanswered'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium capitalize border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Questions */}
            {filteredQuestions.length > 0 ? (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <Link key={question.id} href={`/community/questions/${question.id}`}>
                    <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Stats */}
                        <div className="flex md:flex-col gap-4 md:gap-3 text-center text-sm">
                          <div>
                            <div className="text-xl font-bold text-primary">{question.answers}</div>
                            <p className="text-muted-foreground">answers</p>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-accent">{question.views}</div>
                            <p className="text-muted-foreground">views</p>
                          </div>
                          <div>
                            <div className="text-xl font-bold">{question.votes}</div>
                            <p className="text-muted-foreground">votes</p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-3">
                          <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                            {question.title}
                          </h3>
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {question.category}
                            </span>
                            {question.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Asked by <span className="font-medium">{question.author}</span> • {question.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">No questions found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="bg-card/50 border-y border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Be Respectful</h3>
              <p className="text-muted-foreground text-sm">Treat everyone with kindness. We're all students learning together.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Ask Clear Questions</h3>
              <p className="text-muted-foreground text-sm">Provide context and details to help others understand your question.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Share Knowledge</h3>
              <p className="text-muted-foreground text-sm">Help answer questions when you can. Your experience is valuable!</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">No Spam</h3>
              <p className="text-muted-foreground text-sm">Keep discussions relevant to FPTU and student life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Didn't find your answer?</h2>
          <p className="text-muted-foreground">
            Get personalized help from our AI assistant or ask the community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/community/new">
              <Button className="gap-2">
                <Plus size={20} />
                Ask New Question
              </Button>
            </Link>
            <Link href="/assistant">
              <Button variant="outline" className="gap-2 bg-transparent">
                Chat with AI
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
