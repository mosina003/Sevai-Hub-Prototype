'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardNotificationsWidget() {
  const router = useRouter()
  
  const notifications = [
    {
      icon: '✓',
      title: 'Income Certificate Approved',
      time: '2 hours ago',
      type: 'success',
      href: '/dashboard/applications/APP-2026-001',
    },
    {
      icon: '✓',
      title: 'Complaint Assigned to Officer',
      time: '1 day ago',
      type: 'success',
      href: '/dashboard/complaints/CMP-2026-001',
    },
    {
      icon: '🎓',
      title: 'New Scholarship Scheme Available',
      time: '2 days ago',
      type: 'info',
      href: '/dashboard/schemes',
    },
    {
      icon: '⏳',
      title: 'Application Under Review',
      time: '3 days ago',
      type: 'pending',
      href: '/dashboard/applications/APP-2026-002',
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">🔔 Recent Updates</h2>
          <Link href="/dashboard/notifications">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View All →
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {notifications.map((notif, idx) => (
          <div 
            key={idx} 
            className="flex gap-3 pb-3 cursor-pointer hover:bg-slate-50/50 p-2 -mx-2 rounded transition-colors"
            onClick={() => router.push(notif.href)}
            style={{borderBottom: idx !== notifications.length - 1 ? '1px solid #f0f0f0' : 'none'}}
          >
            <div className="text-lg flex-shrink-0">{notif.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{notif.title}</p>
              <p className="text-xs text-muted-foreground">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
