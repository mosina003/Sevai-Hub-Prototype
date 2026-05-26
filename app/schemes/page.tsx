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
  Users,
  Gift,
  TrendingUp,
  Zap,
  Target,
  BookOpen,
  Heart,
  ArrowRight,
} from 'lucide-react'

export default function SchemesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [savedSchemes, setSavedSchemes] = useState<string[]>([])

  const schemes = [
    {
      id: 1,
      name: 'Pradhan Mantri Kisan Samman Nidhi',
      category: 'agriculture',
      description: 'Direct income support to farmers ₹6000/year in three installments',
      eligibility: 'Small and marginal farmers',
      benefit: '₹6,000/year',
      icon: '🌾',
      beneficiaries: '12.5 Cr+',
      status: 'Active'
    },
    {
      id: 2,
      name: 'PM Awas Yojana',
      category: 'housing',
      description: 'Affordable housing scheme for low-income families',
      eligibility: 'Annual income < ₹18 lakhs',
      benefit: 'Home loan subsidy up to 4%',
      icon: '🏠',
      beneficiaries: '2.5 Cr+',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Ayushman Bharat - PMJAY',
      category: 'health',
      description: 'Health insurance scheme providing free treatment up to ₹5 lakhs',
      eligibility: 'Family income < ₹5 lakhs',
      benefit: '₹5 Lakh free treatment',
      icon: '🏥',
      beneficiaries: '50 Cr+',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Scholarship Schemes for Students',
      category: 'education',
      description: 'Merit and need-based scholarships for higher education',
      eligibility: 'Students from economically weaker sections',
      benefit: '₹50,000 - ₹1,00,000',
      icon: '📚',
      beneficiaries: '50+ Lakh',
      status: 'Active'
    },
    {
      id: 5,
      name: 'PM Svanidhi Micro Credit Scheme',
      category: 'business',
      description: 'Small credit facility for street vendors and micro-entrepreneurs',
      eligibility: 'Street vendors and small traders',
      benefit: 'Up to ₹10,000 loan',
      icon: '💼',
      beneficiaries: '40+ Lakh',
      status: 'Active'
    },
    {
      id: 6,
      name: 'National Family Benefit Scheme',
      category: 'welfare',
      description: 'Financial assistance to families below poverty line on death of breadwinner',
      eligibility: 'BPL families',
      benefit: '₹30,000 one-time payment',
      icon: '👨‍👩‍👧‍👦',
      beneficiaries: '8+ Lakh',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Jan Dhan Yojana',
      category: 'finance',
      description: 'Financial inclusion scheme providing basic bank accounts to all citizens',
      eligibility: 'All Indian citizens',
      benefit: 'Free bank account with insurance',
      icon: '🏦',
      beneficiaries: '46 Cr+',
      status: 'Active'
    },
    {
      id: 8,
      name: 'NREGA - Rural Employment Guarantee',
      category: 'employment',
      description: 'Guaranteed wage employment for 100 days/year to rural workers',
      eligibility: 'Rural workers aged 18+',
      benefit: '₹350/day minimum wage',
      icon: '👷',
      beneficiaries: '13 Cr+',
      status: 'Active'
    },
    {
      id: 9,
      name: 'Mid Day Meal Scheme',
      category: 'education',
      description: 'Free meals for school children to improve nutrition and reduce dropout',
      eligibility: 'School children (Classes I-XII)',
      benefit: 'Free nutritious meal',
      icon: '🍽️',
      beneficiaries: '11 Cr+',
      status: 'Active'
    },
    {
      id: 10,
      name: 'Mudra Loan Scheme',
      category: 'business',
      description: 'Collateral-free business loan for entrepreneurs',
      eligibility: 'Entrepreneurs starting/expanding business',
      benefit: 'Up to ₹10 Lakh loan',
      icon: '💰',
      beneficiaries: '25+ Cr',
      status: 'Active'
    },
  ]

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleSave = (schemeId: string) => {
    setSavedSchemes(prev =>
      prev.includes(schemeId)
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId]
    )
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      agriculture: 'bg-green-100 text-green-700',
      housing: 'bg-blue-100 text-blue-700',
      health: 'bg-red-100 text-red-700',
      education: 'bg-purple-100 text-purple-700',
      business: 'bg-orange-100 text-orange-700',
      welfare: 'bg-pink-100 text-pink-700',
      finance: 'bg-indigo-100 text-indigo-700',
      employment: 'bg-teal-100 text-teal-700',
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Government Schemes</h1>
          <p className="text-lg text-purple-100">Discover benefits and opportunities from 100+ government schemes</p>
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
                  placeholder="Search schemes..."
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
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="welfare">Social Welfare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <Gift className="w-10 h-10 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Schemes</p>
                <p className="text-2xl font-bold">{schemes.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-pink-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
                <p className="text-2xl font-bold">250+ Cr</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-10 h-10 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Benefit</p>
                <p className="text-2xl font-bold">₹45K+</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Schemes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{scheme.icon}</div>
                  <Badge className={getCategoryColor(scheme.category)}>
                    {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold mb-2">{scheme.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{scheme.description}</p>

                <div className="space-y-3 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">ELIGIBILITY</p>
                    <p className="text-sm">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">BENEFIT</p>
                    <p className="text-sm font-semibold text-primary">{scheme.benefit}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">BENEFICIARIES</p>
                    <p className="text-sm">{scheme.beneficiaries} people benefited</p>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Know More & Apply
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No schemes found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
