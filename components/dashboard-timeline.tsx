'use client'

import { Card } from '@/components/ui/card'

export default function DashboardTimeline() {
  const activities = [
    {
      icon: '✓',
      title: 'Complaint Submitted',
      time: 'Today',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: '✓',
      title: 'Application Approved',
      time: 'Yesterday',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: '📤',
      title: 'Document Uploaded',
      time: '2 Days Ago',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: '⏳',
      title: 'Under Review',
      time: '3 Days Ago',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold">📅 Activity Timeline</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex gap-4 pb-4" style={{borderBottom: idx !== activities.length - 1 ? '1px solid #f0f0f0' : 'none'}}>
            <div className={`${activity.bgColor} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color} font-bold text-sm`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
