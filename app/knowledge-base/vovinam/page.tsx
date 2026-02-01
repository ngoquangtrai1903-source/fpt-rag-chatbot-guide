'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function VovinamPage() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('basics')

  const sections = [
    {
      id: 'martial-way',
      title: 'Võ Đạo & Thể Chất - Hành Trình Rèn Luyện Nhân Lễ Nghĩa Trí Tín',
      icon: '🥋',
      content: `Vovinam không chỉ là môn học bắt buộc, mà còn là hành trình rèn luyện Nhân - Lễ - Nghĩa - Trí - Tín.

Các kỹ năng từ cơ bản đến nâng cao:
• Căn bản: Đấm, đá, gạt (nền tảng cho mọi kỹ năng)
• Nâng cao: Đòn chân tấn công và kỹ thuật phức tạp
• Bài quyền: Hệ thống động tác liên tiếp

5 Nguyên tắc Vovinam:
1. Nhân (Humanity) - Lòng nhân ái
2. Lễ (Courtesy) - Tôn trọng, lễ phép
3. Nghĩa (Justice) - Sự công bằng
4. Trí (Wisdom) - Tri thức, hiểu biết
5. Tín (Loyalty/Faith) - Sự trung thành, tin tưởng

Lợi ích:
• Phát triển sức mạnh và sự dẻo dai
• Nâng cao kỹ năng tự vệ
• Rèn luyện ý chí quyết tâm
• Xây dựng kỷ luật cá nhân`
    },
    {
      id: 'ranking-system',
      title: 'Hệ Thống Thi Cử Và Đai',
      icon: '🏅',
      content: `Hệ thống thi lên đai tại FPTU:

Các cấp độ đai:
• Đai trắng: Mới vào
• Đai vàng: Nắm vững kỹ thuật cơ bản
• Đai cam: Nền tảng trung cấp
• Đai xanh: Kỹ năng phát triển
• Đai xanh đậm: Gần như thành thạo
• Đai nâu: Sinh viên chuyên sâu
• Đai đen: Huấn luyện viên

Cách tính điểm:
• Chuyên cần (30%): Có mặt đầy đủ, tích cực
• Kỹ thuật (40%): Thực hiện chính xác các động tác
• Thể chất (20%): Sức mạnh, sự dẻo dai
• Thái độ (10%): Tinh thần, tôn trọng

Kỳ thi:
Thường diễn ra 1-2 tháng/lần
Gồm: Thực hành kỹ thuật, kiểm tra thể lực, đấu tự do`
    },
    {
      id: 'tips-from-seniors',
      title: 'Bí Kíp "Vượt Ải" - Tips Từ Tiền Bối',
      icon: '⭐',
      content: `Thái độ quyết định điểm số:
• Đừng học đối phó - Hãy học để trở thành tốt hơn
• Giáo viên sẽ nhận ra sự nỗ lực và tâm huyết của bạn
• Tham gia tích cực trong từng buổi tập

Nền tảng từ Tấn:
• Chú trọng từ đòn thế cơ bản nhất (Tấn)
• Nó sẽ giúp bạn có nền tảng vững chắc
• Các bài quyền phức tạp sẽ dễ dàng hơn
• Đừng vội vàng, hãy chắc chắn từng bước

Trang Phục & Quy Tắc:
• Luôn giữ võ phục sạch sẽ
• Thắt đai đúng cách trước khi vào thảm
• Tôn trọng thảm tập bằng cách để giầy dép ngoài
• Chào giáo viên và bạn khi vào/ra lớp

Luyện Tập Ngoài Giờ:
• 15-30 phút mỗi ngày sẽ tạo nên sự khác biệt
• Thực hành với bạn cùng lớp
• Ghi âm lại bài tập để kiểm tra lỗi
• Duy trì thể lực tốt`
    },
    {
      id: 'community',
      title: 'Kết Nối Cộng Đồng - FPT Vovinam Club',
      icon: '👥',
      content: `Những sự kiện không thể bỏ qua:

FPT Vovinam Club:
• Nơi giao lưu của những người yêu võ
• Tập thêm ngoài giờ với những bạn cùng sở thích
• Tham gia các sự kiện "Võ nhạc"
• Biểu diễn Vovinam Dance trong các lễ hội

Lợi ích của tham gia CLB:
• Kết nối với các anh chị khóa trên
• Được "cầm tay chỉ việc" từ những người giỏi
• Cơ hội biểu diễn và thi đấu
• Xây dựng tình bạn vượt thời gian

Cách Đăng Ký:
• Liên hệ phòng phục vụ sinh viên
• Tham gia các sự kiện giới thiệu CLB
• Hoặc đến tập luyện trực tiếp tại phòng tập

Sự kiện định kỳ:
• Hội thi Vovinam hàng kỳ
• Biểu diễn võ nhạc vào các dịp lễ
• Đấu tập giữa các lớp
• Chuyến du lịch tập thể`
    },
    {
      id: 'resources',
      title: 'Tài Nguyên & Liên Hệ',
      icon: '📚',
      content: `Video & Tài Liệu Hữu Ích:
• Video Podcast: "Vovinam FPTU và những kỷ niệm dở khóc dở cười"
• Hướng dẫn thắt đai võ đúng cách
• Các kỹ thuật cơ bản (từng bước)
• Lịch sử và triết lý Vovinam

Các Đường Link Hữu Ích:
• [Đăng ký CLB Vovinam FPTU]
• [Video hướng dẫn thắt đai võ]
• [Lịch tập luyện hàng tuần]
• [Liên hệ HLV Vovinam]

Phòng Tập & Trang Thiết Bị:
• Địa điểm: Khu thể thao FPTU, tầng 2
• Mở cửa: 6:30 AM - 8:00 PM hàng ngày
• Trang bị: Thảm tập, gương, tạ, thiết bị stretching
• Cầu hình: Tùy theo buổi tập

Liên Hệ Hỗ Trợ:
• Phòng Giáo Dục Thể Chất
• Email: pe@fptu.edu.vn
• Điện thoại: [số điện thoại phòng PE]
• Văn phòng: Tòa nhà Thể thao`
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/knowledge-base" className="text-primary hover:underline flex items-center gap-2 text-sm">
            ← Back to Knowledge Base
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-4">
          <span className="text-5xl">🥋</span>
          <h1 className="text-4xl sm:text-5xl font-bold">Vovinam Training Guide</h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about vovinam training at FPTU, from basics to advanced techniques.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-border rounded-lg bg-card overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSection === section.id && (
                <div className="px-6 pb-6 pt-0 border-t border-border whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-card/50 border-y border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1938</div>
              <p className="text-sm text-muted-foreground">Year Founded</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">180+</div>
              <p className="text-sm text-muted-foreground">Countries Worldwide</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <p className="text-sm text-muted-foreground">Belt Levels</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">∞</div>
              <p className="text-sm text-muted-foreground">Room to Grow</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Start Training?</h2>
          <p className="text-muted-foreground">
            Your first session is just around the corner. Talk to your PE instructor for more details!
          </p>
          <Link href="/assistant">
            <Button className="gap-2">
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
