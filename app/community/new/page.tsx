'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NewQuestionPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    content: '',
    tags: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const categories = ['General', 'Housing', 'Training', 'Clubs', 'Food', 'Money', 'Academics']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would save to database
    setSubmitted(true)
    setTimeout(() => {
      // Redirect after 2 seconds
      window.location.href = '/community'
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold">Question Posted!</h1>
          <p className="text-muted-foreground">
            Thank you for your question! It's now visible to the community. Redirecting you back...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/community" className="text-primary hover:underline flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            Back to Community
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-6 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Ask a Question</h1>
          <p className="text-lg text-muted-foreground">
            Help the community help you! Be as detailed as possible and provide context for your question.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-card border border-border rounded-lg p-6">
            <label className="block font-bold mb-3">Question Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Summarize your question in one sentence..."
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Think about what would help other students quickly understand your question
            </p>
          </div>

          {/* Category */}
          <div className="bg-card border border-border rounded-lg p-6">
            <label className="block font-bold mb-3">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Details */}
          <div className="bg-card border border-border rounded-lg p-6">
            <label className="block font-bold mb-3">Details *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Provide details about your question:
- What have you already tried?
- What's your current situation?
- What specific help do you need?

Be as detailed as possible so others can help you better."
              required
              rows={10}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              The more details you provide, the better answers you'll receive
            </p>
          </div>

          {/* Tags */}
          <div className="bg-card border border-border rounded-lg p-6">
            <label className="block font-bold mb-3">Tags (optional)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Add tags separated by commas (e.g. vovinam, dorm, budget)"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Tags help other students find your question
            </p>
          </div>

          {/* Guidelines */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="font-bold mb-3">Community Guidelines</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✓ Be respectful and constructive</li>
              <li>✓ Search for similar questions before posting</li>
              <li>✓ Use clear, specific language</li>
              <li>✓ Avoid spam or promotional content</li>
              <li>✓ Keep discussions relevant to FPTU and student life</li>
            </ul>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={!formData.title || !formData.content}>
              Post Question
            </Button>
            <Link href="/community">
              <Button variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
}
