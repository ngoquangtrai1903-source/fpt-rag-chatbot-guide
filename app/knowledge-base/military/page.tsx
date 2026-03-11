'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Shield,
  Backpack,
  Zap,
  Ruler,
  CheckCircle2,
  Check,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MilitaryPage() {
  const [checklist, setChecklist] = React.useState<Record<string, boolean>>({})

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Nội dung giữ nguyên từ trang gốc, chỉ đổi cách trình bày (dashboard)
  const overviewCards = [
    { id: 'duration', title: '28 Ngày', desc: 'Thời lượng tập trung (4 tuần liên tục)', icon: Zap, color: 'border-primary/30 bg-primary/5' },
    { id: 'location', title: 'Thanh Khê - Đà Sơn', desc: 'Khu quân sự tập trung (hoặc khu liên kết)', icon: Shield, color: 'border-accent/30 bg-accent/5' },
    { id: 'required', title: 'Bắt buộc', desc: 'Điều kiện để xét tốt nghiệp', icon: CheckCircle2, color: 'border-primary/20 bg-primary/5' },
  ]

  const scoringBreakdown = [
    { criteria: 'Chuyên cần', percent: '30%', desc: 'Có mặt đầy đủ, tích cực' },
    { criteria: 'Nội vụ', percent: '40%', desc: 'Gấp chăn, giữ gìn quân phục' },
    { criteria: 'Ý thức kỷ luật', percent: '30%', desc: 'Tuân thủ quy định, tinh thần' },
  ]

  const packingChecklist = [
    { id: 'insoles', label: 'Miếng lót giày/Băng vệ sinh: Chống đau chân khi hành quân', icon: Backpack },
    { id: 'powder', label: 'Phấn rôm: Giữ chân khô thoáng, tránh nấm da', icon: Sparkles },
    { id: 'sunscreen', label: 'Kem chống nắng (SPF 50+): Bảo vệ da dưới nắng thao trường', icon: Zap },
    { id: 'extension', label: 'Ổ cắm nối dài: Giải quyết tình trạng thiếu ổ điện', icon: Zap },
    { id: 'powerbank', label: 'Sạc dự phòng: Phòng khi mất điện hoặc đi hành quân xa', icon: Zap },
    { id: 'sim', label: 'Sim 4G: WiFi rất yếu hoặc không có', icon: Shield },
    { id: 'personal', label: 'Móc áo (10+ cái), bột giặt, quạt mini, tiền lẻ', icon: Backpack },
    { id: 'shoes', label: 'Giày thể thao bền, tất/vớ đủ dùng 1 tuần', icon: Backpack },
    { id: 'hygiene', label: 'Khăn tắm, dụng cụ vệ sinh cá nhân', icon: Backpack },
  ]

  const keyTopics = [
    {
      id: 'first-day',
      title: 'Những ngày đầu - Nhanh, Gọn, Kỷ Luật',
      icon: Zap,
      color: 'from-primary/20 to-primary/10 border-primary/30',
      tips: [
        'Tập trung đúng giờ: Nghe tiếng còi là có mặt, không chần chừ',
        'Nhà tắm tập thể: Chuẩn bị đồ sẵn, tắm nhanh (5-7 phút)',
        'Luôn mặc đúng quân phục khi có hiệu lệnh',
      ],
    },
    {
      id: 'uniform',
      title: 'Nội vụ - Gấp chăn \"Bánh Chưng\"',
      icon: Ruler,
      color: 'from-accent/20 to-accent/10 border-accent/30',
      tips: [
        'Sử dụng thước kẻ hoặc thẻ ATM để vuốt nếp, tạo góc cạnh sắc nét',
        '\"Kỹ nghệ\" giữ chăn: Mang theo chăn cá nhân mỏng để đắp',
        'Giữ nguyên chiếc chăn quân đội đã gấp đẹp suốt 28 ngày',
      ],
    },
    {
      id: 'rules',
      title: 'Quy định & Kỷ luật',
      icon: CheckCircle2,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
      tips: [
        'Tuyệt đối không mang trang sức, đồ có giá trị cao',
        'Tuân thủ tuyệt đối giờ giấc (giờ thức dậy, tắt đèn)',
        'Giữ gìn vệ sinh chung của tiểu đội/trung đội',
        'Tương trợ đồng đội khi gặp khó khăn',
      ],
    },
  ]

  const checkedCount = Object.values(checklist).filter(Boolean).length
  const totalChecklist = packingChecklist.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/knowledge-base" className="text-primary hover:underline flex items-center gap-2 text-sm font-medium">
            ← Quay lại Knowledge Base
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Shield size={18} />
            Kỳ quân sự 28 ngày
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Kỳ Quân Sự 28 Ngày</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Kỳ quân sự là "đặc sản" tạo nên kỷ niệm rực rỡ nhất thời sinh viên FPTU.
          </p>
        </div>
      </section>

      {/* Tổng quan */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-3xl">💂</span>
          Tổng quan
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {overviewCards.map((card) => (
            <div
              key={card.id}
              className={cn('rounded-xl border-2 p-5 transition-all hover:shadow-md', card.color, 'bg-card')}
            >
              <div className="flex items-center gap-2 mb-2">
                <card.icon size={20} className="text-primary" />
                <h3 className="font-bold text-lg">{card.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border-2 border-accent/30 bg-accent/5 p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} />
            Điểm số dựa trên
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {scoringBreakdown.map((item) => (
              <div key={item.criteria} className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{item.criteria}</span>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <span className="text-lg font-bold text-primary">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist hành lý */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🎒</span>
                Hành lý - Những vật dụng "cứu cánh"
              </h2>
              <p className="text-muted-foreground mt-1">Nguyên tắc: Tối giản hành lý – Tối đa tiện ích</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{checkedCount}/{totalChecklist} đã chuẩn bị</span>
              <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(checkedCount / totalChecklist) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {packingChecklist.map((item) => (
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

      {/* Bí kíp quan trọng */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-3xl">📐</span>
          Bí kíp quan trọng
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {keyTopics.map((topic) => (
            <div
              key={topic.id}
              className={cn('rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5', topic.color, 'bg-card')}
            >
              <div className="flex items-center gap-2 mb-4">
                <topic.icon size={20} className="text-primary" />
                <h3 className="font-bold">{topic.title}</h3>
              </div>
              <ul className="space-y-2">
                {topic.tips.map((tip) => (
                  <li key={tip} className="text-sm flex items-start gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tài liệu tham khảo (links người dùng cung cấp) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <span className="text-2xl">🔗</span>
            Tài liệu tham khảo
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="https://khoathongke.neu.edu.vn/vi/doan-thanh-nien-1790/cam-nang-hanh-trang-sinh-ton-khi-hoc-gdqp"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">Cẩm nang hành trang sinh tồn</p>
                  <p className="text-xs text-muted-foreground">khoathongke.neu.edu.vn</p>
                </div>
                <ExternalLink size={16} className="text-primary shrink-0" />
              </div>
            </a>
            <a
              href="https://giaoducnghe.edu.vn/10-luu-y-khi-di-hoc-quan-su-danh-cho-sinh-vien/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">10 lưu ý khi đi học quân sự</p>
                  <p className="text-xs text-muted-foreground">giaoducnghe.edu.vn</p>
                </div>
                <ExternalLink size={16} className="text-primary shrink-0" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center space-y-6 text-primary-foreground">
          <h2 className="text-2xl sm:text-3xl font-bold">Vẫn còn thắc mắc?</h2>
          <p className="text-primary-foreground/90">
            Hỏi FPTU Assistant để nhận lời khuyên từ những tiền bối & cựu SV đã trải qua.
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
