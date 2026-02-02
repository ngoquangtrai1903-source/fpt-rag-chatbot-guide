'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown, BookOpen, Award, TrendingUp, Zap, ExternalLink } from 'lucide-react'

export default function EnglishLearningPage() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('placement')

  const placementContent = {
    title: '🚩 Ready for the Challenge? Tất tần tật về Placement Test',
    icon: '🚩',
    description: 'Your first gateway to the right English level',
    subsections: [
      {
        id: 'objective',
        title: 'Mục Tiêu Kỳ Thi',
        content: `Mục đích chính của Placement Test là đánh giá năng lực hiện tại của bạn để:
• Xếp bạn vào một trong 6 level học tiếp theo (từ Hurricane đến các level cao hơn)
• Đảm bảo bạn học ở đúng cấp độ, không quá cao hoặc quá thấp
• Pass thẳng chuyên ngành nếu bạn có chứng chỉ IELTS 6.0 hoặc đạt điểm xuất sắc

Lợi ích của việc xếp đúng lớp:
→ Học tập hiệu quả hơn
→ Tránh bị "mất gốc" (bị xếp quá cao)
→ Phát triển kỹ năng một cách bài bản`
      },
      {
        id: 'structure',
        title: 'Cấu Trúc Đề Thi',
        content: `Phần 1: Trắc Nghiệm (60%)
• Ngữ pháp & Từ vựng (kiến thức THPT)
• Thời gian: 60 phút
• Số câu: 50-60 câu
• Kinh nghiệm: Đừng để quá khó hạ gục bạn - đó là để phân loại

Phần 2: Writing (40%)
• Viết đoạn văn hoặc bài luận ngắn (150-200 từ)
• Thời gian: 30 phút
• Tiêu chí: Nội dung, ngữ pháp, từ vựng

Tip: Đừng quá lo lắng về spelling hoàn hảo. Những sai lầm nhỏ không ảnh hưởng quá nhiều.`
      },
      {
        id: 'advice',
        title: 'Lời Khuyên Từ Tiền Bối',
        content: `✓ "Đừng áp lực, hãy làm đúng thực lực để học đúng lớp"
  → Đó là khoá khóa để thành công trong chương trình tiếng Anh
  → Nếu bạn cố quá hard, bạn có thể bị xếp quá cao và khó lòng theo kịp

✓ Chuẩn bị như thế nào?
  • Ôn lại từ vựng THPT (800-1000 từ cơ bản)
  • Làm quen với các cấu trúc ngữ pháp thường gặp
  • Thực hành viết một đoạn văn ngắn
  • Ngủ tốt đêm hôm trước thi

✓ Tránh những lỗi phổ biến:
  ✗ Không ôn tập quá nhiều đêm hôm trước
  ✗ Không để bội phục bài thi → Làm tốt nhất có thể là đủ
  ✗ Không cảm thấy tự ti nếu bị xếp vào level thấp`
      }
    ]
  }

  const lukGlobalLevels = [
    {
      id: 1,
      name: 'Hurricane',
      description: 'Nền tảng vững chắc',
      focus: ['Phát âm chuẩn IPA', 'Kỹ năng mềm', 'Tư duy học tiếng Anh'],
      output: 'Thuyết trình cơ bản trước đám đông',
      content: `Level 1: Hurricane - Nền Tảng Vững Chắc

Trọng Tâm Học Tập:
• Phát âm chuẩn IPA - Ngoại ngữ "chuẩn xác"
• Kỹ năng mềm (Soft Skills) - Giao tiếp, tự tin, thuyết trình
• Tư duy học tiếng Anh - Tại sao chúng ta học, cách học hiệu quả

Sản Phẩm Đầu Ra:
Bạn sẽ có thể thuyết trình cơ bản trước đám đông (dù nhỏ) mà không quá lo lắng.

Hoạt Động Tiêu Biểu:
• Tập phát âm từng âm vị riêng lẻ
• Luyện kỹ năng thuyết trình với bạn cùng lớp
• Xây dựng tự tin nói tiếng Anh mỗi ngày`
    },
    {
      id: 2,
      name: 'Greenfire',
      description: 'Giao tiếp hàng ngày',
      focus: ['Giao tiếp hàng ngày', 'Đọc báo', 'Viết tin tức'],
      output: 'Dự án thuyết trình nhóm hàng tuần',
      content: `Level 2: Greenfire - Bước Tiến

Trọng Tâm Học Tập:
• Giao tiếp hàng ngày - Nói chuyện về các chủ đề thường gặp
• Đọc báo điện tử tiếng Anh (News reading)
• Viết tin tức (Journalism basics) - Viết bài báo ngắn

Sản Phẩm Đầu Ra:
Thực hiện dự án thuyết trình nhóm hàng tuần.
Bạn sẽ trở thành một "phóng viên" nhỏ, chia sẻ tin tức mới.

Hoạt Động Tiêu Biểu:
• Thảo luận các tin tức hàng ngày
• Viết bài báo ngắn về các sự kiện
• Thuyết trình kết quả dự án cùng nhóm`
    },
    {
      id: 3,
      name: 'Heatwave',
      description: 'Tư duy phản biện',
      focus: ['Tư duy phản biện', 'Nghiên cứu bằng chứng', 'Critical thinking'],
      output: 'Thi đấu Debate giữa các lớp',
      content: `Level 3: Heatwave - Sẵn Sàng Tranh Biện

Trọng Tâm Học Tập:
• Tư duy phản biện - Không tin cứ thôi, cần bằng chứng
• Nghiên cứu và tìm kiếm bằng chứng (Research skills)
• Tranh biện (Debate) - Thuyết phục người khác bằng lập luận

Sản Phẩm Đầu Ra:
Thi đấu Tranh biện (Debate) giữa các lớp.
Bạn không chỉ nói được, mà còn thuyết phục được người khác.

Hoạt Động Tiêu Biểu:
• Tìm bằng chứng để hỗ trợ ý kiến
• Luyện các kỹ năng tranh biện
• Tham gia các cuộc tranh biện nội bộ`
    },
    {
      id: 4,
      name: 'Thunderbolt',
      description: 'Giải quyết vấn đề',
      focus: ['Giải quyết vấn đề', 'Solution-focused thinking', 'Advanced debates'],
      output: 'Tham gia giải đấu Debate tìm nhà vô địch',
      content: `Level 4: Thunderbolt - Cuộc Chinh Phục Cuối Cùng

Trọng Tâm Học Tập:
• Giải quyết vấn đề (Problem-solving)
• Tư duy hướng giải pháp (Solution-focused thinking)
• Tranh biện cấp cao - Quốc tế hoặc đặc biệt khó

Sản Phẩm Đầu Ra:
Tham gia giải đấu Debate tìm nhà vô địch.
Bạn là một "chiến binh" tiếng Anh, sẵn sàng cho bất kỳ thách thức nào.

Hoạt Động Tiêu Biểu:
• Tham gia các giải đấu Debate lớn
• Phát triển các chiến lược tranh biện nâng cao
• Đóng vai trò lãnh đạo trong các hoạt động nhóm`
    }
  ]

  const summitTopNotchSections = [
    {
      id: 'grading',
      title: '📊 Cách Tính Điểm & Quản Lý Kỳ Học',
      content: `Cách Tính Điểm Tổng Thể:

1. Progress Tests (PT) - 20%
   • Có 3 bài kiểm tra tiến độ mỗi kỳ
   • Mỗi bài 6.7%
   • Thi trên phần mềm SEB (Secure Exam Browser)
   • Kiểm tra kiến thức từng phần của khóa học

2. Assignments - 20%
   • 2 bài Writing (mỗi bài 5%)
   • 2 bài Speaking (mỗi bài 5%)
   • Gửi qua hệ thống trực tuyến
   • Có deadline cụ thể, không được trễ

3. Final Exam (FE) - 60%
   • Kỳ thi kết thúc học phần
   • Thi trên phần mềm EOS
   • Bao gồm tất cả kiến thức đã học

💡 Tip Quản Lý Kỳ Học:
→ Check FAP (hệ thống điểm) mỗi ngày để tránh sai sót
→ Lên kế hoạch hoàn thành assignment sớm
→ Dự dụ thêm 1-2 tuần để chuẩn bị cho Final Exam`
    },
    {
      id: 'attendance',
      title: '✅ Chuyên Cần & Điểm Danh',
      content: `Quy Tắc Chuyên Cần:

• Không được nghỉ quá 20% số buổi học
  → Với 35 buổi học = tối đa 7 buổi nghỉ
  → Nếu vượt quá sẽ bị 0 điểm chuyên cần

Các Loại Nghỉ:
✓ Nghỉ có giấy phép: Bệnh, sự kiện gia đình (cần giấy chứng minh)
✓ Nghỉ không phép: Tự động mất points chuyên cần
✓ Đi muộn 15+ phút = 1 lần nghỉ

💡 Cách Tránh "Vấp" Điểm Danh:
→ Tạo reminder trên điện thoại cho giờ học
→ Đi sớm 5-10 phút để chắc chắn có mặt
→ Check FAP hàng tuần để theo dõi chuyên cần
→ Nếu bị nhầm, liên hệ GV hoặc FA để sửa ngay`
    },
    {
      id: 'tips',
      title: '💡 Bí Kíp "Sống Sót" trong Summit & Top Notch',
      content: `Đi Sớm 15-20 Phút:
→ Để xác nhận điểm danh đúng (tránh điểm danh vắng mặt)
→ Để chuẩn bị tinh thần cho lớp học
→ Để chào giáo viên (tạo ấn tượng tốt)

Hoàn Thành Assignment Trước Deadline 3-4 Ngày:
→ Nếu gặp lỗi, còn thời gian để resubmit
→ Tránh áp lực đêm hôm trước deadline
→ GV thường sửa lại feedback nếu deadline còn lâu

Tập Trung Nghe Giáo Viên:
→ Summit & Top Notch là chương trình "đặc biệt"
→ GV sẽ dạy những kỹ năng quan trọng cho kỳ thi cuối
→ Note lại những điều GV nhấn mạnh

Lập Nhóm Học Tập:
→ Thực hành speaking cùng bạn 2-3 lần/tuần
→ Trao đổi ý tưởng cho assignments
→ Quay lại những phần khó hiểu`
    }
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
          <span className="text-5xl">📚</span>
          <h1 className="text-4xl sm:text-5xl font-bold">Chương Trình Tiếng Anh tại FPT University</h1>
          <p className="text-lg text-muted-foreground">
            Hướng dẫn chi tiết về chương trình tiếng Anh từ kỳ thi xếp lớp đến các cấp độ cao cấp
          </p>
        </div>
      </section>

      {/* Section 1: Placement Test */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="border border-border rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{placementContent.title}</h2>
            <p className="text-muted-foreground mb-6">{placementContent.description}</p>

            {/* Placement Test Subsections */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                {placementContent.subsections.slice(0, 2).map((subsection) => (
                  <div key={subsection.id} className="p-4 rounded-lg border border-border/50 bg-card">
                    <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <Zap size={16} />
                      {subsection.title}
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{subsection.content}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {placementContent.subsections.slice(2).map((subsection) => (
                  <div key={subsection.id} className="p-4 rounded-lg border border-border/50 bg-card">
                    <h3 className="font-bold text-accent mb-2 flex items-center gap-2">
                      <Award size={16} />
                      {subsection.title}
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{subsection.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-card border border-border/50 rounded-lg p-4">
              <h3 className="font-bold text-primary mb-4">✓ Danh Sách Chuẩn Bị</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">□</span>
                  <span>Ôn lại từ vựng THPT cơ bản (800-1000 từ)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">□</span>
                  <span>Làm quen với các cấu trúc ngữ pháp thường gặp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">□</span>
                  <span>Thực hành viết một đoạn văn ngắn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">□</span>
                  <span>Ngủ tốt đêm hôm trước thi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">□</span>
                  <span>Đến sớm 15 phút ngày thi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: LUK Global Levels */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">🌍 LUK Global: 100% English - 100% Experience</h2>
            <p className="text-muted-foreground">Hành trình phát triển kỹ năng tiếng Anh qua 4 cấp độ</p>
          </div>

          {/* Links fanpage LUK Global (người dùng cung cấp) */}
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="https://www.facebook.com/LUKglobalDanang?locale=vi_VN"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">Fanpage LUK Global (Da Nang)</p>
                  <p className="text-xs text-muted-foreground">facebook.com</p>
                </div>
                <ExternalLink size={16} className="text-primary shrink-0" />
              </div>
            </a>
            <a
              href="https://www.facebook.com/share/1CJ27Sy1XQ/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">Fanpage LUK Global (share link)</p>
                  <p className="text-xs text-muted-foreground">facebook.com</p>
                </div>
                <ExternalLink size={16} className="text-primary shrink-0" />
              </div>
            </a>
          </div>

          {/* Timeline of Levels */}
          <div className="space-y-4">
            {lukGlobalLevels.map((level, index) => (
              <div key={level.id} className="relative">
                {/* Timeline connector */}
                {index < lukGlobalLevels.length - 1 && (
                  <div className="absolute left-8 top-24 w-0.5 h-20 bg-gradient-to-b from-primary to-accent hidden md:block" />
                )}

                <div className="border border-border rounded-lg bg-card overflow-hidden hover:border-primary/50 transition-colors">
                  <button
                    onClick={() => setExpandedSection(expandedSection === `level-${level.id}` ? null : `level-${level.id}`)}
                    className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-center gap-4 text-left flex-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg md:w-12 md:h-12">
                        {level.id}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary">{level.name}</h3>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {level.focus.map((item) => (
                            <span key={item} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedSection === `level-${level.id}` ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {expandedSection === `level-${level.id}` && (
                    <div className="px-6 pb-6 pt-0 border-t border-border space-y-4">
                      <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">{level.content}</div>
                      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                        <p className="text-sm font-semibold text-primary mb-1">Sản Phẩm Đầu Ra</p>
                        <p className="text-sm">{level.output}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Podcast Widget */}
          <div className="bg-accent/10 border-2 border-accent rounded-lg p-6 text-center space-y-4">
            <h3 className="text-xl font-bold">🎙️ Podcast: "Nhật Ký LUK"</h3>
            <p className="text-muted-foreground">Nghe chia sẻ về những buổi Debate nảy lửa từ các học viên LUK Global</p>
            <Button className="gap-2">
              <BookOpen size={18} />
              Nghe Podcast
            </Button>
          </div>
        </div>
      </section>

      {/* Section 3: Summit & Top Notch */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">📚 Summit & Top Notch: Bước Đệm vào Chuyên ngành</h2>
            <p className="text-muted-foreground">Chuẩn bị kỹ lưỡng cho Final Exam và sau này</p>
          </div>

          <div className="space-y-4">
            {summitTopNotchSections.map((section) => (
              <div key={section.id} className="border border-border rounded-lg bg-card overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
                >
                  <h3 className="text-xl font-bold">{section.title}</h3>
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
        </div>
      </section>

      {/* Quick Reference Card */}
      <section className="bg-card/50 border-y border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">📋 Quick Reference</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border bg-background">
              <p className="text-sm font-semibold text-primary mb-2">Placement Test</p>
              <p className="text-xs text-muted-foreground">Xếp đúng level từ đầu</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-background">
              <p className="text-sm font-semibold text-accent mb-2">LUK Global</p>
              <p className="text-xs text-muted-foreground">Phát triển kỹ năng từng bước</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-background">
              <p className="text-sm font-semibold text-primary mb-2">Summit & Top Notch</p>
              <p className="text-xs text-muted-foreground">Chuẩn bị Final Exam chi tiết</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Có Câu Hỏi Về Chương Trình Tiếng Anh?</h2>
          <p className="text-muted-foreground">
            Hỏi FPTU Assistant AI của chúng tôi để nhận câu trả lời chi tiết về chương trình học
          </p>
          <Link href="/assistant">
            <Button className="gap-2">
              <MessageSquare size={18} />
              Chat with FPTU Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

import { MessageSquare } from 'lucide-react'
