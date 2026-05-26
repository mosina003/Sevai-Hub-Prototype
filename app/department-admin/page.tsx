'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Bell,
  Search,
  LogOut,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
  LineChart,
  PieChart,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Download,
  RefreshCw,
  Gauge,
  Activity,
  Zap,
  Target,
  Heart,
  FileText,
  MessageSquare,
  Shield,
  Map,
  Bot,
  Inbox,
  Settings,
  LogIn,
} from 'lucide-react'
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// Color scheme for government dashboard
const COLORS = {
  navyBlue: '#0F3D73',
  govBlue: '#1E5AA8',
  white: '#FFFFFF',
  lightGray: '#F5F7FA',
  darkGray: '#2D3748',
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444',
  yellow: '#FBBF24',
  cyan: '#06B6D4',
  purple: '#8B5CF6',
}

// Sample data for visualizations
const departmentHealthData = [
  { name: 'Q1', health: 88 },
  { name: 'Q2', health: 90 },
  { name: 'Q3', health: 92 },
  { name: 'Q4', health: 92 },
]

const applicationsData = [
  { day: 'Mon', received: 245, processed: 218, pending: 127 },
  { day: 'Tue', received: 312, processed: 287, pending: 152 },
  { day: 'Wed', received: 289, processed: 276, pending: 165 },
  { day: 'Thu', received: 334, processed: 298, pending: 201 },
  { day: 'Fri', received: 267, processed: 251, pending: 217 },
  { day: 'Sat', received: 156, processed: 142, pending: 231 },
]

const applicationsByServiceData = [
  { name: 'Income Certificate', value: 2345, percentage: 28 },
  { name: 'Community Certificate', value: 1876, percentage: 22 },
  { name: 'Nativity Certificate', value: 1623, percentage: 19 },
  { name: 'Patta Transfer', value: 1234, percentage: 15 },
  { name: 'Mutation', value: 901, percentage: 11 },
  { name: 'Others', value: 412, percentage: 5 },
]

const complaintTrendData = [
  { month: 'Jan', complaints: 234, resolved: 198, escalated: 36 },
  { month: 'Feb', complaints: 287, resolved: 245, escalated: 42 },
  { month: 'Mar', complaints: 312, resolved: 268, escalated: 44 },
  { month: 'Apr', complaints: 289, resolved: 251, escalated: 38 },
  { month: 'May', complaints: 356, resolved: 301, escalated: 55 },
  { month: 'Jun', complaints: 401, resolved: 312, escalated: 89 },
]

const officersData = [
  { id: 1, name: 'Kumar, R.', designation: 'Senior Officer', assigned: 245, completed: 231, sla: 98, rating: 4.8, status: 'Excellent' },
  { id: 2, name: 'Priya, S.', designation: 'Officer', assigned: 221, completed: 180, sla: 81, rating: 4.2, status: 'Needs Attention' },
  { id: 3, name: 'Raj, M.', designation: 'Officer', assigned: 198, completed: 195, sla: 96, rating: 4.7, status: 'Excellent' },
  { id: 4, name: 'Anjali, P.', designation: 'Senior Officer', assigned: 267, completed: 234, sla: 89, rating: 4.5, status: 'Good' },
  { id: 5, name: 'Vikram, K.', designation: 'Officer', assigned: 189, completed: 156, sla: 78, rating: 3.8, status: 'Needs Attention' },
]

const districtPerformanceData = [
  { rank: 1, district: 'Chennai', processed: 3456, satisfaction: 98, sla: 97 },
  { rank: 2, district: 'Coimbatore', processed: 2987, satisfaction: 96, sla: 95 },
  { rank: 3, district: 'Madurai', processed: 2645, satisfaction: 94, sla: 93 },
  { rank: 4, district: 'Trichy', processed: 2234, satisfaction: 92, sla: 90 },
  { rank: 5, district: 'Salem', processed: 1987, satisfaction: 91, sla: 88 },
]

const radarData = [
  { metric: 'Efficiency', value: 92 },
  { metric: 'Transparency', value: 88 },
  { metric: 'Speed', value: 90 },
  { metric: 'Satisfaction', value: 94 },
  { metric: 'Compliance', value: 96 },
  { metric: 'Accountability', value: 89 },
]

const recentActivitiesData = [
  { time: '10:00 AM', activity: 'Officer Kumar approved 45 applications', type: 'success' },
  { time: '11:15 AM', activity: 'New escalation received from citizen', type: 'alert' },
  { time: '12:05 PM', activity: 'District Chennai SLA compliance reduced to 89%', type: 'warning' },
  { time: '12:40 PM', activity: 'Workload redistribution completed', type: 'success' },
  { time: '01:30 PM', activity: 'High complaint volume detected in Income Certificate service', type: 'warning' },
  { time: '02:15 PM', activity: 'System backup completed successfully', type: 'success' },
]

interface OfficerStatus {
  color: string
  bgColor: string
  textColor: string
}

// KPI Card Component
const KPICard = ({ title, value, change, unit, icon: Icon, trend }: any) => {
  const isPositive = trend === 'up'

  return (
    <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: COLORS.white }}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2" style={{ color: COLORS.navyBlue }}>
            {value}
            {unit && <span className="text-lg ml-1">{unit}</span>}
          </p>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
          <Icon size={24} style={{ color: COLORS.govBlue }} />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {trend === 'up' ? (
          <ArrowUp size={16} className="text-green-500" />
        ) : (
          <ArrowDown size={16} className="text-red-500" />
        )}
        <span className={isPositive ? 'text-green-500' : 'text-red-500'} style={{ fontSize: '12px', fontWeight: '500' }}>
          {Math.abs(change)}% vs last week
        </span>
      </div>
    </Card>
  )
}

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  let bg = COLORS.green,
    text = 'white'
  if (status === 'Needs Attention') {
    bg = COLORS.orange
  } else if (status === 'Critical') {
    bg = COLORS.red
  } else if (status === 'Good') {
    bg = COLORS.yellow
  }

  return <Badge style={{ backgroundColor: bg, color: text, borderRadius: '4px' }}>{status}</Badge>
}

// Custom Chart Components
const DepartmentHealthGauge = ({ score }: { score: number }) => {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 200 120">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={COLORS.lightGray}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Filled arc based on score */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={score > 90 ? COLORS.green : score > 70 ? COLORS.orange : COLORS.red}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${((score / 100) * 251.2).toFixed(0)} 251.2`}
          />
          {/* Labels */}
          <text x="40" y="110" fontSize="12" fill={COLORS.darkGray} fontWeight="500">
            0
          </text>
          <text x="160" y="110" fontSize="12" fill={COLORS.darkGray} fontWeight="500">
            100
          </text>
          {/* Center text */}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl font-bold" style={{ color: COLORS.navyBlue }}>
            {score}
          </p>
          <p className="text-sm text-gray-600">Health Score</p>
        </div>
      </div>
    </div>
  )
}

export default function DepartmentAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentDateTime, setCurrentDateTime] = useState('')

  useEffect(() => {
    setCurrentDateTime(
      new Intl.DateTimeFormat('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date())
    )
  }, [])

  const sidebarItems = [
    { id: 'overview-banner', label: 'Dashboard', icon: <TrendingUp size={20} /> },
    { id: 'department-analytics', label: 'Department Analytics', icon: <BarChart3 size={20} /> },
    { id: 'officers-management', label: 'Officers Management', icon: <Users size={20} /> },
    { id: 'applications-monitoring', label: 'Applications Monitoring', icon: <FileText size={20} /> },
    { id: 'grievance-monitoring', label: 'Grievance Monitoring', icon: <AlertTriangle size={20} /> },
    { id: 'sla-monitoring', label: 'SLA Monitoring', icon: <Shield size={20} /> },
    { id: 'service-performance', label: 'Service Performance', icon: <Heart size={20} /> },
    { id: 'reports-exports', label: 'Reports & Exports', icon: <Download size={20} /> },
    { id: 'ai-insights', label: 'AI Insights', icon: <Bot size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Inbox size={20} /> },
    { id: 'profile', label: 'Profile', icon: <Settings size={20} /> },
  ]

  const handleScrollTo = (sectionId: string) => {
    setActiveTab(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightGray }}>
      {/* Top Header */}
      <header className="border-b" style={{ backgroundColor: COLORS.navyBlue }}>
        <div className="px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-white">
                <h1 className="text-2xl font-bold">Revenue Department</h1>
                <p className="text-sm text-blue-200">Tamil Nadu Government</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2" style={{ backgroundColor: COLORS.govBlue, padding: '8px 12px', borderRadius: '6px' }}>
                <Search size={18} className="text-blue-200" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-blue-200 outline-none w-48"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <Button variant="ghost" size="icon" style={{ color: 'white' }}>
                <Bell size={20} />
              </Button>
              <div className="border-l border-blue-400 pl-4">
                <Button variant="ghost" size="sm" style={{ color: 'white', gap: '8px' }}>
                  <Settings size={18} />
                  <span>Admin</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Department Info Bar */}
          <div className="flex items-center justify-between text-sm text-blue-100">
            <div className="flex gap-6">
              <div>
                <span className="opacity-75">Admin:</span>
                <span className="ml-2 font-semibold">R. Suresh</span>
              </div>
              <div>
                <span className="opacity-75">Designation:</span>
                <span className="ml-2 font-semibold">Joint Commissioner</span>
              </div>
              <div>
                <span className="opacity-75">Coverage:</span>
                <span className="ml-2 font-semibold">Tamil Nadu</span>
              </div>
              <div>
                <span className="opacity-75">Date:</span>
                <span className="ml-2 font-semibold">{currentDateTime}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r" style={{ backgroundColor: COLORS.white, minHeight: 'calc(100vh - 120px)' }}>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                  activeTab === item.id ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                )}
                style={activeTab === item.id ? { backgroundColor: 'rgba(30, 90, 168, 0.1)', color: COLORS.govBlue } : {}}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.sessionStorage.clear()
                  window.localStorage.removeItem('sevaihub-admin')
                  window.localStorage.removeItem('departmentAdmin')
                  window.location.href = '/officer-login'
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-8"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Executive Overview Banner */}
            <Card id="overview-banner" className="mb-8 border-0 shadow-md p-8" style={{ backgroundColor: COLORS.govBlue }}>
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-2">Today's Operations Summary</h2>
                  <p className="text-blue-200 text-sm mb-4">Real-time department performance metrics</p>
                  <div className="grid grid-cols-5 gap-6 mt-4">
                    <div>
                      <p className="text-blue-200 text-sm">Applications Received</p>
                      <p className="text-3xl font-bold">1,247</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Processed Today</p>
                      <p className="text-3xl font-bold">1,089</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Pending</p>
                      <p className="text-3xl font-bold">3,456</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Grievances</p>
                      <p className="text-3xl font-bold">234</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">SLA Breaches</p>
                      <p className="text-3xl font-bold text-red-300">12</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-white text-slate-900 hover:bg-slate-100 border border-white shadow-sm"
                    style={{ color: COLORS.navyBlue }}
                  >
                    <FileText size={18} />
                    <span className="ml-2">Detailed Report</span>
                  </Button>
                  <Button className="bg-slate-100 text-slate-900 hover:bg-white border border-slate-200 shadow-sm">
                    <Download size={18} />
                    <span className="ml-2">Download</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Department Health Score Section */}
            <div id="department-analytics" className="grid grid-cols-3 gap-8 mb-8">
              {/* Health Score Card */}
              <Card className="col-span-1 border-0 shadow-md p-8" style={{ backgroundColor: COLORS.white }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.navyBlue }}>
                  Department Health Score
                </h3>
                <div className="mb-6">
                  <DepartmentHealthGauge score={92} />
                </div>
                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-500 mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">High SLA Compliance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-500 mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">Fast Resolution Time</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-500 mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">Low Escalation Rate</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-orange-500 mt-1 shrink-0" />
                    <span className="text-sm text-gray-700">Slight increase in pending cases</span>
                  </div>
                </div>
                <p className="text-center mt-6 font-semibold text-green-600">Status: Excellent Performance</p>
              </Card>

              {/* Key Metrics */}
              <div className="col-span-2 space-y-8">
                {/* KPI Row 1 */}
                <div className="grid grid-cols-3 gap-4">
                  <KPICard
                    title="SLA Compliance Rate"
                    value="97.4%"
                    change={2.3}
                    trend="up"
                    icon={CheckCircle2}
                  />
                  <KPICard
                    title="Citizen Satisfaction"
                    value="4.8"
                    change={0.5}
                    trend="up"
                    unit="/5"
                    icon={Heart}
                  />
                  <KPICard
                    title="Resolution Speed"
                    value="2.3"
                    change={1.2}
                    trend="up"
                    unit="days"
                    icon={Zap}
                  />
                </div>

                {/* KPI Row 2 */}
                <div className="grid grid-cols-3 gap-4">
                  <KPICard
                    title="Escalations Raised"
                    value="145"
                    change={5.1}
                    trend="down"
                    icon={AlertTriangle}
                  />
                  <KPICard
                    title="Escalations Closed"
                    value="132"
                    change={8.3}
                    trend="up"
                    icon={CheckCircle2}
                  />
                  <KPICard
                    title="Avg Processing Time"
                    value="18"
                    change={3.2}
                    trend="up"
                    unit="hrs"
                    icon={Clock}
                  />
                </div>
              </div>
            </div>

            {/* Performance Analytics Tabs */}
            <Tabs defaultValue="applications" className="mb-8">
              <TabsList className="mb-4" style={{ backgroundColor: COLORS.white, border: `1px solid #e5e7eb` }}>
                <TabsTrigger value="applications">Applications Trend</TabsTrigger>
                <TabsTrigger value="services">By Service Type</TabsTrigger>
                <TabsTrigger value="complaints">Complaint Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="applications" id="applications-monitoring">
                <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                    Daily Application Processing Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={applicationsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.govBlue} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={COLORS.govBlue} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={COLORS.green} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip contentStyle={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.govBlue}` }} />
                      <Legend />
                      <Area type="monotone" dataKey="received" stroke={COLORS.govBlue} fillOpacity={1} fill="url(#colorReceived)" />
                      <Area type="monotone" dataKey="processed" stroke={COLORS.green} fillOpacity={1} fill="url(#colorProcessed)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </TabsContent>

              <TabsContent value="services">
                <div className="grid grid-cols-2 gap-8">
                  <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                    <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                      Applications by Service Type
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={applicationsByServiceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {applicationsByServiceData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={[COLORS.govBlue, COLORS.orange, COLORS.green, COLORS.purple, COLORS.cyan, COLORS.red][index]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </Card>

                  <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                    <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                      Service Performance Summary
                    </h3>
                    <div className="space-y-4">
                      {applicationsByServiceData.map((service) => (
                        <div key={service.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{service.name}</span>
                            <span className="text-sm font-bold text-gray-900">{service.value}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{ width: `${service.percentage * 3}%`, backgroundColor: COLORS.govBlue }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="complaints" id="grievance-monitoring">
                <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                    Complaint Trends & Resolution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={complaintTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip contentStyle={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.govBlue}` }} />
                      <Legend />
                      <Line type="monotone" dataKey="complaints" stroke={COLORS.orange} strokeWidth={2} />
                      <Line type="monotone" dataKey="resolved" stroke={COLORS.green} strokeWidth={2} />
                      <Line type="monotone" dataKey="escalated" stroke={COLORS.red} strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Officer Performance Monitoring */}
            <Card id="officers-management" className="border-0 shadow-md p-6 mb-8" style={{ backgroundColor: COLORS.white }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg" style={{ color: COLORS.navyBlue }}>
                  Officer Performance Monitoring
                </h3>
                <Button variant="outline" size="sm">
                  View All Officers
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${COLORS.lightGray}` }}>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Officer Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Designation</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Assigned</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Completed</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">SLA Compliance</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Rating</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {officersData.map((officer) => (
                      <tr key={officer.id} style={{ borderBottom: `1px solid ${COLORS.lightGray}` }}>
                        <td className="py-4 px-4 font-medium text-gray-900">{officer.name}</td>
                        <td className="py-4 px-4 text-gray-700">{officer.designation}</td>
                        <td className="py-4 px-4 text-center text-gray-900 font-semibold">{officer.assigned}</td>
                        <td className="py-4 px-4 text-center text-gray-900 font-semibold">{officer.completed}</td>
                        <td className="py-4 px-4 text-center">
                          <span
                            style={{
                              color: officer.sla > 90 ? COLORS.green : officer.sla > 75 ? COLORS.orange : COLORS.red,
                              fontWeight: '600',
                            }}
                          >
                            {officer.sla}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-yellow-600 font-semibold">★ {officer.rating}</td>
                        <td className="py-4 px-4 text-center">
                          <StatusBadge status={officer.status} />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Workload & Escalation Section */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Workload Distribution */}
              <Card id="service-performance" className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                  Workload Distribution
                </h3>
                <div className="space-y-4">
                  {officersData.slice(0, 3).map((officer) => {
                    const capacity = 250
                    const usage = (officer.assigned / capacity) * 100
                    const statusColor = usage > 90 ? COLORS.red : usage > 75 ? COLORS.orange : COLORS.green

                    return (
                      <div key={officer.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">{officer.name}</span>
                          <span className="text-xs font-semibold" style={{ color: statusColor }}>
                            {usage.toFixed(0)}% Capacity
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="h-3 rounded-full" style={{ width: `${Math.min(usage, 100)}%`, backgroundColor: statusColor }}></div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
                    <p className="text-sm font-semibold text-gray-900 mb-2">🤖 AI Recommendation:</p>
                    <p className="text-sm text-gray-700">
                      Officer <strong>Priya, S.</strong> is overloaded. Transfer 40 cases to <strong>Vikram, K.</strong> to optimize workload balance.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Escalation Center */}
              <Card id="sla-monitoring" className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                  Escalation Command Center
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
                    <p className="text-sm text-gray-600">Citizen Escalations</p>
                    <p className="text-3xl font-bold text-orange-600">45</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
                    <p className="text-sm text-gray-600">Officer Escalations</p>
                    <p className="text-3xl font-bold text-red-600">23</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
                    <p className="text-sm text-gray-600">SLA Breaches</p>
                    <p className="text-3xl font-bold text-red-600">12</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
                    <p className="text-sm text-gray-600">Critical Priority</p>
                    <p className="text-3xl font-bold text-purple-600">8</p>
                  </div>
                </div>
                <Button className="w-full mt-4" style={{ backgroundColor: COLORS.red }}>
                  View All Escalations
                </Button>
              </Card>
            </div>

            {/* District Performance & SLA Monitoring */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* District Ranking */}
              <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                  District Performance Ranking
                </h3>
                <div className="space-y-3">
                  {districtPerformanceData.map((district) => (
                    <div key={district.district} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-400">
                          {['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][district.rank - 1]}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">{district.district}</p>
                          <p className="text-xs text-gray-600">{district.processed} processed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">{district.sla}% SLA</p>
                        <p className="text-xs text-gray-600">{district.satisfaction}% Satisfaction</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* SLA Monitoring */}
              <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                  SLA Monitoring Dashboard
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Within SLA', value: 2847, color: COLORS.green },
                    { label: 'Approaching SLA', value: 456, color: COLORS.yellow },
                    { label: 'Overdue', value: 89, color: COLORS.orange },
                    { label: 'Critical Delay', value: 12, color: COLORS.red },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        <span className="text-sm font-bold text-gray-900">{item.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full"
                          style={{ width: `${(item.value / 3500) * 100}%`, backgroundColor: item.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Department Performance Radar & Recent Activities */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Performance Radar */}
              <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                  Department Performance Radar
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsRadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke={COLORS.lightGray} />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Performance" dataKey="value" stroke={COLORS.govBlue} fill={COLORS.govBlue} fillOpacity={0.6} />
                    <Tooltip contentStyle={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.govBlue}` }} />
                  </RechartsRadarChart>
                </ResponsiveContainer>
              </Card>

              {/* Recent Activities */}
              <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                  Recent Department Activities
                </h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {recentActivitiesData.map((activity, idx) => (
                    <div key={idx} className="flex gap-3 pb-3 border-b border-gray-200 last:border-b-0">
                      <div className="shrink-0 pt-1">
                        <div
                          className="w-2 h-2 rounded-full mt-2"
                          style={{
                            backgroundColor:
                              activity.type === 'success'
                                ? COLORS.green
                                : activity.type === 'alert'
                                  ? COLORS.red
                                  : COLORS.orange,
                          }}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-600">{activity.time}</p>
                        <p className="text-sm text-gray-800 mt-1">{activity.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* AI Insights Panel */}
            <Card id="ai-insights" className="border-0 shadow-md p-6 mb-8" style={{ backgroundColor: COLORS.govBlue }}>
              <div className="flex items-start gap-4 text-white">
                <div className="p-3 rounded-lg bg-white bg-opacity-20">
                  <Bot size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-3">AI Department Advisor</h3>
                  <div className="space-y-2 text-blue-100">
                    <p>• 📊 "SLA breach prediction: 8 cases expected to breach in next 4 hours"</p>
                    <p>• 👤 "Officer Priya requires support. Consider reassigning 40 cases to optimize team efficiency"</p>
                    <p>• 📈 "Complaint spike detected: 35% increase in Income Certificate complaints in Chennai district"</p>
                    <p>• ⚠️ "System load approaching 85%. Recommend case distribution optimization"</p>
                    <p>• 💡 "Efficiency insight: Processing time reduced by 12% this week vs. last week"</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              <Card id="notifications" className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg" style={{ color: COLORS.navyBlue }}>
                    Notifications
                  </h3>
                  <Badge className="bg-red-100 text-red-700 border-red-200">4 Unread</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    'Officer SLA breach detected in Chennai.',
                    'High complaint volume reported for Income Certificate services.',
                    'System downtime alert from the state portal.',
                    'Minister-level escalation pending approval.',
                  ].map((item) => (
                    <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="profile" className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.navyBlue }}>
                  Profile
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Admin</p>
                    <p className="mt-2 font-semibold text-slate-900">R. Suresh</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Designation</p>
                    <p className="mt-2 font-semibold text-slate-900">Joint Commissioner</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Coverage</p>
                    <p className="mt-2 font-semibold text-slate-900">Tamil Nadu</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions Footer */}
            <div id="reports-exports" className="flex gap-4 justify-center pb-8">
              {[
                { icon: <Users size={20} />, label: 'Add Officer' },
                { icon: <RefreshCw size={20} />, label: 'Reassign Cases' },
                { icon: <FileText size={20} />, label: 'Generate Report' },
                { icon: <AlertTriangle size={20} />, label: 'Handle Escalation' },
                { icon: <Bot size={20} />, label: 'Ask AI' },
                { icon: <Download size={20} />, label: 'Export Data' },
              ].map((action, idx) => (
                <Button
                  key={idx}
                  className="flex items-center gap-2"
                  style={{ backgroundColor: COLORS.govBlue, color: 'white' }}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
