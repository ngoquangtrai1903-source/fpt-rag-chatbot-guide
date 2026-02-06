'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  checkFirebaseConnection,
  testFirestoreConnection,
  postQuestion,
  fetchQuestionsRealtime
} from '@/lib/communityService-debug'

export default function CommunityDebug() {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')

  // Add debug logging
  const addDebugLog = (message) => {
    setDebugInfo(prev => prev + '\n' + `[${new Date().toLocaleTimeString()}] ${message}`)
    console.log(message)
  }

  // Check Firebase connection on mount
  useEffect(() => {
    addDebugLog('=== COMMUNITY DEBUG PAGE LOADED ===')
    checkFirebaseConnection()
    
    if (user) {
      addDebugLog(`User authenticated: ${user.uid} (${user.email})`)
    } else {
      addDebugLog('No user authenticated')
    }
  }, [user])

  // Test Firestore connection
  const handleTestConnection = async () => {
    addDebugLog('=== TESTING FIRESTORE CONNECTION ===')
    setLoading(true)
    
    try {
      const success = await testFirestoreConnection()
      addDebugLog(`Test result: ${success ? '✅ SUCCESS' : '❌ FAILED'}`)
    } catch (error) {
      addDebugLog(`Test error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Setup real-time listener
  useEffect(() => {
    addDebugLog('Setting up real-time listener...')
    
    const unsubscribe = fetchQuestionsRealtime((questionsList) => {
      addDebugLog(`Received ${questionsList.length} questions from Firestore`)
      setQuestions(questionsList)
    })

    return () => {
      addDebugLog('Cleaning up listener...')
      unsubscribe()
    }
  }, [])

  // Test posting a question
  const handleTestPost = async () => {
    if (!user) {
      addDebugLog('❌ Cannot post: No authenticated user')
      return
    }

    addDebugLog('=== TESTING POST QUESTION ===')
    setLoading(true)
    
    try {
      const questionId = await postQuestion(
        'Test Question from Debug',
        'Debug',
        'This is a test question posted from the debug page to test Firestore connectivity.',
        ['test', 'debug', 'firestore']
      )
      addDebugLog(`✅ Question posted successfully: ${questionId}`)
    } catch (error) {
      addDebugLog(`❌ Post failed: ${error.message}`)
      addDebugLog(`Error code: ${error.code}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🔧 Community Service Debug</h1>
      
      {/* User Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-2">User Status:</h2>
        {user ? (
          <div className="text-sm">
            <p>✅ Authenticated: {user.uid}</p>
            <p>📧 Email: {user.email}</p>
            <p>👤 Name: {user.displayName || 'No display name'}</p>
          </div>
        ) : (
          <p className="text-red-600">❌ Not authenticated</p>
        )}
      </div>

      {/* Debug Controls */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-4">Debug Controls:</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleTestConnection}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : '🔗 Test Firestore Connection'}
          </button>
          
          <button
            onClick={handleTestPost}
            disabled={loading || !user}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Posting...' : '📝 Test Post Question'}
          </button>
          
          <button
            onClick={() => setDebugInfo('')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            🧹 Clear Debug Log
          </button>
        </div>
      </div>

      {/* Debug Log */}
      <div className="bg-black text-green-400 rounded-lg p-4 mb-6 font-mono text-sm max-h-64 overflow-y-auto">
        <h2 className="text-white mb-2">Debug Log:</h2>
        <pre className="whitespace-pre-wrap">{debugInfo || 'No debug messages yet...'}</pre>
      </div>

      {/* Questions Display */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Questions in Firestore ({questions.length}):
        </h2>
        
        {questions.length === 0 ? (
          <p className="text-gray-500">No questions found. Try posting a test question.</p>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{question.title}</h3>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    👍 {question.voteCount || 0}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">{question.details}</p>
                
                <div className="flex gap-2 mb-2">
                  {question.tags?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500">
                  <p>📝 ID: {question.id}</p>
                  <p>👤 Author: {question.authorName} ({question.authorId})</p>
                  <p>📅 Created: {question.createdAt ? new Date(question.createdAt.seconds * 1000).toLocaleString() : 'No timestamp'}</p>
                  <p>📊 Voted by: {question.votedBy?.length || 0} users</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Environment Check */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <h2 className="font-semibold mb-2">Environment Variables Check:</h2>
        <div className="text-sm space-y-1">
          <p>NEXT_PUBLIC_FIREBASE_API_KEY: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</p>
          <p>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</p>
          <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</p>
          <p>NEXT_PUBLIC_FIREBASE_APP_ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'}</p>
        </div>
      </div>
    </div>
  )
}
