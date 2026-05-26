'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardRecommendedSchemes() {
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
      icon: '👩‍💼',
      title: "Women's Empowerment",
      description: 'Support programs for women',
      link: '/dashboard/schemes/women',
    },
  ]

  return (
    <Card className="border-0 shadow-sm col-span-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">🏛️ Schemes You May Qualify For</h2>
          <Link href="/dashboard/schemes">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View All →
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {schemes.map((scheme) => (
          <Link key={scheme.title} href={scheme.link}>
            <div className="p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
              <div className="text-3xl mb-2">{scheme.icon}</div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{scheme.title}</h3>
              <p className="text-xs text-muted-foreground">{scheme.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
