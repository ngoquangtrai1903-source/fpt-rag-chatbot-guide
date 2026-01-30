'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function StudentLifePage() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('housing')

  const sections = [
    {
      id: 'housing',
      title: 'Housing & Dormitories',
      icon: '🏠',
      content: `FPTU offers on-campus housing for most first-year students.

Available Dormitories:
• A Dormitory - Newest, renovated (best reputation)
• B Dormitory - Near library and study areas
• C Dormitory - Center of campus
• D Dormitory - Quieter area
• E Dormitory - Close to sports complex

Room Types:
• Double rooms (most common for first-years)
• Triple rooms (some available)
• Single rooms (limited, harder to get)

Typical Room Features:
• 2-3 beds with mattresses
• Individual study desks
• Shared bathroom (1-2 bathrooms per 6-8 students)
• Air conditioning (some dorms)
• Good internet connection
• Windows and natural light

Cost & Housing:
• Dormitory fee: ~3-5 million VND per year
• Paid through semester tuition
• Housing application in summer
• Room assignments made by administration
• Room requests submitted but not always granted

Housing Tips:
1. Apply early for housing assignment
2. Research different dorms online (student reviews)
3. Be ready to be flexible with roommates
4. Keep dorm rooms clean (inspections monthly)
5. Respect quiet hours (usually 10 PM - 6 AM)
6. Build good relationships with roommates

Dorm Rules:
• No loud music after 10 PM
• No cooking in rooms
• No overnight guests without permission
• Keep rooms clean and safe
• Use communal kitchens if available
• Respect privacy of roommates
• Report maintenance issues immediately`
    },
    {
      id: 'dining',
      title: 'Food & Dining Options',
      icon: '🍽️',
      content: `Multiple dining options available on campus:

Main Dining Hall:
• Buffet-style meals
• Breakfast: 6:30-8:30 AM (30,000-50,000 VND)
• Lunch: 11:00 AM-1:30 PM (60,000-100,000 VND)
• Dinner: 4:30-7:00 PM (60,000-100,000 VND)
• Meal card available (discounted monthly pass)

Food Courts & Cafés:
• Building A Cafe - Western and Vietnamese food
• Building C Food Court - Pho, bánh mỳ, noodles
• Student Center Cafe - Coffee, snacks, desserts
• Library Cafe - Quiet spot for studying
• Various food stalls around campus

Popular Local Dishes & Prices:
• Phở (noodle soup) - 40,000-60,000 VND
• Bánh mỳ (Vietnamese sandwich) - 30,000-50,000 VND
• Cơm tấm (broken rice) - 50,000-80,000 VND
• Spring rolls - 30,000-40,000 VND
• Iced coffee - 20,000-30,000 VND

Budget Tips:
• Meal plans save 10-20% compared to daily purchases
• Eat at lunch (cheaper than dinner)
• Buy snacks from local shops (cheaper than campus)
• Cook in dorm kitchen if available
• Split costs with friends
• Budget ~200,000-300,000 VND per week for food

Dietary Needs:
• Vegetarian options available
• Request religious accommodations
• Allergy-friendly meals upon request
• Halal options available
• Talk to dining hall manager about special needs

Tips:
• Bring reusable containers for discounts
• Eat with friends to share tables
• Try new foods and explore local flavors
• Support on-campus vendors
• Check for special events and themed meals`
    },
    {
      id: 'transport',
      title: 'Transportation & Getting Around',
      icon: '🚌',
      content: `Getting around Da Nang and to/from FPTU:

Campus Transportation:
• Campus is walkable (most areas within 15 min walk)
• Bicycle racks available throughout
• Electric scooter rentals on campus
• Campus shuttle for far locations (free for students)

Public Transportation in Da Nang:
• Buses - Cheap but crowded
• Cost: 10,000-20,000 VND per trip
• Bus routes #1, #4, #7 pass by campus
• Download DaNangBus app for schedules

Taxis & Ride-Sharing:
• Grab app - Most popular ride-sharing
• Taxi companies - Reliable but more expensive
• Estimate cost: 50,000-150,000 VND for short trips
• Always use official apps for safety

Motorcycles & Scooters:
• Many students rent bikes
• Rental: 50,000-100,000 VND per day
• Helmet is mandatory (legally & safety)
• Lock your bike securely
• Insurance recommended

Bikes & Bicycles:
• Great for on-campus commuting
• Rental shops near campus: 30,000-60,000 VND/day
• Many students buy cheap bikes (500k-1M VND)
• Bike-sharing programs available

Getting Around Campus:
• Map app of campus available online
• Ask senior students for directions
• Most buildings clearly labeled
• Campus is well-maintained
• Walking is the primary method

Popular Destinations from FPTU:
• Da Nang City Center - 15-20 min by bus
• My Khe Beach - 10-15 min by bike
• Hoi An (nearby) - 1 hour by bus
• Mountains - Good day trip options
• Local shops and restaurants - Walking distance

Transportation Budget:
• Monthly pass (bus): 200,000 VND
• Bike rental (if no purchase): 1.5-2M VND/month
• Grab rides (occasional): 200,000-300,000 VND/month
• Total monthly: 200k-2M VND depending on choices`
    },
    {
      id: 'campus',
      title: 'Campus Map & Important Locations',
      icon: '🗺️',
      content: `Key Locations at FPTU:

Administrative Buildings:
• Building A - Main Administration & Admissions
• Building B - Academic Affairs
• Building C - Student Services & Health Center
• Building D - Registrar Office

Academic Buildings:
• Engineering Building - Engineering & Tech programs
• Business Building - Business & Management
• Architecture Building - Design & Architecture
• Language Building - Foreign Language Center

Facilities:
• Library (Central) - 3 floors, study areas, computers
• Computer Labs - Multiple locations for IT work
• Science Labs - Chemistry, Physics, Biology labs
• Design Studios - Graphics & Architecture workspace

Student Life:
• Student Center - Cafe, events, clubs
• Sports Complex - Gym, basketball, badminton
• Football Field - Athletics training
• Swimming Pool - Sports activities

Dining & Food:
• Main Dining Hall - Central location
• Food Courts - Multiple locations
• Cafes - Throughout campus
• Convenience Stores - Various spots

Health & Support:
• Student Health Center - Basic medical care
• Counseling Office - Mental health support
• International Student Office - Support services
• Academic Advising - Study help

Outdoor Spaces:
• Central Garden - Relaxation area
• Study Pavilions - Outdoor seating
• Green Spaces - Parks throughout campus
• Walking Paths - Connect different areas

Tech Support:
• IT Help Desk - Building A basement
• Computer Lab Support - Various labs
• Network Issues - Contact IT office
• Phone: +84-236-XXXX

Important Tips:
1. Get a physical campus map
2. Explore campus in first weeks
3. Know building locations for classes
4. Mark important office locations
5. Join campus tours in orientation
6. Ask for directions - students are helpful
7. Download campus app if available`
    },
    {
      id: 'activities',
      title: 'Student Activities & Clubs',
      icon: '🎉',
      content: `FPTU has a vibrant student life with many clubs and activities:

Academic Clubs:
• Computer Science Club - Programming and tech
• Robotics Club - Building and programming robots
• Entrepreneurship Club - Business and startup focus
• Photography Club - Photography skills and exhibitions
• Debate Club - Speaking and argumentation

Arts & Cultural Clubs:
• Music Club (various sub-clubs)
• Dance Club - Modern and traditional
• Theater Club - Drama and performances
• Art Club - Painting, sculpture, design
• Traditional Culture Club - Vietnamese traditions

Sports Clubs:
• Basketball Club
• Football Club
• Badminton Club
• Volleyball Club
• Table Tennis Club
• Swimming Club
• Running Club

Service & Leadership:
• Student Government Association
• Volunteer Club - Community service
• Environmental Club - Sustainability efforts
• International Student Association
• Mentoring Program - Help younger students

Interest-Based:
• Gaming Club - Esports and game development
• Anime & Manga Club
• Board Game Club
• Cooking Club
• Travel Club - Plan trips together
• Green Tea Club - Social gathering

How to Join:
1. Attend Club Fair (September)
2. Visit club booths and tables
3. Sign up and get contact info
4. Attend first meeting
5. Most clubs are FREE to join
6. Can join multiple clubs

Benefits of Joining:
• Make new friends with shared interests
• Develop new skills
• Improve your CV
• Have fun outside of classes
• Network with like-minded people
• Represent FPTU in competitions
• Plan and organize events

Event Calendar:
• September - Club Fair & orientation events
• Monthly - Club meetings and activities
• October - Opening ceremonies
• November - Sports competitions
• December - Year-end parties and concerts
• January - Reflection and planning
• Throughout Year - Various tournaments and exhibitions`
    },
    {
      id: 'money',
      title: 'Money Management & Budgeting',
      icon: '💰',
      content: `Smart financial management as a student:

Monthly Budget Breakdown (Average):
• Accommodation: 500k-1.5M VND (included in tuition)
• Food: 2-3M VND (varies by preferences)
• Transportation: 200k-1M VND
• Entertainment: 500k-1M VND
• Study materials: 200k-500k VND
• Miscellaneous: 200k-500k VND
• TOTAL: 3.6-6.5M VND per month

Financial Aid & Support:
• Merit-based scholarships available
• Need-based financial aid
• Work-study programs on campus
• Part-time job opportunities
• Apply through Student Services office

Part-Time Job Opportunities:
• Campus jobs (library, labs, admin) - 100k-150k VND/week
• Tutoring (especially English) - 150k-300k VND/hour
• Freelance work (design, writing) - Varies
• Food delivery apps - 50k-100k VND/day
• Retail or hospitality - 3-4M VND/month
• Teaching English at local centers - 5-7M VND/month

Banking in Vietnam:
• Open a student bank account (free)
• Vietcombank, Techcombank popular
• Mobile banking app for transfers
• No hidden fees typically
• Can receive remittances from family

Money-Saving Tips:
1. Use public transportation (cheaper than Grab)
2. Eat at campus dining (cheaper than outside)
3. Buy books used or borrow from library
4. Use student discounts (many shops offer them)
5. Cook with roommates to split costs
6. Share subscriptions and services
7. Buy supplies in bulk with friends
8. Avoid unnecessary shopping and impulse buys

Payment Methods:
• Cash - Still widely used in Vietnam
• Debit/Credit cards - Accepted at most places
• Mobile payment apps - Momo, Zalo Pay, GCash
• Bank transfers - For rent and tuition
• ATMs - Withdraw cash (small fee)

Tuition & Fee Information:
• Tuition: 50-80M VND per year (varies by major)
• Paid by semester
• Dorm fee: Included in overall cost
• Installment plans available
• Apply for scholarship/aid early

Financial Planning:
• Track your spending monthly
• Set a budget and stick to it
• Save for emergencies
• Reduce unnecessary expenses
• Plan for special events/travel
• Consider your future (textbooks, senior year)`
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
          <span className="text-5xl">🏫</span>
          <h1 className="text-4xl sm:text-5xl font-bold">Student Life Guide</h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about living, studying, and thriving at FPTU.
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

      {/* Quick Facts */}
      <section className="bg-card/50 border-y border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5K+</div>
              <p className="text-sm text-muted-foreground">First-Year Students</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <p className="text-sm text-muted-foreground">Active Clubs</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3.6-6.5M</div>
              <p className="text-sm text-muted-foreground">VND Monthly Budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-xl border border-border overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground">
            Have specific questions about campus life? Get personalized advice from our AI assistant.
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
