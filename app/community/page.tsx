'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, MessageCircle, ThumbsUp, Eye, Plus, Users, ArrowRight, Brain, Sparkles, Trophy, Star, ArrowUpDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  postQuestion,
  fetchQuestionsRealtime,
  toggleVote,
  getUserData,
  getTopUsers,
  getCommunityStats
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
  const [userReputation, setUserReputation] = useState(0)
  const [topUsers, setTopUsers] = useState<any[]>([])
  const [communityStats, setCommunityStats] = useState<any>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'mostAnswers'>('newest')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [popularTags, setPopularTags] = useState<string[]>(['first-year', 'dorm', 'vovinam', 'budget', 'food', 'music', 'tips'])
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    details: '',
    tags: [] as string[]
  })
  const [tagInput, setTagInput] = useState('')

  // ==================== REAL-TIME DATA FETCHING ====================
  useEffect(() => {
    if (!user) return

    // Fetch user data and reputation
    const fetchUserData = async () => {
      try {
        const userData = await getUserData(user.uid)
        setUserReputation((userData as any).reputation || 0)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    // Fetch top users and community stats
    const fetchCommunityData = async () => {
      try {
        const [topUsersData, statsData] = await Promise.all([
          getTopUsers(5),
          getCommunityStats()
        ])
        setTopUsers(topUsersData)
        setCommunityStats(statsData)
      } catch (error) {
        console.error('Error fetching community data:', error)
      }
    }

    fetchUserData()
    fetchCommunityData()

    // Real-time questions listener
    const unsubscribe = fetchQuestionsRealtime((data: Question[]) => {
      setQuestions(data)
      setLoading(false)
    }, sortBy)

    return () => unsubscribe()
  }, [user, sortBy])

  // ==================== POST QUESTION ====================
  const handlePostQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      // Redirect to login instead of just alert
      window.location.href = '/login'
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
      
      // Better error handling for permission issues
      if (error.message?.includes('permission-denied') || error.message?.includes('Missing or insufficient permissions')) {
        alert('❌ Thao tác không hợp lệ hoặc bạn không có quyền thực hiện hành động này')
      } else {
        alert('❌ Lỗi khi đăng câu hỏi: ' + error.message)
      }
    }
  }

  // ==================== VOTE ====================
  const handleVote = async (questionId: string) => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login'
      return
    }

    try {
      await toggleVote(questionId)
      console.log('✅ Vote successful!')
    } catch (error: any) {
      console.error('❌ Error voting:', error)
      
      // Better error handling for permission issues
      if (error.message?.includes('permission-denied') || error.message?.includes('Missing or insufficient permissions')) {
        alert('❌ Thao tác không hợp lệ hoặc bạn không có quyền thực hiện hành động này')
      } else {
        alert('❌ Lỗi khi vote: ' + error.message)
      }
    }
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
      
      // Add to popularTags if not already exists
      if (!popularTags.includes(tag)) {
        setPopularTags(prev => [...prev, tag])
      }
      
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const filteredQuestions = questions.filter(q => {
  const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  
  const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory
  
  const matchesTag = !selectedTag || q.tags.includes(selectedTag)
  
  return matchesSearch && matchesCategory && matchesTag
})

  const categories = [
    { name: 'All', count: questions.length },
    { name: 'Academic', count: questions.filter(q => q.category === 'Academic').length },
    { name: 'Vovinam', count: questions.filter(q => q.category === 'Vovinam').length },
    { name: 'Student Life', count: questions.filter(q => q.category === 'Student Life').length },
    { name: 'Career', count: questions.filter(q => q.category === 'Career').length },
    { name: 'Nhạc cụ dân tộc', count: questions.filter(q => q.category === 'Nhạc cụ dân tộc').length },
    { name: 'Rèn luyện tập trung', count: questions.filter(q => q.category === 'Rèn luyện tập trung').length },
    { name: 'Other', count: questions.filter(q => q.category === 'Other').length }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">Community Q&A</h1>
              <p className="text-lg text-muted-foreground">
                Ask questions, share knowledge, and help fellow first-year students. Join our supportive community!
              </p>
            </div>
            
            {/* User Reputation */}
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 rounded-xl p-4 text-center">
              <div className="flex items-center gap-2 text-orange-600 font-semibold mb-1">
                <Trophy size={20} />
                <span>Reputation</span>
              </div>
              <div className="text-2xl font-bold text-orange-700">{userReputation}</div>
              <div className="text-xs text-orange-600">Points</div>
            </div>
          </div>

          {/* Community Stats */}
          {communityStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{communityStats.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{communityStats.totalComments}</div>
                <div className="text-sm text-muted-foreground">Comments</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{communityStats.totalUsers}</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{communityStats.activeUsers}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          )}

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
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'mostAnswers')}
                className="px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option value="newest">Mới nhất</option>
                <option value="popular">Phổ biến nhất</option>
                <option value="mostAnswers">Nhiều trả lời nhất</option>
              </select>
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
                  <div className="flex flex-wrap gap-2">
                    {categories.filter(cat => cat.name !== 'All').map((cat) => (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.name }))}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          formData.category === cat.name
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat.name}
                        <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
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
                
                {/* Suggested Tags */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-2">Tags gợi ý (click để thêm):</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (!formData.tags.includes(tag)) {
                            setFormData(prev => ({
                              ...prev,
                              tags: [...prev.tags, tag]
                            }))
                          }
                        }}
                        disabled={formData.tags.includes(tag)}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${
                          formData.tags.includes(tag)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Tag Input */}
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tag mới và nhấn Enter..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Thêm mới
                  </button>
                </div>
                
                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-600">Đã chọn:</span>
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left text-sm flex items-center justify-between p-2 rounded transition-colors ${
                        selectedCategory === cat.name
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary/50'
                      }`}
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
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                      className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${
                        selectedTag === tag
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}
                    >
                      {tag}
                    </button>
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
                  <div key={question.id} className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all">
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
                        <Link href={`/community/questions/${question.id}`}>
                          <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors cursor-pointer">
                            {question.title}
                          </h3>
                        </Link>
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
                          onClick={() => handleVote(question.id)}
                          className={`w-full px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                            question.votedBy && question.votedBy.includes(user?.uid || '')
                              ? 'bg-orange-500 text-white hover:bg-orange-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Star size={16} fill={question.votedBy && question.votedBy.includes(user?.uid || '') ? 'white' : 'none'} />
                          {question.voteCount || 0}
                        </button>
                      </div>
                    </div>
                  </div>
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

      {/* Top Users */}
      {topUsers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Trophy size={28} className="text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Top Contributors</h2>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              {topUsers.map((user, index) => (
                <div key={user.id} className="bg-white rounded-xl p-4 text-center border border-orange-200">
                  <div className="relative mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-xl font-bold">
                        {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="font-semibold text-gray-900 text-sm mb-1 truncate">
                    {user.displayName || 'Anonymous'}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-orange-600">
                    <Star size={14} className="fill-current" />
                    <span className="text-sm font-bold">{user.reputation || 0}</span>
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
