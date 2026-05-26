'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DashboardStatistics() {
  const stats = [
    {
      icon: '📄',
      label: 'Applications',
      value: '03',
      trend: '+2 this month',
      color: 'bg-blue-50',
      badgeColor: 'bg-blue-100 text-blue-700',
      href: '/dashboard/applications',
    },
    {
      icon: '⚠️',
      label: 'Complaints',
      value: '02',
      trend: 'Actively monitored',
      color: 'bg-orange-50',
      badgeColor: 'bg-orange-100 text-orange-700',
      href: '/dashboard/complaints',
    },
    {
      icon: '⏳',
      label: 'Pending Requests',
      value: '01',
      trend: 'Under review',
      color: 'bg-purple-50',
      badgeColor: 'bg-purple-100 text-purple-700',
      href: '/dashboard/applications',
    },
    {
      icon: '✅',
      label: 'Resolved Requests',
      value: '04',
      trend: 'All completed',
      color: 'bg-green-50',
      badgeColor: 'bg-green-100 text-green-700',
      href: '/dashboard/applications',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat) => (
        <Link key={stat.label} href={stat.href}>
          <Card className={`${stat.color} border-0 hover:shadow-md transition-all h-full cursor-pointer`}>
            <div className="p-6 sm:p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl sm:text-4xl">{stat.icon}</span>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">{stat.value}</h3>
              <div className="mt-auto">
                <Badge className={stat.badgeColor} variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
