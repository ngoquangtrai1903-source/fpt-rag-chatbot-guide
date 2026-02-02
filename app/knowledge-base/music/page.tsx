'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Music, Mic2, Guitar, Piano, Users, Check, MapPin, Sparkles, ExternalLink, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MusicPage() {
  const [checklist, setChecklist] = React.useState<Record<string, boolean>>({})

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Dùng đúng nội dung bạn đã cung cấp, chỉ đổi cách trình bày
  const instrumentText = `Giới thiệu các loại nhạc cụ phổ biến tại trường:

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

  const practiceText = `Bí Quyết Thành Công:

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

  const shoppingText = `Những Địa Điểm Uy Tín:

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

  const resourcesText = `Video & Podcast:
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

  const eventsText = `Những Sự Kiện Định Kỳ:

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

  const practiceChecklist = [
    { id: 'daily', label: 'Luyện tập ít nhất 15-30 phút mỗi ngày', icon: Sparkles },
    { id: 'schedule', label: 'Chọn một thời gian cố định để tập', icon: Music },
    { id: 'record', label: 'Ghi âm để tự nhận diện lỗi và tiến bộ', icon: Mic2 },
    { id: 'buddy', label: 'Tìm bạn cùng luyện tập để tạo động lực', icon: Users },
  ]

  const checkedCount = Object.values(checklist).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Music size={18} />
            Nhạc cụ & CLB âm nhạc
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Nhạc Cụ Dân Tộc - Thanh Âm Truyền Thống</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Khám phá hành trình học nhạc cụ truyền thống Việt Nam tại FPTU Đà Nẵng.
          </p>
        </div>
      </section>

      {/* Khám phá bản thân + Lộ trình luyện tập */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border-2 border-primary/30 bg-card p-6 space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Guitar size={20} />
              Khám phá bản thân - Lựa chọn nhạc cụ
            </h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{instrumentText}</p>
          </div>
          <div className="rounded-xl border-2 border-accent/30 bg-card p-6 space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles size={20} />
              Lộ trình rèn luyện - Xây dựng thói quen
            </h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{practiceText}</p>
          </div>
        </div>
      </section>

      {/* Checklist luyện tập */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">📋</span>
                Checklist luyện tập
              </h2>
              <p className="text-muted-foreground mt-1">Giữ nhịp luyện tập đều đặn để tiến bộ rõ rệt.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{checkedCount}/4</span>
              <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(checkedCount / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {practiceChecklist.map((item) => (
              <label
                key={item.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/50',
                  checklist[item.id] ? 'border-primary bg-primary/5' : 'border-border'
                )}
              >
                <input
                  type="checkbox"
                  checked={checklist[item.id] || false}
                  onChange={() => toggleChecklist(item.id)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                    checklist[item.id] ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'
                  )}
                >
                  {checklist[item.id] && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="flex items-center gap-2">
                  <item.icon size={18} className="text-muted-foreground shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Địa chỉ mua sắm + Tài nguyên */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border-2 border-primary/30 bg-card p-6 space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MapPin size={20} />
              Địa chỉ mua sắm & Shopping guide
            </h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{shoppingText}</p>
          </div>
          <div className="rounded-xl border-2 border-accent/30 bg-card p-6 space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen size={20} />
              Tài nguyên & nơi học tập
            </h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{resourcesText}</p>
          </div>
        </div>
      </section>

      {/* Sự kiện & fanpage âm nhạc */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Mic2 size={20} />
              Sự kiện & cơ hội biểu diễn
            </h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{eventsText}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="https://www.facebook.com/share/16rc5CxUB9/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-background p-4 hover:border-primary/50 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">Fanpage hoạt động âm nhạc</p>
                  <p className="text-xs text-muted-foreground">facebook.com</p>
                </div>
                <ExternalLink size={16} className="text-primary shrink-0" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Thông tin nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15-30p</div>
              <p className="text-sm text-muted-foreground">Thời gian luyện tập mỗi ngày</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Nhiều CLB</div>
              <p className="text-sm text-muted-foreground">Guitar, Vocal, Band, DJ...</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Open Mic</div>
              <p className="text-sm text-muted-foreground">Sân chơi định kỳ</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Festival</div>
              <p className="text-sm text-muted-foreground">Sự kiện âm nhạc lớn trong năm</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center space-y-6 text-primary-foreground">
          <h2 className="text-2xl sm:text-3xl font-bold">Sẵn sàng bắt đầu?</h2>
          <p className="text-primary-foreground/90">
            Hãy tham gia một CLB âm nhạc hoặc hỏi FPTU Assistant nếu bạn còn băn khoăn.
          </p>
          <Link href="/assistant">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Chat với FPTU Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
