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
  getDocs
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
    console.log('Câu hỏi đã được đăng với ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Lỗi khi đăng câu hỏi:', error)
    throw error
  }
}

/**
 * Lắng nghe danh sách câu hỏi theo thời gian thực
 * @param {Function} callback - Function callback nhận dữ liệu
 * @returns {Function} - Function để unsubscribe
 */
export function fetchQuestionsRealtime(callback) {
  try {
    const q = query(
      collection(db, 'questions'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questions = []
      querySnapshot.forEach((doc) => {
        questions.push({
          id: doc.id,
          ...doc.data()
        })
      })
      callback(questions)
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
 * Xóa câu hỏi (chỉ author được phép xóa)
 * @param {string} questionId - ID của câu hỏi cần xóa
 * @returns {Promise<boolean>} - True nếu xóa thành công
 */
export async function deleteQuestion(questionId) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để xóa câu hỏi')
    }

    // Kiểm tra quyền sở hữu
    const questionRef = doc(db, 'questions', questionId)
    const questionSnap = await getDocs(query(collection(db, 'questions'), where('__name__', '==', questionId)))
    
    if (questionSnap.empty) {
      throw new Error('Không tìm thấy câu hỏi')
    }

    const questionData = questionSnap.docs[0].data()
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

// ==================== MODULE 2: TƯƠNG TÁC & VOTE ====================

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
          voteCount: increment(-1),
          updatedAt: serverTimestamp()
        }
        action = 'unvoted'
        newVoteCount = currentVoteCount - 1
      } else {
        // Nếu voteCount = 0, chỉ xóa khỏi votedBy
        updateData = {
          votedBy: arrayRemove(userId),
          updatedAt: serverTimestamp()
        }
        action = 'cleaned'
        newVoteCount = 0
      }
    } else {
      // Vote: thêm UID và tăng voteCount
      updateData = {
        votedBy: arrayUnion(userId),
        voteCount: increment(1),
        updatedAt: serverTimestamp()
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
          voteCount: increment(-1),
          updatedAt: serverTimestamp()
        }
        action = 'unvoted'
        newVoteCount = currentVoteCount - 1
      } else {
        // Nếu voteCount = 0, chỉ xóa khỏi votedBy
        updateData = {
          votedBy: arrayRemove(userId),
          updatedAt: serverTimestamp()
        }
        action = 'cleaned'
        newVoteCount = 0
      }
    } else {
      // Vote: thêm UID và tăng voteCount
      updateData = {
        votedBy: arrayUnion(userId),
        voteCount: increment(1),
        updatedAt: serverTimestamp()
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
 * Lấy danh sách bình luận của một câu hỏi theo thời gian thực
 * @param {string} questionId - ID của câu hỏi
 * @param {Function} callback - Function callback nhận dữ liệu
 * @returns {Function} - Function để unsubscribe
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

// ==================== HELPER FUNCTIONS ====================

/**
 * Lấy thông tin chi tiết một câu hỏi
 * @param {string} questionId - ID của câu hỏi
 * @returns {Promise<Object|null>} - Dữ liệu câu hỏi hoặc null
 */
export async function getQuestionById(questionId) {
  try {
    const questionSnap = await getDocs(query(collection(db, 'questions'), where('__name__', '==', questionId)))
    
    if (questionSnap.empty) {
      return null
    }

    return {
      id: questionSnap.docs[0].id,
      ...questionSnap.docs[0].data()
    }
  } catch (error) {
    console.error('Lỗi khi lấy thông tin câu hỏi:', error)
    return null
  }
}

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

/**
 * Xóa bình luận (chỉ author được phép xóa)
 * @param {string} commentId - ID của bình luận
 * @returns {Promise<boolean>} - True nếu xóa thành công
 */
export async function deleteComment(commentId) {
  try {
    if (!auth.currentUser) {
      throw new Error('Bạn cần đăng nhập để xóa bình luận')
    }

    // Kiểm tra quyền sở hữu
    const commentSnap = await getDocs(query(collection(db, 'comments'), where('__name__', '==', commentId)))
    
    if (commentSnap.empty) {
      throw new Error('Không tìm thấy bình luận')
    }

    const commentData = commentSnap.docs[0].data()
    if (commentData.authorId !== auth.currentUser.uid) {
      throw new Error('Bạn không có quyền xóa bình luận này')
    }

    await deleteDoc(doc(db, 'comments', commentId))
    console.log('Đã xóa bình luận:', commentId)
    return true
  } catch (error) {
    console.error('Lỗi khi xóa bình luận:', error)
    throw error
  }
}
