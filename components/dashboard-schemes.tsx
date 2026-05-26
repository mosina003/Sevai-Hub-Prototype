'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardSchemes() {
  const schemes = [
    {
      icon: '🎓',
      title: 'Scholarship Scheme',
      description: 'Financial aid for higher education',
      link: '/dashboard/schemes/scholarship',
    },
    {
      icon: '👨‍🌾',
      title: 'Farmer Subsidy',
      description: 'Agricultural support and grants',
      link: '/dashboard/schemes/farmer',
    },
    {
      icon: '👩‍🦰',
      title: "Women's Welfare Scheme",
      description: 'Empowerment and support programs',
      link: '/dashboard/schemes/women',
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">🏛️ Government Schemes</h2>
            <p className="text-sm text-muted-foreground mt-1">Personalized schemes you may be eligible for</p>
          </div>
          <Link href="/dashboard/schemes">
            <Button variant="outline" size="sm">
              View All →
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {schemes.map((scheme) => (
          <Link key={scheme.title} href={scheme.link}>
            <Card className="border hover:shadow-md transition-all cursor-pointer h-full">
              <div className="p-4">
                <div className="text-3xl mb-3">{scheme.icon}</div>
                <h3 className="font-bold text-sm mb-1">{scheme.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{scheme.description}</p>
                <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                  View Details →
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  )
}
