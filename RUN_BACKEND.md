# 🚀 HƯỚNG DẪN CHẠY BACKEND PYTHON

## 📋 1. CÀI ĐẶT DEPENDENCIES

```bash
# Tạo virtual environment (khuyến khích)
python -m venv venv

# Kích hoạt virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt
```

## 🚀 2. CHẠY BACKEND

### **Cách 1: Dùng file backend_main.py**
```bash
python backend_main.py
```

### **Cách 2: Dùng uvicorn trực tiếp**
```bash
uvicorn backend_main:app --host 0.0.0.0 --port 8000 --reload
```

### **Cách 3: Dùng environment variable**
```bash
# Set port (tùy chọn)
export PORT=8000

# Chạy
python backend_main.py
```

## ✅ 3. KIỂM TRA BACKEND ĐANG CHẠY

### **Health Check**
```bash
curl http://localhost:8000/health
```
Expected response:
```json
{
  "status": "healthy",
  "service": "FPTU AI Assistant Backend",
  "timestamp": "2024-01-01T12:00:00.000000",
  "version": "1.0.0"
}
```

### **API Documentation**
Mở trình duyệt: http://localhost:8000/docs

### **Test Chat Endpoint**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Học Vovinam ở FPTU như thế nào?",
    "user_id": "test_user",
    "session_id": "test_session"
  }'
```

## 🔧 4. KIỂM TRA FRONTEND KẾT NỐI

1. **Mở frontend**: http://localhost:3000/assistant
2. **Đăng nhập** vào tài khoản
3. **Kiểm tra status bar**: "Backend: Đã kết nối" 🟢
4. **Gửi tin nhắn test**: "Học Vovinam ở FPTU như thế nào?"
5. **Kiểm tra console logs** cho response time

## 🎯 5. TEST CÁC TÍNH NĂNG

### **Test Routing Logic**
```bash
# Test Vovinam
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Học Vovinam ở FPTU như thế nào?"}'

# Test Nhạc cụ
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Mua đàn bầu ở Đà Nẵng đâu tốt?"}'

# Test Quân sự
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Chuẩn bị gì cho đi quân sự?"}'
```

### **Expected Responses**
- **V6**: Vovinam response với emoji 🥋
- **V5**: Nhạc cụ response với emoji 🎵
- **V7**: Quân sự response với emoji ⚔️

## 🐛 6. TROUBLESHOOTING

### **Lỗi CORS**
```
Access to fetch at 'http://localhost:8000/chat' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Fix**: Đảm bảo CORS middleware được thêm vào FastAPI app.

### **Backend không chạy**
```
Port 8000 is already in use
```
**Fix**: 
```bash
# Dùng port khác
uvicorn backend_main:app --port 8001

# Hoặc kill process trên port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
# Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

### **Frontend không kết nối**
**Check**:
1. Backend đang chạy trên port 8000?
2. Test http://localhost:8000/health
3. Kiểm tra console logs ở frontend

## 🎨 7. FRONTEND FEATURES ĐÃ SẴN SÀNG

### **Connection Monitoring**
- ✅ Real-time connection status
- ✅ Response time tracking
- ✅ Error handling

### **Professional UI**
- ✅ Modern chat bubbles
- ✅ User/AI avatars
- ✅ Timestamps
- ✅ Loading states
- ✅ Suggested questions

### **User Experience**
- ✅ Mobile responsive
- ✅ Auto-scroll
- ✅ Clear input button
- ✅ Hover effects
- ✅ Smooth animations

## 🚀 8. INTEGRATION VỚI CHAT_TEST.PY

### **Bước 1: Import function**
```python
# Trong backend_main.py
from chat_test import hoi_chatbot_ai

# Thay thế mock response:
# response = hoi_chatbot_ai(request.message)
```

### **Bước 2: Cài đặt additional dependencies**
```bash
pip install google-generativeai firebase-admin sentence-transformers
```

### **Bước 3: Setup environment variables**
```bash
# Tạo .env file
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

## 🎉 9. KẾT QUẢ

### **Backend Ready** ✅
- FastAPI server on port 8000
- CORS enabled for localhost:3000
- Health check endpoint
- Chat endpoint with routing logic
- Mock responses for testing

### **Frontend Ready** ✅
- Professional chat UI
- Real-time connection monitoring
- Response time tracking
- Error handling
- Mobile responsive

### **Integration Ready** ✅
- API contract defined
- Request/response formats
- Error handling
- Logging system

**🚀 Hệ thống FPTU AI Assistant đã sẵn sàng!**

---
*Backend: Python FastAPI*
*Frontend: Next.js TypeScript*
*Integration: REST API with CORS*
