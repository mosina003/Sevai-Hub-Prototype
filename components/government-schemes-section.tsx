import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function GovernmentSchemesSection() {
  return (
    <section className="relative py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Left side - Content */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6">
                Explore Government Schemes
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 mb-6 sm:mb-8 leading-relaxed">
                Find welfare schemes and benefits that you are eligible for.
              </p>
              <Link href="/schemes">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 md:py-6 h-auto rounded-lg sm:rounded-xl font-semibold flex items-center gap-2 w-fit text-sm md:text-base cursor-pointer">
                  Explore Schemes
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
              </Link>
            </div>

            {/* Right side - Illustration */}
            <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 rounded-lg sm:rounded-xl overflow-hidden order-1 lg:order-2">
              <Image
                src="/family-illustration.png"
                alt="Indian family representing government schemes"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
