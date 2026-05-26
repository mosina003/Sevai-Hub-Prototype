import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, AlertCircle, Plus, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const updates = [
  {
    icon: Zap,
    title: 'New feature: Track applications in real-time',
    date: '15 May 2025',
    color: 'text-yellow-500',
  },
  {
    icon: AlertCircle,
    title: 'System Maintenance on 20 May 2025 2-4 AM',
    date: '15 May 2025',
    color: 'text-orange-500',
  },
  {
    icon: Plus,
    title: 'New Services Added',
    date: '08 May 2025',
    color: 'text-green-500',
  },
  {
    icon: CheckCircle,
    title: 'Citizen Satisfaction Survey',
    date: '05 May 2025',
    color: 'text-blue-500',
  },
]

export default function LatestUpdatesSection() {
  return (
    <section className="relative py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          <div>
            <Badge variant="outline" className="mb-3 sm:mb-4 bg-primary/5 border-primary/20 text-primary">
              Updates
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Latest Updates
            </h2>
          </div>
          <Link
            href="/updates"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm md:text-base transition-colors group whitespace-nowrap"
          >
            View All
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {updates.map((update, index) => {
            const Icon = update.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white/80 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex gap-4 sm:gap-6">
                  <div className={`flex-shrink-0 p-2 sm:p-3 md:p-4 bg-secondary/80 rounded-lg sm:rounded-xl ${update.color}`}>
                    <Icon className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-2 sm:mb-3 line-clamp-2">
                      {update.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {update.date}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 sm:hidden">
          <Link
            href="/updates"
            className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
