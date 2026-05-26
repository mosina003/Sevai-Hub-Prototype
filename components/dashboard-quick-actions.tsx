'use client'

import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function DashboardQuickActions() {
  const actions = [
    {
      icon: '📋',
      title: 'Apply Service',
      href: '/dashboard/services',
      color: 'hover:bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: '⚠️',
      title: 'Raise Complaint',
      href: '/dashboard/complaints',
      color: 'hover:bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      icon: '📍',
      title: 'Track Status',
      href: '/dashboard/applications',
      color: 'hover:bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      href: '/dashboard/ai-assistant',
      color: 'hover:bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className={`border border-border bg-card cursor-pointer transition-all hover:shadow-md ${action.color}`}>
            <div className="p-4 text-center">
              <div className={`text-3xl mb-2 ${action.iconColor}`}>
                {action.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground">{action.title}</h3>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
