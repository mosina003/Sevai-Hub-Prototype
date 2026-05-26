'use client'

import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import QuickActionsSection from '@/components/quick-actions-section'
import StatisticsSection from '@/components/statistics-section'
import PopularServicesSection from '@/components/popular-services-section'
import HowItWorksSection from '@/components/how-it-works-section'
import GovernmentSchemesSection from '@/components/government-schemes-section'
import AiAssistantSection from '@/components/ai-assistant-section'
import LatestUpdatesSection from '@/components/latest-updates-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(15,76,129,0.07),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fbff_48%,#ffffff_100%)] text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10rem] top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-[26rem] h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute left-1/2 top-[60rem] h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <Navbar />
      <HeroSection />
      <QuickActionsSection />
      <StatisticsSection />
      <PopularServicesSection />
      <HowItWorksSection />
      <GovernmentSchemesSection />
      <AiAssistantSection />
      <LatestUpdatesSection />
      <Footer />
    </main>
  )
}
