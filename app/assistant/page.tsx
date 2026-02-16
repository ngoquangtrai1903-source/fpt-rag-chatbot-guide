'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Send, MessageCircle, Loader2, Brain, Bot, ArrowRight, Users, Sparkles, User, Clock, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface ChatStats {
  totalMessages: number
  avgResponseTime: number
  satisfaction: number
}

export default function AssistantPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [responseTime, setResponseTime] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number>(0)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Check backend connection on mount
  useEffect(() => {
    checkBackendConnection()
  }, [])

  const checkBackendConnection = async () => {
    try {
      // TODO: Replace with your actual backend URL
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:10000'
      
      const response = await fetch(`${BACKEND_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      setIsConnected(response.ok)
    } catch (error) {
      setIsConnected(false)
      console.log('Backend not connected:', error)
    }
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    startTimeRef.current = Date.now()

    try {
      // TODO: Replace with your actual backend URL
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:10000'
      
      // Connect to your Python backend
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageText,
          user_id: user?.uid || 'anonymous',
          session_id: 'web_chat_' + Date.now()
        }),
      })

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`)
      }

      const data = await response.json()
      const endTime = Date.now()
      const responseTimeMs = endTime - startTimeRef.current
      setResponseTime(responseTimeMs)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.reply || data.message || 'Xin lỗi, tôi không hiểu câu hỏi của bạn.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      
      // Log backend response for debugging
      console.log('Backend response:', data)
      console.log('Response time:', responseTimeMs + 'ms')
      
    } catch (error) {
      console.error('Error connecting to backend:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '🤖 Xin lỗi, không thể kết nối đến server Python. Bạn vui lòng kiểm tra lại backend URL và đảm bảo backend đang chạy nhé!',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const suggestedQuestions = [
    {
      icon: '🥋',
      question: 'Học Vovinam ở FPTU như thế nào?',
      category: 'Vovinam',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: '🎵',
      question: 'Mua đàn bầu ở Đà Nẵng đâu tốt?',
      category: 'Nhạc cụ',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚔️',
      question: 'Chuẩn bị gì cho đi quân sự?',
      category: 'Quân sự',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: '🏠',
      question: 'KTX FPT có gì hay ho?',
      category: 'Ký túc xá',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📚',
      question: 'IELTS 6.0 để làm gì?',
      category: 'Tiếng Anh',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🍜',
      question: 'Quán ăn ngon gần trường?',
      category: 'Ẩm thực',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  // If not logged in, show auth prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-8 shadow-2xl">
              <Bot size={48} className="text-white" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FPTU AI Assistant
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trợ lý AI thông minh chuyên biệt cho sinh viên FPTU. 
              Hỗ trợ 24/7 về học tập, cuộc sống và các hoạt động ngoại khóa.
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Brain size={24} className="text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">AI Thông minh</span>
                  <span className="text-sm text-gray-500">Gemini AI Engine</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Hỗ trợ 24/7</span>
                  <span className="text-sm text-gray-500">Luôn sẵn sàng giúp đỡ</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Bot size={24} className="text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Chuyên biệt FPTU</span>
                  <span className="text-sm text-gray-500">Hiểu rõ môi trường FPTU</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                  Đăng nhập để trò chuyện
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/knowledge-base">
                <Button size="lg" variant="outline" className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-10 py-4 text-lg font-semibold">
                  Xem kiến thức
                  <MessageCircle size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/10 to-blue-50/5 flex flex-col">
      {/* Connection Status Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="text-sm text-gray-600">
                Backend: {isConnected ? 'Đã kết nối' : 'Chưa kết nối'}
              </span>
            </div>
            {responseTime && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={14} />
                <span>{responseTime}ms</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users size={14} />
            <span>{user.displayName || user.email}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            FPTU AI Assistant
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chào bạn! Mình là trợ lý AI chuyên biệt cho sinh viên FPTU. 
            Hỏi mình bất cứ điều gì về cuộc sống sinh viên, học tập, Vovinam hay các vấn đề khác nhé! 🎓
          </p>
        </div>
      </section>

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4">
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`flex gap-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 ml-3' 
                      : 'bg-gradient-to-br from-purple-500 to-purple-600 mr-3'
                  }`}>
                    {message.role === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-md'
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 flex items-center gap-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      <Clock size={10} />
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex gap-3 max-w-2xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-md px-4 py-3">
                    <div className="flex gap-2 items-center">
                      <Loader2 size={16} className="animate-spin text-purple-500" />
                      <span className="text-sm text-gray-600">AI đang suy nghĩ...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Câu hỏi gợi ý</h2>
              <p className="text-gray-600">Chọn một câu hỏi hoặc tự đặt câu hỏi của bạn</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedQuestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(item.question)}
                  className="group p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                        {item.question}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi tôi bất cứ điều gì về FPTU..."
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all disabled:opacity-50"
              />
              {input && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              <span className="ml-2 hidden sm:inline">Gửi</span>
            </Button>
          </form>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>FPTU AI Assistant</span>
              <span>•</span>
              <span>Powered by Python Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={12} className="text-green-500" />
              <span>Luôn sẵn sàng giúp đỡ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
