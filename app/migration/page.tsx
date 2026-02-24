'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { migrateAnswerCount } from '@/lib/communityService'

export default function MigrationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleMigration = async () => {
    if (!confirm('Bạn có chắc chắn muốn chạy migration? Hành động này sẽ cập nhật answerCount cho tất cả câu hỏi hiện có.')) {
      return
    }

    setIsRunning(true)
    setError(null)
    setResult(null)

    try {
      const updatedCount = await migrateAnswerCount()
      setResult(`Thành công! Đã cập nhật answerCount cho ${updatedCount} câu hỏi.`)
    } catch (err: any) {
      setError(`Lỗi: ${err.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white border-2 border-orange-200 rounded-xl p-8 shadow-lg">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🔄 Migration Tool
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Cập nhật trường answerCount cho các câu hỏi hiện có trong Firebase
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-orange-800 mb-4">
                📊 Chức năng:
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Đếm số lượng comments cho mỗi câu hỏi</li>
                <li>• Cập nhật trường answerCount vào Firebase</li>
                <li>• Sử dụng batch operations để tối ưu performance</li>
                <li>• Hỗ trợ large dataset (500+ operations/batch)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-800 mb-4">
                ⚠️ Lưu ý:
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Chỉ chạy một lần sau khi thêm answerCount</li>
                <li>• Backup data trước khi chạy migration</li>
                <li>• Có thể mất vài phút với nhiều dữ liệu</li>
                <li>• Kiểm tra console log để theo dõi tiến trình</li>
              </ul>
            </div>

            <div className="text-center">
              <Button
                onClick={handleMigration}
                disabled={isRunning}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Đang chạy migration...
                  </>
                ) : (
                  <>
                    🚀 Chạy Migration
                  </>
                )}
              </Button>
            </div>

            {result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  ✅ Kết quả:
                </h3>
                <p className="text-green-700">{result}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  ❌ Lỗi:
                </h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                📝 Log kiểm tra:
              </h3>
              <p className="text-gray-700 mb-4">
                Sau khi chạy migration, kiểm tra:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>Trang Community - Tab "Chưa trả lời" chỉ hiện câu hỏi có answerCount = 0</li>
                <li>Trang Community - Tab "Phổ biến" chỉ hiện câu hỏi có 4+ votes</li>
                <li>Console Firebase - Kiểm tra trường answerCount trong documents</li>
                <li>Test functionality - Đăng câu hỏi mới và comment để verify</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
