// Hàm debug để kiểm tra trạng thái answerCount
export async function debugAnswerCount() {
  try {
    console.log('🔍 DEBUG: Checking answerCount status...')
    
    // Lấy tất cả questions
    const questionsQuery = query(collection(db, 'questions'))
    const questionsSnapshot = await getDocs(questionsQuery)
    
    let questionsWithoutAnswerCount = 0
    let questionsWithAnswerCount = 0
    let totalQuestions = questionsSnapshot.size
    
    console.log(`📊 Total questions: ${totalQuestions}`)
    
    questionsSnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.answerCount === undefined) {
        questionsWithoutAnswerCount++
        console.log(`❌ Question ${doc.id} (${data.title}) has NO answerCount field`)
      } else {
        questionsWithAnswerCount++
        console.log(`✅ Question ${doc.id} (${data.title}) has answerCount: ${data.answerCount}`)
      }
    })
    
    console.log(`📈 Summary:`)
    console.log(`- Questions WITHOUT answerCount: ${questionsWithoutAnswerCount}`)
    console.log(`- Questions WITH answerCount: ${questionsWithAnswerCount}`)
    console.log(`- Percentage with answerCount: ${((questionsWithAnswerCount / totalQuestions) * 100).toFixed(1)}%`)
    
    return {
      totalQuestions,
      questionsWithoutAnswerCount,
      questionsWithAnswerCount,
      percentage: ((questionsWithAnswerCount / totalQuestions) * 100).toFixed(1)
    }
  } catch (error) {
    console.error('❌ Error debugging answerCount:', error)
    throw error
  }
}

// Hàm để fix các câu hỏi cũ không có answerCount
export async function fixAnswerCountForOldQuestions() {
  try {
    console.log('🔧 FIX: Starting to fix answerCount for old questions...')
    
    // Lấy tất cả questions
    const questionsQuery = query(collection(db, 'questions'))
    const questionsSnapshot = await getDocs(questionsQuery)
    
    let fixedCount = 0
    
    for (const questionDoc of questionsSnapshot.docs) {
      const questionData = questionDoc.data()
      
      if (questionData.answerCount === undefined) {
        // Đếm số comments thực tế của question này
        const commentsQuery = query(
          collection(db, 'comments'),
          where('questionId', '==', questionDoc.id)
        )
        const commentsSnapshot = await getDocs(commentsQuery)
        
        // Cập nhật answerCount với số lượng thực tế
        await updateDoc(questionDoc.ref, {
          answerCount: commentsSnapshot.size,
          updatedAt: serverTimestamp()
        })
        
        console.log(`✅ Fixed question ${questionDoc.id}: set answerCount to ${commentsSnapshot.size}`)
        fixedCount++
      }
    }
    
    console.log(`🎉 Fixed ${fixedCount} questions!`)
    return fixedCount
  } catch (error) {
    console.error('❌ Error fixing answerCount:', error)
    throw error
  }
}
