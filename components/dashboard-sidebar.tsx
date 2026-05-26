'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', href: '/dashboard' },
    { icon: '📋', label: 'Services', href: '/dashboard/services' },
    { icon: '📄', label: 'My Applications', href: '/dashboard/applications' },
    { icon: '⚠️', label: 'My Complaints', href: '/dashboard/complaints' },
    { icon: '🔔', label: 'Notifications', href: '/dashboard/notifications' },
    { icon: '📁', label: 'Documents', href: '/dashboard/documents' },
    { icon: '🤖', label: 'AI Assistant', href: '/dashboard/ai-assistant' },
    { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
  ]

  const handleLogout = () => {
    window.sessionStorage.clear()
    window.localStorage.removeItem('sevaihub-user')
    window.location.href = '/login'
  }

  return (
    <>
      {/* Desktop Collapse Toggle */}
      <div className="hidden lg:block absolute -right-3 top-6 z-50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 bg-border hover:bg-border/80 text-foreground rounded-full transition-colors"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-primary text-white rounded-lg"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen bg-primary text-white transition-all duration-300 z-40 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-56'
        } w-56 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
      >
        {/* Logo Section */}
        <div className={`px-4 py-6 border-b border-white/20 transition-all ${isCollapsed ? 'lg:py-4' : ''}`}>
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className={`rounded-lg flex items-center justify-center text-lg font-bold bg-white/15 transition-all ${isCollapsed ? 'lg:w-8 lg:h-8' : 'w-10 h-10'}`}>
              🏛️
            </div>
            <div className={`transition-all overflow-hidden ${isCollapsed ? 'lg:hidden' : ''}`}>
              <h1 className="font-bold text-lg">SevaiHub</h1>
              <p className="text-xs text-white/70">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className={`flex-1 space-y-2 transition-all ${isCollapsed ? 'lg:px-2 lg:py-4' : 'p-4'}`}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg transition-all ${
                  isCollapsed ? 'lg:px-2 lg:py-2 lg:justify-center' : 'px-4 py-3'
                } ${
                  isActive
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/85 hover:bg-white/10'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`text-sm transition-all ${isCollapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className={`border-t border-white/20 transition-all ${isCollapsed ? 'lg:p-2' : 'p-4'}`}>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full text-white hover:bg-white/10 transition-all ${isCollapsed ? 'lg:px-2' : ''}`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <span>{isCollapsed ? '' : '🚪 Logout'}</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
