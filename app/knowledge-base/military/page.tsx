'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function MilitaryPage() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('overview')

  const sections = [
    {
      id: 'overview',
      title: 'Tổng Quan - Kỳ Quân Sự 28 Ngày',
      icon: '💂',
      content: `Kỳ quân sự là "đặc sản" tạo nên kỷ niệm rực rỡ nhất thời sinh viên FPTU.

Mục Tiêu & Ý Nghĩa:
• Rèn luyện kỷ luật, tác phong quân đội
• Xây dựng tinh thần đồng đội & kỹ năng sinh tồn
• Điều kiện bắt buộc để xét tốt nghiệp

Thời Gian & Địa Điểm:
• Thời lượng: 28 ngày tập trung (4 tuần liên tục)
• Địa điểm: Khu quân sự tập trung (Hòa Lạc hoặc khu liên kết)
• Thời gian: Thường vào tháng 5-6 hoặc 9-10

Điểm Số Dựa Trên:
• Chuyên cần (30%): Có mặt đầy đủ, tích cực
• Nội vụ (40%): Gấp chăn, giữ gìn quân phục
• Ý thức kỷ luật (30%): Tuân thủ quy định, tinh thần`
    },
    {
      id: 'packing',
      title: 'Hành Lý - Những Vật Dụng "Cứu Cánh"',
      icon: '🎒',
      content: `Nguyên tắc: Tối giản hành lý – Tối đa tiện ích

Vật Dụng Cần Thiết:
• Miếng lót giày/Băng vệ sinh: Chống đau chân khi hành quân
• Phấn rôm: Giữ chân khô thoáng, tránh nấm da
• Kem chống nắng (SPF 50+): Bảo vệ da dưới nắng thao trường

Năng Lượng & Kết Nối:
• Ổ cắm nối dài: Giải quyết tình trạng thiếu ổ điện
• Sạc dự phòng: Phòng khi mất điện hoặc đi hành quân xa
• Sim 4G: WiFi rất yếu hoặc không có

Đồ Cá Nhân:
• Móc áo (10+ cái), bột giặt, quạt mini, tiền lẻ
• Giày thể thao bền, tất/vớ đủ dùng 1 tuần
• Khăn tắm, dụng cụ vệ sinh cá nhân`
    },
    {
      id: 'drills',
      title: 'Những Ngày Đầu - Nhanh, Gọn, Kỷ Luật',
      icon: '⚡',
      content: `24h đầu thường căng thẳng nhất. Chìa khóa: Nhanh - Gọn - Kỷ Luật

Phản Xạ Quân Trường:
• Tập trung đúng giờ: Nghe tiếng còi là có mặt, không chần chừ
• Nhà tắm tập thể: Chuẩn bị đồ sẵn, tắm nhanh (5-7 phút)
• Luôn mặc đúng quân phục khi có hiệu lệnh

Những Bài Học:
• Quy định được áp dụng cho tất cả, không ngoại lệ
• Tôn trọng giờ giấc là tôn trọng bản thân
• Tương trợ đồng đội là thắng trong mỗi ngày
• Tinh thần đồng đội tạo nên sức mạnh

Thích Nghi Nhanh:
• Những ngày đầu khó nhất, sau đó sẽ quen dần
• Xây dựng thói quen sớm, mọi thứ sẽ dễ hơn
• Tìm bạn tốt để cùng vượt qua thử thách`
    },
    {
      id: 'uniforms',
      title: 'Nội Vụ - Gấp Chăn "Bánh Chưng"',
      icon: '📐',
      content: `Gấp chăn là thử thách lớn nhất nhưng cũng thú vị nhất!

Mẹo Gấp Vuông:
• Sử dụng thước kẻ hoặc thẻ ATM để vuốt nếp, tạo góc cạnh sắc nét
• "Kỹ nghệ" giữ chăn: Mang theo chăn cá nhân mỏng để đắp
• Giữ nguyên chiếc chăn quân đội đã gấp đẹp suốt 28 ngày

Giữ Gìn Quân Phục:
• Luôn treo đồ gọn gàng theo số thứ tự
• Giày dép để đúng nơi quy định, mũi giày hướng ra ngoài
• Kiểm tra uniform hàng ngày trước giờ công bố

Quy Tắc Nội Vụ:
• Thảm tập luôn sạch sẽ
• Giường tủ ngăn nắp, không guốn
• Phòng ở mát mẻ, thoáng khí
• Cùng nhau duy trì vệ sinh chung`
    },
    {
      id: 'rules',
      title: 'Quy Định & Kỷ Luật',
      icon: '✅',
      content: `Kỷ luật là sức mạnh của quân đội. Đừng bị trừ điểm vì lỗi nhỏ!

Điều Cấm Kỵ:
• Tuyệt đối không mang trang sức, đồ có giá trị cao
• Không sử dụng mỹ phẩm quá đà, cầu kỳ
• Tránh hành lý cồng kềnh

Nên Làm:
• Tuân thủ tuyệt đối giờ giấc (giờ thức dậy, tắt đèn)
• Giữ gìn vệ sinh chung của tiểu đội/trung đội
• Tương trợ đồng đội khi gặp khó khăn
• Lắng nghe, tuân lệnh, không phàn nàn

Để Ý:
• Đúng giờ = Có mặt đầy đủ (không muộn 1 phút)
• Sắp hàng = Kỷ luật nhân viên
• Thái độ = Rèn luyện nhân cách
• Đồng đội = Xây dựng kỷ niệm`
    },
    {
      id: 'tips',
      title: 'Bí Kíp Rực Rỡ - Từ Tiền Bối',
      icon: '✨',
      content: `Hãy tận hưởng 28 ngày này như một chuyến trải nghiệm thực tế!

Tâm Thế:
• Coi mệt mỏi là thử thách để trưởng thành
• Khi khó khăn nhất chính là lúc qua đơi cạnh tranh
• Câu chuyện hôm nay sẽ là ký ức đẹp nhất sau này

Kết Nối:
• Đây là dịp tốt nhất để kết bạn với những người khác ngành
• Xây dựng mối quan hệ qua những thử thách chung
• Những người bên cạnh giờ sẽ là bạn suốt đại học

Ghi Dấu:
• Đừng quên chụp những bức ảnh "xịn" nhất trong màu áo lính
• Viết nhật ký ghi lại những khoảnh khắc ý nghĩa
• Lưu lại những bài học & tình cảm tiền bối

Lời Cuối Cùng:
"Tháng năm rực rỡ (và nắng) sẽ trở thành câu chuyện thú vị nhất khi kể lại sau này!"
Nhiều bạn nói rằng 28 ngày này là một trong những kỷ niệm đẹp nhất của thời sinh viên.`
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
          <span className="text-5xl">💂</span>
          <h1 className="text-4xl sm:text-5xl font-bold">Kỳ Quân Sự 28 Ngày</h1>
          <p className="text-lg text-muted-foreground">
            Hành trình rèn luyện kỷ luật, xây dựng tinh thần đồng đội và tạo kỷ niệm rực rỡ nhất thời sinh viên.
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

      {/* Key Facts */}
      <section className="bg-card/50 border-y border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Những Thông Tin Quan Trọng</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">28 Ngày</div>
              <p className="text-sm text-muted-foreground">Thời Lượng</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Bắt Buộc</div>
              <p className="text-sm text-muted-foreground">Loại Khóa Học</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3 Tiêu Chí</div>
              <p className="text-sm text-muted-foreground">Chuyên Cần, Nội Vụ, Kỷ Luật</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Kỷ Niệm</div>
              <p className="text-sm text-muted-foreground">Giá Trị Thực Sự</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Vẫn Còn Thắc Mắc?</h2>
          <p className="text-muted-foreground">
            Hỏi FPTU Assistant để nhận lời khuyên từ những tiền bối & cựu SV đã trải qua.
          </p>
          <Link href="/assistant">
            <Button className="gap-2">
              Chat với FPTU Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
