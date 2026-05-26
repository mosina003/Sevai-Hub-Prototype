import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowRight, ClipboardCheck, Search, Sparkles, UserRound } from 'lucide-react'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Find the right service',
    description: 'Search by need, department, or document type to locate the exact request flow.',
  },
  {
    icon: ClipboardCheck,
    step: '02',
    title: 'Submit with clarity',
    description: 'Use structured forms and supported prompts so your application is complete the first time.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Follow every update',
    description: 'Stay informed with status changes, alerts, and useful next-step guidance.',
  },
  {
    icon: UserRound,
    step: '04',
    title: 'Get support when needed',
    description: 'Use the AI assistant or service desk links for help with documents and eligibility.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
              Simple process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              A clearer journey from request to resolution.
            </h2>
            <p className="mt-4 text-base md:text-lg leading-7 text-muted-foreground">
              The homepage now guides citizens through the same path they actually take on the portal: search, submit, track, and get help.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View process details
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <Card
                key={step.step}
                className="group rounded-3xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.35em] text-muted-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}