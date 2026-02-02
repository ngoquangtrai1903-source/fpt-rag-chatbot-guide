'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Building2,
  Home,
  Footprints,
  Shield,
  Wallet,
  Users,
  Sparkles,
  Check,
  MapPin,
  Wifi,
  Zap,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Comparison data: KTX vs Trọ ngoài
const comparisonData = [
  {
    criteria: 'Khoảng cách',
    ktx: { text: '2 phút đi bộ', icon: Footprints },
    tro: { text: '5-10 phút xe máy', icon: MapPin },
  },
  {
    criteria: 'Tiện ích',
    ktx: { text: 'Có sẵn, An ninh 24/7', icon: Shield },
    tro: { text: 'Tự nấu ăn, Tự do', icon: Sparkles },
  },
  {
    criteria: 'Chi phí',
    ktx: { text: 'Rẻ & Cố định', icon: Wallet },
    tro: { text: 'Cao (Điện, Nước, Rác)', icon: Wallet },
  },
  {
    criteria: 'Đặc điểm',
    ktx: { text: 'Sinh hoạt tập thể', icon: Users },
    tro: { text: 'Riêng tư tuyệt đối', icon: Home },
  },
]

// Checklist for apartment hunting
const checklistItems = [
  { id: 'electric', label: 'Điện nước ổn định?', icon: Zap },
  { id: 'wall', label: 'Tường thấm mốc?', icon: Building2 },
  { id: 'lock', label: 'Cổng khóa vân tay?', icon: Shield },
  { id: 'wifi', label: 'WiFi từng phòng?', icon: Wifi },
]

// Địa chỉ ăn uống - dữ liệu từ người dùng
const foodPlaces = [
  { name: 'Hoạ Mơ Coffee & Food', desc: 'Kết hợp cà phê và các món ăn, thuận tiện cho sinh viên vừa học vừa ăn', link: 'https://maps.app.goo.gl/eRGfHjXfdcEvFGeY8?g_st=ic' },
  { name: 'Tiệm của Chuột', desc: 'Bún đậu và ăn vặt', link: 'https://maps.app.goo.gl/YU7YZ3fRycJ97dQ19?g_st=ic' },
  { name: 'Quán Nở', desc: 'Bún, mì quảng, tạp hoá cho sinh viên', link: 'https://maps.app.goo.gl/Lnauj41RTB5BESJJ9?g_st=ic' },
  { name: 'Mỳ Quảng 37', desc: '', link: 'https://maps.app.goo.gl/aqRHsY5RJyJphixR8?g_st=ic' },
  { name: 'Bánh mì chảo OHA', desc: 'Bánh mì chảo đặc biệt và xôi', link: 'https://maps.app.goo.gl/X8N7bcT9hDfyoz1q6?g_st=ic' },
  { name: 'Bánh cuốn nóng Hoa (04 Nguyễn Duy Cung)', desc: '', link: 'https://maps.app.goo.gl/pjVvk8PzhXhNx9Rf9?g_st=ic' },
  { name: 'Trees Tea & Coffee', desc: 'Không gian rộng rãi, thoáng mát và yên tĩnh, phù hợp cho sinh viên học bài hoặc làm việc cá nhân trong thời gian dài', link: 'https://maps.app.goo.gl/Gvd7DfjZhNb7UXBE6?g_st=ic' },
  { name: 'Nốt Coffee', desc: 'Vị trí thuận tiện, dễ dàng di chuyển giữa các ca học, phù hợp cho những buổi học nhanh hoặc làm việc ngắn', link: 'https://maps.app.goo.gl/W6cLtm8MMUPnQkPSA?g_st=ic' },
  { name: 'Dailly Coffee', desc: 'Thiết kế hiện đại, không gian sáng, phù hợp cho học nhóm và làm việc', link: 'https://maps.app.goo.gl/MvzwgAiJmhhGkba49?g_st=ic' },
  { name: 'Oxy Garden Coffee', desc: 'Không gian xanh, view đẹp, tạo cảm giác thư giãn nhưng vẫn đảm bảo sự tập trung', link: 'https://maps.app.goo.gl/goFNNZheu9FMzscR7?g_st=ic' },
  { name: 'Zone Six Cafe', desc: 'Quán hoạt động 24/7, có không gian riêng, thích hợp cho sinh viên học khuya hoặc làm việc ngoài giờ', link: 'https://maps.app.goo.gl/cEAFJjnNxxMb8U4V6?g_st=ic' },
  { name: 'Camry Quán', desc: 'Địa điểm quen thuộc của sinh viên, phục vụ mì cay & ăn vặt với mức giá hợp lý, phù hợp cho bữa ăn nhanh', link: 'https://maps.app.goo.gl/qsv9TKbBvDxzFe1h6?g_st=ic' },
  { name: 'Bếp của Nem', desc: 'Bánh mỳ chảo đặc biệt và các thức uống lành mạnh như nước ép hay sinh tố', link: 'https://maps.app.goo.gl/5RbnGXMHx83GUYzM7?g_st=ic' },
  { name: 'Bún đậu 1996', desc: 'Bún đậu, mì cay và các món ăn vặt giá HSSV', link: 'https://maps.app.goo.gl/KXXjuSk4ERsYK4XA9?g_st=ic' },
  { name: 'Hee Mang Chicken', desc: 'Gà rán và đa dạng các món ăn Hàn Quốc cho các bạn sinh viên lựa chọn', link: 'https://maps.app.goo.gl/XX8f4UmZsFGC4Zq16?g_st=ic' },
  { name: 'Cơm tấm Sài Gòn', desc: '', link: 'https://maps.app.goo.gl/yPJUL5XsxwnJobx26?g_st=ic' },
  { name: 'Ông Tèi - Hải Sản Bình Dân', desc: 'Quán nhậu gần FPT, giá hợp lý, view sông', link: 'https://maps.app.goo.gl/AKGh7aiHwjrmmAVV7?g_st=ic' },
  { name: 'Tiệm Bánh Nhà Kim', desc: 'Chuyên bánh ngọt, bánh kem, ăn vặt', link: 'https://maps.app.goo.gl/CSDqVia4xMES7KRp8?g_st=ic' },
  { name: 'SH FlowX (Coffee & Chill Workspace)', desc: 'Nhà sách, photocopy, cửa hàng tiện lợi kết hợp cafe và không gian làm việc, học tập', link: 'https://maps.app.goo.gl/oAUP6rhcFcGpu5xy9?g_st=ic' },
  { name: 'Kem Bơ cô Vân', desc: 'Món tráng miệng nổi tiếng, giá rẻ, phù hợp với sinh viên', link: 'https://maps.app.goo.gl/9FG1yeHjJcBj4NXC9?g_st=ic' },
]

export default function StudentLifePage() {
  const [checklist, setChecklist] = React.useState<Record<string, boolean>>({})
  const [showSuitability, setShowSuitability] = React.useState<'ktx' | 'tro' | null>(null)
  const [hoveredTip, setHoveredTip] = React.useState(false)

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const checkedCount = Object.values(checklist).filter(Boolean).length
  const totalChecklist = checklistItems.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/knowledge-base"
            className="text-primary hover:underline flex items-center gap-2 text-sm font-medium"
          >
            ← Quay lại Knowledge Base
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Building2 size={18} />
            Chương 4 - An cư & Lạc nghiệp
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Student Life Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Mọi thứ bạn cần biết về chỗ ở, ẩm thực và sinh hoạt quanh khu vực FPT University.
          </p>
        </div>
      </section>

      {/* A. Comparison Slider: KTX vs Trọ ngoài */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">⚖️</span>
              KTX vs. Thuê trọ ngoài
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setShowSuitability(
                  showSuitability === null ? 'ktx' : showSuitability === 'ktx' ? 'tro' : null
                )
              }
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              {showSuitability === null
                ? 'Phù hợp với ai?'
                : showSuitability === 'ktx'
                  ? '→ Xem Trọ (Cựu binh)'
                  : 'Đóng'}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* KTX Card */}
            <div
              className={cn(
                'rounded-xl border-2 p-6 transition-all duration-300',
                showSuitability === 'ktx'
                  ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                  : showSuitability === 'tro'
                    ? 'border-border opacity-75'
                    : 'border-primary/30 bg-card hover:border-primary/50'
              )}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Building2 className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ký túc xá (KTX)</h3>
                  <p className="text-sm text-muted-foreground">
                    {showSuitability === 'ktx' && (
                      <span className="text-primary font-medium">→ Dành cho Tân binh</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {comparisonData.map((row) => (
                  <div key={row.criteria} className="flex items-start gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-24 shrink-0">
                      {row.criteria}
                    </span>
                    <div className="flex items-center gap-2">
                      <row.ktx.icon size={16} className="text-primary shrink-0" />
                      <span>{row.ktx.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trọ ngoài Card */}
            <div
              className={cn(
                'rounded-xl border-2 p-6 transition-all duration-300',
                showSuitability === 'tro'
                  ? 'border-accent bg-accent/5 shadow-lg scale-[1.02]'
                  : showSuitability === 'ktx'
                    ? 'border-border opacity-75'
                    : 'border-accent/30 bg-card hover:border-accent/50'
              )}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Home className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Thuê trọ ngoài</h3>
                  <p className="text-sm text-muted-foreground">
                    {showSuitability === 'tro' && (
                      <span className="text-accent font-medium">→ Dành cho Cựu binh</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {comparisonData.map((row) => (
                  <div key={row.criteria} className="flex items-start gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-24 shrink-0">
                      {row.criteria}
                    </span>
                    <div className="flex items-center gap-2">
                      <row.tro.icon size={16} className="text-accent shrink-0" />
                      <span>{row.tro.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. Tân binh tìm trọ Checklist */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">📋</span>
                Checklist Tân binh tìm trọ
              </h2>
              <p className="text-muted-foreground mt-1">
                Mang theo khi đi xem phòng - Ưu tiên bán kính 1-2km, kiểm tra an ninh & chi phí ẩn
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {checkedCount}/{totalChecklist} đã kiểm tra
              </span>
              <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(checkedCount / totalChecklist) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {checklistItems.map((item) => (
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
                    checklist[item.id]
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground'
                  )}
                >
                  {checklist[item.id] && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="flex items-center gap-2">
                  <item.icon size={18} className="text-muted-foreground shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Tooltip - Mẹo hay */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setHoveredTip(true)}
            onMouseLeave={() => setHoveredTip(false)}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent cursor-help hover:bg-accent/20 transition-colors">
              <Sparkles size={18} />
              <span className="font-medium">Mẹo hay</span>
            </div>
            {hoveredTip && (
              <div className="absolute left-0 top-full mt-2 z-50 p-4 rounded-lg bg-popover border border-border shadow-xl max-w-sm">
                <p className="text-sm">
                  Hãy xem phòng vào <strong>buổi trưa</strong> để biết độ nóng và{' '}
                  <strong>buổi chiều mưa</strong> để biết độ ngập!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* C. Địa chỉ ăn uống - Mục nhỏ trong Student Life */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🍜</span>
            Địa chỉ ăn uống quanh FPT
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodPlaces.map((place) => (
              <div
                key={place.name}
                className="rounded-xl border-2 border-primary/20 bg-card p-4 transition-all hover:shadow-md hover:border-primary/40"
              >
                <h3 className="font-bold text-sm">{place.name}</h3>
                {place.desc && (
                  <p className="text-muted-foreground text-xs mt-1">{place.desc}</p>
                )}
                <a
                  href={place.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-primary hover:underline"
                >
                  <MapPin size={14} />
                  Xem bản đồ
                  <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kinh nghiệm thuê trọ - Collapsible */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <details className="group rounded-xl border border-border bg-card overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-muted/50 transition-colors">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Kinh nghiệm thuê trọ
            </h2>
            <span className="text-muted-foreground group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="px-6 pb-6 pt-0 border-t border-border">
            <ul className="text-sm text-muted-foreground space-y-1 mt-6">
              <li>• Ưu tiên bán kính 1-2km từ trường</li>
              <li>• Kiểm tra an ninh & chi phí ẩn (điện, nước, rác)</li>
              <li>• Ký hợp đồng rõ ràng, đọc kỹ điều khoản</li>
            </ul>
          </div>
        </details>
      </section>

      {/* Quick Facts */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Thông tin nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2 phút</div>
              <p className="text-sm text-muted-foreground">KTX → Trường</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1-2km</div>
              <p className="text-sm text-muted-foreground">Bán kính thuê trọ lý tưởng</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Ngon-Bổ-Rẻ</div>
              <p className="text-sm text-muted-foreground">Tiêu chí ẩm thực</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Trần Đại Nghĩa</div>
              <p className="text-sm text-muted-foreground">Trục đường ẩm thực</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center space-y-6 text-primary-foreground">
          <h2 className="text-2xl sm:text-3xl font-bold">Còn thắc mắc?</h2>
          <p className="text-primary-foreground/90">
            Hỏi FPTU Assistant để nhận lời khuyên từ tiền bối & cựu sinh viên.
          </p>
          <Link href="/assistant">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Chat với FPTU Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
