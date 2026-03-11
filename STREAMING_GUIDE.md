# 🚀 FPTU AI Assistant - Streaming Chat Guide

## 📖 Overview

Giao diện streaming chat cho phép hiển thị phản hồi của AI từ từ, tạo trải nghiệm trò chuyện tự nhiên hơn.

## ✨ Features

### 🔄 Streaming Response
- **Real-time typing**: Text hiển thị từ từ như đang gõ
- **Typing indicator**: Hiệu ứng con trỏ nhấp nháy khi đang streaming
- **Smooth animations**: Fade-in effects cho messages
- **Auto-scroll**: Tự động cuộn xuống khi có tin nhắn mới

### 🎨 Visual Effects
- **Typing cursor**: `|` nhấp nháy khi AI đang "viết"
- **Loading states**: Spinner và "Đang viết..." status
- **Message animations**: Fade-in cho mỗi tin nhắn
- **Status indicators**: Clock icon với timestamp

## 🔧 Technical Implementation

### Frontend (React/Next.js)

#### Streaming Logic
```typescript
const sendStreamingMessage = async (messageText: string, backendUrl: string) => {
  // Create initial empty message
  const assistantMessageId = (Date.now() + 1).toString()
  const initialMessage: Message = {
    id: assistantMessageId,
    role: 'assistant',
    content: '',
    timestamp: new Date(),
    isStreaming: true
  }
  
  setMessages(prev => [...prev, initialMessage])

  const response = await fetch(`${backendUrl}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: messageText, user_id, session_id }),
  });

  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  let accumulatedText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    const chunk = decoder.decode(value, { stream: true })
    const lines = chunk.split("\n").filter(line => line.trim())
    
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue
      
      const payload = JSON.parse(line.slice(6))
      
      if (payload.type === "chunk") {
        accumulatedText += payload.text || ''
        // Update message with new text
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: accumulatedText, isStreaming: true }
            : msg
        ))
      } else if (payload.type === "done") {
        // Mark streaming as complete
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, isStreaming: false }
            : msg
        ))
      }
    }
  }
}
```

#### UI Components
```tsx
// Message with streaming support
<div className={`message ${message.isStreaming ? 'streaming' : ''}`}>
  <div className="text-content">
    {message.content}
    {message.isStreaming && (
      <span className="typing-cursor">|</span>
    )}
  </div>
  <div className="timestamp">
    {message.isStreaming ? (
      <>
        <Loader2 size={10} className="animate-spin" />
        <span>Đang viết...</span>
      </>
    ) : (
      <>
        <Clock size={10} />
        <span>{timestamp}</span>
      </>
    )}
  </div>
</div>
```

#### CSS Animations
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes typing {
  0%, 60%, 100% { opacity: 1; }
  30% { opacity: 0.3; }
}

.typing-cursor {
  animation: typing 1.5s infinite;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
```

### Backend (FastAPI/Python)

#### Streaming Endpoint
```python
@app.post("/chat/stream")
async def chat_stream_endpoint(request: ChatRequest):
    async def generate_stream():
        try:
            # Get response
            full_response = get_ai_response(request.message)
            
            # Stream word by word
            words = full_response.split()
            for word in words:
                chunk_data = {
                    "type": "chunk",
                    "text": word + " "
                }
                yield f"data: {json.dumps(chunk_data)}\n\n"
                await asyncio.sleep(0.05)  # Typing delay
            
            # Send completion signal
            done_data = {"type": "done"}
            yield f"data: {json.dumps(done_data)}\n\n"
            
        except Exception as e:
            error_data = {"type": "error", "text": str(e)}
            yield f"data: {json.dumps(error_data)}\n\n"
    
    return StreamingResponse(
        generate_stream(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
        }
    )
```

## 🎯 User Experience

### Flow
1. **User sends message** → Message appears immediately
2. **AI starts "typing"** → Empty message bubble with loading indicator
3. **Text streams in** → Words appear one by one with typing cursor
4. **Completion** → Cursor disappears, timestamp appears

### Fallback
- If streaming fails, automatically falls back to regular `/chat` endpoint
- Mock responses available when backend is offline
- Graceful error handling with user-friendly messages

## 🔧 Configuration

### Environment Variables
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
PORT=8000
```

### Dependencies
```bash
# Frontend
npm install lucide-react

# Backend
pip install fastapi uvicorn python-multipart
```

## 🚀 Getting Started

1. **Start Backend**:
   ```bash
   python backend_main.py
   ```

2. **Start Frontend**:
   ```bash
   npm run dev
   ```

3. **Test Streaming**:
   - Open browser to `http://localhost:3000/assistant`
   - Send any message about FPTU topics
   - Watch the streaming response!

## 🎨 Customization

### Typing Speed
Change the delay in backend:
```python
await asyncio.sleep(0.05)  # 50ms per word
```

### Animation Speed
Update CSS animation duration:
```css
.typing-cursor {
  animation: typing 1.5s infinite;  /* Change 1.5s */
}
```

### Message Styling
Modify the message component classes for different visual effects.

## 🐛 Troubleshooting

### Streaming Not Working
1. Check backend is running on correct port
2. Verify CORS settings
3. Check browser console for errors
4. Ensure `/chat/stream` endpoint exists

### Performance Issues
1. Reduce typing delay for faster streaming
2. Implement chunking for long responses
3. Add connection timeout handling

### Mobile Issues
1. Test on mobile devices
2. Ensure responsive design
3. Check touch interactions

## 📱 Mobile Support

Streaming chat is fully responsive and works on:
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Tablet devices
- ✅ Progressive Web Apps

## 🔮 Future Enhancements

- [ ] Voice input/output support
- [ ] Message reactions
- [ ] File attachments
- [ ] Multi-language support
- [ ] Conversation history
- [ ] Custom typing speeds
- [ ] Rich text formatting
