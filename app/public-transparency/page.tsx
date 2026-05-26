'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts'
import {
  TrendingUp,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Eye,
  Download,
  Calendar,
  Search,
  Filter,
  Info,
  Heart,
  Activity,
  Zap,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const applicationTrendData = [
  { date: 'May 17', received: 450, processed: 380, pending: 120 },
  { date: 'May 18', received: 520, processed: 420, pending: 180 },
  { date: 'May 19', received: 480, processed: 450, pending: 210 },
  { date: 'May 20', received: 590, processed: 510, pending: 290 },
  { date: 'May 21', received: 620, processed: 580, pending: 330 },
  { date: 'May 22', received: 710, processed: 650, pending: 390 },
  { date: 'May 23', received: 680, processed: 720, pending: 350 },
]

const grievanceTrendData = [
  { date: 'May 17', filed: 120, resolved: 95, pending: 45 },
  { date: 'May 18', filed: 145, resolved: 110, pending: 75 },
  { date: 'May 19', filed: 130, resolved: 125, pending: 80 },
  { date: 'May 20', filed: 165, resolved: 140, pending: 105 },
  { date: 'May 21', filed: 180, resolved: 155, pending: 130 },
  { date: 'May 22', filed: 210, resolved: 180, pending: 160 },
  { date: 'May 23', filed: 195, resolved: 200, pending: 155 },
]

const servicePerformanceData = [
  { name: 'Income Certificate', completed: 450, pending: 45, delayed: 8 },
  { name: 'Birth Certificate', completed: 380, pending: 32, delayed: 5 },
  { name: 'Community Certificate', completed: 320, pending: 28, delayed: 12 },
  { name: 'Business License', completed: 210, pending: 18, delayed: 3 },
  { name: 'Property Certificate', completed: 180, pending: 22, delayed: 6 },
]

const districtPerformanceData = [
  { district: 'Chennai', applications: 2450, satisfaction: 4.7, slaCompliance: 96 },
  { district: 'Coimbatore', applications: 1820, satisfaction: 4.5, slaCompliance: 92 },
  { district: 'Salem', applications: 1250, satisfaction: 4.3, slaCompliance: 88 },
  { district: 'Madurai', applications: 980, satisfaction: 4.4, slaCompliance: 90 },
  { district: 'Tiruchirappalli', applications: 750, satisfaction: 4.2, slaCompliance: 85 },
]

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function PublicTransparencyPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [selectedService, setSelectedService] = useState('all')
  const [timeframe, setTimeframe] = useState('7days')

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">SevaiHub Transparency Dashboard</h1>
          <p className="text-blue-100 text-lg mb-6">
            Real-time visibility into government service delivery, citizen satisfaction, and accountability metrics
          </p>
          <div className="flex gap-4">
            <Badge className="bg-blue-500 border-0 text-white">
              <Eye size={16} className="mr-1" />
              Public Data
            </Badge>
            <Badge className="bg-blue-500 border-0 text-white">
              <Activity size={16} className="mr-1" />
              Live Updates
            </Badge>
            <Badge className="bg-blue-500 border-0 text-white">
              <Zap size={16} className="mr-1" />
              24/7 Accessible
            </Badge>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger>
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="coimbatore">Coimbatore</SelectItem>
              <SelectItem value="salem">Salem</SelectItem>
              <SelectItem value="madurai">Madurai</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="certificates">Certificates</SelectItem>
              <SelectItem value="licenses">Licenses</SelectItem>
              <SelectItem value="permits">Permits</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download size={18} />
            Export Report
          </Button>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Applications</p>
              <p className="text-3xl font-bold text-foreground">12,540</p>
            </div>
            <FileText size={24} className="text-blue-600 opacity-50" />
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
            <TrendingUp size={16} />
            <span>+12% vs Last Month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Avg Resolution Time</p>
              <p className="text-3xl font-bold text-foreground">2.1 Days</p>
            </div>
            <Clock size={24} className="text-green-600 opacity-50" />
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
            <TrendingUp size={16} />
            <span>-0.3 Days Improvement</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Citizen Satisfaction</p>
              <p className="text-3xl font-bold text-foreground">4.6 / 5.0</p>
            </div>
            <Heart size={24} className="text-red-600 opacity-50" />
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
            <TrendingUp size={16} />
            <span>+0.2 Points</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">SLA Compliance Rate</p>
              <p className="text-3xl font-bold text-foreground">94.2%</p>
            </div>
            <CheckCircle2 size={24} className="text-emerald-600 opacity-50" />
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
            <TrendingUp size={16} />
            <span>+2.1% Improvement</span>
          </div>
        </Card>
      </div>

      {/* Application & Grievance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trend */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-bold text-foreground text-lg mb-2">Application Processing Trend</h3>
            <p className="text-sm text-muted-foreground">Weekly application submissions and completions</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={applicationTrendData}>
              <defs>
                <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Area type="monotone" dataKey="received" stackId="1" stroke="#3B82F6" fillOpacity={1} fill="url(#colorReceived)" />
              <Area type="monotone" dataKey="processed" stackId="2" stroke="#10B981" fillOpacity={1} fill="url(#colorProcessed)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Grievance Trend */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-bold text-foreground text-lg mb-2">Grievance Resolution Trend</h3>
            <p className="text-sm text-muted-foreground">Grievances filed vs resolved</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={grievanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="filed" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Service Performance */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="font-bold text-foreground text-lg mb-2">Service Performance Overview</h3>
          <p className="text-sm text-muted-foreground">Completion, pending, and delayed status by service</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={servicePerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#10B981" />
            <Bar dataKey="pending" fill="#F59E0B" />
            <Bar dataKey="delayed" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* District Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Rankings */}
        <Card className="p-6">
          <h3 className="font-bold text-foreground text-lg mb-4">District Performance Rankings</h3>
          <div className="space-y-3">
            {districtPerformanceData.map((district, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-blue-600 w-8 text-center">#{idx + 1}</span>
                    <span className="font-semibold text-foreground">{district.district}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{district.applications} applications</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Satisfaction</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(district.satisfaction / 5) * 100}%` }} />
                      </div>
                      <span className="font-semibold">{district.satisfaction}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">SLA Compliance</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${district.slaCompliance}%` }} />
                      </div>
                      <span className="font-semibold">{district.slaCompliance}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Statistics */}
        <Card className="p-6">
          <h3 className="font-bold text-foreground text-lg mb-4">System Health & Accountability</h3>
          <div className="space-y-4">
            {[
              { icon: '✅', label: 'On-Time Completions', value: '87%', color: 'bg-green-100 text-green-700' },
              { icon: '⏱️', label: 'Average Processing Time', value: '2.1 Days', color: 'bg-blue-100 text-blue-700' },
              { icon: '⚠️', label: 'Escalations This Week', value: '42 Cases', color: 'bg-orange-100 text-orange-700' },
              { icon: '🎯', label: 'SLA Breaches', value: '5.8%', color: 'bg-red-100 text-red-700' },
              { icon: '👥', label: 'Total Citizens Served', value: '1,24,560', color: 'bg-purple-100 text-purple-700' },
              { icon: '⭐', label: 'Average Rating', value: '4.6 / 5', color: 'bg-yellow-100 text-yellow-700' },
            ].map((stat, idx) => (
              <div key={idx} className={`p-4 rounded-lg ${stat.color} border`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className="font-semibold text-sm">{stat.label}</span>
                  </div>
                  <span className="font-bold text-lg">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Transparency Initiatives */}
      <Card className="p-6">
        <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
          <Info size={20} />
          Transparency & Accountability Initiatives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Real-Time Case Tracking',
              description: 'Citizens can track their applications 24/7 with instant status updates',
              icon: '🔍',
            },
            {
              title: 'Performance Monitoring',
              description: 'Department-wise and district-wise performance metrics published daily',
              icon: '📊',
            },
            {
              title: 'Citizen Feedback',
              description: 'Transparent review system with public satisfaction ratings',
              icon: '⭐',
            },
            {
              title: 'Grievance Management',
              description: 'All grievances logged and tracked with public visibility',
              icon: '📢',
            },
            {
              title: 'SLA Compliance',
              description: 'Service level agreements published with real-time compliance tracking',
              icon: '✅',
            },
            {
              title: 'Public Data APIs',
              description: 'Open data access for researchers and civic tech developers',
              icon: '🔗',
            },
          ].map((initiative, idx) => (
            <div key={idx} className="p-4 border border-slate-200 rounded-lg">
              <p className="text-2xl mb-2">{initiative.icon}</p>
              <h4 className="font-semibold text-foreground mb-2">{initiative.title}</h4>
              <p className="text-sm text-muted-foreground">{initiative.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Last Update Info */}
      <Card className="p-4 bg-slate-50 text-center text-sm text-muted-foreground">
        Last updated: <span className="font-semibold">23 May 2026 at 15:30 IST</span> | Data refreshes every hour | For
        queries: transparency@sevai-hub.gov
      </Card>
    </div>
  )
}
