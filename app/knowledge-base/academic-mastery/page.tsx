'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Calendar,
  BookOpen,
  Shield,
  FileCheck,
  ExternalLink,
  Sun,
  Coffee,
  CheckCircle2,
  Moon,
  Smartphone,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// The Big 4 - Toolkit
const toolkitItems = [
  {
    id: 'fap',
    name: 'FAP',
    icon: Calendar,
    function: 'Lịch học & Điểm danh',
    note: 'Kiểm tra điểm danh mỗi ngày!',
    link: 'https://fap.fpt.edu.vn/',
    color: 'border-primary/50 bg-primary/5 hover:border-primary',
  },
  {
    id: 'flm',
    name: 'FLM',
    icon: BookOpen,
    function: 'Slide & Giáo trình',
    note: 'Tải tài liệu trước khi lên lớp.',
    link: 'https://flm.fpt.edu.vn/Login',
    color: 'border-accent/50 bg-accent/5 hover:border-accent',
  },
  {
    id: 'seb',
    name: 'SEB',
    icon: Shield,
    function: 'Thi tại lớp',
    note: 'Cần tải đúng bản từ Drive của trường.',
    link: 'https://drive.google.com/drive/u/2/folders/1RmjeKAvef6BXg_qlAl6JnZx2ZkY3qj_3',
    color: 'border-chart-3/50 bg-chart-3/5 hover:border-chart-3',
  },
  {
    id: 'eos',
    name: 'EOS',
    icon: FileCheck,
    function: 'Thi cuối kỳ (FE)',
    note: 'Phải Checkout tại e360 sau khi nộp bài.',
    link: 'https://lmsdn.fpt.edu.vn/hd/eos/',
    color: 'border-chart-4/50 bg-chart-4/5 hover:border-chart-4',
  },
]

// EOS Checkout - separate important link
const eosCheckoutLink = {
  name: 'Xác nhận làm bài FE',
  link: 'https://e360.fpt.edu.vn/checkout',
  note: 'Bắt buộc xác nhận tại e360 sau khi thi cuối kỳ',
}

// Daily Habit Tracker
const habitTasks = [
  {
    id: 'morning',
    time: 'Sáng',
    icon: Sun,
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    tasks: [
      { label: 'Tập thể dục', done: false },
      { label: 'Xem trước bài (15 phút)', done: false },
    ],
  },
  {
    id: 'class',
    time: 'Trong giờ',
    icon: Coffee,
    color: 'from-primary/20 to-primary/10 border-primary/30',
    tasks: [
      { label: 'Học tập tập trung', done: false },
      { label: 'Nghỉ 5 phút (không điện thoại)', done: false },
    ],
  },
  {
    id: 'after',
    time: 'Sau giờ',
    icon: CheckCircle2,
    color: 'from-accent/20 to-accent/10 border-accent/30',
    tasks: [
      { label: 'Kiểm tra FAP (Điểm danh)', done: false },
      { label: 'Ôn tập nhanh', done: false },
    ],
  },
  {
    id: 'night',
    time: 'Tối',
    icon: Moon,
    color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30',
    tasks: [
      { label: 'Ngủ đủ 7-8 tiếng để "sạc pin" não bộ', done: false },
    ],
  },
]

export default function AcademicMasteryPage() {
  const [habits, setHabits] = React.useState<Record<string, Record<number, boolean>>>({})

  const toggleHabit = (habitId: string, taskIndex: number) => {
    setHabits((prev) => ({
      ...prev,
      [habitId]: {
        ...prev[habitId],
        [taskIndex]: !prev[habitId]?.[taskIndex],
      },
    }))
  }

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
            <GraduationCap size={18} />
            Kỹ thuật & Thói quen học tập
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Academic Mastery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            "Xương sống" giúp sinh viên không bị bỡ ngỡ với hệ thống phức tạp của FPT - The Big 4 & Chiến thuật học tập.
          </p>
        </div>
      </section>

      {/* A. Interactive Toolkit - The Big 4 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🛠️</span>
            Bộ công cụ kỹ thuật (The Big 4)
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolkitItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5',
                  item.color,
                  'bg-card'
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-background/80 flex items-center justify-center">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold">{item.name}</h3>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{item.function}</p>
                <p className="text-xs text-muted-foreground mb-4">{item.note}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Go to Site
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>

          {/* EOS Checkout - Important callout */}
          <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <Zap size={24} className="text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-destructive">{eosCheckoutLink.name}</h3>
                <p className="text-sm text-muted-foreground">{eosCheckoutLink.note}</p>
              </div>
            </div>
            <a
              href={eosCheckoutLink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button variant="destructive" size="sm" className="gap-2">
                <ExternalLink size={14} />
                e360 Checkout
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* B. Daily Habit Tracker */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">📋</span>
              Thói quen thành công (Daily Habit Tracker)
            </h2>
            <p className="text-muted-foreground mt-1">
              Chiến thuật học tập: Quy tắc 15 phút • Check Attendance • Phục hồi 7-8h ngủ
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {habitTasks.map((habit) => (
              <div
                key={habit.id}
                className={cn(
                  'rounded-xl border-2 p-5 transition-all',
                  habit.color,
                  'bg-card'
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <habit.icon size={20} className="text-primary" />
                  <h3 className="font-bold text-sm">{habit.time}</h3>
                </div>
                <ul className="space-y-2">
                  {habit.tasks.map((task, idx) => (
                    <li key={idx}>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={habits[habit.id]?.[idx] || false}
                          onChange={() => toggleHabit(habit.id, idx)}
                          className="sr-only"
                        />
                        <div
                          className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                            habits[habit.id]?.[idx]
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-muted-foreground group-hover:border-primary'
                          )}
                        >
                          {habits[habit.id]?.[idx] && <CheckCircle2 size={12} strokeWidth={3} />}
                        </div>
                        <span className="text-sm">{task.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Tactics - Collapsible */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <details className="group rounded-xl border border-border bg-card overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-muted/50 transition-colors">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Chiến thuật học tập chi tiết
            </h2>
            <span className="text-muted-foreground group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="px-6 pb-6 pt-0 border-t border-border">
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Smartphone size={18} />
                  Quy tắc 15 phút
                </h3>
                <p className="text-sm text-muted-foreground">
                  Xem trước bài để nắm hướng đi - Chỉ cần 15 phút mỗi ngày sẽ giúp bạn theo kịp bài giảng dễ dàng hơn.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Check Attendance
                </h3>
                <p className="text-sm text-muted-foreground">
                  Thói quen sống còn sau mỗi buổi học - Kiểm tra FAP mỗi ngày để đảm bảo điểm danh không bị sai sót.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Moon size={18} />
                  Phục hồi (Recovery)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ngủ đủ 7-8h và nghỉ ngơi 5-10 phút sau mỗi giờ học (không thiết bị) để não bộ "sạc pin" hiệu quả.
                </p>
              </div>
            </div>
          </div>
        </details>
      </section>

      {/* Quick Facts */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Thông tin nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <p className="text-sm text-muted-foreground">Hệ thống chính (FAP, FLM, SEB, EOS)</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">15 phút</div>
              <p className="text-sm text-muted-foreground">Xem trước bài mỗi ngày</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">7-8h</div>
              <p className="text-sm text-muted-foreground">Giấc ngủ để phục hồi</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">e360</div>
              <p className="text-sm text-muted-foreground">Checkout sau thi FE</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center space-y-6 text-primary-foreground">
          <h2 className="text-2xl sm:text-3xl font-bold">Còn thắc mắc về học tập?</h2>
          <p className="text-primary-foreground/90">
            Hỏi FPTU Assistant về FAP, FLM, thi cử hay bất kỳ vấn đề học thuật nào.
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
