import { FileCheck, Bell, MessageSquare, Sparkles } from 'lucide-react'

export default function RegisterIllustration() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex flex-col items-center justify-start overflow-hidden px-8 py-12 pt-16">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md text-center">
        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Welcome to Your Digital Governance Hub
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-white/90 mb-12 leading-relaxed">
          Join millions of citizens accessing government services seamlessly and securely
        </p>

        {/* Feature Cards */}
        <div className="space-y-4">
          {[
            {
              icon: FileCheck,
              title: 'Apply for Services',
              description: 'Submit documents and applications online',
            },
            {
              icon: Bell,
              title: 'Track Applications',
              description: 'Real-time updates on your requests',
            },
            {
              icon: MessageSquare,
              title: 'Raise Complaints',
              description: 'Voice grievances and get quick resolutions',
            },
            {
              icon: Sparkles,
              title: 'AI Assistant Support',
              description: 'Get instant help 24/7',
            },
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-xs mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm mb-4">
            All-in-one platform for public services
          </p>
          <p className="text-white/80 text-xs">
            Registration takes less than 5 minutes • 100% secure • No hidden fees
          </p>
        </div>
      </div>
    </div>
  )
}
