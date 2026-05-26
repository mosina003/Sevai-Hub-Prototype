'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const availableServices = [
  { id: 'income-cert', name: 'Income Certificate' },
  { id: 'birth-cert', name: 'Birth Certificate' },
  { id: 'death-cert', name: 'Death Certificate' },
  { id: 'community-cert', name: 'Community Certificate' },
  { id: 'caste-cert', name: 'Caste Certificate' },
  { id: 'driving-license', name: 'Driving License' },
  { id: 'property-tax', name: 'Property Tax Certificate' },
  { id: 'noc', name: 'No Objection Certificate (NOC)' },
];

const applications = [
  {
    id: 'APP-2026-001',
    service: 'Income Certificate',
    appliedDate: '12 Jan 2026',
    expectedCompletion: '18 Jan 2026',
    status: 'Under Review',
    statusColor: 'bg-blue-100 text-blue-700 border-blue-300',
    timeline: [
      { stage: 'Submitted', completed: true, date: '12 Jan 2026' },
      { stage: 'Under Review', completed: true, date: '13 Jan 2026' },
      { stage: 'Verification Completed', completed: false, date: 'Pending' },
      { stage: 'Approved', completed: false, date: 'Pending' },
    ],
    documents: ['Aadhar Card', 'Pan Card', 'Bank Statement'],
    remarks: 'Documents received and verified. Pending final approval from officer.',
  },
  {
    id: 'APP-2026-002',
    service: 'Birth Certificate',
    appliedDate: '05 Jan 2026',
    expectedCompletion: '12 Jan 2026',
    status: 'Approved',
    statusColor: 'bg-green-100 text-green-700 border-green-300',
    timeline: [
      { stage: 'Submitted', completed: true, date: '05 Jan 2026' },
      { stage: 'Under Review', completed: true, date: '06 Jan 2026' },
      { stage: 'Verification Completed', completed: true, date: '08 Jan 2026' },
      { stage: 'Approved', completed: true, date: '10 Jan 2026' },
    ],
    documents: ['Birth Proof', 'Identity Proof'],
    remarks: 'Application approved. Certificate issued and ready for download.',
  },
  {
    id: 'APP-2026-003',
    service: 'Driving License',
    appliedDate: '01 Jan 2026',
    expectedCompletion: '15 Jan 2026',
    status: 'Rejected',
    statusColor: 'bg-red-100 text-red-700 border-red-300',
    timeline: [
      { stage: 'Submitted', completed: true, date: '01 Jan 2026' },
      { stage: 'Under Review', completed: true, date: '02 Jan 2026' },
      { stage: 'Verification Failed', completed: true, date: '09 Jan 2026' },
      { stage: 'Rejected', completed: true, date: '09 Jan 2026' },
    ],
    documents: ['Medical Certificate', 'Proof of Residence'],
    remarks: 'Medical certificate not valid. Please reapply with valid certificate.',
  },
  {
    id: 'APP-2026-004',
    service: 'Community Certificate',
    appliedDate: '08 Jan 2026',
    expectedCompletion: '13 Jan 2026',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    timeline: [
      { stage: 'Submitted', completed: true, date: '08 Jan 2026' },
      { stage: 'Under Review', completed: false, date: 'Processing' },
      { stage: 'Verification Completed', completed: false, date: 'Pending' },
      { stage: 'Approved', completed: false, date: 'Pending' },
    ],
    documents: ['Aadhar Card', 'Community Proof'],
    remarks: 'Application received. Processing initiated.',
  },
];

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState<(typeof applications)[0] | null>(null);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [newApplication, setNewApplication] = useState({
    service: '',
    fullName: '',
    email: '',
    phone: '',
    description: '',
    documents: [] as string[],
  });

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Applications', value: '12', color: 'bg-blue-50 border-blue-200' },
    { label: 'Approved', value: '7', color: 'bg-green-50 border-green-200' },
    { label: 'Pending', value: '3', color: 'bg-yellow-50 border-yellow-200' },
    { label: 'Rejected', value: '2', color: 'bg-red-50 border-red-200' },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Under Review':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const handleSubmitApplication = () => {
    if (!newApplication.service || !newApplication.fullName || !newApplication.email || !newApplication.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Show success message
    alert(`Application submitted successfully for ${newApplication.service}!\n\nApplication ID: APP-${Date.now().toString().slice(-6)}`);
    
    // Reset form
    setNewApplication({
      service: '',
      fullName: '',
      email: '',
      phone: '',
      description: '',
      documents: [],
    });
    setShowNewApplicationForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Applications</h1>
              <p className="text-gray-600 text-lg">Track and manage all your service requests.</p>
            </div>
            <Button
              onClick={() => setShowNewApplicationForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 h-auto"
            >
              ➕ Apply for Service
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className={`p-6 border ${stat.color}`}>
              <p className="text-gray-600 text-sm font-semibold mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="search"
            placeholder="🔍 Search Application ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10"
          />

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Application ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Service Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Expected Completion
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{app.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{app.service}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{app.appliedDate}</td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusBadgeColor(app.status)}>
                          {app.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {app.expectedCompletion}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:bg-blue-50"
                          onClick={() => setSelectedApp(app)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Application Details Modal */}
        <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
          <DialogContent className="w-[85vw] max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>{selectedApp?.id}</DialogDescription>
            </DialogHeader>

            {selectedApp && (
              <div className="space-y-6 py-4">
                {/* Application Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">SERVICE</p>
                    <p className="font-semibold text-gray-900">{selectedApp.service}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">STATUS</p>
                    <Badge className={getStatusBadgeColor(selectedApp.status)}>
                      {selectedApp.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">APPLIED DATE</p>
                    <p className="font-semibold text-gray-900">{selectedApp.appliedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">EXPECTED COMPLETION</p>
                    <p className="font-semibold text-gray-900">
                      {selectedApp.expectedCompletion}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">📋 Application Timeline</h3>
                  <div className="space-y-4">
                    {selectedApp.timeline.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                              item.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            {item.completed ? '✓' : '○'}
                          </div>
                          {idx < selectedApp.timeline.length - 1 && (
                            <div
                              className={`w-0.5 h-12 ${
                                item.completed ? 'bg-green-500' : 'bg-gray-300'
                              } my-1`}
                            ></div>
                          )}
                        </div>
                        <div className="pt-1">
                          <p className="font-semibold text-gray-900">{item.stage}</p>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">📎 Documents Uploaded</h3>
                  <div className="space-y-2">
                    {selectedApp.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-900">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Remarks */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">💬 Officer Remarks</h3>
                  <p className="text-sm text-gray-700">{selectedApp.remarks}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  {selectedApp.status === 'Approved' && (
                    <Button className="bg-green-600 hover:bg-green-700">
                      📥 Download Certificate
                    </Button>
                  )}
                  <Button variant="outline">
                    {selectedApp.status === 'Rejected' ? '🔄 Reapply' : '❓ Raise Query'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedApp(null)}
                    className="ml-auto"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Application Form Modal */}
        <Dialog open={showNewApplicationForm} onOpenChange={setShowNewApplicationForm}>
          <DialogContent className="w-[85vw] max-w-6xl max-h-[75vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Apply for Service</DialogTitle>
              <DialogDescription>Fill in the details below to submit a new application</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Service Selection */}
              <div>
                <Label htmlFor="service" className="text-sm font-semibold text-gray-900 mb-2 block">
                  Select Service *
                </Label>
                <Select value={newApplication.service} onValueChange={(value) => setNewApplication({ ...newApplication, service: value })}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableServices.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-900 mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={newApplication.fullName}
                  onChange={(e) => setNewApplication({ ...newApplication, fullName: e.target.value })}
                  className="h-10"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-900 mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={newApplication.email}
                  onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
                  className="h-10"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-900 mb-2 block">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your 10-digit phone number"
                  value={newApplication.phone}
                  onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
                  className="h-10"
                />
              </div>

              {/* Description / Additional Info */}
              <div>
                <Label htmlFor="description" className="text-sm font-semibold text-gray-900 mb-2 block">
                  Additional Information
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide any additional details or information relevant to your application"
                  value={newApplication.description}
                  onChange={(e) => setNewApplication({ ...newApplication, description: e.target.value })}
                  className="min-h-24"
                />
              </div>

              {/* Documents Info */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 font-semibold mb-2">📎 Required Documents:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Aadhar Card / PAN Card</li>
                  <li>Address Proof</li>
                  <li>Identity Proof</li>
                  <li>Any other relevant documents for this service</li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">Note: You will be able to upload documents in the next step after submitting this form.</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmitApplication}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  ✓ Submit Application
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewApplicationForm(false);
                    setNewApplication({
                      service: '',
                      fullName: '',
                      email: '',
                      phone: '',
                      description: '',
                      documents: [],
                    });
                  }}
                  className="ml-auto"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
