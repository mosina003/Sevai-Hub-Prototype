'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  MapPin,
  Users,
  Clock,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  Building2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('all')

  const departments = [
    {
      id: 1,
      name: 'Revenue & Land Records',
      description: 'Handles land records, revenue collection, and property-related matters',
      services: 15,
      icon: '📋',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'revenue@tn.gov.in',
      website: 'www.tnrevenue.in',
      status: 'Operational',
      avgResponseTime: '2-3 days'
    },
    {
      id: 2,
      name: 'Health & Family Welfare',
      description: 'Public health, disease control, vaccination, and family planning services',
      services: 22,
      icon: '🏥',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'health@tn.gov.in',
      website: 'www.tnhealth.org',
      status: 'Operational',
      avgResponseTime: '1-2 days'
    },
    {
      id: 3,
      name: 'Education',
      description: 'School education, scholarships, examinations, and educational development',
      services: 18,
      icon: '📚',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'education@tn.gov.in',
      website: 'www.tneducation.gov.in',
      status: 'Operational',
      avgResponseTime: '3-5 days'
    },
    {
      id: 4,
      name: 'Social Welfare',
      description: 'Social security, pensions, SC/ST welfare, and social protection schemes',
      services: 25,
      icon: '👥',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'welfare@tn.gov.in',
      website: 'www.tnsocialwelfare.in',
      status: 'Operational',
      avgResponseTime: '2-4 days'
    },
    {
      id: 5,
      name: 'Agriculture',
      description: 'Crop management, irrigation, agricultural extension, and farmer support',
      services: 20,
      icon: '🌾',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'agriculture@tn.gov.in',
      website: 'www.tnagritech.org',
      status: 'Operational',
      avgResponseTime: '2-3 days'
    },
    {
      id: 6,
      name: 'Transport & Highways',
      description: 'Vehicle registration, driving licenses, road maintenance, and traffic management',
      services: 12,
      icon: '🚗',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'transport@tn.gov.in',
      website: 'www.tnvahan.in',
      status: 'Operational',
      avgResponseTime: '1-2 days'
    },
    {
      id: 7,
      name: 'Urban Development',
      description: 'Urban planning, municipality services, housing, and city infrastructure',
      services: 16,
      icon: '🏗️',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'urbandev@tn.gov.in',
      website: 'www.tnurban.in',
      status: 'Operational',
      avgResponseTime: '3-4 days'
    },
    {
      id: 8,
      name: 'Labor & Employment',
      description: 'Employment registration, labor laws, worker welfare, and job placement',
      services: 14,
      icon: '💼',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'labour@tn.gov.in',
      website: 'www.tnlabour.in',
      status: 'Operational',
      avgResponseTime: '2-3 days'
    },
    {
      id: 9,
      name: 'Water Resources',
      description: 'Irrigation, water supply, dam management, and water conservation',
      services: 11,
      icon: '💧',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'water@tn.gov.in',
      website: 'www.tnwater.gov.in',
      status: 'Operational',
      avgResponseTime: '2-3 days'
    },
    {
      id: 10,
      name: 'Police & Home Affairs',
      description: 'Public safety, law enforcement, crime reporting, and security services',
      services: 13,
      icon: '👮',
      state: 'tamil-nadu',
      phone: '+91-44-XXXX-XXXX',
      email: 'police@tn.gov.in',
      website: 'www.tnpolice.gov.in',
      status: 'Operational',
      avgResponseTime: '1-2 days'
    },
  ]

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = selectedState === 'all' || dept.state === selectedState
    return matchesSearch && matchesState
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Government Departments</h1>
          <p className="text-lg text-slate-200">Connect with various government departments and their services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <Building2 className="w-10 h-10 text-slate-600" />
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{departments.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-2xl font-bold">All Active</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Services</p>
                <p className="text-2xl font-bold">{departments.reduce((sum, d) => sum + d.services, 0)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <Clock className="w-10 h-10 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">2-3 days</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <Card key={dept.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white flex flex-col">
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{dept.icon}</div>
                  <Badge className="bg-green-100 text-green-700">{dept.status}</Badge>
                </div>

                <h3 className="text-lg font-bold mb-2">{dept.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{dept.description}</p>

                <div className="space-y-3 mb-4 bg-gray-50 p-3 rounded">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span>{dept.services} Services</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Response: {dept.avgResponseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-600" />
                    <span className="truncate">{dept.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-slate-600" />
                    <span className="truncate text-blue-600">{dept.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-slate-600" />
                    <span className="truncate text-blue-600">{dept.website}</span>
                  </div>
                </div>

                <div className="space-y-2">
                <Button className="w-full bg-primary hover:bg-primary/90">
                    Visit Department
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No departments found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
