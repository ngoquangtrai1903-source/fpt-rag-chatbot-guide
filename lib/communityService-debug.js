// ==================== DEBUG VERSION - KIỂM TRA LỖI FIREBASE ====================

import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  where,
  getDocs,
  getDoc
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

// ==================== DEBUG HELPER ====================

// Kiểm tra Firebase initialization
export function checkFirebaseConnection() {
  console.log('=== FIREBASE CONNECTION CHECK ===')
  console.log('Firebase app:', db.app)
  console.log('Current user:', auth.currentUser)
  console.log('Environment variables:')
  console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing')
  console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing')
  console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing')
  console.log('App ID:', process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing')
}

// ==================== MODULE 1: QUẢN LÝ CÂU HỎI (DEBUG VERSION) ====================

/**
 * Đẩy một document mới vào collection questions (DEBUG VERSION)
 */
export async function postQuestion(title, category, details, tags = []) {
  try {
    console.log('=== POST QUESTION DEBUG ===')
    console.log('1. Checking auth...')
    
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để đăng câu hỏi')
    }

    console.log('2. User authenticated:', auth.currentUser.uid)
    console.log('3. Preparing data...')

    const questionData = {
      title: title?.trim() || '',
      category: category?.trim() || '',
      details: details?.trim() || '',
      tags: Array.isArray(tags) ? tags : [],
      authorId: auth.currentUser.uid,
      authorEmail: auth.currentUser.email,
      authorName: auth.currentUser.displayName || 'Anonymous',
      voteCount: 0,
      votedBy: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    console.log('4. Question data prepared:', questionData)
    console.log('5. Adding to Firestore...')

    const docRef = await addDoc(collection(db, 'questions'), questionData)
    
    console.log('✅ SUCCESS: Question posted with ID:', docRef.id)
    
    // Verify the document was created
    const docSnap = await getDoc(doc(db, 'questions', docRef.id))
    if (docSnap.exists()) {
      console.log('✅ VERIFIED: Document exists in Firestore')
      console.log('Document data:', docSnap.data())
    } else {
      console.log('❌ ERROR: Document not found after creation')
    }
    
    return docRef.id
  } catch (error) {
    console.error('❌ ERROR posting question:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Full error:', error)
    throw error
  }
}

/**
 * Lắng nghe danh sách câu hỏi theo thời gian thực (DEBUG VERSION)
 */
export function fetchQuestionsRealtime(callback) {
  try {
    console.log('=== FETCH QUESTIONS DEBUG ===')
    console.log('1. Setting up query...')
    
    const q = query(
      collection(db, 'questions'),
      orderBy('createdAt', 'desc')
    )

    console.log('2. Query created, setting up listener...')

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('📡 SNAPSHOT RECEIVED')
      console.log('Number of documents:', querySnapshot.size)
      
      const questions = []
      querySnapshot.forEach((doc) => {
        const questionData = {
          id: doc.id,
          ...doc.data()
        }
        questions.push(questionData)
        console.log(`📄 Document ${doc.id}:`, questionData)
      })
      
      console.log('📋 Total questions processed:', questions.length)
      callback(questions)
    }, (error) => {
      console.error('❌ SNAPSHOT ERROR:')
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Full error:', error)
      callback([])
    })

    console.log('✅ Listener set up successfully')
    return unsubscribe
  } catch (error) {
    console.error('❌ ERROR setting up listener:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Full error:', error)
    return () => {}
  }
}

/**
 * Test function to verify Firestore connection
 */
export async function testFirestoreConnection() {
  try {
    console.log('=== TEST FIRESTORE CONNECTION ===')
    
    // Test 1: Check if we can read from a collection
    console.log('Test 1: Reading questions collection...')
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)
    console.log('✅ Can read collection. Documents found:', querySnapshot.size)
    
    // Test 2: Try to write a test document
    console.log('Test 2: Writing test document...')
    if (auth.currentUser) {
      const testData = {
        title: 'Test Question',
        category: 'Test',
        details: 'This is a test question',
        tags: ['test'],
        authorId: auth.currentUser.uid,
        authorEmail: auth.currentUser.email,
        authorName: 'Test User',
        voteCount: 0,
        votedBy: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      
      const docRef = await addDoc(collection(db, 'questions'), testData)
      console.log('✅ Test document written with ID:', docRef.id)
      
      // Clean up - delete the test document
      await deleteDoc(doc(db, 'questions', docRef.id))
      console.log('✅ Test document cleaned up')
    } else {
      console.log('⚠️ No authenticated user, skipping write test')
    }
    
    console.log('✅ ALL TESTS PASSED')
    return true
  } catch (error) {
    console.error('❌ FIRESTORE TEST FAILED:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Full error:', error)
    return false
  }
}

// ==================== ORIGINAL FUNCTIONS (KEEP FOR REFERENCE) ====================

/**
 * Xóa câu hỏi (chỉ author được phép xóa)
 */
export async function deleteQuestion(questionId) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để xóa câu hỏi')
    }

    const questionRef = doc(db, 'questions', questionId)
    const questionSnap = await getDoc(questionRef)
    
    if (!questionSnap.exists()) {
      throw new Error('Không tìm thấy câu hỏi')
    }

    const questionData = questionSnap.data()
    if (questionData.authorId !== auth.currentUser.uid) {
      throw new Error('Bạn không có quyền xóa câu hỏi này')
    }

    await deleteDoc(questionRef)
    console.log('Đã xóa câu hỏi:', questionId)
    return true
  } catch (error) {
    console.error('Lỗi khi xóa câu hỏi:', error)
    throw error
  }
}

/**
 * Toggle vote (upvote/unvote) cho câu hỏi
 */
export async function toggleVote(questionId) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để vote')
    }

    const questionRef = doc(db, 'questions', questionId)
    const userId = auth.currentUser.uid

    const questionSnap = await getDoc(questionRef)
    
    if (!questionSnap.exists()) {
      throw new Error('Không tìm thấy câu hỏi')
    }

    const questionData = questionSnap.data()
    const votedBy = questionData.votedBy || []
    const hasVoted = votedBy.includes(userId)

    let updateData
    let action

    if (hasVoted) {
      updateData = {
        votedBy: arrayRemove(userId),
        voteCount: increment(-1),
        updatedAt: serverTimestamp()
      }
      action = 'unvoted'
    } else {
      updateData = {
        votedBy: arrayUnion(userId),
        voteCount: increment(1),
        updatedAt: serverTimestamp()
      }
      action = 'voted'
    }

    await updateDoc(questionRef, updateData)
    
    console.log(`User ${userId} ${action} question ${questionId}`)
    
    return {
      success: true,
      action,
      voteCount: questionData.voteCount + (action === 'voted' ? 1 : -1)
    }
  } catch (error) {
    console.error('Lỗi khi toggle vote:', error)
    throw error
  }
}

/**
 * Gửi bình luận cho câu hỏi
 */
export async function submitComment(questionId, content) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để bình luận')
    }

    if (!content || content.trim().length === 0) {
      throw new Error('Nội dung bình luận không được để trống')
    }

    const commentData = {
      questionId,
      content: content.trim(),
      authorId: auth.currentUser.uid,
      authorEmail: auth.currentUser.email,
      authorName: auth.currentUser.displayName || 'Anonymous',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, 'comments'), commentData)
    console.log('Bình luận đã được gửi với ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Lỗi khi gửi bình luận:', error)
    throw error
  }
}

/**
 * Lấy danh sách bình luận của một câu hỏi theo thời gian thực
 */
export function getCommentsByQuestion(questionId, callback) {
  try {
    const q = query(
      collection(db, 'comments'),
      where('questionId', '==', questionId),
      orderBy('createdAt', 'asc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = []
      querySnapshot.forEach((doc) => {
        comments.push({
          id: doc.id,
          ...doc.data()
        })
      })
      callback(comments)
    }, (error) => {
      console.error('Lỗi khi lắng nghe bình luận:', error)
      callback([])
    })

    return unsubscribe
  } catch (error) {
    console.error('Lỗi khi thiết lập comment listener:', error)
    return () => {}
  }
}
