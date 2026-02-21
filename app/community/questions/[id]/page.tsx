'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThumbsUp, MessageCircle, Share2, Flag, Send, Trash2, ArrowUpDown, Star } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  getQuestionById,
  submitComment,
  getCommentsByQuestion,
  toggleCommentVote,
  toggleVote,
  testFetchComments,
  deleteQuestion,
  deleteComment,
  fetchCommentsRealtime,
  fetchQuestionRealtime
} from '@/lib/communityService'

interface Question {
  id: string
  title: string
  category: string
  details: string
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
}

export default function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth()
  const [question, setQuestion] = useState<Question | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isAnswering, setIsAnswering] = useState(false)
  const [answerContent, setAnswerContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [forceUpdate, setForceUpdate] = useState(0)
  const [commentSortBy, setCommentSortBy] = useState<'newest' | 'popular'>('newest')

  // Unwrap params
  const resolvedParams = React.use(params)
  const questionId = resolvedParams.id

  // ✅ REAL-TIME LISTENERS - Thay thế fetch một lần bằng onSnapshot
  useEffect(() => {
    if (!questionId) return

    console.log('🚀 Setting up real-time listeners for questionId:', questionId)

    // Listener cho comments
    const unsubscribeComments = fetchCommentsRealtime(questionId, (commentsData: Comment[]) => {
      console.log('📝 Real-time comments updated:', commentsData.length, 'items')
      setComments(commentsData)
    }, commentSortBy)

    // Listener cho vote count của câu hỏi
    const unsubscribeQuestion = fetchQuestionRealtime(questionId, (questionData: Question | null) => {
      console.log('🗳️ Real-time question updated:', questionData)
      if (questionData) {
        setQuestion(questionData as Question)
      } else {
        setError('Question not found')
      }
    })

    // Initial fetch if question is null
    if (!question) {
      const initialFetch = async () => {
        try {
          const questionData = await getQuestionById(questionId)
          if (questionData) {
            setQuestion(questionData as Question)
          } else {
            setError('Question not found')
          }
          setLoading(false)
        } catch (err) {
          console.error('Error fetching initial question:', err)
          setError('Failed to load question')
          setLoading(false)
        }
      }
      initialFetch()
    } else {
      setLoading(false)
    }

    // ⚠️ BẮT BUỘC: Cleanup khi rời trang để tránh memory leak
    return () => {
      console.log('🧹 Cleaning up real-time listeners for questionId:', questionId)
      if (unsubscribeComments) unsubscribeComments()
      if (unsubscribeQuestion) unsubscribeQuestion()
    }
  }, [questionId, commentSortBy])

  // Debug: Log when comments change
  useEffect(() => {
    console.log('Comments state updated:', comments.length, 'items')
  }, [comments])

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      // Redirect to login
      window.location.href = '/login'
      return
    }

    if (!answerContent.trim()) {
      alert('Vui lòng nhập nội dung trả lời')
      return
    }

    setIsAnswering(true)
    
    try {
      console.log('Submitting answer for questionId:', questionId)
      await submitComment(questionId, answerContent.trim())
      setAnswerContent('')
      setIsAnswering(false)
      alert('✅ Đăng trả lời thành công!')
      
      console.log('✅ Comment submitted! Real-time listener will update UI automatically.')
      // Không cần manual refresh vì real-time listener sẽ tự động cập nhật comments
    } catch (error: any) {
      console.error('Error submitting answer:', error)
      
      // Better error handling for permission issues
      if (error.message?.includes('permission-denied') || error.message?.includes('Missing or insufficient permissions')) {
        alert('❌ Thao tác không hợp lệ hoặc bạn không có quyền thực hiện hành động này')
      } else {
        alert('❌ Lỗi khi đăng trả lời: ' + error.message)
      }
    } finally {
      setIsAnswering(false)
    }
  }

  const handleVoteQuestion = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login'
      return
    }

    try {
      await toggleVote(questionId)
      console.log('✅ Vote successful! Real-time listener will update UI automatically.')
      // Không cần manual refresh vì real-time listener sẽ tự động cập nhật
    } catch (error: any) {
      console.error('Error voting question:', error)
      
      // Better error handling for permission issues
      if (error.message?.includes('permission-denied') || error.message?.includes('Missing or insufficient permissions')) {
        alert('❌ Thao tác không hợp lệ hoặc bạn không có quyền thực hiện hành động này')
      } else {
        alert('❌ Lỗi khi vote: ' + error.message)
      }
    }
  }

  const handleVoteComment = async (commentId: string) => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login'
      return
    }

    try {
      await toggleCommentVote(commentId)
      console.log('✅ Comment vote successful! Real-time listener will update UI automatically.')
      // Không cần manual refresh vì real-time listener sẽ tự động cập nhật
    } catch (error: any) {
      console.error('Error voting comment:', error)
      
      // Better error handling for permission issues
      if (error.message?.includes('permission-denied') || error.message?.includes('Missing or insufficient permissions')) {
        alert('❌ Thao tác không hợp lệ hoặc bạn không có quyền thực hiện hành động này')
      } else {
        alert('❌ Lỗi khi vote: ' + error.message)
      }
    }
  }

  const handleTestFetchComments = async () => {
    try {
      const testComments = await testFetchComments(questionId)
      console.log('Test comments:', testComments)
      alert(`Test: Found ${testComments.length} comments in database`)
      setComments(testComments as Comment[])
    } catch (error: any) {
      console.error('Test fetch error:', error)
      alert('Test fetch error: ' + error.message)
    }
  }

  const handleManualRefresh = async () => {
    try {
      console.log('Manual refresh triggered')
      const testComments = await testFetchComments(questionId)
      console.log('Manual refresh results:', testComments)
      setComments(testComments as Comment[])
    } catch (error: any) {
      console.error('Manual refresh error:', error)
    }
  }

  const handleDeleteQuestion = async () => {
    if (!user) {
      alert('Bạn cần đăng nhập để xóa câu hỏi')
      return
    }

    if (!confirm('Bạn có chắc chắn muốn xóa câu hỏi này? Tất cả câu trả lời cũng sẽ bị xóa.')) {
      return
    }

    try {
      await deleteQuestion(questionId)
      alert('✅ Đã xóa câu hỏi thành công!')
      window.location.href = '/community'
    } catch (error: any) {
      console.error('Error deleting question:', error)
      alert('❌ Lỗi khi xóa câu hỏi: ' + error.message)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!user) {
      alert('Bạn cần đăng nhập để xóa bình luận')
      return
    }

    if (!confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      return
    }

    try {
      await deleteComment(commentId)
      alert('✅ Đã xóa bình luận thành công!')
      
      console.log('✅ Comment deleted! Real-time listener will update UI automatically.')
      // Không cần manual refresh vì real-time listener sẽ tự động cập nhật comments
    } catch (error: any) {
      console.error('Error deleting comment:', error)
      alert('❌ Lỗi khi xóa bình luận: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading question...</p>
        </div>
      </div>
    )
  }

  if (error || !question) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Question Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || 'This question could not be found.'}</p>
          <Link href="/community">
            <Button>Back to Community</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Question Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  {question.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {question.createdAt ? new Date(question.createdAt.seconds * 1000).toLocaleString() : 'Unknown'}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>by {question.authorName}</span>
                <span>•</span>
                <span>{question.voteCount || 0} votes</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleVoteQuestion}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  question.votedBy && question.votedBy.includes(user?.uid || '')
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Star size={16} fill={question.votedBy && question.votedBy.includes(user?.uid || '') ? 'white' : 'none'} />
                {question.voteCount || 0}
              </button>
              {user && question.authorId === user.uid && (
                <button
                  onClick={handleDeleteQuestion}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                  title="Xóa câu hỏi"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700 mb-6">
            {question.details}
          </div>
        </div>

        {/* Answer Form */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Your Answer</h2>
          
          {!isAnswering ? (
            <Button 
              onClick={() => setIsAnswering(true)}
              className="w-full"
            >
              <MessageCircle size={16} className="mr-2" />
              Write Answer
            </Button>
          ) : (
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="Share your knowledge and help answer this question..."
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors min-h-[120px] resize-y"
              />
              <div className="flex gap-3">
                <Button 
                  type="submit"
                  disabled={!answerContent.trim() || !user}
                  className="flex-1"
                >
                  <Send size={16} className="mr-2" />
                  Post Answer
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAnswering(false)
                    setAnswerContent('')
                  }}
                >
                  Cancel
                </Button>
              </div>
              {!user && (
                <p className="text-sm text-muted-foreground">
                  You need to be logged in to post an answer.
                </p>
              )}
            </form>
          )}
        </div>

        {/* Comments Section */}
        <div key={`comments-${comments.length}-${forceUpdate}`} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {comments.length} {comments.length === 1 ? 'Answer' : 'Answers'}
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={commentSortBy}
                onChange={(e) => setCommentSortBy(e.target.value as 'newest' | 'popular')}
                className="px-3 py-1 border border-border rounded-lg bg-background text-sm focus:border-primary focus:outline-none"
              >
                <option value="newest">Mới nhất</option>
                <option value="popular">Phổ biến nhất</option>
              </select>
              <ArrowUpDown size={16} className="text-muted-foreground" />
            </div>
          </div>
          
          {/* Debug: Show comments count */}
          <div className="text-xs text-gray-500 mb-2">
            Debug: Comments state has {comments.length} items
            <Button 
              onClick={handleTestFetchComments}
              size="sm"
              variant="outline"
              className="ml-2"
            >
              Test Fetch
            </Button>
            <Button 
              onClick={handleManualRefresh}
              size="sm"
              variant="outline"
              className="ml-2"
            >
              Manual Refresh
            </Button>
          </div>
          
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No answers yet. Be the first to help!
            </div>
          ) : (
            comments.map((comment) => {
              console.log('Rendering comment:', comment)
              return (
                <div key={comment.id} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">{comment.authorName}</div>
                      <div className="text-sm text-muted-foreground">
                        {comment.createdAt ? new Date(comment.createdAt.seconds * 1000).toLocaleString() : 'Unknown'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVoteComment(comment.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                          comment.votedBy && comment.votedBy.includes(user?.uid || '')
                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Star size={14} fill={comment.votedBy && comment.votedBy.includes(user?.uid || '') ? 'white' : 'none'} />
                        {comment.voteCount || 0}
                      </button>
                      {user && comment.authorId === user.uid && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                          title="Xóa bình luận"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-700">
                    {comment.content}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/community">
            <Button variant="outline">
              ← Back to Community
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
