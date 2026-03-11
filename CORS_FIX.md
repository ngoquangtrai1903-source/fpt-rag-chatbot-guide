# 🔧 CORS FIX cho backend của bạn

## Thêm vào backend file:

```python
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

# Đặt middleware TRƯỚC khi định nghĩa routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "*"  # Debug mode
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Hoặc thêm headers trực tiếp vào streaming endpoint:
@app.post("/chat/stream")
async def chat_stream_endpoint(req: ChatRequest):
    async def generate():
        try:
            # ... existing code ...
            for chunk in stream:
                # ... existing code ...
                yield f"data: {json.dumps({'type': 'chunk', 'text': text}, ensure_ascii=False)}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'text': str(e)}, ensure_ascii=False)}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            # ✅ THÊM CORS HEADERS
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    )
```

## Test CORS fix:

```bash
# Test với curl có headers
curl -X POST http://localhost:10000/chat/stream \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"message":"test","history":[]}'
```

## Nếu vẫn lỗi, thêm OPTIONS endpoint:

```python
@app.options("/chat/stream")
async def chat_stream_options():
    return Response(
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    )
```
