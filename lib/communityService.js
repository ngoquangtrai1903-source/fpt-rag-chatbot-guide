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
  getDoc,
  setDoc,
  writeBatch
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

// ==================== MODULE 1: QUẢN LÝ CÂU HỎI ====================

/**
 * Đẩy một document mới vào collection questions
 * @param {string} title - Tiêu đề câu hỏi
 * @param {string} category - Danh mục câu hỏi
 * @param {string} details - Nội dung chi tiết câu hỏi
 * @param {string[]} tags - Mảng các tag
 * @returns {Promise<string>} - ID của document vừa tạo
 */
export async function postQuestion(title, category, details, tags = []) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để đăng câu hỏi')
    }

    // Get user data for reputation
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
    const userData = userDoc.exists() ? userDoc.data() : { reputation: 0 }

    const questionData = {
      title,
      category,
      details,
      tags,
      authorId: auth.currentUser.uid,
      authorEmail: auth.currentUser.email,
      authorName: auth.currentUser.displayName || 'Anonymous',
      voteCount: 0,
      votedBy: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, 'questions'), questionData)
    
    // Update user reputation for posting question (+5 points)
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      reputation: increment(5)
    })
    
    console.log('Câu hỏi đã được đăng với ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Lỗi khi đăng câu hỏi:', error)
    throw error
  }
}

/**
 * Lấy chi tiết một câu hỏi theo ID
 * @param {string} questionId - ID của câu hỏi
 * @returns {Promise<Object|null>} - Dữ liệu câu hỏi hoặc null nếu không tìm thấy
 */
export async function getQuestionById(questionId) {
  try {
    const questionRef = doc(db, 'questions', questionId)
    const questionSnap = await getDoc(questionRef)
    
    if (questionSnap.exists()) {
      return questionSnap.data()
    } else {
      return null
    }
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết câu hỏi:', error)
    throw error
  }
}

/**
 * Lấy danh sách câu hỏi theo thời gian thực với sắp xếp
 * @param {Function} callback - Function callback nhận dữ liệu
 * @param {string} sortBy - 'newest' | 'popular' | 'mostAnswers'
 * @returns {Function} - Function để unsubscribe
 */
export function fetchQuestionsRealtime(callback, sortBy = 'newest') {
  try {
    let q
    
    switch (sortBy) {
      case 'popular':
        q = query(
          collection(db, 'questions'),
          orderBy('voteCount', 'desc'),
          orderBy('createdAt', 'desc')
        )
        break
      case 'mostAnswers':
        // Lấy questions và sort theo số comments
        q = query(
          collection(db, 'questions'),
          orderBy('createdAt', 'desc')
        )
        break
      case 'newest':
      default:
        q = query(
          collection(db, 'questions'),
          orderBy('createdAt', 'desc')
        )
        break
    }

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const questions = []
      querySnapshot.forEach((doc) => {
        questions.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      // Nếu là mostAnswers, cần lấy số comments cho mỗi question
      if (sortBy === 'mostAnswers') {
        const questionsWithAnswerCount = await Promise.all(
          questions.map(async (question) => {
            const commentsQuery = query(
              collection(db, 'comments'),
              where('questionId', '==', question.id)
            )
            const commentsSnapshot = await getDocs(commentsQuery)
            return {
              ...question,
              answerCount: commentsSnapshot.size
            }
          })
        )
        
        // Sort theo answerCount
        questionsWithAnswerCount.sort((a, b) => b.answerCount - a.answerCount)
        callback(questionsWithAnswerCount)
      } else {
        callback(questions)
      }
    }, (error) => {
      console.error('Lỗi khi lắng nghe câu hỏi:', error)
      callback([])
    })

    return unsubscribe
  } catch (error) {
    console.error('Lỗi khi thiết lập listener:', error)
    return () => {}
  }
}

/**
 * Xóa câu hỏi (chỉ tác giả hoặc admin)
 * @param {string} questionId - ID của câu hỏi cần xóa
 * @returns {Promise<boolean>} - True nếu xóa thành công
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
    const userId = auth.currentUser.uid

    // Kiểm tra quyền: chỉ tác giả mới được xóa
    if (questionData.authorId !== userId) {
      throw new Error('Bạn chỉ có thể xóa câu hỏi của mình')
    }

    // Xóa tất cả comments của câu hỏi
    const commentsQuery = query(
      collection(db, 'comments'),
      where('questionId', '==', questionId)
    )
    const commentsSnapshot = await getDocs(commentsQuery)
    
    const batch = writeBatch(db)
    
    // Xóa comments
    commentsSnapshot.forEach((doc) => {
      batch.delete(doc.ref)
    })
    
    // Xóa question
    batch.delete(questionRef)
    
    // Cập nhật reputation (-5 points)
    await updateDoc(doc(db, 'users', userId), {
      reputation: increment(-5)
    })
    
    await batch.commit()
    
    console.log('Đã xóa câu hỏi và', commentsSnapshot.size, 'bình luận')
    return true
  } catch (error) {
    console.error('Lỗi khi xóa câu hỏi:', error)
    throw error
  }
}

/**
 * Xóa bình luận (chỉ tác giả hoặc admin)
 * @param {string} commentId - ID của bình luận cần xóa
 * @returns {Promise<boolean>} - True nếu xóa thành công
 */
export async function deleteComment(commentId) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để xóa bình luận')
    }

    const commentRef = doc(db, 'comments', commentId)
    const commentSnap = await getDoc(commentRef)
    
    if (!commentSnap.exists()) {
      throw new Error('Không tìm thấy bình luận')
    }

    const commentData = commentSnap.data()
    const userId = auth.currentUser.uid

    // Kiểm tra quyền: chỉ tác giả mới được xóa
    if (commentData.authorId !== userId) {
      throw new Error('Bạn chỉ có thể xóa bình luận của mình')
    }

    await deleteDoc(commentRef)
    
    // Cập nhật reputation (-2 points)
    await updateDoc(doc(db, 'users', userId), {
      reputation: increment(-2)
    })
    
    console.log('Đã xóa bình luận:', commentId)
    return true
  } catch (error) {
    console.error('Lỗi khi xóa bình luận:', error)
    throw error
  }
}

// ==================== MODULE 2: BÌNH LUẬN & TƯƠNG TÁC ====================

/**
 * Đăng bình luận cho một câu hỏi
 * @param {string} questionId - ID của câu hỏi
 * @param {string} content - Nội dung bình luận
 * @returns {Promise<string>} - ID của comment vừa tạo
 */
export async function postComment(questionId, content) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để bình luận')
    }

    // Get user data for reputation
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
    const userData = userDoc.exists() ? userDoc.data() : { reputation: 0 }

    const commentData = {
      questionId,
      content,
      authorId: auth.currentUser.uid,
      authorEmail: auth.currentUser.email,
      authorName: auth.currentUser.displayName || 'Anonymous',
      voteCount: 0,
      votedBy: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, 'comments'), commentData)
    console.log('Đã đăng bình luận:', docRef.id)

    // Cập nhật reputation (+3 points cho bình luận)
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      reputation: increment(3)
    })

    // Cập nhật answer count cho question (nếu cần)
    const questionRef = doc(db, 'questions', questionId)
    await updateDoc(questionRef, {
      updatedAt: serverTimestamp()
    })

    return docRef.id
  } catch (error) {
    console.error('Lỗi khi đăng bình luận:', error)
    throw error
  }
}

// ==================== MODULE 3: REAL-TIME LISTENERS ====================

/**
 * Realtime listener cho comments
 * @param {string} questionId - ID của câu hỏi
 * @param {Function} callback - Function callback nhận dữ liệu
 * @param {string} sortBy - 'newest' | 'popular'
 * @returns {Function} - Function để unsubscribe
 */
export function fetchCommentsRealtime(questionId, callback, sortBy = 'newest') {
  try {
    console.log('Setting up real-time comment listener for questionId:', questionId, 'sort:', sortBy)
    
    let q
    switch (sortBy) {
      case 'popular':
        q = query(
          collection(db, 'comments'),
          where('questionId', '==', questionId),
          orderBy('voteCount', 'desc'),
          orderBy('createdAt', 'desc')
        )
        break
      case 'newest':
      default:
        q = query(
          collection(db, 'comments'),
          where('questionId', '==', questionId),
          orderBy('createdAt', 'asc')
        )
        break
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comments = []
      snapshot.forEach((doc) => {
        comments.push({
          id: doc.id,
          ...doc.data()
        })
      })
      console.log('Real-time comments received:', comments.length, 'items')
      callback(comments)
    }, (error) => {
      console.error('Lỗi khi lắng nghe bình luận real-time:', error)
      callback([])
    })

    return unsubscribe
  } catch (error) {
    console.error('Lỗi khi thiết lập real-time comment listener:', error)
    return () => {}
  }
}

/**
 * Realtime listener cho vote của 1 câu hỏi cụ thể
 * @param {string} questionId - ID của câu hỏi
 * @param {Function} callback - Function callback nhận dữ liệu
 * @returns {Function} - Function để unsubscribe
 */
export function fetchQuestionRealtime(questionId, callback) {
  try {
    console.log('Setting up real-time question listener for questionId:', questionId)
    
    const questionRef = doc(db, 'questions', questionId)
    
    const unsubscribe = onSnapshot(questionRef, (snapshot) => {
      if (snapshot.exists()) {
        const questionData = {
          id: snapshot.id,
          ...snapshot.data()
        }
        console.log('Real-time question data received:', questionData)
        callback(questionData)
      } else {
        console.log('Question not found:', questionId)
        callback(null)
      }
    }, (error) => {
      console.error('Lỗi khi lắng nghe câu hỏi real-time:', error)
      callback(null)
    })

    return unsubscribe
  } catch (error) {
    console.error('Lỗi khi thiết lập real-time question listener:', error)
    return () => {}
  }
}

// ==================== MODULE 4: TƯƠNG TÁC & VOTE ====================

/**
 * Toggle vote (upvote/unvote) cho câu hỏi
 * @param {string} questionId - ID của câu hỏi
 * @returns {Promise<Object>} - Kết quả vote action
 */
export async function toggleVote(questionId) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để vote')
    }

    const questionRef = doc(db, 'questions', questionId)
    const userId = auth.currentUser.uid

    // Lấy thông tin hiện tại của câu hỏi
    const questionSnap = await getDoc(questionRef)
    
    if (!questionSnap.exists()) {
      throw new Error('Không tìm thấy câu hỏi')
    }

    const questionData = questionSnap.data()
    const votedBy = questionData.votedBy || []
    const hasVoted = votedBy.includes(userId)
    const currentVoteCount = questionData.voteCount || 0

    let updateData
    let action
    let newVoteCount

    if (hasVoted) {
      // Unvote: chỉ xóa UID nếu voteCount > 0
      if (currentVoteCount > 0) {
        updateData = {
          votedBy: arrayRemove(userId),
          voteCount: increment(-1)
        }
        action = 'unvoted'
        newVoteCount = currentVoteCount - 1
      } else {
        // Nếu voteCount = 0, chỉ xóa khỏi votedBy
        updateData = {
          votedBy: arrayRemove(userId)
        }
        action = 'cleaned'
        newVoteCount = 0
      }
    } else {
      // Vote: thêm UID và tăng voteCount
      updateData = {
        votedBy: arrayUnion(userId),
        voteCount: increment(1)
      }
      action = 'voted'
      newVoteCount = currentVoteCount + 1
    }

    await updateDoc(questionRef, updateData)
    
    console.log(`User ${userId} ${action} question ${questionId}`)
    
    return {
      success: true,
      action,
      voteCount: newVoteCount
    }
  } catch (error) {
    console.error('Lỗi khi toggle vote:', error)
    throw error
  }
}

// ==================== MODULE 3: BÌNH LUẬN ====================

/**
 * Gửi bình luận cho câu hỏi
 * @param {string} questionId - ID của câu hỏi
 * @param {string} content - Nội dung bình luận
 * @returns {Promise<string>} - ID của comment vừa tạo
 */
export async function submitComment(questionId, content) {
  try {
    console.log('Submitting comment for questionId:', questionId, 'content:', content)
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để bình luận')
    }

    if (!content || content.trim().length === 0) {
      throw new Error('Nội dung bình luận không được để trống')
    }

    // Filter spam/rác comments
    const cleanContent = content.trim()
    if (cleanContent.length < 3) {
      throw new Error('Bình luận quá ngắn, vui lòng nhập ít nhất 3 ký tự')
    }

    if (cleanContent.length > 1000) {
      throw new Error('Bình luận quá dài, vui lòng nhập dưới 1000 ký tự')
    }

    const commentData = {
      questionId,
      content: cleanContent,
      authorId: auth.currentUser.uid,
      authorEmail: auth.currentUser.email,
      authorName: auth.currentUser.displayName || 'Anonymous',
      voteCount: 0,
      votedBy: [],
      createdAt: serverTimestamp()
    }

    console.log('Comment data to save:', commentData)
    const docRef = await addDoc(collection(db, 'comments'), commentData)
    
    // Update user reputation for posting comment (+2 points)
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      reputation: increment(2)
    })
    
    console.log('Bình luận đã được đăng với ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Lỗi khi gửi bình luận:', error)
    throw error
  }
}

/**
 * Toggle vote cho bình luận
 * @param {string} commentId - ID của bình luận
 * @returns {Promise<Object>} - Kết quả vote action
 */
export async function toggleCommentVote(commentId) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để vote bình luận')
    }

    const commentRef = doc(db, 'comments', commentId)
    const userId = auth.currentUser.uid

    // Lấy thông tin hiện tại của bình luận
    const commentSnap = await getDoc(commentRef)
    
    if (!commentSnap.exists()) {
      throw new Error('Không tìm thấy bình luận')
    }

    const commentData = commentSnap.data()
    const votedBy = commentData.votedBy || []
    const hasVoted = votedBy.includes(userId)
    const currentVoteCount = commentData.voteCount || 0

    let updateData
    let action
    let newVoteCount

    if (hasVoted) {
      // Unvote: chỉ xóa UID nếu voteCount > 0
      if (currentVoteCount > 0) {
        updateData = {
          votedBy: arrayRemove(userId),
          voteCount: increment(-1)
        }
        action = 'unvoted'
        newVoteCount = currentVoteCount - 1
      } else {
        // Nếu voteCount = 0, chỉ xóa khỏi votedBy
        updateData = {
          votedBy: arrayRemove(userId)
        }
        action = 'cleaned'
        newVoteCount = 0
      }
    } else {
      // Vote: thêm UID và tăng voteCount
      updateData = {
        votedBy: arrayUnion(userId),
        voteCount: increment(1)
      }
      action = 'voted'
      newVoteCount = currentVoteCount + 1
    }

    await updateDoc(commentRef, updateData)
    
    console.log(`User ${userId} ${action} comment ${commentId}`)
    
    return {
      success: true,
      action,
      voteCount: newVoteCount
    }
  } catch (error) {
    console.error('Lỗi khi toggle comment vote:', error)
    throw error
  }
}

/**
 * Test function to fetch comments directly (for debugging)
 * @param {string} questionId - ID của câu hỏi
 * @returns {Promise<Array>} - Danh sách comments
 */
export async function testFetchComments(questionId) {
  try {
    console.log('Test fetching comments for questionId:', questionId)
    const q = query(
      collection(db, 'comments'),
      where('questionId', '==', questionId)
    )
    
    const querySnapshot = await getDocs(q)
    const comments = []
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      })
    })
    console.log('Test fetch results:', comments.length, 'comments')
    return comments
  } catch (error) {
    console.error('Test fetch error:', error)
    return []
  }
}

/**
 * Lấy danh sách bình luận của một câu hỏi theo thời gian thực với sắp xếp
 * @param {string} questionId - ID của câu hỏi
 * @param {Function} callback - Function callback nhận dữ liệu
 * @param {string} sortBy - 'newest' | 'popular'
 * @returns {Function} - Function để unsubscribe
 */
export function getCommentsByQuestion(questionId, callback, sortBy = 'newest') {
  try {
    console.log('Setting up comment listener for questionId:', questionId, 'sort:', sortBy)
    
    let q
    switch (sortBy) {
      case 'popular':
        q = query(
          collection(db, 'comments'),
          where('questionId', '==', questionId),
          orderBy('voteCount', 'desc'),
          orderBy('createdAt', 'desc')
        )
        break
      case 'newest':
      default:
        q = query(
          collection(db, 'comments'),
          where('questionId', '==', questionId),
          orderBy('createdAt', 'asc')
        )
        break
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = []
      querySnapshot.forEach((doc) => {
        comments.push({
          id: doc.id,
          ...doc.data()
        })
      })
      console.log('Comments snapshot received:', comments.length, 'comments')
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

// ==================== HELPER FUNCTIONS ====================

/**
 * Cập nhật thông tin câu hỏi
 * @param {string} questionId - ID của câu hỏi
 * @param {Object} updateData - Dữ liệu cần cập nhật
 * @returns {Promise<boolean>} - True nếu cập nhật thành công
 */
export async function updateQuestion(questionId, updateData) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để cập nhật câu hỏi')
    }

    const questionRef = doc(db, 'questions', questionId)
    
    // Kiểm tra quyền sở hữu
    const questionSnap = await getDocs(query(collection(db, 'questions'), where('__name__', '==', questionId)))
    
    if (questionSnap.empty) {
      throw new Error('Không tìm thấy câu hỏi')
    }

    const questionData = questionSnap.docs[0].data()
    if (questionData.authorId !== auth.currentUser.uid) {
      throw new Error('Bạn không có quyền cập nhật câu hỏi này')
    }

    await updateDoc(questionRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    })

    console.log('Đã cập nhật câu hỏi:', questionId)
    return true
  } catch (error) {
    console.error('Lỗi khi cập nhật câu hỏi:', error)
    throw error
  }
}

// ==================== MODULE 4: QUẢN LÝ NGƯỜI DÙNG ====================

/**
 * Lấy thông tin user từ Firestore
 * @param {string} userId - ID của user
 * @returns {Promise<Object>} - Thông tin user
 */
export async function getUserData(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      return userDoc.data()
    } else {
      // Create user document if not exists
      const userData = {
        displayName: auth.currentUser?.displayName || 'Anonymous',
        email: auth.currentUser?.email || '',
        photoURL: auth.currentUser?.photoURL || '',
        reputation: 0,
        role: 'user',
        createdAt: serverTimestamp()
      }
      await setDoc(doc(db, 'users', userId), userData)
      return userData
    }
  } catch (error) {
    console.error('Lỗi khi lấy thông tin user:', error)
    throw error
  }
}

/**
 * Cập nhật reputation cho user
 * @param {string} userId - ID của user
 * @param {number} points - Số điểm cộng/trừ
 * @returns {Promise<void>}
 */
export async function updateUserReputation(userId, points) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      reputation: increment(points)
    })
    console.log(`Updated reputation for user ${userId}: +${points} points`)
  } catch (error) {
    console.error('Lỗi khi cập nhật reputation:', error)
    throw error
  }
}

/**
 * Lấy danh sách user top reputation
 * @param {number} limit - Số lượng user muốn lấy
 * @returns {Promise<Array>} - Danh sách user top reputation
 */
export async function getTopUsers(limit = 10) {
  try {
    const q = query(
      collection(db, 'users'),
      orderBy('reputation', 'desc'),
      where('reputation', '>', 0)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .slice(0, limit)
  } catch (error) {
    console.error('Lỗi khi lấy top users:', error)
    throw error
  }
}

/**
 * Lấy thống kê cho community
 * @returns {Promise<Object>} - Thống kê tổng quan
 */
export async function getCommunityStats() {
  try {
    const questionsQuery = query(collection(db, 'questions'))
    const commentsQuery = query(collection(db, 'comments'))
    const usersQuery = query(collection(db, 'users'))
    
    const [questionsSnapshot, commentsSnapshot, usersSnapshot] = await Promise.all([
      getDocs(questionsQuery),
      getDocs(commentsQuery),
      getDocs(usersQuery)
    ])
    
    return {
      totalQuestions: questionsSnapshot.size,
      totalComments: commentsSnapshot.size,
      totalUsers: usersSnapshot.size,
      activeUsers: usersSnapshot.docs.filter(doc => doc.data().reputation > 0).length
    }
  } catch (error) {
    console.error('Lỗi khi lấy thống kê:', error)
    throw error
  }
}
