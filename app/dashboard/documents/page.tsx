'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  UploadCloud,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  Trash2,
  RefreshCw,
  Bot,
  Clock,
  Upload,
  Zap,
  Shield,
  FileText,
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  uploadedDate: string
  size: string
  status: 'verified' | 'pending' | 'rejected'
  aiValidation: {
    overall: 'valid' | 'needs-revision' | 'rejected'
    completeness: number
    quality: number
    issues: string[]
    suggestions: string[]
  }
}

const documents: Document[] = [
  {
    id: 'doc-001',
    name: 'Aadhaar Card (Front)',
    type: 'Identity Proof',
    uploadedDate: '23 May 2026',
    size: '2.4 MB',
    status: 'verified',
    aiValidation: {
      overall: 'valid',
      completeness: 100,
      quality: 95,
      issues: [],
      suggestions: [],
    },
  },
  {
    id: 'doc-002',
    name: 'Bank Statement',
    type: 'Income Proof',
    uploadedDate: '23 May 2026',
    size: '1.8 MB',
    status: 'pending',
    aiValidation: {
      overall: 'valid',
      completeness: 92,
      quality: 88,
      issues: [],
      suggestions: ['Ensure all pages are clearly visible', 'Highlight account holder name'],
    },
  },
  {
    id: 'doc-003',
    name: 'PAN Card',
    type: 'Identity Proof',
    uploadedDate: '22 May 2026',
    size: '1.2 MB',
    status: 'rejected',
    aiValidation: {
      overall: 'rejected',
      completeness: 75,
      quality: 60,
      issues: ['Image is blurry', 'PAN number partially visible', 'Expiry date is cut off'],
      suggestions: ['Re-upload with better lighting', 'Ensure entire card is visible in frame', 'Use high resolution camera'],
    },
  },
  {
    id: 'doc-004',
    name: 'Residence Address Proof',
    type: 'Address Proof',
    uploadedDate: '20 May 2026',
    size: '2.1 MB',
    status: 'verified',
    aiValidation: {
      overall: 'valid',
      completeness: 100,
      quality: 92,
      issues: [],
      suggestions: [],
    },
  },
]

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [docToDelete, setDocToDelete] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDeleteDocument = (docId: string) => {
    setDocToDelete(docId)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    console.log('Deleting document:', docToDelete)
    setShowDeleteDialog(false)
    setDocToDelete(null)
  }

  const handleFileUpload = () => {
    setIsUploading(true)
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 0
        }
        return prev + 10
      })
    }, 200)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 size={16} />
      case 'pending':
        return <Clock size={16} />
      case 'rejected':
        return <XCircle size={16} />
      default:
        return <FileText size={16} />
    }
  }

  const verifiedCount = documents.filter((d) => d.status === 'verified').length
  const pendingCount = documents.filter((d) => d.status === 'pending').length
  const rejectedCount = documents.filter((d) => d.status === 'rejected').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Document Verification</h1>
          <p className="text-muted-foreground">Upload and manage your documents with AI-powered validation</p>
        </div>
        <Button
          onClick={handleFileUpload}
          disabled={isUploading}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Upload size={18} />
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <Card className="bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-blue-900">Uploading document...</span>
                <span className="text-sm font-semibold text-blue-900">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
            <Zap size={20} className="text-blue-600" />
          </div>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Documents</p>
              <p className="text-2xl font-bold text-foreground">{documents.length}</p>
            </div>
            <FileText size={24} className="text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Verified</p>
              <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
            </div>
            <CheckCircle2 size={24} className="text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
              <p className="text-2xl font-bold text-blue-600">{pendingCount}</p>
            </div>
            <Clock size={24} className="text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Needs Action</p>
              <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
            </div>
            <AlertTriangle size={24} className="text-red-600" />
          </div>
        </Card>
      </div>

      {/* AI Validation Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-4">
        <div className="flex items-start gap-3">
          <Bot size={20} className="text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">AI-Powered Document Verification</h3>
            <p className="text-sm text-muted-foreground">
              Our advanced AI system validates document completeness, quality, and authenticity. Each document is analyzed
              for clarity, data completeness, and compliance with requirements.
            </p>
          </div>
        </div>
      </Card>

      {/* Documents List */}
      <div className="space-y-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText size={20} className="text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{doc.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.uploadedDate}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>

                {/* Validation Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Completeness</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${doc.aiValidation.completeness}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground">{doc.aiValidation.completeness}%</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Quality</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${doc.aiValidation.quality}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground">{doc.aiValidation.quality}%</span>
                    </div>
                  </div>
                  <div>
                    <Badge className={`${getStatusColor(doc.status)} border`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(doc.status)}
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                </div>

                {/* Issues */}
                {doc.aiValidation.issues.length > 0 && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-800 mb-2">Issues Found:</p>
                    <ul className="text-xs text-red-700 space-y-1">
                      {doc.aiValidation.issues.map((issue, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span>•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {doc.aiValidation.suggestions.length > 0 && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-blue-800 mb-2">Suggestions:</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      {doc.aiValidation.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span>•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDoc(doc)
                    setShowDetails(true)
                  }}
                >
                  <Eye size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Download size={16} />
                </Button>
                {doc.status === 'rejected' && (
                  <Button variant="outline" size="sm" className="text-orange-600">
                    <RefreshCw size={16} />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteDocument(doc.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Verification Requirements */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Shield size={20} />
          Document Verification Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'High Resolution',
              description: 'Minimum 300 DPI for clear visibility',
              icon: '📸',
            },
            {
              title: 'Complete Document',
              description: 'All fields and corners must be visible',
              icon: '📄',
            },
            {
              title: 'Valid Formats',
              description: 'PDF, JPG, PNG supported',
              icon: '✅',
            },
            {
              title: 'File Size',
              description: 'Maximum 5MB per document',
              icon: '💾',
            },
            {
              title: 'Legible Text',
              description: 'All text must be readable',
              icon: '🔤',
            },
            {
              title: 'Recent & Valid',
              description: 'Document must be current and not expired',
              icon: '⏰',
            },
          ].map((req, idx) => (
            <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-2xl mb-2">{req.icon}</div>
              <h4 className="font-semibold text-foreground mb-1">{req.title}</h4>
              <p className="text-xs text-muted-foreground">{req.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this document? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
