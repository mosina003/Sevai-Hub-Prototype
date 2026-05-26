'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function DashboardRecentApplications() {
  const applications = [
    {
      id: 'APP-2026-001',
      service: 'Income Certificate',
      status: 'Approved',
      date: '2026-05-15',
      statusColor: 'bg-green-100 text-green-700',
    },
    {
      id: 'APP-2026-002',
      service: 'Community Certificate',
      status: 'Under Review',
      date: '2026-05-10',
      statusColor: 'bg-blue-100 text-blue-700',
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  return (
    <Card className="border-0 shadow-sm mb-8">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">📄 My Recent Applications</h2>
            <p className="text-sm text-muted-foreground mt-1">Track your submitted service applications</p>
          </div>
          <Link href="/dashboard/applications">
            <Button variant="outline" size="sm">
              View All →
            </Button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50/50">
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Application ID</th>
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Service</th>
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Status</th>
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Date</th>
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-border hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-mono text-sm font-semibold text-primary">{app.id}</td>
                <td className="p-4 text-sm">{app.service}</td>
                <td className="p-4">
                  <Badge className={app.statusColor} variant="secondary">
                    {app.status}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{formatDate(app.date)}</td>
                <td className="p-4">
                  <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                    View Details →
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
