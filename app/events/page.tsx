'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, ExternalLink, MapPin, Clock, Users } from 'lucide-react'

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: 'CHÍNH THỨC MỞ CỔNG NỘP HỒ SƠ CHƯƠNG TRÌNH TÌM KIẾM NHÂN TÀI KỶ NGUYÊN SỐ VIỆT NAM - HỌC BỔNG NGUYỄN VĂN ĐẠO',
      description: 'Cơ hội nhận học bổng giá trị cho sinh viên tài năng',
      date: '2026',
      location: 'FPT University',
      image: '/events/hoc-bong-nguyen-van-dao.jpg',
      facebookUrl: 'https://www.facebook.com/photo?fbid=1327228536102802&set=a.479252204233777&locale=vi_VN',
      category: 'Học bổng'
    },
    {
      id: 2,
      title: 'NHỮNG ĐIỀU KHÔNG THỂ BỎ LỠ TẠI LỄ TÔN VINH HỌC KỲ FALL 2025',
      description: 'Lễ vinh danh những thành tích xuất sắc của sinh viên',
      date: 'Fall 2025',
      location: 'FPT University',
      image: '/events/le-ton-vinh-fall-2025.jpg',
      facebookUrl: 'https://www.facebook.com/photo/?fbid=1325069556318700&set=pcb.1325069706318685&locale=vi_VN',
      category: 'Lễ vinh danh'
    },
    {
      id: 3,
      title: 'LỄ TÔN VINH HỌC KỲ FALL 2025 - "CON RỒNG CHÁU TIÊN" CÙNG TỀ TỰU, VINH DANH NHỮNG DẤU ẤN TỰ HÀO',
      description: 'Đêm nhạc và lễ vinh danh đậm chất truyền thống',
      date: 'Fall 2025',
      location: 'FPT University',
      image: '/events/con-rong-chau-tien.jpg',
      facebookUrl: 'https://www.facebook.com/photo/?fbid=1318667876958868&set=a.479252194233778&locale=vi_VN',
      category: 'Lễ vinh danh'
    },
    {
      id: 4,
      title: 'RESEARCH CONNECT 2026',
      description: 'FPT UNIVERSITY SCIENCE RESEARCH COMPETITION - HUMAN-CENTRIC AI: SHAPING TWIN REALITIES',
      date: '2026',
      location: 'FPT University',
      image: '/events/research-connect-2026.jpg',
      facebookUrl: 'https://www.facebook.com/photo/?fbid=1323220996503556&set=a.479252194233778&locale=vi_VN',
      category: 'Cuộc thi học thuật'
    },
    {
      id: 5,
      title: 'FUDA\'S GOT TALENT 2026 - CUỘC THI TÌM KIẾM TÀI NĂNG LỚN NHẤT FPTU CHÍNH THỨC KHỞI ĐỘNG',
      description: 'Cuộc thi tìm kiếm tài năng nổi bật nhất FPT University 2026',
      date: '2026',
      location: 'FPT University',
      image: '/events/fuda-got-talent.jpg',
      facebookUrl: 'https://www.facebook.com/photo?fbid=1335130768645912&set=a.479252204233777&locale=vi_VN',
      category: 'Cuộc thi tài năng'
    },
    {
      id: 6,
      title: 'HỌC BỔNG TINH HOA MỞ LỐI - "TẤM HỘ CHIẾU" VỮNG CHẮC CHO SỰ NGHIỆP TOÀN CẦU 2026',
      description: 'Cơ hội nhận học bổng giá trị cho sự nghiệp toàn cầu',
      date: '2026',
      location: 'FPT University',
      image: '/events/hoc-bong-toan-cau.jpg',
      facebookUrl: 'https://www.facebook.com/photo/?fbid=1339406024885053&set=a.1333080655517590&locale=vi_VN',
      category: 'Học bổng'
    },
    {
      id: 7,
      title: 'BACK TO SCHOOL - HÁI LỘC KHAI XUÂN, RỘN RÀNG NĂM MỚI 2026',
      description: 'Sự kiện chào năm mới 2026 với nhiều hoạt động hấp dẫn',
      date: '2026',
      location: 'FPT University',
      image: '/events/back-to-school.png',
      facebookUrl: 'https://www.facebook.com/photo/?fbid=1346010690891253&set=pcb.1346011134224542&locale=vi_VN',
      category: 'Sự kiện chào năm mới'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Học bổng':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Lễ vinh danh':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Cuộc thi học thuật':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Cuộc thi tài năng':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Sự kiện chào năm mới':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Calendar size={18} />
            Sự kiện FPT University
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Events & Activities</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Cập nhật các sự kiện, cuộc thi và hoạt động nổi bật tại Đại học FPT. Đừng bỏ lỡ cơ hội tham gia và kết nối!
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="group rounded-xl border-2 border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Event Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center hidden">
                  <div className="text-center p-6">
                    <Calendar size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground font-medium">Event Poster</p>
                    <p className="text-sm text-muted-foreground mt-2">{event.title}</p>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>

                {/* Facebook Link Overlay */}
                <a
                  href={event.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <ExternalLink size={32} className="mx-auto mb-2" />
                    <p className="font-medium">Xem trên Facebook</p>
                    <p className="text-sm opacity-90">Nhấn để mở sự kiện</p>
                  </div>
                </a>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                
                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={event.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full group/btn">
                    <ExternalLink size={16} className="mr-2 group-hover/btn:translate-x-0.5 transition-transform" />
                    Xem chi tiết trên Facebook
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Cập nhật liên tục</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Các sự kiện được cập nhật thường xuyên từ Fanpage chính thức của FPT University. 
              Hãy theo dõi để không bỏ lỡ bất kỳ hoạt động thú vị nào!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="outline" asChild>
                <a href="https://www.facebook.com/fptuniversity" target="_blank" rel="noopener noreferrer">
                  <Users size={16} className="mr-2" />
                  Fanpage FPT University
                </a>
              </Button>
              <Button asChild>
                <Link href="/assistant">
                  Hỏi AI Assistant về sự kiện
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center space-y-6 text-primary-foreground">
          <h2 className="text-2xl sm:text-3xl font-bold">Cần thêm thông tin về sự kiện?</h2>
          <p className="text-primary-foreground/90">
            Chat với FPTU Assistant để nhận thông tin chi tiết và tư vấn về các hoạt động sắp tới.
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

