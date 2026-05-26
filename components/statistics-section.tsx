import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, FileText, ShieldCheck, Clock } from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: '12.8L+',
    label: 'Citizens Served',
    growth: '35%',
  },
  {
    icon: FileText,
    number: '45.3L+',
    label: 'Applications Processed',
    growth: '42%',
  },
  {
    icon: ShieldCheck,
    number: '31.9L+',
    label: 'Complaints Resolved',
    growth: '38%',
  },
  {
    icon: Clock,
    number: '4.2',
    label: 'Days Avg. Resolution',
    growth: '15%',
  },
]

export default function StatisticsSection() {
  return (
    <section className="relative py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <Badge variant="outline" className="mb-3 sm:mb-4 bg-primary/5 border-primary/20 text-primary">
            By The Numbers
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            SevaiHub Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="group relative overflow-hidden bg-white/80 backdrop-blur border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                      <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-primary/60">+{stat.growth}</span>
                  </div>

                  <div className="mb-2 sm:mb-4">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                      {stat.number}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
