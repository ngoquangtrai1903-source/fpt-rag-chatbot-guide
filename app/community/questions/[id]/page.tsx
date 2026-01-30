'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThumbsUp, MessageCircle, Share2, Flag } from 'lucide-react'

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  const [isAnswering, setIsAnswering] = useState(false)

  // Mock data - in production this would be fetched from database
  const question = {
    id: params.id,
    title: "What's the best dormitory to request for first-years?",
    category: 'Housing',
    author: 'Nguyễn Hà',
    timestamp: '2 hours ago',
    views: 1200,
    votes: 145,
    content: `I'm a new first-year student and I'm trying to decide which dormitory to request for next semester. I've heard different opinions about which ones are best. Here are my priorities:

1. Good study environment (quiet spaces available)
2. Proximity to library and academic buildings
3. Decent food options nearby
4. Good internet/WiFi connection
5. Friendly community/social atmosphere

Can anyone recommend which dorm I should prioritize? I'd especially like to hear from current residents about their experiences.

Also, is there a way to request a specific dorm or does FPTU just assign them randomly?`,
    tags: ['dorm', 'housing', 'first-year'],
  }

  const answers = [
    {
      id: 1,
      author: 'Trần Minh',
      timestamp: '1 hour ago',
      votes: 45,
      content: `I'm currently in Dorm A and I'd highly recommend it! It's the newest building with:
- Recently renovated rooms and bathrooms
- Strong WiFi throughout the building
- Quiet hours strictly enforced
- Close to the library (5-min walk)
- Great community with regular events

The only downside is it can be a bit louder on weekends due to social events. But overall, it's the best choice for first-years.`,
      isAnswer: true,
    },
    {
      id: 2,
      author: 'Lê Thu',
      timestamp: '45 minutes ago',
      votes: 32,
      content: `Dorm B is also excellent if you want a quieter environment. It's positioned away from the main campus area, which makes it perfect for studying. The study lounges are amazing!

However, it's a bit farther from dining options, so you'll need to walk or bike to get food. The good news is it's cheaper than Dorm A.`,
      isAnswer: true,
    },
    {
      id: 3,
      author: 'Phạm An',
      timestamp: '30 minutes ago',
      votes: 28,
      content: `Regarding dorm selection - FPTU actually considers your preferences, but it's not guaranteed. Here's the process:

1. You submit your top 3 choices during registration
2. Room type preference (single, double, or triple)
3. Dormitory office tries to accommodate based on availability
4. Some dorms have waiting lists

My recommendation: Apply early and be flexible with your second/third choices. You're more likely to get your first choice if you apply in the first week of registration.`,
      isAnswer: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/community" className="text-primary hover:underline flex items-center gap-2 text-sm">
            ← Back to Community
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Question Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold">{question.title}</h1>
            <button className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
              <Flag size={20} className="text-muted-foreground" />
            </button>
          </div>

          <div className="flex gap-4 flex-wrap mb-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">{question.category}</span>
            <span>Asked by <span className="font-medium text-foreground">{question.author}</span></span>
            <span>{question.timestamp}</span>
            <span>{question.views} views</span>
          </div>

          <div className="flex gap-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Question Content */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <p className="text-foreground whitespace-pre-wrap leading-relaxed">{question.content}</p>

          <div className="flex gap-4 mt-6 pt-6 border-t border-border">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp size={18} />
              <span className="text-sm">{question.votes}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm">{answers.length}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Share2 size={18} />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>

        {/* Answers Section */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold">{answers.length} Answers</h2>

          {answers.map((answer) => (
            <div key={answer.id} className="bg-card border border-border rounded-lg p-6">
              {answer.isAnswer && (
                <div className="mb-4 px-3 py-2 rounded bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-600 dark:text-green-400 inline-block">
                  ✓ Helpful Answer
                </div>
              )}

              <p className="text-foreground whitespace-pre-wrap leading-relaxed mb-4">{answer.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Answered by <span className="font-medium text-foreground">{answer.author}</span> • {answer.timestamp}
                </p>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp size={16} />
                  <span className="text-xs">{answer.votes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Answer Form */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Your Answer</h3>

          {!isAnswering ? (
            <Button onClick={() => setIsAnswering(true)} variant="outline" className="w-full">
              Write your answer
            </Button>
          ) : (
            <form className="space-y-4">
              <textarea
                placeholder="Share your experience and knowledge with the community..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                rows={6}
              />
              <div className="flex gap-3">
                <Button type="submit" className="gap-2">
                  <MessageCircle size={18} />
                  Post Answer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAnswering(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            Remember to be helpful and respectful. Your answer could help other students!
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card/50 border-t border-border py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Didn't find what you're looking for?</h2>
          <p className="text-muted-foreground">Ask your own question or chat with FPTU Assistant</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/community/new">
              <Button>Ask a Question</Button>
            </Link>
            <Link href="/assistant">
              <Button variant="outline">Chat with AI</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
