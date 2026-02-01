'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function MusicPage() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('discover')

  const sections = [
    {
      id: 'discover',
      title: 'Khám Phá Bản Thân - Lựa Chọn Nhạc Cụ Phù Hợp',
      icon: '🎸',
      content: `Giới thiệu các loại nhạc cụ phổ biến tại trường:

Các Nhạc Cụ Truyền Thống:
• Đàn Bầu - Độc đáo, mang đậm linh hồn Việt
• Đàn Tranh - Gọn nhẹ, thanh tao, có 16-36 dây
• Đàn Tỳ Bà - Phức tạp, đòi hỏi sự tỉ mỉ
• Sáo Trúc - Gọn nhẹ, lãng tử (phổ biến với các bạn nam)

Tư Vấn Chọn "Bạn Đồng Hành":
• Sáo Trúc: Thích hợp cho những ai thích tiếng lãng tử, dễ mang theo
• Đàn Tranh/Tỳ Bà: Phù hợp cho các bạn nữ yêu thích kỹ năng tinh tế
• Đàn Bầu: Cho những người muốn khám phá âm thanh độc đáo
• Nhạc cụ hiện đại: Guitar, keyboard cho phong cách thời đại

Câu Hỏi Đặt Ra:
• Bạn thích âm thanh nào? (Mềm, sắc, trầm, cao?)
• Có sẵn sàng luyện tập đều đặn? (ít nhất 15-30 phút/ngày)
• Bạn muốn hiểu biết sâu hay chỉ thích chơi casual?`
    },
    {
      id: 'practice',
      title: 'Lộ Trình Rèn Luyện - Xây Dựng Thói Quen',
      icon: '📚',
      content: `Bí Quyết Thành Công:

Xây Dựng Thói Quen:
• Luyện tập ít nhất 15-30 phút mỗi ngày
• Chọn một thời gian cố định để tập (sáng sớm hoặc tối)
• Bắt đầu từ những bài dễ, sau đó nâng cao dần
• Tìm một bạn cùng luyện tập để tạo động lực

Record & Review:
• Ghi âm lại lúc tập để tự nhận diện lỗi sai
• Nghe lại bài của mình và so sánh với bài chuẩn
• Thấy được sự tiến bộ qua từng tuần
• Xác định những phần cần cải thiện

Các Cấp Độ Tiến Bộ:
1. Biết nốt - Nhận biết âm thanh, cơ bản
2. Vào bài - Chơi được bài, nhưng chưa mượt
3. Biểu diễn - Chơi mượt, tự tin trước người khác

Tự Tin Tỏa Sáng:
• Đừng ngại giao lưu với những người cùng sở thích
• Trao đổi kinh nghiệm với các anh chị khóa trên
• Tham gia các buổi jam session
• Biểu diễn trong các sự kiện trường`
    },
    {
      id: 'shopping-guide',
      title: 'Địa Chỉ Mua Sắm & Shopping Guide',
      icon: '🛍️',
      content: `Những Địa Điểm Uy Tín:

Cửa Hàng Nhạc Cụ:
• Nhạc Cụ Hảo Vĩnh - 86 Hùng Vương, Đà Nẵng
  - Cơ sở lâu đời, uy tín cao
  - Bán các loại nhạc cụ truyền thống và hiện đại
  - Cung cấp dịch vụ bảo hành
  
• Các cửa hàng khác:
  - Cửa hàng nhạc trên Nguyễn Huệ
  - Thị trường nhạc cụ trực tuyến (Shopee, Lazada)

Lời Khuyên Trước Khi Mua:
• NÊN nhờ giảng viên tư vấn trước
• NÊN nhờ anh chị khóa trên xem xét chất lượng
• TRÁNH mua loại không phù hợp
• KIỂM TRA kỹ lưỡng trước khi thanh toán
• NÊN có bảo hành hoặc hoá đơn

Lựa Chọn Dựa Trên Ngân Sách:
• Nhạc cụ giá rẻ (300K-500K): Chất lượng cơ bản
• Nhạc cụ trung bình (500K-2M): Chất lượng tốt
• Nhạc cụ cao cấp (2M+): Cho những ai nghiêm túc
• Cho mượn từ CLB: Miễn phí hoặc giá rẻ

Bảo Trì & Bảo Dưỡng:
• Lau sạch sau mỗi lần chơi
• Để ở nơi khô ráo, tránh ẩm
• Kiểm tra định kỳ
• Sửa chữa tại những cơ sở uy tín`
    },
    {
      id: 'resources',
      title: 'Tài Nguyên & Nơi Học Tập',
      icon: '📱',
      content: `Video & Podcast:
• Video Podcast: "Học nhạc cụ dân tộc - Khó hay dễ?"
• Tutorial YouTube: Từng bước hướng dẫn
• Podcast: Chia sẻ từ các bạn đã học
• Buổi hội thảo trực tiếp

Những Đường Link Hữu Ích:
• [Nguồn học liệu bổ túc ngoài giờ]
• [Bản đồ đến tiệm Hảo Vĩnh]
• [Lịch hoạt động CLB âm nhạc]
• [Facebook Group: FPTU Music Lovers]

Các Câu Lạc Bộ Âm Nhạc:
• Guitar Club - Học từ cơ bản đến nâng cao
• Traditional Music Club - Chuyên về nhạc cụ dân tộc
• Vocal Club - Kỹ năng hát
• Band Club - Tạo thành nhóm nhạc
• DJ Club - Nhạc điện tử

Nơi Tập Luyện:
• Phòng CLB âm nhạc
• Sân khấu trường
• Phòng tập chung
• Mở cửa hàng ngày (sau giờ học)

Liên Hệ & Hỗ Trợ:
• Văn phòng CLB: [Địa chỉ]
• Email: club@fptu.edu.vn
• Facebook: FPTU Music Club
• Gặp trực tiếp tại các sự kiện recruit`
    },
    {
      id: 'inspiration',
      title: 'Sự Kiện & Cơ Hội Biểu Diễn',
      icon: '🎤',
      content: `Những Sự Kiện Định Kỳ:

Sự kiện trong năm:
• Các buổi Open Mic - Diễn ra hàng tuần
• Talent Show - Cơ hội trưng bày tài năng
• Music Festival - Lớn nhất năm
• Fundraising Concert - Đội từ thiện
• Graduation Gala - Biệt vụ sinh viên K

Cơ Hội Biểu Diễn:
• Biểu diễn trong lễ khai giảng/bế giảng
• Tham gia các buổi nhạc hòa nhạc
• Perform tại các sự kiện sinh viên
• Tham gia chương trình trực tuyến
• Lưu lại các video để xây dựng portfolio

Hưởng Lợi Từ Biểu Diễn:
• Tăng tự tin
• Mở rộng mạng lưới bạn bè
• Có thêm kỹ năng sân khấu
• Khả năng bất ngờ được mời perform ngoài
• Có kinh nghiệm quý báu`
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
          <span className="text-5xl">🎵</span>
          <h1 className="text-4xl sm:text-5xl font-bold">Nhạc Cụ Dân Tộc - Thanh Âm Truyền Thống</h1>
          <p className="text-lg text-muted-foreground">
            Khám phá hành trình học nhạc cụ truyền thống Việt Nam tại FPTU Đà Nẵng
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

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-accent/5 to-primary/5 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Sẵn Sàng Bắt Đầu?</h2>
          <p className="text-muted-foreground">
            Hãy tham gia một CLB âm nhạc hoặc liên hệ để biết thêm thông tin chi tiết!
          </p>
          <Link href="/assistant">
            <Button className="gap-2">
              Hỏi AI Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
