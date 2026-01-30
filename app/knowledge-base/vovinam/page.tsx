'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function VovinamPage() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('basics')

  const sections = [
    {
      id: 'basics',
      title: 'What is Vovinam?',
      icon: '🥋',
      content: `Vovinam (Việt Võ Đạo) is a modern Vietnamese martial art created in 1938. It combines traditional Vietnamese fighting techniques with influences from other martial arts. The art emphasizes speed, power, and flexibility.

Key Characteristics:
• Combines kicking techniques (inspired by Chinese martial arts)
• Hand techniques and grappling (inspired by Judo)
• Philosophical approach to martial training
• Emphasis on self-defense and character development`
    },
    {
      id: 'training',
      title: 'Training at FPTU',
      icon: '👥',
      content: `Vovinam training is a mandatory part of physical education for first-year students at FPTU.

Training Schedule:
• Sessions: 2 times per week
• Duration: 90 minutes per session
• Location: Sports Complex, Main Campus
• Time Slots: Monday & Wednesday (7:00-8:30 AM or 3:00-4:30 PM)

What to Bring:
• Comfortable athletic clothing
• Training shoes (not required for basics)
• Water bottle
• Towel
• No jewelry or valuables`
    },
    {
      id: 'techniques',
      title: 'Basic Techniques',
      icon: '💪',
      content: `Basic Vovinam techniques include:

Kicking Techniques:
• Straight kick (đá thẳng)
• Roundhouse kick (đá vòng)
• Side kick (đá ngang)
• Spinning kick (đá xoay)

Hand Techniques:
• Punch (đấm thẳng)
• Hook punch (đấm móc)
• Palm strike (tấc hạ)
• Elbow strike (khuỷu đập)

Defense:
• Blocking (chặn)
• Parrying (chống)
• Footwork and distance management`
    },
    {
      id: 'ranking',
      title: 'Belt Ranking System',
      icon: '🏅',
      content: `Vovinam uses a belt ranking system to measure progress:

Beginner Levels:
• White belt - Beginner
• Yellow belt - Basic techniques mastered
• Orange belt - Intermediate foundation
• Green belt - Growing proficiency

Advanced Levels:
• Blue belt - Advanced student
• Brown belt - Expert student
• Black belt - Master instructor

Testing Requirements:
Students typically test every 2-3 months. Tests include technique demonstration, physical fitness tests, and sparring.`
    },
    {
      id: 'tips',
      title: 'Tips for Success',
      icon: '⭐',
      content: `How to make the most of Vovinam training:

During Training:
• Arrive 10 minutes early to warm up
• Ask your instructor for corrections
• Practice forms regularly
• Focus on technique over speed initially
• Stay hydrated throughout sessions

Outside of Class:
• Practice basic techniques at home (10-15 min daily)
• Stretch regularly to improve flexibility
• Watch instructional videos online
• Join practice sessions with other students
• Maintain good physical fitness

Mental Approach:
• Be patient with your progress
• Respect your instructors and classmates
• Focus on discipline and self-improvement
• Don't compare yourself to others
• Enjoy the learning process`
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      icon: '❓',
      content: `Q: Do I need prior martial arts experience?
A: No! Vovinam training starts from the basics. Everyone begins as a beginner.

Q: What if I have an injury or physical limitation?
A: Talk to your instructor. They can provide modifications for most exercises.

Q: Can I attend extra training sessions?
A: Yes! Many clubs offer additional training. Check the sports complex bulletin board.

Q: What's the difference between Vovinam and other martial arts?
A: Vovinam emphasizes speed and fluidity. It's also very kicks-focused compared to some other arts.

Q: Do I need to buy special equipment?
A: Basic comfortable clothes work. Eventually, you might want a proper uniform (áo võ).

Q: How often should I practice outside of class?
A: Even 10-15 minutes daily helps significantly with progress.`
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
          <span className="text-5xl">🥋</span>
          <h1 className="text-4xl sm:text-5xl font-bold">Vovinam Training Guide</h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about vovinam training at FPTU, from basics to advanced techniques.
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

      {/* Quick Stats */}
      <section className="bg-card/50 border-y border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1938</div>
              <p className="text-sm text-muted-foreground">Year Founded</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">180+</div>
              <p className="text-sm text-muted-foreground">Countries Worldwide</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <p className="text-sm text-muted-foreground">Belt Levels</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">∞</div>
              <p className="text-sm text-muted-foreground">Room to Grow</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Start Training?</h2>
          <p className="text-muted-foreground">
            Your first session is just around the corner. Talk to your PE instructor for more details!
          </p>
          <Link href="/assistant">
            <Button className="gap-2">
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
