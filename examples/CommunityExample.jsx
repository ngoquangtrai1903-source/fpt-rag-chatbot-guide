// ==================== VÍ DỤ SỬ DỤNG COMMUNITY SERVICE ====================

import React, { useState, useEffect } from 'react'
import { 
  postQuestion, 
  fetchQuestionsRealtime, 
  deleteQuestion,
  toggleVote,
  submitComment,
  getCommentsByQuestion
} from '@/lib/communityService'

export default function CommunityExample() {
  const [questions, setQuestions] = useState([])
  const [comments, setComments] = useState({})
  const [loading, setLoading] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  // ==================== LẤY DANH SÁCH CÂU HỎI ====================
  useEffect(() => {
    const unsubscribe = fetchQuestionsRealtime((questionsList) => {
      setQuestions(questionsList)
    })

    return () => unsubscribe()
  }, [])

  // ==================== ĐĂNG CÂU HỎI MỚI ====================
  const handlePostQuestion = async () => {
    setLoading(true)
    try {
      await postQuestion(
        'Làm thế nào để học Vovinam hiệu quả?',
        'Võ Vovinam',
        'Tôi là sinh viên năm nhất, muốn hỏi về cách tập luyện Vovinam để qua môn. Có ai có kinh nghiệm không ạ?',
        ['vovinam', 'học-tập', 'môn-nghĩa']
      )
      alert('Đăng câu hỏi thành công!')
    } catch (error) {
      alert('Lỗi: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // ==================== VOTE CÂU HỎI ====================
  const handleVote = async (questionId) => {
    try {
      const result = await toggleVote(questionId)
      console.log('Vote result:', result)
    } catch (error) {
      alert('Lỗi khi vote: ' + error.message)
    }
  }

  // ==================== XÓA CÂU HỎI ====================
  const handleDeleteQuestion = async (questionId) => {
    if (!confirm('Bạn có chắc muốn xóa câu hỏi này?')) return
    
    try {
      await deleteQuestion(questionId)
      alert('Xóa câu hỏi thành công!')
    } catch (error) {
      alert('Lỗi: ' + error.message)
    }
  }

  // ==================== BÌNH LUẬN ====================
  const handleSubmitComment = async (questionId, content) => {
    try {
      await submitComment(questionId, content)
      alert('Bình luận thành công!')
    } catch (error) {
      alert('Lỗi: ' + error.message)
    }
  }

  // ==================== LẤY BÌNH LUẬN CỦA CÂU HỎI ====================
  const handleSelectQuestion = (questionId) => {
    setSelectedQuestion(questionId)
    
    // Lắng nghe bình luận của câu hỏi được chọn
    const unsubscribe = getCommentsByQuestion(questionId, (commentsList) => {
      setComments(prev => ({
        ...prev,
        [questionId]: commentsList
      }))
    })

    return unsubscribe
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cộng đồng Hỏi đáp</h1>
      
      {/* Button đăng câu hỏi */}
      <button
        onClick={handlePostQuestion}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Đang đăng...' : 'Đăng câu hỏi'}
      </button>

      {/* Danh sách câu hỏi */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{question.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleVote(question.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  👍 {question.voteCount || 0}
                </button>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-2">{question.details}</p>
            
            <div className="flex gap-2 mb-2">
              {question.tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              Đăng bởi {question.authorName} • {new Date(question.createdAt?.seconds * 1000).toLocaleString()}
            </div>

            {/* Bình luận */}
            <div className="mt-4 border-t pt-4">
              <button
                onClick={() => handleSelectQuestion(question.id)}
                className="text-blue-500 hover:underline mb-2"
              >
                Xem bình luận ({comments[question.id]?.length || 0})
              </button>
              
              {selectedQuestion === question.id && (
                <div className="space-y-2">
                  {comments[question.id]?.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-2 rounded">
                      <p className="font-medium">{comment.authorName}</p>
                      <p>{comment.content}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt?.seconds * 1000).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      className="flex-1 px-3 py-2 border rounded"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          handleSubmitComment(question.id, e.target.value)
                          e.target.value = ''
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.target.previousElementSibling
                        if (input.value.trim()) {
                          handleSubmitComment(question.id, input.value)
                          input.value = ''
                        }
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
