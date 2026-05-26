'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp, BarChart3, Users, MapPin, AlertTriangle, Shield,
  Bot, FileText, Download, Bell, Settings, LogOut, Search,
  CheckCircle2, Zap, ArrowRight, Heart, Activity, Inbox,
  ArrowUpRight, ArrowDownRight, Globe, ThermometerSun,
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip,
  Legend, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar,
} from 'recharts'
import { cn } from '@/lib/utils'

const COLORS = {
  govBlue: '#1E5AA8',
  navyBlue: '#0F3D73',
  white: '#FFFFFF',
  lightGray: '#F3F4F6',
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444',
  purple: '#8B5CF6',
  cyan: '#06B6D4',
  yellow: '#FBBF24',
}

const sidebarItems = [
  { id: 'dashboard-top', label: 'Dashboard', icon: <TrendingUp size={20} /> },
  { id: 'state-overview', label: 'State Overview', icon: <Globe size={20} /> },
  { id: 'department-performance', label: 'Department Performance', icon: <BarChart3 size={20} /> },
  { id: 'district-analytics', label: 'District Analytics', icon: <MapPin size={20} /> },
  { id: 'service-analytics', label: 'Service Analytics', icon: <FileText size={20} /> },
  { id: 'grievance-intelligence', label: 'Grievance Intelligence', icon: <AlertTriangle size={20} /> },
  { id: 'sla-monitoring', label: 'SLA Monitoring', icon: <Shield size={20} /> },
  { id: 'ai-insights', label: 'AI Governance Insights', icon: <Bot size={20} /> },
  { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
  { id: 'notifications', label: 'Notifications', icon: <Inbox size={20} /> },
  { id: 'profile', label: 'Profile', icon: <Settings size={20} /> },
]

const stateGovData = {
  applicationsReceived: 24582,
  applicationsProcessed: 21847,
  complaintsRegistered: 3248,
  complaintsResolved: 3089,
  slaCompliance: 96.8,
  citizenSatisfaction: 4.7,
  totalDepartments: 28,
  totalDistricts: 38,
  activeOfficers: 2847,
}

const departmentPerformance = [
  { rank: 1, name: 'Revenue Department', applications: 8425, resolution: 98, sla: 97.8, satisfaction: 4.8 },
  { rank: 2, name: 'Transport Department', applications: 6234, resolution: 97, sla: 96.5, satisfaction: 4.6 },
  { rank: 3, name: 'Municipal Administration', applications: 5678, resolution: 95, sla: 95.2, satisfaction: 4.5 },
  { rank: 4, name: 'Health & Welfare', applications: 4567, resolution: 94, sla: 94.1, satisfaction: 4.4 },
  { rank: 5, name: 'Education Department', applications: 3891, resolution: 93, sla: 92.8, satisfaction: 4.3 },
]

const districtPerformance = [
  { rank: 1, name: 'Chennai', processed: 3425, resolved: 412, satisfaction: 4.8, score: 95 },
  { rank: 2, name: 'Coimbatore', processed: 2876, resolved: 324, satisfaction: 4.7, score: 94 },
  { rank: 3, name: 'Madurai', processed: 2456, resolved: 287, satisfaction: 4.6, score: 93 },
  { rank: 4, name: 'Trichy', processed: 2134, resolved: 256, satisfaction: 4.5, score: 92 },
  { rank: 5, name: 'Salem', processed: 1987, resolved: 238, satisfaction: 4.4, score: 91 },
]

const servicesDemand = [
  { name: 'Income Certificate', value: 6847, percentage: 28 },
  { name: 'Birth Certificate', value: 5234, percentage: 21 },
  { name: 'Community Certificate', value: 4126, percentage: 17 },
  { name: 'Driving License', value: 3897, percentage: 16 },
  { name: 'Property Tax', value: 2478, percentage: 10 },
]

const complaintsByDistrict = [
  { district: 'Chennai', complaints: 487, severity: 'high' },
  { district: 'Madurai', complaints: 342, severity: 'high' },
  { district: 'Coimbatore', complaints: 278, severity: 'medium' },
  { district: 'Salem', complaints: 256, severity: 'medium' },
  { district: 'Trichy', complaints: 189, severity: 'low' },
]

const slaStatus = [
  { label: 'Within SLA', value: 22847, percentage: 96.8, color: COLORS.green },
  { label: 'Near Breach', value: 567, percentage: 2.4, color: COLORS.orange },
  { label: 'Breached', value: 234, percentage: 1.0, color: COLORS.red },
]

const monthlyTrends = [
  { month: 'Jan', applications: 18420, complaints: 2340, sla: 94.2, satisfaction: 4.4 },
  { month: 'Feb', applications: 19850, complaints: 2567, sla: 94.8, satisfaction: 4.45 },
  { month: 'Mar', applications: 21234, complaints: 2890, sla: 95.2, satisfaction: 4.5 },
  { month: 'Apr', applications: 22876, complaints: 3120, sla: 95.8, satisfaction: 4.6 },
  { month: 'May', applications: 24582, complaints: 3248, sla: 96.8, satisfaction: 4.7 },
]

const governanceRadarData = [
  { category: 'Efficiency', value: 92 },
  { category: 'Transparency', value: 88 },
  { category: 'Accessibility', value: 85 },
  { category: 'Responsiveness', value: 90 },
  { category: 'Accountability', value: 87 },
  { category: 'Citizen Happiness', value: 89 },
]

const aiInsights = [
  '📊 Revenue complaints increased by 18% in Chennai district. Root cause analysis: Income certificate processing delays.',
  '💧 Water supply complaints trending upward in Madurai. Recommend fast-track inspection and reporting.',
  '⚠️ Transport department approaching SLA threshold. 8 cases expected to breach in next 48 hours.',
  '😊 Citizen satisfaction improved by 12% in Coimbatore post officer training initiative.',
]

const recentActivity = [
  { activity: 'Income Certificate Approved', district: 'Chennai', time: '2 min ago' },
  { activity: 'Complaint Escalated to Secretary', district: 'Madurai', time: '5 min ago' },
  { activity: 'Patta Transfer Completed', district: 'Coimbatore', time: '8 min ago' },
  { activity: 'Community Certificate Issued', district: 'Salem', time: '12 min ago' },
  { activity: 'Water Supply Complaint Resolved', district: 'Trichy', time: '15 min ago' },
]

const achievements = [
  '🏆 Revenue Department achieved 99% SLA compliance this month.',
  '📈 Complaint resolution improved by 14% quarter-over-quarter.',
  '😊 Citizen satisfaction crossed 4.7/5 rating.',
  '⚡ Processing speed improved by 18% through AI optimization.',
]

const criticalAreas = [
  '🔴 Water supply complaints increased 22% in Madurai district.',
  '🟠 Property tax applications delayed in Salem by 3+ days.',
  '🟠 Municipal grievances pending resolution in Tirunelveli.',
  '🟡 Compliance monitoring needed in Kanyakumari district.',
]

const criticalAlerts = [
  { type: 'SLA Breach', count: 12, color: COLORS.red, severity: 'Critical' },
  { type: 'Complaint Surge', count: 45, color: COLORS.orange, severity: 'High' },
  { type: 'VIP Escalation', count: 8, color: COLORS.purple, severity: 'High' },
]

export default function StateAdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard-top')
  const [currentDateTime, setCurrentDateTime] = useState('')

  useEffect(() => {
    setCurrentDateTime(
      new Intl.DateTimeFormat('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date())
    )
  }, [])

  const handleScrollTo = (sectionId: string) => {
    setActiveTab(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear()
      window.localStorage.removeItem('sevaihub-admin')
      window.localStorage.removeItem('stateAdmin')
      window.location.href = '/officer-login'
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightGray }}>
      {/* Top Header */}
      <header className="border-b sticky top-0 z-40" style={{ backgroundColor: COLORS.navyBlue }}>
        <div className="px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-white">
                <h1 className="text-2xl font-bold">Tamil Nadu State Governance</h1>
                <p className="text-sm text-blue-200">AI-Powered Command Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2" style={{ backgroundColor: COLORS.govBlue, padding: '8px 12px', borderRadius: '6px' }}>
                <Search size={18} className="text-blue-200" />
                <input
                  type="text"
                  placeholder="Search districts, services, complaints..."
                  className="bg-transparent text-white placeholder-blue-200 outline-none w-64"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <Button variant="ghost" size="icon" style={{ color: 'white' }}>
                <Bell size={20} />
              </Button>
              <div className="border-l border-blue-400 pl-4">
                <Button variant="ghost" size="sm" style={{ color: 'white', gap: '8px' }}>
                  <Settings size={18} />
                  <span>Chief Secretary</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Governance Header */}
          <div className="grid grid-cols-5 gap-4 text-sm text-blue-100">
            <div>
              <span className="opacity-75">State:</span>
              <span className="ml-2 font-semibold">Tamil Nadu</span>
            </div>
            <div>
              <span className="opacity-75">Date & Time:</span>
              <span className="ml-2 font-semibold text-xs">{currentDateTime}</span>
            </div>
            <div>
              <span className="opacity-75">Total Departments:</span>
              <span className="ml-2 font-semibold">{stateGovData.totalDepartments}</span>
            </div>
            <div>
              <span className="opacity-75">Total Districts:</span>
              <span className="ml-2 font-semibold">{stateGovData.totalDistricts}</span>
            </div>
            <div>
              <span className="opacity-75">Active Officers:</span>
              <span className="ml-2 font-semibold">{stateGovData.activeOfficers}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 border-r" style={{ backgroundColor: COLORS.white, minHeight: 'calc(100vh - 120px)' }}>
          <nav className="p-5 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 mb-4">Command Center</p>
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
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-8"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Executive Governance Overview Banner */}
            <Card
              id="dashboard-top"
              className="border-0 shadow-lg p-8"
              style={{ backgroundColor: COLORS.govBlue }}
            >
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2">Tamil Nadu Governance Overview</h2>
                  <p className="text-blue-200 text-sm mb-6">Real-time state performance metrics and operational insights</p>
                  <div className="grid grid-cols-3 gap-12">
                    <div>
                      <p className="text-blue-200 text-sm">Applications Today</p>
                      <p className="text-4xl font-bold">{stateGovData.applicationsReceived.toLocaleString()}</p>
                      <p className="text-xs text-blue-300 mt-1">↑ 12% from yesterday</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Complaints Today</p>
                      <p className="text-4xl font-bold">{stateGovData.complaintsRegistered.toLocaleString()}</p>
                      <p className="text-xs text-blue-300 mt-1">↓ 8% from yesterday</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">State Metrics</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-xl font-bold">SLA: {stateGovData.slaCompliance}%</p>
                        <p className="text-xl font-bold">Satisfaction: {stateGovData.citizenSatisfaction}/5</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100">
                    <FileText size={18} />
                    <span className="ml-2">View State Report</span>
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Download size={18} />
                    <span className="ml-2">Download Analytics</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* State Governance Health Score */}
            <div id="state-overview" className="grid grid-cols-3 gap-8">
              {/* Health Gauge */}
              <Card className="col-span-1 border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
                <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                  Governance Health Score
                </h3>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 120 120" className="transform -rotate-90 w-full h-full">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={COLORS.green}
                        strokeWidth="8"
                        strokeDasharray={`${(92 / 100) * 314} 314`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-3xl font-bold text-gray-900">92</p>
                      <p className="text-xs text-gray-600">/100</p>
                    </div>
                  </div>
                  <p className="text-center mt-6 font-semibold text-green-600">Status: Excellent</p>
                </div>
                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Efficiency</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transparency</span>
                    <span className="font-semibold">88%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Citizen Satisfaction</span>
                    <span className="font-semibold">89%</span>
                  </div>
                </div>
              </Card>

              {/* Key Metrics Grid */}
              <div className="col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Processing Rate</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900">
                      {((stateGovData.applicationsProcessed / stateGovData.applicationsReceived) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-green-600 mt-2">↑ 3.2% from yesterday</p>
                  </Card>
                  <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Resolution Rate</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900">
                      {((stateGovData.complaintsResolved / stateGovData.complaintsRegistered) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-green-600 mt-2">↑ 2.1% from yesterday</p>
                  </Card>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Avg. Resolution Time</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900">1.8 Days</p>
                    <p className="text-sm text-green-600 mt-2">↓ 0.3 days improvement</p>
                  </Card>
                  <Card className="border-0 shadow-md p-6" style={{ backgroundColor: COLORS.white }}>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Pending Cases</p>
                    <p className="text-3xl font-bold mt-2 text-orange-600">
                      {(stateGovData.applicationsReceived - stateGovData.applicationsProcessed).toLocaleString()}
                    </p>
                    <p className="text-sm text-orange-600 mt-2">3.2 days average age</p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Department Performance Ranking */}
            <Card
              id="department-performance"
              className="border-0 shadow-lg p-8"
              style={{ backgroundColor: COLORS.white }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: COLORS.navyBlue }}>
                  Department Performance Ranking
                </h3>
                <Button variant="outline" size="sm">
                  View All Departments
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${COLORS.lightGray}` }}>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Applications</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Resolution %</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">SLA Compliance</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentPerformance.map((dept) => (
                      <tr key={dept.rank} style={{ borderBottom: `1px solid ${COLORS.lightGray}` }}>
                        <td className="py-4 px-4 text-center font-bold text-gray-900">
                          {dept.rank === 1 ? '🥇' : dept.rank === 2 ? '🥈' : dept.rank === 3 ? '🥉' : dept.rank}
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-900">{dept.name}</td>
                        <td className="py-4 px-4 text-center text-gray-900">{dept.applications.toLocaleString()}</td>
                        <td className="py-4 px-4 text-center font-semibold text-green-600">{dept.resolution}%</td>
                        <td className="py-4 px-4 text-center font-semibold text-green-600">{dept.sla}%</td>
                        <td className="py-4 px-4 text-center text-yellow-600">★ {dept.satisfaction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* District Analytics */}
            <div id="district-analytics" className="grid grid-cols-2 gap-8">
              {/* District Performance */}
              <Card className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                  Top Districts
                </h3>
                <div className="space-y-3">
                  {districtPerformance.map((district) => (
                    <div key={district.rank} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {district.rank === 1 ? '🥇' : district.rank === 2 ? '🥈' : district.rank === 3 ? '🥉' : ''}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">{district.name}</p>
                          <p className="text-xs text-gray-600">{district.processed} processed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">Score: {district.score}</p>
                        <p className="text-xs text-gray-600">⭐ {district.satisfaction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Interactive Map Visualization */}
              <Card className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                  District Status Overview
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Excellent Districts', count: 12, color: COLORS.green },
                    { label: 'Good Districts', count: 18, color: COLORS.cyan },
                    { label: 'Attention Needed', count: 8, color: COLORS.orange },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-lg text-center" style={{ backgroundColor: `${item.color}15`, borderLeft: `4px solid ${item.color}` }}>
                      <p className="text-3xl font-bold text-gray-900">{item.count}</p>
                      <p className="text-xs font-medium text-gray-600 mt-2">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Top Issue Areas:</p>
                  <div className="space-y-1">
                    {['Chennai (487 complaints)', 'Madurai (342 complaints)', 'Coimbatore (278 complaints)'].map((item) => (
                      <p key={item} className="text-sm text-gray-600">🔴 {item}</p>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Service Analytics */}
            <Card id="service-analytics" className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                State Service Demand Analytics
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Most Requested Services</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={servicesDemand}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {servicesDemand.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={[COLORS.govBlue, COLORS.orange, COLORS.green, COLORS.purple, COLORS.cyan][index]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Service Performance</h4>
                  <div className="space-y-3">
                    {servicesDemand.map((service) => (
                      <div key={service.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{service.name}</span>
                          <span className="text-sm font-bold text-gray-900">{service.value.toLocaleString()}</span>
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
                </div>
              </div>
            </Card>

            {/* Grievance Intelligence */}
            <Card id="grievance-intelligence" className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                Grievance Intelligence Center
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Complaint Density by District</h4>
                  <div className="space-y-3">
                    {complaintsByDistrict.map((item) => (
                      <div key={item.district} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{item.district}</span>
                            <span className="text-sm font-bold">{item.complaints}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(item.complaints / 487) * 100}%`,
                                backgroundColor: item.severity === 'high' ? COLORS.red : item.severity === 'medium' ? COLORS.orange : COLORS.green,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Top Complaint Categories</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={complaintsByDistrict}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="district" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="complaints" fill={COLORS.orange} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* SLA Monitoring */}
            <Card id="sla-monitoring" className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                SLA Monitoring Command Center
              </h3>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {slaStatus.map((status) => (
                  <div key={status.label} className="p-6 rounded-lg" style={{ backgroundColor: `${status.color}15`, borderLeft: `4px solid ${status.color}` }}>
                    <p className="text-sm font-semibold text-gray-600">{status.label}</p>
                    <p className="text-3xl font-bold mt-2" style={{ color: status.color }}>
                      {status.value.toLocaleString()}
                    </p>
                    <p className="text-sm font-semibold mt-2" style={{ color: status.color }}>
                      {status.percentage.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">SLA Trend Over Time</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.govBlue}` }} />
                    <Legend />
                    <Line type="monotone" dataKey="sla" stroke={COLORS.green} strokeWidth={2} name="SLA Compliance %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* AI Governance Insights */}
            <Card id="ai-insights" className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.govBlue }}>
              <div className="flex items-start gap-4 text-white">
                <div className="p-3 rounded-lg bg-white bg-opacity-20">
                  <Bot size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">AI Governance Advisor</h3>
                  <div className="space-y-3 text-blue-100">
                    {aiInsights.map((insight, idx) => (
                      <p key={idx} className="text-sm leading-relaxed">
                        {insight}
                      </p>
                    ))}
                  </div>
                  <Button className="mt-6 bg-white text-slate-900 hover:bg-slate-100">
                    <Zap size={18} />
                    <span className="ml-2">View Full AI Analysis</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Governance Radar */}
            <Card className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                Governance Performance Radar
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={governanceRadarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="category" stroke="#6b7280" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
                  <Radar name="Score" dataKey="value" stroke={COLORS.govBlue} fill={COLORS.govBlue} fillOpacity={0.5} />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Monthly Trends */}
            <Card className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                Monthly State Governance Trends
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Applications & Complaints Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrends}>
                      <defs>
                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.govBlue} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={COLORS.govBlue} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.orange} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={COLORS.orange} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Area type="monotone" dataKey="applications" stroke={COLORS.govBlue} fillOpacity={1} fill="url(#colorApps)" />
                      <Area type="monotone" dataKey="complaints" stroke={COLORS.orange} fillOpacity={1} fill="url(#colorComplaints)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Satisfaction & SLA Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" yAxisId="left" />
                      <YAxis stroke="#6b7280" yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="satisfaction" stroke={COLORS.green} strokeWidth={2} name="Satisfaction /5" />
                      <Line yAxisId="right" type="monotone" dataKey="sla" stroke={COLORS.govBlue} strokeWidth={2} name="SLA %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Recent Activity Feed */}
            <Card className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                Real-Time State Activity Feed
              </h3>
              <div className="space-y-3">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <Activity size={18} style={{ color: COLORS.govBlue }} />
                      <div>
                        <p className="font-semibold text-gray-900">{item.activity}</p>
                        <p className="text-sm text-gray-600">{item.district}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements & Critical Areas */}
            <div className="grid grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                  Top 5 Achievements This Month
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
                      <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                  Areas Requiring Immediate Attention
                </h3>
                <div className="space-y-3">
                  {criticalAreas.map((area, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
                      <AlertTriangle size={20} className="text-orange-600 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700">{area}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Emergency Alerts */}
            <Card id="reports" className="border-0 shadow-lg p-8" style={{ backgroundColor: `${COLORS.red}15` }}>
              <div className="flex items-start gap-4">
                <AlertTriangle size={28} style={{ color: COLORS.red }} />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.red }}>
                    Emergency & Critical Alerts
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {criticalAlerts.map((alert) => (
                      <div key={alert.type} className="p-4 rounded-lg bg-white border-l-4" style={{ borderColor: alert.color }}>
                        <p className="font-semibold text-gray-900">{alert.type}</p>
                        <p className="text-2xl font-bold mt-2" style={{ color: alert.color }}>
                          {alert.count}
                        </p>
                        <p className="text-xs font-medium text-gray-600 mt-1">{alert.severity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Notifications Section */}
            <Card id="notifications" className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: COLORS.navyBlue }}>
                  Notifications & Alerts
                </h3>
                <Badge className="bg-red-100 text-red-700 border-red-200">12 Unread</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'New complaint surge in Chennai district',
                  'SLA breach alert: 12 cases critical',
                  'Officer performance review required',
                  'Department analytics report ready',
                ].map((notification, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-700">{notification}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Profile Section */}
            <Card id="profile" className="border-0 shadow-lg p-8" style={{ backgroundColor: COLORS.white }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.navyBlue }}>
                Admin Profile
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Administrator', value: 'Dr. Rajesh Kumar' },
                  { label: 'Designation', value: 'Chief Secretary' },
                  { label: 'Department', value: 'Chief Minister Office' },
                  { label: 'Access Level', value: 'Full State Access' },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-600 font-semibold">{item.label}</p>
                    <p className="mt-2 font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="flex gap-4 justify-center pb-8">
              {[
                { icon: <FileText size={20} />, label: 'Generate State Report' },
                { icon: <MapPin size={20} />, label: 'View District Analytics' },
                { icon: <BarChart3 size={20} />, label: 'Department Ranking' },
                { icon: <Bot size={20} />, label: 'AI Recommendations' },
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
