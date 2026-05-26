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
  Filter,
  FileText,
  Clock,
  CheckCircle2,
  Users,
  MapPin,
  ArrowRight,
  Star,
  Download,
  Eye,
  Heart,
} from 'lucide-react'

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [likedServices, setLikedServices] = useState<string[]>([])

  const services = [
    {
      id: 1,
      name: 'Income Certificate',
      category: 'documents',
      description: 'Official document certifying annual income for government schemes and loans',
      processingTime: '3-5 days',
      fee: '₹50',
      applicationsProcessed: 4580,
      satisfaction: 4.8,
      icon: '📄',
      documents: ['Identity Proof', 'Address Proof', 'Employment Letter'],
      status: 'Available'
    },
    {
      id: 2,
      name: 'Birth Certificate',
      category: 'documents',
      description: 'Original birth record document for identity and passport purposes',
      processingTime: '5-7 days',
      fee: '₹100',
      applicationsProcessed: 3240,
      satisfaction: 4.7,
      icon: '👶',
      documents: ['Hospital Record', 'Parent ID', 'Address Proof'],
      status: 'Available'
    },
    {
      id: 3,
      name: 'Driving License',
      category: 'licenses',
      description: 'Legal permit to drive motor vehicles on public roads',
      processingTime: '7-10 days',
      fee: '₹500',
      applicationsProcessed: 2100,
      satisfaction: 4.5,
      icon: '🚗',
      documents: ['Age Proof', 'Address Proof', 'Medical Certificate'],
      status: 'Available'
    },
    {
      id: 4,
      name: 'Community Certificate',
      category: 'documents',
      description: 'Proof of community status for admissions, scholarships, and job quotas',
      processingTime: '4-6 days',
      fee: '₹75',
      applicationsProcessed: 3890,
      satisfaction: 4.6,
      icon: '👥',
      documents: ['Birth Certificate', 'Parent ID', 'Address Proof'],
      status: 'Available'
    },
    {
      id: 5,
      name: 'Property Tax Certificate',
      category: 'property',
      description: 'Tax payment proof and property ownership verification document',
      processingTime: '2-3 days',
      fee: '₹200',
      applicationsProcessed: 1560,
      satisfaction: 4.4,
      icon: '🏠',
      documents: ['Property Deed', 'Tax Payment Receipt', 'ID Proof'],
      status: 'Available'
    },
    {
      id: 6,
      name: 'NOC (No Objection Certificate)',
      category: 'licenses',
      description: 'Permission document from employer for relocation or job change',
      processingTime: '3-4 days',
      fee: '₹100',
      applicationsProcessed: 2340,
      satisfaction: 4.7,
      icon: '✅',
      documents: ['Employment Letter', 'ID Proof', 'Address Proof'],
      status: 'Available'
    },
    {
      id: 7,
      name: 'Death Certificate',
      category: 'documents',
      description: 'Official death record for insurance, pension, and legal purposes',
      processingTime: '5-7 days',
      fee: '₹50',
      applicationsProcessed: 2890,
      satisfaction: 4.6,
      icon: '⚰️',
      documents: ['Hospital Report', 'ID Proof', 'Address Proof'],
      status: 'Available'
    },
    {
      id: 8,
      name: 'Caste Certificate',
      category: 'documents',
      description: 'Social category certificate for SC/ST/OBC schemes and reservations',
      processingTime: '6-8 days',
      fee: '₹75',
      applicationsProcessed: 4120,
      satisfaction: 4.8,
      icon: '📋',
      documents: ['Birth Certificate', 'Parents ID', 'Caste Affidavit'],
      status: 'Available'
    },
  ]

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleLike = (serviceId: string) => {
    setLikedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Government Services</h1>
          <p className="text-lg text-blue-100">Explore 100+ essential government services available online</p>
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
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="licenses">Licenses & Permits</SelectItem>
                <SelectItem value="property">Property Related</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <FileText className="w-10 h-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Processed Today</p>
                <p className="text-2xl font-bold">2,450+</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-10 h-10 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                <p className="text-2xl font-bold">4.7/5</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <Clock className="w-10 h-10 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Processing</p>
                <p className="text-2xl font-bold">5 Days</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{service.icon}</div>
                  <button
                    onClick={() => toggleLike(service.id.toString())}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={likedServices.includes(service.id.toString()) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Processing: {service.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>Fee: {service.fee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{service.satisfaction}/5 ({service.applicationsProcessed.toLocaleString()} processed)</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">REQUIRED DOCUMENTS:</p>
                  <div className="flex flex-wrap gap-1">
                    {service.documents.map((doc, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No services found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
