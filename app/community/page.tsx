'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, MessageCircle, ThumbsUp, Eye, Plus, Users, ArrowRight, Brain } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  postQuestion,
  fetchQuestionsRealtime,
  toggleVote,
  submitComment,
  getCommentsByQuestion,
  toggleCommentVote
} from '@/lib/communityService'

// Type definitions for Firebase data
interface Question {
  id: string
  title: string
  category: string
  details: string
  tags: string[]
  authorId: string
  authorName: string
  authorEmail: string
  voteCount: number
  votedBy: string[]
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  updatedAt: {
    seconds: number
    nanoseconds: number
  }
}

interface Comment {
  id: string
  questionId: string
  content: string
  authorId: string
  authorName: string
  authorEmail: string
  voteCount: number
  votedBy: string[]
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  updatedAt: {
    seconds: number
    nanoseconds: number
  }
}

export default function CommunityPage() {
  const { user } = useAuth()

  // If not logged in, show auth prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-orange-50/20 to-orange-100/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6">
              <Users size={40} className="text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Welcome to Community
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the FPTU student community to ask questions, share knowledge, and connect with fellow students.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-8 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-left">
                  <MessageCircle size={20} className="text-orange-500" />
                  <span className="text-gray-700">Ask questions and get answers</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <ThumbsUp size={20} className="text-orange-500" />
                  <span className="text-gray-700">Vote on helpful content</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <Users size={20} className="text-orange-500" />
                  <span className="text-gray-700">Connect with 10,000+ students</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/knowledge-base">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg">
                  Sign In to Join
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/assistant">
                <Button size="lg" variant="outline" className="border-2 border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold">
                  Try AI Assistant
                  <Brain size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Original community page content for logged-in users
  const [activeTab, setActiveTab] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [showPostForm, setShowPostForm] = useState(false)
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({})
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    details: '',
    tags: [] as string[]
  })
  const [tagInput, setTagInput] = useState('')

  // ==================== REAL-TIME DATA FETCHING ====================
  useEffect(() => {
    console.log('🔧 Setting up Firebase real-time listener...')
    
    const unsubscribe = fetchQuestionsRealtime((questionsList: Question[]) => {
      console.log('📡 Firebase questions received:', questionsList.length)
      setQuestions(questionsList)
      setLoading(false)
    })

    return () => {
      console.log('🧹 Cleaning up Firebase listener...')
      unsubscribe()
    }
  }, [])

  // ==================== POST QUESTION ====================
  const handlePostQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('Bạn cần đăng nhập để đăng câu hỏi')
      return
    }

    if (!formData.title.trim() || !formData.details.trim()) {
      alert('Vui lòng điền đầy đủ tiêu đề và nội dung')
      return
    }

    try {
      console.log('🚀 Posting to Firebase:', formData)
      
      await postQuestion(
        formData.title.trim(),
        formData.category,
        formData.details.trim(),
        formData.tags
      )
      
      console.log('✅ Posted successfully to Firebase!')
      
      // Reset form
      setFormData({
        title: '',
        category: 'Academic',
        details: '',
        tags: []
      })
      setTagInput('')
      setShowPostForm(false)
      
      alert('✅ Đăng câu hỏi thành công!')
    } catch (error: any) {
      console.error('❌ Error posting to Firebase:', error)
      alert('❌ Lỗi khi đăng câu hỏi: ' + error.message)
    }
  }

  // ==================== VOTE ====================
  const handleVote = async (questionId: string) => {
    if (!user) {
      alert('Bạn cần đăng nhập để vote')
      return
    }

    try {
      await toggleVote(questionId)
      console.log('✅ Vote successful!')
    } catch (error: any) {
      console.error('❌ Error voting:', error)
      alert('❌ Lỗi khi vote: ' + error.message)
    }
  }

  // ==================== COMMENT SUBMISSION ====================
  const handleSubmitComment = async (questionId: string, content: string) => {
    if (!user) {
      alert('Bạn cần đăng nhập để bình luận')
      return
    }

    if (!content.trim()) {
      alert('Nội dung bình luận không được để trống')
      return
    }

    try {
      await submitComment(questionId, content.trim())
      console.log('💬 Comment submitted successfully')
      alert('✅ Bình luận thành công!')
    } catch (error: any) {
      console.error('❌ Error commenting:', error)
      alert('❌ Lỗi khi bình luận: ' + error.message)
    }
  }

  // ==================== COMMENT VOTE ====================
  const handleCommentVote = async (commentId: string) => {
    if (!user) {
      alert('Bạn cần đăng nhập để vote bình luận')
      return
    }

    try {
      await toggleCommentVote(commentId)
      console.log('✅ Comment vote successful!')
    } catch (error: any) {
      console.error('❌ Error voting comment:', error)
      alert('❌ Lỗi khi vote bình luận: ' + error.message)
    }
  }

  // ==================== SELECT QUESTION FOR COMMENTS ====================
  const handleSelectQuestion = (questionId: string) => {
    if (selectedQuestion === questionId) {
      setSelectedQuestion(null)
      return
    }

    setSelectedQuestion(questionId)
    
    // Lắng nghe bình luận real-time
    const unsubscribe = getCommentsByQuestion(questionId, (commentsList: Comment[]) => {
      console.log('💬 Comments for question', questionId, ':', commentsList.length)
      setComments(prev => ({
        ...prev,
        [questionId]: commentsList
      }))
    })

    return unsubscribe
  }

  // ==================== TAG MANAGEMENT ====================
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault()
    const tag = tagInput.trim()
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Get unique categories from questions
  const uniqueCategories = Array.from(new Set(questions.map(q => q.category)))
  const categories = [
    { name: 'All', count: questions.length },
    ...uniqueCategories.map(cat => ({
      name: cat,
      count: questions.filter(q => q.category === cat).length
    }))
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
            <Button 
              onClick={() => setShowPostForm(!showPostForm)}
              className="gap-2"
            >
              <Plus size={20} />
              {showPostForm ? 'Đóng form' : 'Đăng câu hỏi'}
            </Button>
          </div>
        </div>
      </section>

      {/* Post Question Form */}
      {showPostForm && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">📝 Đăng câu hỏi mới</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowPostForm(false)}
              >
                Đóng
              </Button>
            </div>
            
            <form onSubmit={handlePostQuestion} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tiêu đề *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tiêu đề câu hỏi..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Danh mục</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Academic">Học thuật</option>
                    <option value="Vovinam">Vovinam</option>
                    <option value="Student Life">Đời sống sinh viên</option>
                    <option value="Career">Sự nghiệp</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nội dung chi tiết *</label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Mô tả chi tiết câu hỏi của bạn..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tag và nhấn Enter..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Thêm
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold"
                >
                  🚀 Đăng câu hỏi
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

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
                            <div className="text-xl font-bold text-primary">{question.voteCount || 0}</div>
                            <p className="text-muted-foreground">votes</p>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-accent">👁</div>
                            <p className="text-muted-foreground">views</p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-2">
                          <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                            {question.title}
                          </h3>
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {question.category}
                            </span>
                            {question.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Asked by <span className="font-medium">{question.authorName}</span> • {question.createdAt ? new Date(question.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}
                          </p>
                        </div>

                        {/* Vote Button */}
                        <div className="flex items-center">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleVote(question.id)
                            }}
                            className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                          >
                            <ThumbsUp size={16} />
                            {question.voteCount || 0}
                          </button>
                        </div>
                      </div>
                      
                      {/* Comments Section */}
                      <div className="border-t pt-4 mt-4">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSelectQuestion(question.id)
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium mb-4 flex items-center gap-2"
                        >
                          <MessageCircle size={16} />
                          {selectedQuestion === question.id ? 'Ẩn bình luận' : `Xem bình luận (${comments[question.id]?.length || 0})`}
                        </button>

                        {selectedQuestion === question.id && (
                          <div className="space-y-4">
                            {/* Comments List */}
                            {comments[question.id]?.map((comment) => (
                              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <span className="font-medium text-gray-800">{comment.authorName}</span>
                                    <span className="text-xs text-gray-500 ml-2">
                                      {comment.createdAt ? new Date(comment.createdAt.seconds * 1000).toLocaleString() : 'Unknown'}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleCommentVote(comment.id)
                                      }}
                                      className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center gap-1"
                                    >
                                      <ThumbsUp size={12} />
                                      {comment.voteCount || 0}
                                    </button>
                                  </div>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                              </div>
                            ))}

                            {/* Comment Form */}
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Viết bình luận..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                                    handleSubmitComment(question.id, (e.target as HTMLInputElement).value)
                                    ;(e.target as HTMLInputElement).value = ''
                                  }
                                }}
                              />
                              <button
                                onClick={(e) => {
                                  const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement
                                  if (input.value.trim()) {
                                    handleSubmitComment(question.id, input.value)
                                    input.value = ''
                                  }
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                              >
                                Gửi
                              </button>
                            </div>
                          </div>
                        )}
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
