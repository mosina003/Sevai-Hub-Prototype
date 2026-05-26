import DashboardSidebar from '@/components/dashboard-sidebar'
import DashboardWelcomeBanner from '@/components/dashboard-welcome-banner'
import DashboardQuickActions from '@/components/dashboard-quick-actions'
import DashboardStatistics from '@/components/dashboard-statistics'
import DashboardRecentApplications from '@/components/dashboard-recent-applications'
import DashboardRecentComplaints from '@/components/dashboard-recent-complaints'
import DashboardTimeline from '@/components/dashboard-timeline'
import DashboardNotificationsWidget from '@/components/dashboard-notifications-widget'
import DashboardRecommendedSchemes from '@/components/dashboard-recommended-schemes'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Citizen Dashboard - SevaiHub',
  description: 'Your personal government services dashboard',
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Welcome Banner */}
            <DashboardWelcomeBanner />

            {/* Quick Actions - Compact 4-column */}
            <DashboardQuickActions />

            {/* Statistics - Full Width */}
            <div className="mb-6">
              <DashboardStatistics />
            </div>

            {/* Applications, Complaints, and Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <DashboardRecentApplications />
              </div>
              <div>
                <DashboardRecentComplaints />
              </div>
              <div>
                <DashboardTimeline />
              </div>
            </div>

            {/* Notifications Widget */}
            <div className="mb-6">
              <DashboardNotificationsWidget />
            </div>

            {/* Recommended Schemes */}
            <div className="mb-6">
              <DashboardRecommendedSchemes />
            </div>

            {/* Analytics Section */}
            <div className="mb-6">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Your Service Analytics</h3>
                    <p className="text-sm text-muted-foreground">Track your application progress and service performance</p>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">Last 30 Days</span>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
                  {[
                    { label: 'Applications Submitted', value: '3', icon: '📋' },
                    { label: 'Approved', value: '2', icon: '✅' },
                    { label: 'Pending', value: '1', icon: '⏳' },
                    { label: 'Avg Processing Time', value: '2.1 Days', icon: '⏱️' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-border bg-linear-to-br from-blue-50 to-slate-50 p-4">
                      <p className="text-2xl mb-2">{stat.icon}</p>
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                  {/* Application Timeline */}
                  <div className="rounded-xl border border-border bg-slate-50 p-4">
                    <h4 className="font-semibold text-foreground mb-4">Application Status Timeline</h4>
                    <div className="space-y-3">
                      {[
                        { status: 'Income Certificate', progress: 100, date: 'Approved 2 days ago' },
                        { status: 'Community Certificate', progress: 60, date: 'Under review' },
                        { status: 'Patta Transfer', progress: 25, date: 'Document submitted' },
                      ].map((app) => (
                        <div key={app.status}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-foreground">{app.status}</span>
                            <span className="text-xs text-muted-foreground">{app.progress}%</span>
                          </div>
                          <div className="w-full rounded-full bg-white border border-border h-2">
                            <div
                              className="bg-primary h-full rounded-full transition-all"
                              style={{ width: `${app.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{app.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Satisfaction Metrics */}
                  <div className="rounded-xl border border-border bg-slate-50 p-4">
                    <h4 className="font-semibold text-foreground mb-4">Service Satisfaction Scores</h4>
                    <div className="space-y-3">
                      {[
                        { metric: 'Response Time', score: 85, max: 100 },
                        { metric: 'Document Clarity', score: 92, max: 100 },
                        { metric: 'Officer Professionalism', score: 88, max: 100 },
                        { metric: 'Overall Experience', score: 88, max: 100 },
                      ].map((m) => (
                        <div key={m.metric}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground">{m.metric}</span>
                            <span className="font-semibold text-primary">{m.score}/{m.max}</span>
                          </div>
                          <div className="w-full rounded-full bg-white border border-border h-1.5">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: `${(m.score / m.max) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="py-6 border-t border-border/40 text-center text-xs sm:text-sm text-muted-foreground">
              <p>© 2026 SevaiHub. All rights reserved. | Government of India</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
