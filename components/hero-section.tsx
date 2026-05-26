import { Button } from '@/components/ui/button'
import { ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden min-h-screen bg-slate-950">
      <div className="absolute inset-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Ripon_Building_Chennai.JPG"
          alt="Chennai civic building"
          className="h-full w-full object-cover object-center md:object-[center_35%]"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/65 to-primary/20 md:to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32 lg:py-48 min-h-screen flex items-center">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 text-balance">
            Your Needs,{' '}
            <span className="text-yellow-300">
              Our Commitment
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 sm:mb-8 leading-relaxed max-w-xl">
            SevaiHub is your one-stop platform to access government services and raise grievances with ease and transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/login">
              <Button className="bg-white hover:bg-white/90 text-primary font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-6 h-auto rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer w-full sm:w-auto">
                Apply for Services
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-white/60 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-6 h-auto rounded-lg sm:rounded-xl font-semibold shadow-lg shadow-black/10 cursor-pointer w-full sm:w-auto"
              >
                <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Raise a Complaint
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
