import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, Bot } from 'lucide-react'
import Link from 'next/link'

export default function AiAssistantSection() {
  return (
    <section className="relative py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Left side - Content */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6">
                Ask Our AI Assistant
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 mb-6 sm:mb-8 leading-relaxed">
                Get instant answers to your questions about services, documents, eligibility and more.
              </p>
              <Link href="/chat">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 md:py-6 h-auto rounded-lg sm:rounded-xl font-semibold flex items-center gap-2 w-fit text-sm md:text-base cursor-pointer">
                  <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                  Chat Now
                </Button>
              </Link>
            </div>

            {/* Right side - AI Icon */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Bot className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 text-primary" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
