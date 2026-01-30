'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function MusicPage() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('clubs')

  const sections = [
    {
      id: 'clubs',
      title: 'Music Clubs at FPTU',
      icon: '🎸',
      content: `FPTU has a vibrant music community with several active clubs:

Main Music Clubs:
• Guitar Club - Learn acoustic and electric guitar
• Piano Club - Classical and contemporary piano
• Band Club - Form and join rock/pop bands
• Traditional Music Club - Vietnamese instruments
• DJ/Electronic Music Club - Modern music production
• Vocal Club - Singing techniques and performances
• Ukulele Club - Casual instrument learning

How to Join:
1. Visit the student activities center
2. Attend club showcase events
3. Contact club leaders directly
4. Join Facebook groups for updates
5. Most clubs are free or have minimal fees

Benefits:
• Make new friends with shared interests
• Learn new skills in a supportive environment
• Perform at campus events
• Access to club resources and equipment`
    },
    {
      id: 'instruments',
      title: 'Traditional Vietnamese Instruments',
      icon: '🎵',
      content: `Vietnamese music has a rich heritage with unique instruments:

String Instruments:
• Đàn tranh - 16-36 string zither (unique Vietnamese)
• Đàn nguyệt - Moon-shaped lute
• Đàn đáy - Long-necked lute
• Đàn tính - Three-string lute

Wind Instruments:
• Sáo - Bamboo flute
• Kèn - Double-reed woodwind
• Ống quạt - Fan-shaped bamboo pipe

Percussion:
• Trống - Traditional drums
• Mõ - Wooden fish (temple bell)
• Chập - Finger cymbals
• Bàn - Wooden block

Learning Opportunities:
Students can take elective courses on traditional Vietnamese instruments. Check the music department for schedules.`
    },
    {
      id: 'events',
      title: 'Music Events & Performances',
      icon: '🎤',
      content: `FPTU hosts numerous music events throughout the year:

Regular Events:
• Weekly open mic nights (Every Friday, 7 PM)
• Monthly band battles
• Seasonal concerts and festivals
• New Year talent shows
• Graduation galas featuring student performers

Annual Highlights:
• Spring Music Festival (March) - 3-day event with performances
• Summer Concert Series (June) - Outdoor performances
• Autumn Festival (September) - Cultural performances
• Winter Christmas Concert (December)
• Talent Show for First-Year Students

Performance Opportunities:
• Join the student orchestra
• Perform at campus events
• Play at local venues in Da Nang
• Record music at the campus studio
• Collaborate with other musicians

Event Locations:
• Main Auditorium - Large performances
• Student Center - Smaller events
• Outdoor Stage (Weather permitting)
• Practice Studios - Rehearsals`
    },
    {
      id: 'learning',
      title: 'Learning Music at FPTU',
      icon: '📚',
      content: `Whether you're a beginner or advanced musician:

Formal Classes:
• Music electives for interested students
• Music theory courses
• Introduction to music production
• Sound engineering basics

Informal Learning:
• Club lessons (often free or cheap)
• Peer-to-peer mentoring
• YouTube learning resources
• Band rehearsals with other students

Resources Available:
• Practice rooms in the music building
• Equipment rental for club members
• Soundproofed studios
• Amplifiers and PA systems
• Recording equipment (for club events)

Tips for Getting Started:
1. Start with a club that interests you
2. Don't worry if you can't play an instrument - clubs have lessons
3. Practice regularly with friends
4. Attend performances to get inspired
5. Join jam sessions with other musicians
6. Consider getting a private instructor (available locally)

Budget Tips:
• Borrow instruments from clubs
• Buy affordable starter instruments
• Rent expensive instruments instead of buying
• Share costs with bandmates`
    },
    {
      id: 'performances',
      title: 'Getting into Performances',
      icon: '🎭',
      content: `How to become a performer at FPTU:

Solo Performers:
1. Register for talent shows and competitions
2. Perform at open mic nights
3. Audition for festival performances
4. Create content for social media

Band/Group Performers:
1. Form a band with friends
2. Rehearse regularly and develop a setlist
3. Submit applications to event organizers
4. Start with smaller events first
5. Network with other bands

Performance Tips:
• Practice your set multiple times
• Learn stage presence and confidence
• Interact with the audience
• Start with easier/shorter performances
• Get feedback from mentors
• Record your performances for portfolio

Promotion:
• Use social media to build a following
• Collaborate with other musicians
• Create posters for campus events
• Spread word through clubs
• Post on bulletin boards

Next Steps:
If you love performing, consider:
• Auditioning for band competitions
• Joining the campus orchestra
• Starting your own music group
• Pursuing music as an elective or minor`
    },
    {
      id: 'resources',
      title: 'Music Resources & Contacts',
      icon: '📞',
      content: `Important contacts and resources:

Music Department:
• Location: Building A, 3rd Floor
• Email: music@fptu.edu.vn
• Phone: +84-236-XXXX-XXX
• Office Hours: Mon-Fri, 8 AM - 5 PM

Club Leadership:
• Guitar Club President: Nguyễn Văn A
• Piano Club: Contact Music Department
• Band Club: Instagram @fptu.bandclub
• Traditional Music: Contact Music Department

Useful Websites:
• FPTU Music Portal: music.fptu.edu.vn
• Student Activities: activities.fptu.edu.vn
• Music Store Contacts: Available at department
• Local Music Venues in Da Nang

Equipment Rental:
• Amplifiers and speakers
• Microphones and cables
• Drums and percussion
• DJ equipment
• Contact: Music Department

Studio Booking:
• Reserve practice rooms online
• Book recording studio slots
• Equipment checkout system
• Free for club events`
    }
  ]

  return (
    <div>
      {sections.map(section => (
        <div key={section.id}>
          <h2>
            {section.icon} {section.title}
            <Button onClick={() => setExpandedSection(section.id === expandedSection ? null : section.id)}>
              {section.id === expandedSection ? 'Collapse' : 'Expand'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </h2>
          {section.id === expandedSection && <div>{section.content}</div>}
        </div>
      ))}
    </div>
  )
}
