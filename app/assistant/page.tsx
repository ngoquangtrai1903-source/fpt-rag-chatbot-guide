'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Send, MessageCircle, Loader2 } from 'lucide-react'

export default function AssistantPage() {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    sendMessage({ text: input })
    setInput('')
  }

  const suggestedQuestions = [
    'What should I know about vovinam training?',
    'How do I find a music club?',
    'What are the military training requirements?',
    'What\'s a good monthly budget for expenses?',
    'How do I get to know my roommates?',
    'What clubs should I join as a first-year?',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5 flex flex-col">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full">
          <Link href="/" className="text-primary hover:underline flex items-center gap-2 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Header */}
      {messages.length === 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
              <MessageCircle size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">FPTU Assistant</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hi! I'm your AI guide for FPTU. Ask me anything about student life, training programs, clubs, or campus resources. I'm here to help you thrive!
            </p>
          </div>
        </section>
      )}

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        {messages.length > 0 ? (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl px-6 py-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card border border-border text-foreground rounded-bl-none'
                  }`}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === 'text') {
                      return (
                        <div key={index} className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {part.text}
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-lg rounded-bl-none px-6 py-4">
                  <div className="flex gap-2 items-center">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Assistant is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Suggested Questions</h2>
              <p className="text-muted-foreground mb-6">Click any question or ask your own</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(question)
                    // Trigger form submission after state update
                    setTimeout(() => {
                      sendMessage({ text: question })
                      setInput('')
                    }, 0)
                  }}
                  className="p-4 text-left rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{question}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 w-full bg-background/95 backdrop-blur-sm border-t border-border py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about FPTU..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="lg"
              className="gap-2"
            >
              <Send size={18} />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            FPTU Assistant is here to help! For urgent matters, please contact the Student Services office.
          </p>
        </div>
      </div>
    </div>
  )
}
