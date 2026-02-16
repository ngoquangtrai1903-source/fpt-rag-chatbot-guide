# 🚀 CẤU HÌNH BACKEND URL CHO FRONTEND

## 📋 CÁCH THIẾT LẬP BACKEND URL

### **Cách 1: Dùng .env.local (Khuyến khích)**
Tạo file `.env.local` trong thư mục gốc project:

```bash
# Backend URL của bạn
NEXT_PUBLIC_BACKEND_URL=http://your-backend-url:port

# Ví dụ:
# NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
# NEXT_PUBLIC_BACKEND_URL=http://192.168.1.100:8000
# NEXT_PUBLIC_BACKEND_URL=https://your-api-domain.com
# NEXT_PUBLIC_BACKEND_URL=http://your-server-ip:8000
```

### **Cách 2: Dùng Environment Variable**
```bash
# Windows (Command Prompt)
set NEXT_PUBLIC_BACKEND_URL=http://your-backend-url:port

# Windows (PowerShell)
$env:NEXT_PUBLIC_BACKEND_URL="http://your-backend-url:port"

# Mac/Linux
export NEXT_PUBLIC_BACKEND_URL=http://your-backend-url:port

# Sau đó chạy:
npm run dev
```

## 🔧 BACKEND CẦN CÓ

### **Required Endpoints**
1. **Health Check**: `GET /health`
2. **Chat Endpoint**: `POST /chat`

### **Expected Request Format**
```json
{
  "message": "Học Vovinam ở FPTU như thế nào?",
  "user_id": "firebase_uid_or_anonymous",
  "session_id": "web_chat_1234567890"
}
```

### **Expected Response Format**
```json
{
  "response": "🤖 Chào bạn! Về việc học Vovinam...",
  "user_id": "firebase_uid_or_anonymous",
  "session_id": "web_chat_1234567890",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## 🌐 CORS CONFIGURATION

### **Backend cần enable CORS cho frontend**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## 🧪 TESTING CONNECTION

### **1. Test Backend Health**
```bash
curl http://your-backend-url:port/health
```

### **2. Test Chat Endpoint**
```bash
curl -X POST http://your-backend-url:port/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Học Vovinam ở FPTU như thế nào?",
    "user_id": "test_user",
    "session_id": "test_session"
  }'
```

### **3. Test Frontend Connection**
1. Cấu hình `NEXT_PUBLIC_BACKEND_URL` trong `.env.local`
2. Restart frontend: `npm run dev`
3. Mở http://localhost:3000/assistant
4. Kiểm tra status bar: "Backend: Đã kết nối" 🟢

## 🎯 FRONTEND FEATURES

### **Connection Monitoring**
- ✅ Real-time connection status
- ✅ Response time tracking  
- ✅ Error handling
- ✅ Auto-retry on connection failure

### **Professional Chat UI**
- ✅ Modern chat bubbles with avatars
- ✅ User/AI message differentiation
- ✅ Timestamps for each message
- ✅ Loading states during AI processing
- ✅ Smooth animations and transitions

### **User Experience**
- ✅ Mobile responsive design
- ✅ Auto-scroll to latest messages
- ✅ Clear input button
- ✅ Suggested questions with categories
- ✅ Keyboard shortcuts (Enter to send)

## 🚀 DEPLOYMENT EXAMPLES

### **Local Development**
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### **Network Development**
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://192.168.1.100:8000
```

### **Production**
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=https://api.fptu-assistant.com
```

## 🐛 TROUBLESHOOTING

### **CORS Error**
```
Access to fetch at 'http://your-backend-url' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Fix**: Thêm frontend URL vào CORS allow_origins trong backend.

### **Connection Refused**
```
ERR_CONNECTION_REFUSED
```
**Fix**: Kiểm tra backend đang chạy và URL đúng.

### **Timeout**
```
ERR_CONNECTION_TIMED_OUT
```
**Fix**: Kiểm tra network và firewall settings.

## 📝 VÍ DỤ CẤU HÌNH

### **Ví dụ 1: Backend local**
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### **Ví dụ 2: Backend trên máy khác trong LAN**
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://192.168.1.50:8000
```

### **Ví dụ 3: Backend production**
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=https://fptu-ai-backend.herokuapp.com
```

### **Ví dụ 4: Backend với custom port**
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://your-domain.com:5000
```

**🚀 Chỉ cần cung cấp URL backend của bạn, frontend sẽ tự động kết nối!**

---
*Frontend: Next.js + TypeScript + Tailwind CSS*
*Backend Integration: REST API with CORS support*
