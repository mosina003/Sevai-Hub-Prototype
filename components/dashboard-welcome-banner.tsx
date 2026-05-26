'use client'

import { Badge } from '@/components/ui/badge'

export default function DashboardWelcomeBanner() {
  const citizenName = 'Mosina'

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {citizenName} 👋
        </h1>
      </div>
      
      {/* Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Badge variant="outline" className="justify-center py-2 px-3 bg-green-50 text-green-700 border-green-200">
          <span className="text-sm">🟢 2 Active</span>
        </Badge>
        <Badge variant="outline" className="justify-center py-2 px-3 bg-yellow-50 text-yellow-700 border-yellow-200">
          <span className="text-sm">🟡 1 In Progress</span>
        </Badge>
        <Badge variant="outline" className="justify-center py-2 px-3 bg-blue-50 text-blue-700 border-blue-200">
          <span className="text-sm">🔔 3 Updates</span>
        </Badge>
        <Badge variant="outline" className="justify-center py-2 px-3 bg-purple-50 text-purple-700 border-purple-200">
          <span className="text-sm">✓ All Good</span>
        </Badge>
      </div>
    </div>
  )
}
