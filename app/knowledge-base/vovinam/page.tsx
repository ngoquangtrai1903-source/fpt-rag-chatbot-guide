'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Award, Heart, BookOpen, Target, Shield, Users, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function VovinamPage() {
  const [checklist, setChecklist] = React.useState<Record<string, boolean>>({})

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const principles = [
    { id: 'nhan', name: 'Nhân', desc: 'Lòng nhân ái', icon: Heart, color: 'from-red-500/20 to-rose-500/20 border-red-500/30' },
    { id: 'le', name: 'Lễ', desc: 'Tôn trọng, lễ phép', icon: BookOpen, color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
    { id: 'nghia', name: 'Nghĩa', desc: 'Sự công bằng', icon: Target, color: 'from-primary/20 to-primary/10 border-primary/30' },
    { id: 'tri', name: 'Trí', desc: 'Tri thức, hiểu biết', icon: Sparkles, color: 'from-accent/20 to-accent/10 border-accent/30' },
    { id: 'tin', name: 'Tín', desc: 'Sự trung thành, tin tưởng', icon: Shield, color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30' },
  ]

  const beltLevels = [
    { level: 'Cấp 1', desc: 'Xanh dương', color: 'bg-blue-500' },
    { level: 'Cấp 2', desc: 'Xanh dương 1 sọc vàng', color: 'bg-blue-500 relative' },
    { level: 'Cấp 3', desc: 'Xanh dương 2 sọc vàng', color: 'bg-blue-500 relative' },
    { level: 'Cấp 4', desc: 'Xanh dương 3 sọc vàng', color: 'bg-blue-500 relative' },
    { level: 'Cấp 5', desc: 'Vàng', color: 'bg-yellow-400' },
    { level: 'Cấp 6', desc: 'Vàng 1 sọc đỏ', color: 'bg-yellow-400 relative' },
    { level: 'Cấp 7', desc: 'Vàng 2 sọc đỏ', color: 'bg-yellow-400 relative' },
    { level: 'Cấp 8', desc: 'Vàng 3 sọc đỏ', color: 'bg-yellow-400 relative' },
    { level: 'Cấp 9', desc: 'Đỏ', color: 'bg-red-500' },
    { level: 'Cấp 10', desc: 'Đỏ 1 sọc trắng', color: 'bg-red-500 relative' },
    { level: 'Cấp 11', desc: 'Đỏ 2 sọc trắng', color: 'bg-red-500 relative' },
    { level: 'Cấp 12', desc: 'Đỏ 3 sọc trắng', color: 'bg-red-500 relative' },
    { level: 'Cấp 13', desc: 'Đỏ 4 sọc trắng', color: 'bg-red-500 relative' },
    { level: 'Cấp 14', desc: 'Đỏ 5 sọc trắng', color: 'bg-red-500 relative' },
    { level: 'Cấp 15', desc: 'Đỏ 6 sọc trắng', color: 'bg-red-500 relative' },
    { level: 'Danh dự', desc: 'Vàng trung tâm đỏ', color: 'bg-yellow-400 relative' },
  ]

  const scoringBreakdown = [
    { criteria: 'Chuyên cần', percent: '30%', desc: 'Có mặt đầy đủ, tích cực' },
    { criteria: 'Kỹ thuật', percent: '40%', desc: 'Thực hiện chính xác các động tác' },
    { criteria: 'Thể chất', percent: '20%', desc: 'Sức mạnh, sự dẻo dai' },
    { criteria: 'Thái độ', percent: '10%', desc: 'Tinh thần, tôn trọng' },
  ]

  const tipsChecklist = [
    { id: 'attitude', label: 'Thái độ quyết định điểm số: Đừng học đối phó - Hãy học để trở thành tốt hơn', icon: Heart },
    { id: 'stance', label: 'Nền tảng từ Tấn: Chú trọng từ đòn thế cơ bản nhất (Tấn)', icon: Target },
    { id: 'uniform', label: 'Trang phục & quy tắc: Luôn giữ võ phục sạch sẽ, thắt đai đúng cách', icon: Shield },
    { id: 'practice', label: 'Luyện tập ngoài giờ: 15-30 phút mỗi ngày', icon: Sparkles },
  ]

  const checkedCount = Object.values(checklist).filter(Boolean).length

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
            <Award size={18} />
            Võ Đạo & Thể Chất
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Vovinam Training Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Vovinam không chỉ là môn học bắt buộc, mà còn là hành trình rèn luyện Nhân - Lễ - Nghĩa - Trí - Tín.
          </p>
        </div>
      </section>

      {/* 5 Nguyên tắc */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🥋</span>
            5 Nguyên tắc Vovinam
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {principles.map((p) => (
              <div
                key={p.id}
                className={cn(
                  'rounded-xl border-2 p-4 transition-all hover:shadow-md hover:-translate-y-0.5 text-center',
                  p.color,
                  'bg-card'
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-background/80 flex items-center justify-center mx-auto mb-2">
                  <p.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hệ thống đai & cách tính điểm */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border-2 border-primary/30 bg-card p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="text-2xl">🏅</span>
              Hệ thống đai
            </h2>
            <div className="space-y-2">
              {beltLevels.map((belt) => (
                <div key={belt.level} className="flex items-center gap-3">
                  <div className="relative w-8 h-4 rounded shrink-0">
                    <div className={cn('w-full h-full rounded', belt.color.split(' ')[0])} />
                    {belt.desc.includes('sọc') && (
                      <div className="absolute right-0 top-0 bottom-0 flex items-center">
                        {belt.desc.includes('1 sọc') && <div className="w-1 h-full bg-yellow-400" />}
                        {belt.desc.includes('2 sọc') && <><div className="w-1 h-full bg-yellow-400 mr-0.5" /><div className="w-1 h-full bg-yellow-400" /></>}
                        {belt.desc.includes('3 sọc') && <><div className="w-1 h-full bg-yellow-400 mr-0.5" /><div className="w-1 h-full bg-yellow-400 mr-0.5" /><div className="w-1 h-full bg-yellow-400" /></>}
                        {belt.desc.includes('4 sọc') && <><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white" /></>}
                        {belt.desc.includes('5 sọc') && <><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white" /></>}
                        {belt.desc.includes('6 sọc') && <><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white mr-0.5" /><div className="w-1 h-full bg-white" /></>}
                        {belt.desc.includes('sọc đỏ') && (
                          <>
                            {belt.desc.includes('1 sọc') && <div className="w-1 h-full bg-red-500" />}
                            {belt.desc.includes('2 sọc') && <><div className="w-1 h-full bg-red-500 mr-0.5" /><div className="w-1 h-full bg-red-500" /></>}
                            {belt.desc.includes('3 sọc') && <><div className="w-1 h-full bg-red-500 mr-0.5" /><div className="w-1 h-full bg-red-500 mr-0.5" /><div className="w-1 h-full bg-red-500" /></>}
                          </>
                        )}
                        {belt.desc.includes('trung tâm đỏ') && <div className="w-2 h-full bg-red-500" />}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-sm">{belt.level}</span>
                    <p className="text-xs text-muted-foreground">{belt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-2 border-accent/30 bg-card p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              Cách tính điểm
            </h2>
            <div className="space-y-3">
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
        </div>
      </section>

      {/* Tips checklist */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">⭐</span>
                Bí kíp "Vượt Ải" - Tips từ tiền bối
              </h2>
              <p className="text-muted-foreground mt-1">Thái độ quyết định điểm số</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{checkedCount}/4 đã ghi nhớ</span>
              <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(checkedCount / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {tipsChecklist.map((item) => (
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

      {/* Cộng đồng */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Users size={24} className="text-accent" />
            Kết nối cộng đồng - FPT Vovinam Club
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Hoạt động</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Nơi giao lưu của những người yêu võ</li>
                <li>• Tập thêm ngoài giờ với những bạn cùng sở thích</li>
                <li>• Tham gia các sự kiện \"Võ nhạc\"</li>
                <li>• Biểu diễn Vovinam Dance trong các lễ hội</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Đăng ký</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Liên hệ phòng phục vụ sinh viên</li>
                <li>• Tham gia các sự kiện giới thiệu CLB</li>
                <li>• Hoặc đến tập luyện trực tiếp tại phòng tập</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tài nguyên & liên hệ + Fanpage võ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <details className="group rounded-xl border border-border bg-card overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-muted/50 transition-colors">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Tài nguyên & Liên hệ
            </h2>
            <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="px-6 pb-6 pt-0 border-t border-border">
            <div className="grid md:grid-cols-3 gap-8 mt-6">
              <div>
                <h3 className="font-semibold mb-2">Phòng tập</h3>
                <p className="text-sm text-muted-foreground">Khu thể thao FPTU, tầng 2 • 6:30 AM - 8:00 PM hàng ngày</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Liên hệ</h3>
                <p className="text-sm text-muted-foreground">Email: pe@fptu.edu.vn</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Fanpage Vovinam</h3>
                <a
                  href="https://www.facebook.com/share/1aBcQZybBq/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Mở trên Facebook
                </a>
              </div>
            </div>
          </div>
        </details>
      </section>

      {/* Quick Facts (chỉ dùng dữ liệu có trong nội dung trang) */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Thông tin nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">16</div>
              <p className="text-sm text-muted-foreground">Cấp độ đai</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">40%</div>
              <p className="text-sm text-muted-foreground">Điểm kỹ thuật</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15-30p</div>
              <p className="text-sm text-muted-foreground">Luyện tập mỗi ngày</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">5</div>
              <p className="text-sm text-muted-foreground">Nguyên tắc Võ Đạo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center space-y-6 text-primary-foreground">
          <h2 className="text-2xl sm:text-3xl font-bold">Sẵn sàng bắt đầu tập luyện?</h2>
          <p className="text-primary-foreground/90">Hỏi FPTU Assistant để nhận lời khuyên từ tiền bối.</p>
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
