'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ClipboardList,
  FileText,
  FileWarning,
  LineChart,
  MapPin,
  MessageSquare,
  PhoneCall,
  PieChart,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  TrendingUp,
  UserCircle2,
  Users,
  Zap,
  CircleDashed,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

type OfficerProfile = {
  name: string
  officerId: string
  mobile: string
  department: string
  designation: string
  district: string
}

const defaultOfficer: OfficerProfile = {
  name: 'R. Kumar',
  officerId: 'OFF-CHN-1045',
  mobile: '9123582088',
  department: 'Revenue Department',
  designation: 'Tahsildar',
  district: 'Chennai District',
}

const sidebarItems = [
  { id: 'dashboard-top', label: 'Dashboard', icon: '🏠' },
  { id: 'assigned-applications', label: 'Assigned Applications', icon: '📋' },
  { id: 'service-requests', label: 'Service Requests', icon: '📂' },
  { id: 'grievances', label: 'Grievances', icon: '⚠️' },
  { id: 'citizen-queries', label: 'Citizen Queries', icon: '📨' },
  { id: 'field-visits', label: 'Field Inspections', icon: '📅' },
  { id: 'performance', label: 'Performance', icon: '📈' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'profile-section', label: 'Profile', icon: '👤' },
]

const priorityActions = [
  { title: 'Urgent Cases', value: '12', subtitle: 'Needs immediate review', tone: 'orange' },
  { title: 'Applications Due Today', value: '8', subtitle: 'SLA deadline today', tone: 'blue' },
  { title: 'Pending Grievances', value: '18', subtitle: 'Citizen issues awaiting action', tone: 'red' },
  { title: 'Field Visits Scheduled', value: '6', subtitle: 'Inspections on the calendar', tone: 'green' },
  { title: 'SLA Breaches', value: '3', subtitle: 'Escalate immediately', tone: 'red' },
  { title: 'Citizen Clarifications', value: '9', subtitle: 'Awaiting reply', tone: 'blue' },
]

const performanceKpis = [
  { label: 'Applications Processed Today', value: '24', accent: 'bg-blue-50 text-blue-800 border-blue-200' },
  { label: 'Applications Processed This Month', value: '612', accent: 'bg-slate-50 text-slate-800 border-slate-200' },
  { label: 'Average Resolution Time', value: '1.8 Days', accent: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { label: 'Citizen Satisfaction Score', value: '4.7 / 5', accent: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
  { label: 'SLA Compliance Rate', value: '96%', accent: 'bg-amber-50 text-amber-800 border-amber-200' },
]

const assignedApplications = [
  {
    id: 'APP-1045',
    citizen: 'Arun S',
    service: 'Income Certificate',
    submitted: '23 May 2026',
    due: '24 May 2026',
    priority: 'High',
    status: 'Pending Verification',
  },
  {
    id: 'APP-1046',
    citizen: 'Meena K',
    service: 'Birth Certificate',
    submitted: '22 May 2026',
    due: '25 May 2026',
    priority: 'Medium',
    status: 'Under Review',
  },
  {
    id: 'APP-1047',
    citizen: 'Sathish V',
    service: 'Patta Transfer',
    submitted: '21 May 2026',
    due: '22 May 2026',
    priority: 'Urgent',
    status: 'Waiting Citizen Response',
  },
  {
    id: 'APP-1048',
    citizen: 'Priya M',
    service: 'Community Certificate',
    submitted: '20 May 2026',
    due: '26 May 2026',
    priority: 'High',
    status: 'Approved',
  },
  {
    id: 'APP-1049',
    citizen: 'Karthik R',
    service: 'Residence Proof',
    submitted: '19 May 2026',
    due: '20 May 2026',
    priority: 'High',
    status: 'Rejected',
  },
]

const slaBuckets = [
  { label: 'Within SLA', value: 31, color: 'bg-emerald-500', text: '31 cases on track' },
  { label: 'Approaching Deadline', value: 9, color: 'bg-amber-500', text: '9 cases in caution zone' },
  { label: 'Overdue', value: 3, color: 'bg-red-500', text: '3 cases breached' },
]

const grievanceCases = [
  {
    id: 'CMP-2042',
    department: 'Roads Department',
    priority: 'High',
    citizen: 'Lakshmi N',
    daysOpen: 2,
    status: 'New Grievance',
  },
  {
    id: 'CMP-2043',
    department: 'Water Board',
    priority: 'Medium',
    citizen: 'Rahul P',
    daysOpen: 5,
    status: 'In Progress',
  },
  {
    id: 'CMP-2044',
    department: 'Municipal Corporation',
    priority: 'Urgent',
    citizen: 'Asha V',
    daysOpen: 7,
    status: 'Escalated',
  },
  {
    id: 'CMP-2045',
    department: 'Electricity Board',
    priority: 'High',
    citizen: 'Mohan S',
    daysOpen: 1,
    status: 'Resolved',
  },
  {
    id: 'CMP-2046',
    department: 'Public Health',
    priority: 'Medium',
    citizen: 'Divya K',
    daysOpen: 4,
    status: 'Rejected',
  },
]

const citizenMessages = [
  { type: 'Document Requested', subject: 'Income proof missing', time: '8 min ago', unread: true },
  { type: 'Clarification Needed', subject: 'Survey number mismatch', time: '25 min ago', unread: true },
  { type: 'Status Inquiry', subject: 'When will certificate be ready?', time: '1 hour ago', unread: false },
  { type: 'Feedback', subject: 'Thank you for fast resolution', time: '2 hours ago', unread: false },
]

const workloadDistribution = [
  { label: 'Income Certificate', value: 78 },
  { label: 'Patta Transfer', value: 62 },
  { label: 'Birth Certificate', value: 54 },
  { label: 'Community Certificate', value: 49 },
  { label: 'Grievance Routing', value: 36 },
]

const upcomingVisits = [
  {
    citizen: 'Land Verification',
    location: 'Velachery',
    purpose: 'Property inspection',
    date: 'Tomorrow',
    time: '10:30 AM',
    status: 'Scheduled',
  },
  {
    citizen: 'Field Survey',
    location: 'Anna Nagar',
    purpose: 'Grievance validation',
    date: 'Tomorrow',
    time: '02:00 PM',
    status: 'Confirmed',
  },
  {
    citizen: 'Document Verification',
    location: 'T. Nagar',
    purpose: 'Citizen interview',
    date: 'Friday',
    time: '11:15 AM',
    status: 'Pending',
  },
]

const slaRisks = [
  { caseId: 'APP-1045', risk: '92%', reason: 'Pending Verification', action: 'Assign Additional Officer' },
  { caseId: 'APP-1047', risk: '84%', reason: 'Citizen response overdue', action: 'Send Reminder' },
  { caseId: 'CMP-2044', risk: '76%', reason: 'Escalation unresolved', action: 'Review SLA breach' },
]

const activityTimeline = [
  { time: '10:30 AM', event: 'Application Approved', tone: 'bg-emerald-100 text-emerald-700' },
  { time: '11:15 AM', event: 'Complaint Escalated', tone: 'bg-amber-100 text-amber-700' },
  { time: '11:40 AM', event: 'Document Verification Completed', tone: 'bg-blue-100 text-blue-700' },
  { time: '12:05 PM', event: 'Citizen Query Replied', tone: 'bg-slate-100 text-slate-700' },
]

const notifications = [
  { title: 'New Application Assigned', detail: '2 new applications waiting for review', tone: 'bg-blue-50 text-blue-700' },
  { title: 'SLA Alert', detail: '3 cases are within 24 hours of breach', tone: 'bg-red-50 text-red-700' },
  { title: 'Citizen Message', detail: 'Follow-up requested for APP-1047', tone: 'bg-amber-50 text-amber-700' },
  { title: 'Department Circular', detail: 'Revenue review meeting at 4:00 PM', tone: 'bg-slate-50 text-slate-700' },
]

const servicePerformance = [
  { label: 'Applications', bars: [58, 72, 64, 80, 74, 92] },
  { label: 'Complaints', bars: [32, 46, 40, 56, 61, 70] },
  { label: 'Resolution Trend', bars: [44, 49, 62, 68, 76, 84] },
]

function getApplicationStatusClass(status: string) {
  switch (status) {
    case 'Pending Verification':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'Under Review':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Approved':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'Rejected':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'Waiting Citizen Response':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

function getPriorityClass(priority: string) {
  switch (priority) {
    case 'Urgent':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'High':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'Medium':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

function getGrievanceStatusClass(status: string) {
  switch (status) {
    case 'New Grievance':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'In Progress':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'Escalated':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'Resolved':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'Rejected':
      return 'bg-slate-100 text-slate-700 border-slate-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

export default function OfficerDashboardPage() {
  const [officer, setOfficer] = useState<OfficerProfile>(defaultOfficer)
  const [currentTime, setCurrentTime] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard-top')
  const sectionAliases: Record<string, string> = {
    'service-requests': 'assigned-applications',
  }

  useEffect(() => {
    const storedOfficer = window.sessionStorage.getItem('sevaihub-officer') || window.localStorage.getItem('sevaihub-officer')
    if (storedOfficer) {
      try {
        setOfficer(JSON.parse(storedOfficer) as OfficerProfile)
      } catch {
        setOfficer(defaultOfficer)
      }
    }
  }, [])

  useEffect(() => {
    const formatCurrentTime = () =>
      new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }).format(new Date())

    setCurrentTime(formatCurrentTime())

    const timer = window.setInterval(() => setCurrentTime(formatCurrentTime()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const quickStats = useMemo(
    () => [
      { label: '42 Active Cases', color: 'bg-blue-50 text-blue-800 border-blue-200' },
      { label: '8 SLA Due Today', color: 'bg-amber-50 text-amber-800 border-amber-200' },
      { label: '3 Breaches', color: 'bg-red-50 text-red-800 border-red-200' },
      { label: '96% Compliance', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    ],
    []
  )

  const handleScrollTo = (sectionId: string) => {
    setActiveSection(sectionId)
    const resolvedSectionId = sectionAliases[sectionId] ?? sectionId
    const section = document.getElementById(resolvedSectionId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleLogout = () => {
    window.sessionStorage.clear()
    window.localStorage.removeItem('sevaihub-officer')
    window.localStorage.removeItem('sevaihub-user')
    window.location.href = '/officer-login'
  }

  const initials = officer.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="hidden xl:fixed xl:inset-y-0 xl:left-0 xl:flex xl:w-80 xl:flex-col bg-[#0F3D73] text-white shadow-2xl">
        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl">
              🏛️
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Officer Portal</p>
              <h1 className="text-2xl font-bold">SevaiHub</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Command Center</p>
          <nav className="mt-3 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleScrollTo(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                    isActive ? 'bg-white text-[#0F3D73] shadow-lg' : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 p-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start rounded-xl px-4 py-3 text-white hover:bg-white/10"
          >
            <span className="mr-3">🚪</span> Logout
          </Button>
        </div>
      </aside>

      <div className="xl:pl-80">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-4 lg:px-8 2xl:flex-row 2xl:items-center 2xl:justify-between">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Officer Dashboard</p>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Command center for high-volume civic operations</h2>
              </div>
              <div className="hidden flex-wrap gap-2 lg:flex">
                <Badge className="border border-blue-200 bg-blue-50 text-blue-800">{officer.department}</Badge>
                <Badge className="border border-slate-200 bg-slate-50 text-slate-700">{officer.designation}</Badge>
                <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-800">SLA Compliant</Badge>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 2xl:max-w-2xl">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search case ID, citizen name, service type..."
                  className="h-11 rounded-full border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm"
                />
              </div>
              <Button variant="outline" className="h-11 w-11 rounded-full border-slate-200 bg-white p-0">
                <Bell className="h-4 w-4 text-slate-700" />
              </Button>
              <div className="hidden lg:flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{officer.name}</p>
                  <p className="text-xs text-slate-500">{officer.department}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E5AA8] text-sm font-bold text-white">
                  {initials}
                </div>
              </div>
            </div>

            <div className="grid gap-2 text-sm sm:grid-cols-2 xl:grid-cols-4 2xl:flex 2xl:items-center 2xl:gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Officer</p>
                <p className="font-semibold text-slate-900">{officer.name}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Officer ID</p>
                <p className="font-semibold text-slate-900">{officer.officerId}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Department</p>
                <p className="font-semibold text-slate-900">{officer.department}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current Time</p>
                <p className="font-semibold text-slate-900">{currentTime}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-screen-2xl space-y-6 px-4 py-6 lg:px-8">
          <section id="dashboard-top" className="scroll-mt-28 rounded-3xl border border-[#1E5AA8]/20 bg-[linear-gradient(135deg,#0F3D73_0%,#1E5AA8_100%)] p-6 text-white shadow-xl lg:p-8">
            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr] xl:items-center">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
                  <ShieldCheck className="h-4 w-4" /> Government Officer Command Center
                </p>
                <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Good Morning, Kumar 👋</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
                  You have <span className="font-semibold text-white">42 active cases</span> today. <span className="font-semibold text-white">8 applications</span> require urgent action before SLA deadlines, while grievance escalation and citizen responses need immediate attention.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    onClick={() => handleScrollTo('assigned-applications')}
                    className="rounded-full bg-white text-[#0F3D73] hover:bg-slate-100"
                  >
                    View Assigned Cases <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleScrollTo('grievances')}
                    variant="outline"
                    className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    Raise Internal Escalation
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {quickStats.map((stat) => (
                    <span key={stat.label} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
                      {stat.label}
                    </span>
                  ))}
                </div>
              </div>

              <Card className="rounded-3xl border-white/20 bg-white/10 p-5 text-white shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/70">Attention Board</p>
                    <h3 className="text-xl font-bold">What requires my attention now?</h3>
                  </div>
                  <Zap className="h-10 w-10 text-amber-300" />
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Urgent cases</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-[78%] rounded-full bg-amber-300" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>SLA breaches</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-[36%] rounded-full bg-red-400" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Citizen clarifications</span>
                      <span className="font-semibold">9</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-[52%] rounded-full bg-cyan-300" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {priorityActions.map((card) => (
              <Card
                key={card.title}
                className={`cursor-pointer rounded-2xl border p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg ${
                  card.tone === 'orange'
                    ? 'border-orange-200 bg-orange-50'
                    : card.tone === 'red'
                      ? 'border-red-200 bg-red-50'
                      : card.tone === 'green'
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-blue-200 bg-blue-50'
                }`}
                onClick={() => {
                  const target = card.title === 'Citizen Clarifications' ? 'citizen-queries' : card.title === 'Field Visits Scheduled' ? 'field-visits' : card.title === 'SLA Breaches' ? 'sla-monitoring' : card.title === 'Pending Grievances' ? 'grievances' : card.title === 'Applications Due Today' ? 'assigned-applications' : 'dashboard-top'
                  handleScrollTo(target)
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{card.title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
                <p className="mt-2 text-sm text-slate-600">{card.subtitle}</p>
              </Card>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-5">
            {performanceKpis.map((kpi) => (
              <Card key={kpi.label} className={`rounded-2xl border p-5 shadow-sm ${kpi.accent}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75">{kpi.label}</p>
                <p className="mt-3 text-3xl font-bold">{kpi.value}</p>
              </Card>
            ))}
          </section>

          <section id="assigned-applications" className="scroll-mt-28 grid gap-6 xl:grid-cols-[1.75fr_1fr]">
            <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Assigned Applications Queue</p>
                  <h3 className="text-2xl font-bold text-slate-900">Applications needing officer action</h3>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <ClipboardList className="h-4 w-4" /> 5 cases
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-6 py-4">Application ID</th>
                      <th className="px-6 py-4">Citizen Name</th>
                      <th className="px-6 py-4">Service Type</th>
                      <th className="px-6 py-4">Submitted Date</th>
                      <th className="px-6 py-4">Due Date</th>
                      <th className="px-6 py-4">Priority</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedApplications.map((application) => (
                      <tr key={application.id} className="border-t border-slate-200 hover:bg-slate-50/70">
                        <td className="px-6 py-4 font-semibold text-[#1E5AA8]">{application.id}</td>
                        <td className="px-6 py-4 text-slate-900">{application.citizen}</td>
                        <td className="px-6 py-4 text-slate-700">{application.service}</td>
                        <td className="px-6 py-4 text-slate-600">{application.submitted}</td>
                        <td className="px-6 py-4 text-slate-600">{application.due}</td>
                        <td className="px-6 py-4">
                          <Badge className={getPriorityClass(application.priority)}>{application.priority}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getApplicationStatusClass(application.status)}>{application.status}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {['Open', 'Verify', 'Approve', 'Request Documents', 'Escalate'].map((action) => (
                              <Button
                                key={action}
                                size="sm"
                                variant={action === 'Approve' ? 'default' : 'outline'}
                                className={action === 'Approve' ? 'bg-[#1E5AA8] text-white hover:bg-[#17498a]' : ''}
                                onClick={() => window.alert(`${action} initiated for ${application.id}`)}
                              >
                                {action}
                              </Button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card id="sla-monitoring" className="scroll-mt-28 rounded-3xl border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Smart SLA Monitoring</p>
                  <h3 className="text-xl font-bold text-slate-900">Deadlines and risk pressure</h3>
                </div>
                <Clock3 className="h-8 w-8 text-[#1E5AA8]" />
              </div>

              <div className="mt-5 space-y-4">
                {slaBuckets.map((bucket) => (
                  <div key={bucket.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                      <span>{bucket.label}</span>
                      <span>{bucket.value}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{bucket.text}</p>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                      <div className={`h-full rounded-full ${bucket.color}`} style={{ width: `${Math.max(20, bucket.value * 2)}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-700">Example risk indicator</p>
                <div className="mt-3 rounded-xl bg-emerald-50 p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-emerald-800">
                    <span>Driving License</span>
                    <span>3 days remaining</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-emerald-100">
                    <div className="h-full w-[80%] rounded-full bg-emerald-500" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-emerald-700">80% buffer remaining</p>
                </div>
              </div>
            </Card>
          </section>

          <section id="grievances" className="scroll-mt-28 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <Card className="rounded-3xl border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-200 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Grievance Management Center</p>
                <h3 className="text-2xl font-bold text-slate-900">Handle, route, and escalate complaints</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-6 py-4">Complaint ID</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Priority</th>
                      <th className="px-6 py-4">Citizen</th>
                      <th className="px-6 py-4">Days Open</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grievanceCases.map((grievance) => (
                      <tr key={grievance.id} className="border-t border-slate-200 hover:bg-slate-50/70">
                        <td className="px-6 py-4 font-semibold text-[#1E5AA8]">{grievance.id}</td>
                        <td className="px-6 py-4 text-slate-700">{grievance.department}</td>
                        <td className="px-6 py-4">
                          <Badge className={getPriorityClass(grievance.priority)}>{grievance.priority}</Badge>
                        </td>
                        <td className="px-6 py-4 text-slate-700">{grievance.citizen}</td>
                        <td className="px-6 py-4 text-slate-700">{grievance.daysOpen} days</td>
                        <td className="px-6 py-4">
                          <Badge className={getGrievanceStatusClass(grievance.status)}>{grievance.status}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button size="sm" variant="outline" onClick={() => window.alert(`Opening grievance ${grievance.id}`)}>
                            Open
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="rounded-3xl border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Officer AI Assistant</p>
                  <h3 className="text-xl font-bold text-slate-900">Command support for faster decisions</h3>
                </div>
                <Bot className="h-8 w-8 text-[#1E5AA8]" />
              </div>
              <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4">
                {[
                  'Summarize grievance',
                  'Suggest department routing',
                  'Detect duplicate complaints',
                  'Generate response draft',
                  'Predict SLA risk',
                ].map((capability) => (
                  <div key={capability} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {capability}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Ask AI', 'Generate Summary', 'Draft Reply'].map((label) => (
                  <Button key={label} onClick={() => window.alert(`${label} started`)} className="rounded-full bg-[#1E5AA8] text-white hover:bg-[#17498a]">
                    {label}
                  </Button>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                AI copilots can draft summaries, detect high-risk SLA cases, and suggest routing in seconds.
              </div>
            </Card>
          </section>

          <section id="citizen-queries" className="scroll-mt-28 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
            <Card className="rounded-3xl border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Citizen Communication Center</p>
                  <h3 className="text-2xl font-bold text-slate-900">Unread messages and follow-ups</h3>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">2 Unread</span>
              </div>
              <div className="mt-5 space-y-3">
                {citizenMessages.map((message) => (
                  <div key={message.subject} className={`flex items-center justify-between rounded-2xl border px-4 py-4 ${message.unread ? 'border-[#1E5AA8]/20 bg-blue-50' : 'border-slate-200 bg-white'}`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{message.type}</p>
                        {message.unread && <span className="h-2 w-2 rounded-full bg-[#1E5AA8]" />}
                      </div>
                      <p className="text-sm text-slate-600">{message.subject}</p>
                    </div>
                    <p className="text-xs font-medium text-slate-500">{message.time}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-3xl border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-[#1E5AA8]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Citizen Query Draft</p>
                  <h3 className="text-xl font-bold text-slate-900">Reply faster with a prepared response</h3>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                <p className="font-semibold text-slate-900">Citizen asks:</p>
                <p>“Could you confirm whether my certificate will be issued by tomorrow?”</p>
                <p className="mt-3 font-semibold text-slate-900">Suggested response:</p>
                <p>
                  Your request is currently under review. Verification has been completed, and the file has been moved to final approval. We expect completion within the SLA window.
                </p>
              </div>
              <div className="mt-5 flex gap-2">
                <Button className="rounded-full bg-[#1E5AA8] text-white hover:bg-[#17498a]">
                  Draft Reply <Send className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full border-slate-200">
                  Contact Citizen <PhoneCall className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </section>

          <section id="performance" className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Department Workload Distribution</p>
                <h3 className="text-2xl font-bold text-slate-900">Analytics for service volume and resolution trends</h3>
              </div>
              <BarChart3 className="h-8 w-8 text-[#1E5AA8]" />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
              {servicePerformance.map((chart) => (
                <div key={chart.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{chart.label}</p>
                    <PieChart className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="mt-4 flex items-end gap-2 h-28">
                    {chart.bars.map((bar, idx) => (
                      <div key={idx} className="flex-1">
                        <div className="mx-auto w-full rounded-t-lg bg-[#1E5AA8]" style={{ height: `${bar}%`, minHeight: '12px' }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Mon</span>
                    <span>Sat</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {workloadDistribution.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-[#1E5AA8]" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="field-visits" className="scroll-mt-28 grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Card className="rounded-3xl border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Upcoming Field Visits</p>
                  <h3 className="text-2xl font-bold text-slate-900">Field inspection calendar</h3>
                </div>
                <CalendarDays className="h-8 w-8 text-[#1E5AA8]" />
              </div>
              <div className="mt-5 space-y-3">
                {upcomingVisits.map((visit) => (
                  <div key={visit.citizen} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{visit.citizen}</p>
                        <p className="text-sm text-slate-600">{visit.location} - {visit.purpose}</p>
                      </div>
                      <Badge className={visit.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : visit.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                        {visit.status}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                      <span>{visit.date}</span>
                      <span>{visit.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-3xl border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">SLA Risk Prediction</p>
                  <h3 className="text-2xl font-bold text-slate-900">Cases likely to miss SLA</h3>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                {slaRisks.map((risk, index) => (
                  <div key={risk.caseId} className={`grid gap-3 px-4 py-4 sm:grid-cols-[0.8fr_0.7fr_1.1fr_1.2fr] ${index !== slaRisks.length - 1 ? 'border-b border-slate-200' : ''}`}>
                    <div className="font-semibold text-[#1E5AA8]">{risk.caseId}</div>
                    <div className="font-semibold text-red-700">{risk.risk}</div>
                    <div className="text-sm text-slate-600">{risk.reason}</div>
                    <div className="text-sm font-medium text-slate-900">{risk.action}</div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section id="notifications" className="scroll-mt-28 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="rounded-3xl border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Recent Activity Timeline</p>
                  <h3 className="text-2xl font-bold text-slate-900">Live officer activity feed</h3>
                </div>
                <RefreshCw className="h-8 w-8 text-[#1E5AA8]" />
              </div>
              <div className="mt-5 space-y-4">
                {activityTimeline.map((activity) => (
                  <div key={activity.event} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                      {activity.time.split(' ')[0]}
                    </div>
                    <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-900">{activity.event}</p>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${activity.tone}`}>{activity.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">Automatically logged for accountability and audit trail.</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-3xl border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Notifications Panel</p>
                  <h3 className="text-2xl font-bold text-slate-900">Unread operational notices</h3>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">4 Unread</span>
              </div>
              <div className="mt-5 space-y-3">
                {notifications.map((notice) => (
                  <div key={notice.title} className={`rounded-2xl border px-4 py-4 ${notice.tone}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{notice.title}</p>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <p className="mt-1 text-sm opacity-90">{notice.detail}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section id="profile-section" className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E5AA8] text-lg font-bold text-white">
                  {initials}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Officer Profile</p>
                  <h3 className="text-2xl font-bold text-slate-900">{officer.name}</h3>
                  <p className="text-sm text-slate-600">{officer.designation} - {officer.department} - {officer.district}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-full border-slate-200">
                  Profile Settings
                </Button>
                <Button className="rounded-full bg-[#1E5AA8] text-white hover:bg-[#17498a]">
                  Generate Daily Summary
                </Button>
              </div>
            </div>
          </section>

          {/* Analytics Dashboard Section */}
          <section className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Officer Performance Analytics</p>
                <h3 className="text-2xl font-bold text-slate-900">Dashboard metrics and insights</h3>
              </div>
              <BarChart3 className="h-8 w-8 text-[#1E5AA8]" />
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {[
                { label: 'Daily Throughput', value: '24 Apps/Day', trend: '+8%', color: 'bg-blue-50' },
                { label: 'Avg. Resolution', value: '1.8 Days', trend: '-0.3', color: 'bg-emerald-50' },
                { label: 'Citizen Ratings', value: '4.7/5', trend: '+0.2', color: 'bg-amber-50' },
                { label: 'Team Efficiency', value: '96%', trend: '+2%', color: 'bg-purple-50' },
              ].map((metric) => (
                <div key={metric.label} className={`rounded-2xl border border-slate-200 ${metric.color} p-4`}>
                  <p className="text-xs text-slate-600 mb-2">{metric.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                  <p className="text-xs text-emerald-600 mt-2">↑ {metric.trend}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {/* Application Status Distribution */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-semibold text-slate-900 mb-4">Application Status Distribution</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Approved', count: 24, color: 'bg-emerald-500' },
                    { label: 'Pending Verification', count: 12, color: 'bg-amber-500' },
                    { label: 'Under Review', count: 8, color: 'bg-blue-500' },
                    { label: 'Rejected', count: 2, color: 'bg-red-500' },
                  ].map((status) => (
                    <div key={status.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">{status.label}</span>
                        <span className="font-semibold text-slate-900">{status.count}</span>
                      </div>
                      <div className="w-full rounded-full bg-slate-200 h-2">
                        <div className={`${status.color} h-full rounded-full`} style={{ width: `${(status.count / 46) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Trends */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-semibold text-slate-900 mb-4">Weekly Performance Trends</h4>
                <div className="space-y-3">
                  {[
                    { day: 'Monday', processed: 24, target: 25 },
                    { day: 'Tuesday', processed: 28, target: 25 },
                    { day: 'Wednesday', processed: 22, target: 25 },
                    { day: 'Thursday', processed: 26, target: 25 },
                  ].map((day) => (
                    <div key={day.day}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">{day.day}</span>
                        <span className="font-semibold text-slate-900">{day.processed}/{day.target}</span>
                      </div>
                      <div className="w-full rounded-full bg-slate-200 h-2">
                        <div className="bg-[#1E5AA8] h-full rounded-full" style={{ width: `${(day.processed / day.target) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}