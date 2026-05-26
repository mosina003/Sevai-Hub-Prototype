import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, DollarSign, Users, IdCard, Leaf, Home, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: FileText,
    title: 'Birth Certificate',
    subtitle: 'Apply for birth certificate',
  },
  {
    icon: DollarSign,
    title: 'Income Certificate',
    subtitle: 'Apply for income certificate',
  },
  {
    icon: Users,
    title: 'Community Certificate',
    subtitle: 'Apply for community certificate',
  },
  {
    icon: IdCard,
    title: 'Driving License',
    subtitle: 'Apply for driving license',
  },
  {
    icon: Leaf,
    title: 'Ration Card',
    subtitle: 'Apply for ration card',
  },
  {
    icon: Home,
    title: 'Property Tax',
    subtitle: 'Pay property tax online',
  },
]

export default function PopularServicesSection() {
  return (
    <section className="relative py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          <div>
            <Badge variant="outline" className="mb-3 sm:mb-4 bg-primary/5 border-primary/20 text-primary">
              Services
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Popular Services
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm md:text-base transition-colors group whitespace-nowrap"
          >
            View All Services
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white/80 border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg sm:rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 sm:hidden">
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors group"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
