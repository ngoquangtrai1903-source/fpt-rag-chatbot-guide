from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import json
import logging
from datetime import datetime

# Import logic từ chat_test.py của bạn
# from chat_test import hoi_chatbot_ai

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="FPTU AI Assistant Backend",
    description="Backend API cho FPTU AI Chatbot",
    version="1.0.0"
)

# CORS middleware - QUAN TRỌNG: Cho phép frontend kết nối
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js frontend
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Request models
class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = "anonymous"
    session_id: Optional[str] = ""

class ChatResponse(BaseModel):
    response: str
    user_id: str
    session_id: str
    timestamp: str
    processing_time: Optional[float] = None

# Mock data tạm thời (giống logic trong chat_test.py)
SEARCH_KEYS_MENU = {
    "V1": "thi tiếng anh đầu vào, xếp lớp, ielts 6.0, miễn học dự bị, cấu trúc đề thi, writing skill",
    "V2": "lộ trình luk global, hurricane, greenfire, heatwave, thunderbolt, debate, thuyết trình",
    "V3": "summit 1 summit 2, top notch, progress test pt, assignment môn ent, thi seb eos",
    "V4": "mẹo pass môn tiếng anh, cách dùng edunext fap, kiểm tra điểm danh, writing speaking assignment",
    "V5": "học nhạc cụ dân tộc, đàn bầu, đàn tranh, sáo trúc, địa chỉ mua nhạc cụ hảo vĩnh đà nẵng",
    "V6": "học vovinam fpt, clb vovinam vvc, thi lên đai, võ nhạc, giải khơi nguồn võ việt",
    "V7": "kinh nghiệm đi quân sự, đồ dùng tân binh, lót giày, phấn rôm, gấp chăn bánh chưng, nội vụ",
    "V8": "review campus fpt đà nẵng, tòa nhà alpha gamma, thư viện, fpt city ngũ hành sơn",
    "V9": "so sánh ký túc xá và trọ, ưu nhược điểm ktx fpt, an ninh nội trú, chi phí ở trọ",
    "V10": "cẩm nang thuê trọ đà nẵng, lừa đảo tiền cọc, hợp đồng thuê nhà, tìm bạn ở ghép",
    "V11": "quán ăn ngon fpt đà nẵng, cafe học bài, zone six 24/7, cơm gà xả xệ, bún đậu 1996",
    "V12": "link fap flm, tải phần mềm thi seb eos, lỗi kỹ thuật, checkout e360, cài đặt phần mềm",
    "V13": "quản lý thời gian, thói quen ngủ, xem trước bài, check attendance fap, kỹ năng tự học"
}

def simple_keyword_router(message: str) -> str:
    """Simple keyword routing (giống logic trong chat_test.py)"""
    message_lower = message.lower()
    
    if any(keyword in message_lower for keyword in ['vovinam', 'vvc', 'thi lên đai', 'võ']):
        return "V6"
    elif any(keyword in message_lower for keyword in ['đàn bầu', 'đàn tranh', 'sáo trúc', 'nhạc cụ', 'hảo vĩnh']):
        return "V5"
    elif any(keyword in message_lower for keyword in ['quân sự', 'tân binh', 'đi quân sự', 'nội vụ']):
        return "V7"
    elif any(keyword in message_lower for keyword in ['ktx', 'ký túc xá', 'ở trọ', 'thuê trọ']):
        return "V9"
    elif any(keyword in message_lower for keyword in ['ielts', 'tiếng anh', 'writing', 'speaking']):
        return "V1"
    elif any(keyword in message_lower for keyword in ['quán ăn', 'ăn ngon', 'zone six', 'cơm gà']):
        return "V11"
    elif any(keyword in message_lower for keyword in ['luk', 'hurricane', 'debate', 'thuyết trình']):
        return "V2"
    elif any(keyword in message_lower for keyword in ['summit', 'top notch', 'progress test']):
        return "V3"
    elif any(keyword in message_lower for keyword in ['campus', 'alpha', 'gamma', 'thư viện']):
        return "V8"
    elif any(keyword in message_lower for keyword in ['fap', 'flm', 'seb', 'eos']):
        return "V12"
    elif any(keyword in message_lower for keyword in ['quản lý thời gian', 'thói quen', 'check attendance']):
        return "V13"
    else:
        return "unknown"

def get_mock_response(key: str, message: str) -> str:
    """Mock response data (giống handbook data trong chat_test.py)"""
    responses = {
        "V1": "🎓 Chào bạn! Về IELTS 6.0 tại FPTU: Đây là điều kiện để miễn học dự bị tiếng Anh. Đề thi gồm 4 kỹ năng Listening, Reading, Writing, Speaking. Bạn nên luyện tập Writing skill và tham gia các lớp bổ trợ. Chúc bạn đạt điểm cao nhé! 📚",
        "V2": "🚀 Chào bạn! Lộ trình LUK Global gồm các cấp độ Hurricane, Greenfire, Heatwave, Thunderbolt. Mỗi cấp độ tập trung vào kỹ năng khác nhau: debate, thuyết trình, kỹ năng mềm. Bạn đang ở level nào rồi? Hãy chia sẻ để mình tư vấn cụ thể hơn! 💪",
        "V3": "📖 Chào bạn! Summit 1 và Summit 2 là giáo trình tiếng Anh chính. Progress Test (PT) diễn ra hàng tháng. Assignment môn ENT cần nộp đúng hạn qua Edunext. Bạn có khó khăn với môn nào cụ thể không? 🤔",
        "V4": "💡 Chào bạn! Để pass môn tiếng Anh, cần tham gia lớp đầy đủ, làm bài tập đầy đủ. Sử dụng Edunext FAP để kiểm tra điểm danh. Writing và Speaking assignment rất quan trọng. Mình có thể chia sẻ thêm tips nếu bạn cần! ✍️",
        "V5": "🎵 Chào bạn! Học nhạc cụ dân tộc tại FPTU: đàn bầu, đàn tranh, sáo trúc. Địa chỉ mua nhạc cụ: Hảo Vĩnh ở Đà Nẵng. CLB nhạc cụ hoạt động vào cuối tuần. Bạn muốn học loại đàn nào? 🎶",
        "V6": "🥋 Chào bạn! Vovinam FPT: CLB VVC hoạt động sôi nổi. Thi lên đai diễn ra mỗi học kỳ. Võ nhạc là phần quan trọng trong các giải đấu. Giải khơi nguồn võ Việt thường niên. Bạn đã có đai chưa? 🏆",
        "V7": "⚔️ Chào bạn! Kinh nghiệm đi quân sự: chuẩn bị đồ dùng tân binh (lót giày, phấn rôm), học gấp chăn bánh chưng, nắm vững nội vụ. Cần thể lực tốt và kỷ luật. Bạn sắp đi quân sự à? 🎖️",
        "V8": "🏫 Chào bạn! Campus FPT Đà Nẵng: tòa nhà Alpha, Gamma. Thư viện hiện đại với nhiều tài liệu. FPT City Ngũ Hành Sơn là khu đô thị hiện đại gần trường. Bạn muốn tìm hiểu thêm về khu vực nào? 🗺️",
        "V9": "🏠 Chào bạn! KTX FPT có ưu điểm an ninh tốt, tiện ích đầy đủ. Trọ bên ngoài tự do hơn nhưng chi phí cao hơn. Cần cân nhắc về khoảng cách và an toàn. Bạn đang ở KTX hay tìm trọ? 🏘️",
        "V10": "🔑 Chào bạn! Cẩm nang thuê trọ Đà Nẵng: cảnh giác lừa đảo tiền cọc, đọc kỹ hợp đồng. Tìm bạn ở ghép qua các group sinh viên. Kiểm tra kỹ nhà trước khi thuê. Cần mình giúp tìm phòng trọ không? 🏠",
        "V11": "🍜 Chào bạn! Quán ăn ngon FPT Đà Nẵng: Zone Six 24/7, cơm gà xả xệ, bún đậu 1996. Nhiều cafe học bài yên tĩnh gần trường. Bạn thích ăn món gì nhất? 🍽️",
        "V12": "💻 Chào bạn! FAP FLM là hệ thống learning management. Tải phần mềm thi SEB/EOS từ trang chính thức. Lỗi kỹ thuật liên hệ IT helpdesk. Bạn đang gặp lỗi gì cụ thể? 🔧",
        "V13": "⏰ Chào bạn! Quản lý thời gian: lập lịch học, thói quen ngủ đủ 7-8 tiếng. Xem trước bài giúp hiểu sâu hơn. Check attendance FAP thường xuyên. Bạn muốn mình chia sẻ kỹ năng cụ thể nào? 📅"
    }
    
    if key in responses:
        return responses[key]
    else:
        return f"🤖 Chào bạn! Câu hỏi của bạn rất thú vị: '{message}'. Tuy nhiên, mình chưa có thông tin chi tiết về chủ đề này. Bạn có thể hỏi về Vovinam, nhạc cụ, quân sự, KTX, tiếng Anh, hoặc các chủ đề khác về FPTU nhé! 🎓"

@app.get("/")
async def root():
    return {
        "message": "FPTU AI Assistant Backend",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "chat": "/chat",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint cho frontend"""
    return {
        "status": "healthy",
        "service": "FPTU AI Assistant Backend",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint - tích hợp với logic từ chat_test.py"""
    start_time = datetime.now()
    
    try:
        logger.info(f"Received message from user {request.user_id}: {request.message}")
        
        # TODO: Integrate với logic thật từ chat_test.py
        # response = hoi_chatbot_ai(request.message)
        
        # Tạm thời dùng simple routing
        routing_key = simple_keyword_router(request.message)
        logger.info(f"Routed to: {routing_key}")
        
        ai_response = get_mock_response(routing_key, request.message)
        
        # Calculate processing time
        end_time = datetime.now()
        processing_time = (end_time - start_time).total_seconds() * 1000  # in milliseconds
        
        logger.info(f"Response generated in {processing_time:.2f}ms")
        
        return ChatResponse(
            response=ai_response,
            user_id=request.user_id,
            session_id=request.session_id,
            timestamp=end_time.isoformat(),
            processing_time=processing_time
        )
        
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/stats")
async def get_stats():
    """Get API statistics"""
    return {
        "service": "FPTU AI Assistant Backend",
        "uptime": "Running",
        "endpoints": len(app.routes),
        "cors_enabled": True,
        "supported_origins": ["http://localhost:3000"]
    }

if __name__ == "__main__":
    import uvicorn
    
    # Chạy server với port từ environment variable hoặc default 8000
    import os
    port = int(os.environ.get("PORT", 8000))
    
    print(f"🚀 Starting FPTU AI Assistant Backend on port {port}")
    print(f"📖 API Documentation: http://localhost:{port}/docs")
    print(f"🔗 Frontend should connect to: http://localhost:{port}")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
