'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DashboardNotifications() {
  const notifications = [
    {
      icon: '✓',
      message: 'Income Certificate Approved',
      time: '2 hours ago',
      type: 'success',
    },
    {
      icon: '📋',
      message: 'Complaint Assigned to Officer',
      time: '5 hours ago',
      type: 'info',
    },
    {
      icon: '🎯',
      message: 'New Scholarship Scheme Available',
      time: '1 day ago',
      type: 'info',
    },
    {
      icon: '⏰',
      message: 'Application Deadline Reminder',
      time: '2 days ago',
      type: 'warning',
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-orange-50 border-orange-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">🔔 Recent Notifications</h2>
        <p className="text-sm text-muted-foreground mt-1">Stay updated with latest changes</p>
      </div>

      <div className="divide-y divide-border">
        {notifications.map((notif, index) => (
          <div key={index} className={`p-4 ${getTypeColor(notif.type)} border-l-4`}>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-1">{notif.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border text-center">
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All Notifications →
        </button>
      </div>
    </Card>
  )
}
