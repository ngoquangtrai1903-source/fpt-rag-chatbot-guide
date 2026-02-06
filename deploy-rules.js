// Script để deploy Firestore rules
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔥 Deploying Firestore Security Rules...');
console.log('');
console.log('📋 Steps to deploy manually:');
console.log('');
console.log('1. Mở Firebase Console: https://console.firebase.google.com/');
console.log('2. Chọn project của bạn');
console.log('3. Đi đến Firestore Database > Rules');
console.log('4. Copy nội dung từ file firestore.rules và paste vào');
console.log('5. Click "Publish"');
console.log('');
console.log('📄 Nội dung file firestore.rules:');
console.log('=====================================');

try {
  const rules = fs.readFileSync('./firestore.rules', 'utf8');
  console.log(rules);
  console.log('=====================================');
  console.log('✅ Copy nội dung trên và paste vào Firebase Console');
} catch (error) {
  console.error('❌ Không thể đọc file firestore.rules:', error.message);
}
