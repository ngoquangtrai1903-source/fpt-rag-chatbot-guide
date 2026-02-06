// Script để deploy Firestore Security Rules đã sửa
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔥 Deploying FIXED Firestore Security Rules...');
console.log('');
console.log('📋 Steps to deploy manually:');
console.log('');
console.log('1. Mở Firebase Console: https://console.firebase.google.com/');
console.log('2. Chọn project của bạn');
console.log('3. Đi đến Firestore Database > Rules');
console.log('4. XÓA HẾT rules cũ và paste nội dung mới');
console.log('5. Click "Publish"');
console.log('');
console.log('🔧 ĐÃ SỬA CÁC VẤN ĐỀ:');
console.log('✅ Gộp các duplicate match blocks');
console.log('✅ Thêm logic "Author OR Voter" cho update');
console.log('✅ Cho phép vote cho cả questions và comments');
console.log('✅ Xóa temporary allow all rules');
console.log('');
console.log('📄 Nội dung file firestore.rules (đã sửa):');
console.log('=====================================');

try {
  const rules = fs.readFileSync('./firestore.rules', 'utf8');
  console.log(rules);
  console.log('=====================================');
  console.log('✅ Copy nội dung trên và paste vào Firebase Console');
  console.log('');
  console.log('🚀 Sau khi deploy, test lại vote function!');
} catch (error) {
  console.error('❌ Không thể đọc file firestore.rules:', error.message);
}
