'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  Phone,
  MessageSquare,
  Edit2,
  Camera,
  FileText,
  Plus,
  Filter,
  Search,
  ArrowRight,
  FileCheck,
  Zap,
  Navigation2,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FieldInspection {
  id: string
  caseId: string
  citizen: string
  address: string
  service: string
  inspectionDate: string
  inspectionTime: string
  status: 'scheduled' | 'completed' | 'in-progress' | 'pending'
  priority: 'high' | 'medium' | 'low'
  inspectionType: string
  notes: string
  location: {
    latitude: string
    longitude: string
    distance: string
  }
  contact: string
  findings: string[]
  photos: number
}

const inspections: FieldInspection[] = [
  {
    id: 'FI-001',
    caseId: 'APP-1045',
    citizen: 'Arun S',
    address: '42 Anna Nagar Main Road, Chennai 600040',
    service: 'Income Certificate Verification',
    inspectionDate: '24 May 2026',
    inspectionTime: '10:00 AM - 11:00 AM',
    status: 'scheduled',
    priority: 'high',
    inspectionType: 'Document Verification Visit',
    notes: 'Verify residence and income documents',
    location: {
      latitude: '13.1939°N',
      longitude: '80.2330°E',
      distance: '12.5 km',
    },
    contact: '9876543210',
    findings: [],
    photos: 0,
  },
  {
    id: 'FI-002',
    caseId: 'APP-1046',
    citizen: 'Meena K',
    address: '156 Besant Nagar, Chennai 600090',
    service: 'Property Verification',
    inspectionDate: '23 May 2026',
    inspectionTime: '02:30 PM',
    status: 'in-progress',
    priority: 'high',
    inspectionType: 'On-site Property Inspection',
    notes: 'Verify property ownership and physical condition',
    location: {
      latitude: '13.0349°N',
      longitude: '80.2577°E',
      distance: '8.3 km',
    },
    contact: '9876543211',
    findings: ['Property exists', 'Owner identified', 'Property in good condition'],
    photos: 5,
  },
  {
    id: 'FI-003',
    caseId: 'APP-1047',
    citizen: 'Rajesh P',
    address: '78 T. Nagar, Chennai 600017',
    service: 'Business License Verification',
    inspectionDate: '22 May 2026',
    inspectionTime: '11:00 AM',
    status: 'completed',
    priority: 'medium',
    inspectionType: 'Business Premises Inspection',
    notes: 'Verify business operations and compliance',
    location: {
      latitude: '13.0349°N',
      longitude: '80.2404°E',
      distance: '5.2 km',
    },
    contact: '9876543212',
    findings: [
      'Business registered properly',
      'Staff count verified',
      'Safety compliant',
      'Documents verified',
    ],
    photos: 8,
  },
  {
    id: 'FI-004',
    caseId: 'APP-1048',
    citizen: 'Priya D',
    address: '234 Velachery, Chennai 600042',
    service: 'Widow Pension Verification',
    inspectionDate: '25 May 2026',
    inspectionTime: '03:00 PM - 04:00 PM',
    status: 'pending',
    priority: 'medium',
    inspectionType: 'Household Verification',
    notes: 'Verify family status and financial condition',
    location: {
      latitude: '12.9689°N',
      longitude: '80.2211°E',
      distance: '18.7 km',
    },
    contact: '9876543213',
    findings: [],
    photos: 0,
  },
  {
    id: 'FI-005',
    caseId: 'APP-1049',
    citizen: 'Kumar S',
    address: '512 Mylapore, Chennai 600004',
    service: 'Tax Certificate Verification',
    inspectionDate: '21 May 2026',
    inspectionTime: '09:30 AM',
    status: 'completed',
    priority: 'low',
    inspectionType: 'Document Verification Visit',
    notes: 'Verify tax payment history',
    location: {
      latitude: '13.0330°N',
      longitude: '80.2723°E',
      distance: '6.1 km',
    },
    contact: '9876543214',
    findings: [
      'Tax payments verified',
      'All documents in order',
      'No discrepancies found',
    ],
    photos: 3,
  },
]

export default function FieldInspectionsPage() {
  const [selectedInspection, setSelectedInspection] = useState<FieldInspection | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'in-progress':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'pending':
        return 'bg-slate-100 text-slate-800 border-slate-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Calendar size={16} />
      case 'in-progress':
        return <Navigation size={16} />
      case 'completed':
        return <CheckCircle2 size={16} />
      case 'pending':
        return <Clock size={16} />
      default:
        return <AlertTriangle size={16} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredInspections = inspections.filter((inspection) => {
    const matchStatus = filterStatus === 'all' || inspection.status === filterStatus
    const matchPriority = filterPriority === 'all' || inspection.priority === filterPriority
    const matchSearch =
      inspection.citizen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inspection.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inspection.caseId.toLowerCase().includes(searchQuery.toLowerCase())

    return matchStatus && matchPriority && matchSearch
  })

  const stats = {
    scheduled: inspections.filter((i) => i.status === 'scheduled').length,
    inProgress: inspections.filter((i) => i.status === 'in-progress').length,
    completed: inspections.filter((i) => i.status === 'completed').length,
    pending: inspections.filter((i) => i.status === 'pending').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Field Inspections</h1>
          <p className="text-muted-foreground">Manage and track on-site inspections and verifications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus size={18} />
          Schedule Inspection
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Scheduled</p>
              <p className="text-3xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <Calendar size={24} className="text-blue-600 opacity-50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">In Progress</p>
              <p className="text-3xl font-bold text-orange-600">{stats.inProgress}</p>
            </div>
            <Navigation size={24} className="text-orange-600 opacity-50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle2 size={24} className="text-green-600 opacity-50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-slate-600">{stats.pending}</p>
            </div>
            <Clock size={24} className="text-slate-600 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by citizen, address, or case ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter size={18} />
            More Filters
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inspections List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredInspections.length === 0 ? (
            <Card className="p-8 text-center">
              <AlertTriangle size={32} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">No inspections match your filters</p>
            </Card>
          ) : (
            filteredInspections.map((inspection) => (
              <Card
                key={inspection.id}
                onClick={() => setSelectedInspection(inspection)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedInspection?.id === inspection.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-foreground">{inspection.caseId}</h3>
                      <Badge className={`${getStatusColor(inspection.status)} border`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(inspection.status)}
                          {inspection.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </Badge>
                      <Badge className={`${getPriorityColor(inspection.priority)}`}>
                        {inspection.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <p className="text-foreground font-semibold">{inspection.citizen}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin size={16} />
                      <span>{inspection.address}</span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-muted-foreground mt-1" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Service</p>
                    <p className="font-semibold text-foreground">{inspection.service}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold text-foreground">{inspection.inspectionDate}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Time</p>
                    <p className="font-semibold text-foreground">{inspection.inspectionTime}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Distance</p>
                    <p className="font-semibold text-foreground">{inspection.location.distance}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Details Panel */}
        {selectedInspection && (
          <Card className="p-6 h-fit sticky top-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-foreground mb-4 text-lg">Inspection Details</h3>
              </div>

              {/* Status Badge */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">STATUS</p>
                <Badge className={`${getStatusColor(selectedInspection.status)} border text-sm py-1`}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(selectedInspection.status)}
                    {selectedInspection.status.replace('-', ' ').toUpperCase()}
                  </span>
                </Badge>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">LOCATION</p>
                <div className="bg-slate-50 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-600" />
                    <span>{selectedInspection.location.latitude}, {selectedInspection.location.longitude}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation2 size={16} className="text-blue-600" />
                    <span>{selectedInspection.location.distance} away</span>
                  </div>
                  <Button className="w-full mt-2 gap-2 bg-blue-600 hover:bg-blue-700 text-white h-8">
                    <Navigation size={16} />
                    Open Navigation
                  </Button>
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">CITIZEN CONTACT</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Phone size={16} />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <MessageSquare size={16} />
                    SMS
                  </Button>
                </div>
                <p className="text-sm font-mono text-foreground mt-2">{selectedInspection.contact}</p>
              </div>

              {/* Inspection Type */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">INSPECTION TYPE</p>
                <Badge variant="outline">{selectedInspection.inspectionType}</Badge>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">NOTES</p>
                <p className="text-sm bg-slate-50 rounded-lg p-3">{selectedInspection.notes}</p>
              </div>

              {/* Findings */}
              {selectedInspection.findings.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">FINDINGS</p>
                  <ul className="space-y-1 text-sm">
                    {selectedInspection.findings.map((finding, idx) => (
                      <li key={idx} className="flex gap-2 text-foreground">
                        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Photos */}
              {selectedInspection.photos > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">PHOTOS ({selectedInspection.photos})</p>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Camera size={16} />
                    View Photos
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t">
                {selectedInspection.status === 'scheduled' && (
                  <>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                      <Navigation size={16} />
                      Start Inspection
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Edit2 size={16} />
                      Reschedule
                    </Button>
                  </>
                )}
                {selectedInspection.status === 'in-progress' && (
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                    <CheckCircle2 size={16} />
                    Complete Inspection
                  </Button>
                )}
                {selectedInspection.status === 'completed' && (
                  <Button variant="outline" className="w-full gap-2">
                    <FileCheck size={16} />
                    View Report
                  </Button>
                )}
                <Button variant="outline" className="w-full gap-2">
                  <FileText size={16} />
                  Generate Report
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
