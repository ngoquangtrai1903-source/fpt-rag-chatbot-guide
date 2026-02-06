'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Home, 
  BookOpen, 
  Users, 
  Calendar, 
  Bot, 
  Menu, 
  X
} from 'lucide-react'

interface NavigationProps {
  currentPath?: string
}

export function Navigation({ currentPath = '/' }: NavigationProps) {
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
      href: '/',
      label: 'Trang chủ',
      icon: Home,
      description: 'Trang chính',
      requiresAuth: false
    },
    {
      href: '/knowledge-base',
      label: 'Knowledge Base',
      icon: BookOpen,
      description: 'Kiến thức',
      requiresAuth: false
    },
    {
      href: '/community',
      label: 'Cộng đồng',
      icon: Users,
      description: 'Hỏi đáp',
      requiresAuth: false
    },
    {
      href: '/events',
      label: 'Events',
      icon: Calendar,
      description: 'Sự kiện',
      requiresAuth: false
    },
    {
      href: '/assistant',
      label: 'AI Assistant',
      icon: Bot,
      description: 'Trợ lý AI',
      requiresAuth: false
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link key={item.href} href={item.href}>
              <Button 
                variant={active ? "default" : "ghost"} 
                size="sm" 
                className={`flex items-center gap-2 px-3 py-2 transition-all ${
                  active 
                    ? 'bg-orange-500 text-white shadow-sm' 
                    : 'hover:bg-orange-50 hover:text-orange-600'
                }`}
                title={item.description}
              >
                <Icon size={16} />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border md:hidden">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant={active ? "default" : "ghost"} 
                    className={`w-full justify-start gap-3 px-4 py-3 transition-all ${
                      active 
                        ? 'bg-orange-500 text-white shadow-sm' 
                        : 'hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
