import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'

const quickActions = [
  {
    icon: FileSearch,
    title: 'Find services fast',
    description: 'Browse certificates, tax payments, and applications in one place.',
    accent: 'text-primary',
  },
  {
    icon: CheckCircle2,
    title: 'Stay on top of status',
    description: 'Track your application or complaint without waiting in line.',
    accent: 'text-emerald-600',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted assistance',
    description: 'Use verified government workflows and guidance for every request.',
    accent: 'text-sky-600',
  },
]

export default function QuickActionsSection() {
  return (
    <section className="relative py-8 sm:py-10 md:py-14">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1.25fr] gap-4 sm:gap-6 items-stretch">
          <Card className="overflow-hidden border border-primary/10 bg-white/90 shadow-[0_24px_70px_-30px_rgba(15,76,129,0.35)] backdrop-blur rounded-2xl sm:rounded-3xl">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <Badge variant="secondary" className="mb-2 sm:mb-3 bg-primary/10 text-primary hover:bg-primary/10 text-xs sm:text-sm">
                    Citizen Services
                  </Badge>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    Everything you need, one step away.
                  </h2>
                </div>
                <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                  <Clock3 className="h-6 w-6" />
                </div>
              </div>

              <div className="grid gap-3 sm:gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <div
                      key={action.title}
                      className="group rounded-lg sm:rounded-2xl border border-border bg-slate-50/80 p-3 sm:p-4 transition-all hover:border-primary/20 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        <div className={`flex h-10 sm:h-12 w-10 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-white shadow-sm ${action.accent}`}>
                          <Icon className="h-4 sm:h-5 w-4 sm:w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-foreground">
                            {action.title}
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm leading-6 text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/login">
                  <Button className="rounded-xl bg-primary px-5 py-6 text-white shadow-lg shadow-primary/20 hover:bg-primary/90">
                    Start a Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Use the government portal to apply, track, and resolve with less friction.
                </p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border border-border bg-[linear-gradient(135deg,rgba(15,76,129,0.06),rgba(255,255,255,0.9))] shadow-[0_24px_70px_-34px_rgba(15,76,129,0.28)] rounded-3xl">
            <div className="p-6 md:p-8 lg:p-10 flex items-center justify-center">
              <div className="w-full max-w-md rounded-2xl border border-primary/10 bg-white/90 p-6 shadow-sm">
                <Badge variant="outline" className="mb-4 w-fit border-primary/15 text-primary bg-white">
                  Track & resolve
                </Badge>
                <h2 className="text-2xl font-bold text-foreground leading-tight">
                  Check your request status without waiting at the counter.
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Search by application ID or complaint number to see the latest progress, reduce follow-up time, and keep every update in one place.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    Real-time progress
                  </Badge>
                  <Badge variant="secondary" className="bg-sky-50 text-sky-700 hover:bg-sky-50">
                    Complaint updates
                  </Badge>
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                    Fast search
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}