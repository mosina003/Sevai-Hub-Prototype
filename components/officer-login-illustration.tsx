export default function OfficerLoginIllustration() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex flex-col items-center justify-start overflow-hidden px-8 py-12 pt-16">
      {/* Decorative blur circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-slate-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-white mt-16 max-w-sm">
        {/* Main Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-slate-700/50 backdrop-blur rounded-2xl flex items-center justify-center border border-slate-600/50 mb-6 mx-auto">
            <span className="text-4xl">👔</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold mb-4 text-center">Officer Portal</h2>
        <p className="text-slate-300 text-center mb-12 leading-relaxed">
          Manage government services with powerful tools and analytics
        </p>

        {/* Feature Cards */}
        <div className="space-y-4">
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-slate-700/40 backdrop-blur border border-slate-600/30 hover:border-slate-500/50 transition-colors">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-slate-600/50 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Analytics Dashboard</h3>
                <p className="text-sm text-slate-400">Real-time performance metrics and reports</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-slate-700/40 backdrop-blur border border-slate-600/30 hover:border-slate-500/50 transition-colors">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-slate-600/50 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⚙️</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Service Management</h3>
                <p className="text-sm text-slate-400">Configure and monitor government services</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-2xl bg-slate-700/40 backdrop-blur border border-slate-600/30 hover:border-slate-500/50 transition-colors">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-slate-600/50 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Application Processing</h3>
                <p className="text-sm text-slate-400">Review and approve citizen applications</p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-2xl bg-slate-700/40 backdrop-blur border border-slate-600/30 hover:border-slate-500/50 transition-colors">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-slate-600/50 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Access</h3>
                <p className="text-sm text-slate-400">Advanced security protocols and encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-12 p-4 rounded-xl bg-slate-700/30 border border-slate-600/30">
          <p className="text-sm text-slate-300 text-center">
            <span className="font-semibold">Authorized officers only</span> • Two-factor authentication required
          </p>
        </div>
      </div>
    </div>
  )
}
