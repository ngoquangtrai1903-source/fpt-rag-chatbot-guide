'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trophy, CalendarDays, Sparkles } from 'lucide-react'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Trophy size={18} />
            Sự kiện & Cuộc thi
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Hot Events @ FPTU Đà Nẵng</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Không gian để bạn cập nhật, tổng hợp và lưu lại những sự kiện, cuộc thi nổi bật tại trường.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-dashed border-border bg-card/60 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays size={20} />
            Danh sách sự kiện
          </h2>
          <p className="text-sm text-muted-foreground">
            Hiện tại bạn có thể dùng mục này để tự thêm/cập nhật sự kiện thủ công (VD: cuộc thi học thuật, giải thể thao,
            cuộc thi âm nhạc, hackathon, v.v.). Không có dữ liệu mẫu mặc định để tránh thông tin sai lệch.
          </p>
          <p className="text-sm text-muted-foreground">
            Gợi ý: mỗi sự kiện nên có tên, thời gian, địa điểm, đối tượng tham gia và link đăng ký (nếu có).
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles size={20} />
            Ý tưởng phát triển thêm
          </h2>
          <p className="text-sm text-muted-foreground">
            Sau này bạn có thể:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Kết nối API hoặc Google Sheet để tự động cập nhật sự kiện</li>
            <li>Phân loại theo học thuật, thể thao, nghệ thuật, cộng đồng</li>
            <li>Thêm bộ lọc theo tháng/học kỳ</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

