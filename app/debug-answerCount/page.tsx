'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { debugAnswerCount, fixAnswerCountForOldQuestions } from '@/lib/communityService'

export default function DebugAnswerCountPage() {
  const [isDebugging, setIsDebugging] = useState(false)
  const [isFixing, setIsFixing] = useState(false)
  const [debugResult, setDebugResult] = useState<any>(null)
  const [fixResult, setFixResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDebug = async () => {
    setIsDebugging(true)
    setError(null)
    setDebugResult(null)
    
    try {
      const result = await debugAnswerCount()
      setDebugResult(result)
    } catch (err: any) {
      setError(`Lỗi debug: ${err.message}`)
    } finally {
      setIsDebugging(false)
    }
  }

  const handleFix = async () => {
    if (!confirm('Bạn có chắc chắn muốn fix tất cả các câu hỏi cũ không?')) {
      return
    }
    
    setIsFixing(true)
    setError(null)
    setFixResult(null)
    
    try {
      const result = await fixAnswerCountForOldQuestions()
      setFixResult(result)
    } catch (err: any) {
      setError(`Lỗi fix: ${err.message}`)
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🔍 Debug AnswerCount</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Kiểm tra trạng thái AnswerCount</h2>
          <p className="text-gray-600 mb-4">
            Kiểm tra xem có bao nhiêu câu hỏi đang thiếu trường answerCount.
          </p>
          
          <Button 
            onClick={handleDebug}
            disabled={isDebugging}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isDebugging ? 'Đang kiểm tra...' : '🔍 Kiểm tra AnswerCount'}
          </Button>
          
          {debugResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">📊 Kết quả kiểm tra:</h3>
              <ul className="space-y-1 text-sm">
                <li>📝 Tổng số câu hỏi: <strong>{debugResult.totalQuestions}</strong></li>
                <li>❌ Câu hỏi thiếu answerCount: <strong>{debugResult.questionsWithoutAnswerCount}</strong></li>
                <li>✅ Câu hỏi có answerCount: <strong>{debugResult.questionsWithAnswerCount}</strong></li>
                <li>📈 Tỷ lệ có answerCount: <strong>{debugResult.percentage}%</strong></li>
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Sửa các câu hỏi cũ</h2>
          <p className="text-gray-600 mb-4">
            Tự động thêm trường answerCount cho các câu hỏi cũ dựa trên số lượng comments thực tế.
          </p>
          
          <Button 
            onClick={handleFix}
            disabled={isFixing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isFixing ? 'Đang sửa...' : '🔧 Sửa AnswerCount cho câu hỏi cũ'}
          </Button>
          
          {fixResult !== null && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">🎉 Kết quả sửa:</h3>
              <p className="text-sm">
                Đã sửa thành công <strong>{fixResult}</strong> câu hỏi!
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-2">❌ Lỗi:</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">📝 Hướng dẫn sử dụng:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
            <li>Bấm "🔍 Kiểm tra AnswerCount" để xem trạng thái hiện tại</li>
            <li>Nếu có câu hỏi thiếu answerCount, bấm "🔧 Sửa AnswerCount cho câu hỏi cũ"</li>
            <li>Kiểm tra lại để đảm bảo tất cả câu hỏi đều có answerCount</li>
            <li>Test lại chức năng post/delete comment và tab "Chưa trả lời"</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
