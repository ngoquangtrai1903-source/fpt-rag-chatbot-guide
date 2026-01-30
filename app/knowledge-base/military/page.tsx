'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function MilitaryPage() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('overview')

  const sections = [
    {
      id: 'overview',
      title: 'Military Training Overview',
      icon: '💂',
      content: `Military training is a mandatory part of the first-year curriculum at FPTU.

Program Objectives:
• Build discipline and physical fitness
• Develop leadership and teamwork skills
• Learn basic military fundamentals
• Instill respect for national service
• Create a sense of community and belonging

Duration & Schedule:
• Total Duration: Full academic year
• Frequency: 2 sessions per week
• Session Length: 90 minutes
• Location: Training Grounds (Main Campus)
• Time Slots: Morning (6:30-8:00 AM) or Afternoon (3:00-4:30 PM)

Who Must Participate:
• All first-year students (mandatory)
• Medical exemptions available with doctor's note
• Physical limitations can be accommodated
• Talk to the military affairs office about constraints

Grade & Credits:
• Counts toward your GPA
• Required for graduation
• Graded on participation, discipline, and physical fitness
• Attendance is critical - tardiness counts against your grade`
    },
    {
      id: 'physical',
      title: 'Physical Training Tests',
      icon: '💪',
      content: `Physical Fitness Requirements:

Tests Conducted Throughout Year:
• 100m sprint
• 800m run
• Push-ups (in 60 seconds)
• Sit-ups (in 60 seconds)
• Long jump
• Rope climbing
• 5km endurance run

Passing Standards (Varies by Gender/Year):
Males:
• 100m sprint: < 13 seconds
• 800m run: < 3:30 minutes
• Push-ups: 30+ in 60 seconds
• Sit-ups: 40+ in 60 seconds

Females:
• 100m sprint: < 15 seconds
• 800m run: < 4:30 minutes
• Push-ups: 20+ in 60 seconds
• Sit-ups: 35+ in 60 seconds

Improvement Tips:
1. Start training 2-3 months before tests
2. Do cardio 3 times per week
3. Do strength training 2 times per week
4. Practice the actual test movements
5. Rest and sleep 7-8 hours nightly
6. Eat balanced, protein-rich meals
7. Stay hydrated throughout training

Resources:
• Campus gym facilities (free for students)
• Training tracks and fields
• Athletic counseling available
• Study groups for fitness preparation`
    },
    {
      id: 'drills',
      title: 'Military Drills & Marching',
      icon: '🎖️',
      content: `Basic Military Formations and Drills:

Common Formations:
• Line formation (straight line)
• Column formation (one behind another)
• Box/Square formation (surrounding area)
• Platoon formation (30-40 soldiers)
• Company formation (100+ soldiers)

Basic Marching Commands:
• "Attention!" (姿勢!) - Stand at attention
• "At ease" (休止!) - Relaxed standing position
• "Forward march" (向前進行!) - Start marching
• "Left turn!" - Turn 90 degrees left
• "Right turn!" - Turn 90 degrees right
• "About face!" - Turn 180 degrees
• "Halt!" - Stop immediately

Marching Practice:
• Weekly formation drills
• Monthly combined marching events
• Final year-end parade
• Precision counts toward your grade

What You'll Learn:
1. Following commands precisely
2. Maintaining formations accurately
3. Synchronizing with the group
4. Responding quickly to instructions
5. Working as a unit, not as individual

Tips for Success:
• Pay attention to the instructor
• Practice at your own time
• Keep your eyes on the person in front
• Maintain consistent pace
• Use proper posture
• Never laugh or break formation during drills`
    },
    {
      id: 'uniforms',
      title: 'Uniforms & Equipment',
      icon: '🎖️',
      content: `What You'll Need to Wear:

Issued Uniform:
• Military-style training shirt
• Pants (usually green or camouflage)
• Training jacket (for cold weather)
• Cap/hat
• Belts
• Note: Usually provided by FPTU for free

Required Personal Items:
• Closed-toe athletic shoes (good grip)
• Socks (white, brown, or black)
• Undergarments (white or neutral)
• Hair accessories if needed (keep hair neat)

Optional but Recommended:
• Sweatband for workouts
• Towel for drying sweat
• Water bottle
• Sports watch (for timing yourself)

Uniform Care:
• Keep uniforms clean and pressed
• Repair any damage immediately
• Store neatly in your locker
• Follow the dress code strictly
• Neat appearance is graded

Appearance Standards:
• Hair should be neat and not touching collar
• No facial hair (except small mustache for males)
• Minimal jewelry or accessories
• Shoes must be clean and polished
• No nail polish or bright colors

Supply Information:
• Uniforms distributed at start of semester
• Replacement uniforms available at cost
• Return uniforms at end of training year
• Refundable deposit for uniform sets`
    },
    {
      id: 'rules',
      title: 'Rules & Discipline',
      icon: '⚖️',
      content: `Military Training Code of Conduct:

Core Rules:
1. Always show respect to instructors
2. Arrive on time (5 minutes early is expected)
3. Follow all commands immediately and completely
4. Maintain proper appearance at all times
5. Do not disturb other training units
6. Keep training areas clean
7. Treat equipment with care
8. No phones or music during training
9. No eating or drinking during drills
10. Support and help your fellow trainees

Attendance Policy:
• Mandatory attendance (95%+ required to pass)
• Excused absences: Medical or official reasons
• Medical excuse requires doctor's note
• Missing more than 2 unexcused sessions affects grade
• Tardiness (more than 5 min) counts as partial absence

Disciplinary Actions:
Minor violations (first offense):
• Verbal warning
• Extra push-ups or running
• Talking to instructor after class

Major violations:
• Detention after training
• Extra physical work
• Report to military affairs office
• Possible course failure if severe/repeated

Very Serious:
• Disrespect to instructors
• Unsafe behavior
• Abandoning training session
• Damaging equipment
• Could result in academic consequences

Tips to Stay Out of Trouble:
1. Always be respectful and polite
2. Arrive early and come prepared
3. Follow instructions the first time
4. Take care of equipment
5. Ask for help if you don't understand
6. Support your teammates
7. Take training seriously
8. Communicate with instructors about concerns`
    },
    {
      id: 'tips',
      title: 'Success Tips & Advice',
      icon: '⭐',
      content: `How to Make the Most of Military Training:

Mental Preparation:
• See it as personal development, not punishment
• Approach with a positive attitude
• View challenges as opportunities to grow
• Build camaraderie with your classmates
• Focus on self-improvement, not competing

Physical Preparation:
• Start fitness training in summer before starting
• Build a routine gradually
• Don't try to do everything at once
• Sleep 7-8 hours per night
• Eat nutritious, balanced meals
• Stay hydrated throughout training

During Training:
• Listen carefully to all instructions
• Ask questions if you don't understand
• Give your best effort every session
• Encourage your teammates
• Maintain discipline and focus
• Have fun with your friends while training

Social Benefits:
• You'll build strong friendships
• Create bonds through shared challenges
• Meet students from different majors
• Develop teamwork skills
• Create lasting memories

Common Struggles (and Solutions):
• "It's too hard" → It gets easier with time and practice
• "I don't like running" → Focus on improving your pace
• "I feel tired" → Improve sleep and nutrition
• "I don't like the instructors" → Respect them, they care about you
• "Everyone's better than me" → You're on the same journey as others
• "I'd rather sleep in" → Set an alarm, the first week is the hardest

Final Advice:
Remember, military training is temporary (one year) but the skills, fitness, and friendships are forever. Embrace the challenge, respect the process, and you'll look back fondly on this experience. Many students say it was one of the best parts of their freshman year!`
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
          <span className="text-5xl">💪</span>
          <h1 className="text-4xl sm:text-5xl font-bold">Military Training Guide</h1>
          <p className="text-lg text-muted-foreground">
            Complete information about the mandatory military training program for first-year students.
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

      {/* Key Facts */}
      <section className="bg-card/50 border-y border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Key Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1 Year</div>
              <p className="text-sm text-muted-foreground">Duration</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">2x/week</div>
              <p className="text-sm text-muted-foreground">Session Frequency</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%+</div>
              <p className="text-sm text-muted-foreground">Attendance Required</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Free</div>
              <p className="text-sm text-muted-foreground">Cost to Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Still Have Questions?</h2>
          <p className="text-muted-foreground">
            Get personalized advice about military training from our AI assistant.
          </p>
          <Link href="/assistant">
            <Button className="gap-2">
              Chat with FPTU Assistant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
