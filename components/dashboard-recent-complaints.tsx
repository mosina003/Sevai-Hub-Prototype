'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardRecentComplaints() {
  const router = useRouter()
  const complaints = [
    {
      id: 'CMP-2026-001',
      department: 'Roads & Infrastructure',
      status: 'In Progress',
      priority: 'High',
      statusColor: 'bg-orange-100 text-orange-700',
      priorityColor: 'bg-red-100 text-red-700',
    },
    {
      id: 'CMP-2026-002',
      department: 'Water Supply',
      status: 'Resolved',
      priority: 'Medium',
      statusColor: 'bg-green-100 text-green-700',
      priorityColor: 'bg-yellow-100 text-yellow-700',
    },
  ]

  return (
    <Card className="border-0 shadow-sm mb-8">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">⚠️ My Recent Complaints</h2>
            <p className="text-sm text-muted-foreground mt-1">Monitor the status of your filed grievances</p>
          </div>
          <Link href="/dashboard/complaints">
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
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Complaint ID</th>
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Department</th>
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Status</th>
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Priority</th>
              <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr 
                key={complaint.id} 
                className="border-b border-border hover:bg-slate-50/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/dashboard/complaints/${complaint.id}`)}
              >
                <td className="p-4 font-mono text-sm font-semibold text-primary">{complaint.id}</td>
                <td className="p-4 text-sm">{complaint.department}</td>
                <td className="p-4">
                  <Badge className={complaint.statusColor} variant="secondary">
                    {complaint.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge className={complaint.priorityColor} variant="secondary">
                    {complaint.priority}
                  </Badge>
                </td>
                <td className="p-4">
                  <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                    Track →
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
