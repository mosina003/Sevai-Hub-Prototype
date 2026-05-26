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

const complaints = [
  {
    id: 'CMP-2026-001',
    title: 'Pothole near Anna Nagar Main Road',
    department: 'Roads Department',
    date: '20 Jan 2026',
    priority: 'High',
    status: 'In Progress',
    description:
      'There is a large pothole near the main traffic signal that is causing accidents. Immediate repair needed.',
    images: ['pothole_1.jpg', 'pothole_2.jpg'],
    timeline: [
      { stage: 'Complaint Submitted', completed: true, date: '20 Jan 2026', remarks: '' },
      { stage: 'Assigned to Officer', completed: true, date: '21 Jan 2026', remarks: 'Assigned to PWD Officer' },
      { stage: 'Field Inspection', completed: true, date: '22 Jan 2026', remarks: 'Site inspected, repair materials arranged' },
      { stage: 'Work In Progress', completed: true, date: '23 Jan 2026', remarks: 'Repair work started' },
      { stage: 'Resolved', completed: false, date: 'Pending', remarks: '' },
    ],
    officerRemarks: 'Road repair work in progress. Expected completion within 2 days.',
  },
  {
    id: 'CMP-2026-002',
    title: 'Water pipe leak in Nagar Street',
    department: 'Water Board',
    date: '14 Jan 2026',
    priority: 'High',
    status: 'Resolved',
    description: 'Water pipe burst causing water wastage and street flooding.',
    images: [],
    timeline: [
      { stage: 'Complaint Submitted', completed: true, date: '14 Jan 2026', remarks: '' },
      { stage: 'Assigned to Officer', completed: true, date: '15 Jan 2026', remarks: 'Assigned to WB technician' },
      { stage: 'Field Inspection', completed: true, date: '16 Jan 2026', remarks: 'Inspection completed, repair plan finalized' },
      { stage: 'Work In Progress', completed: true, date: '17 Jan 2026', remarks: 'Repair completed' },
      { stage: 'Resolved', completed: true, date: '18 Jan 2026', remarks: 'Pipe replaced and tested' },
    ],
    officerRemarks: 'Complaint resolved. Water pipe replaced successfully.',
  },
  {
    id: 'CMP-2026-003',
    title: 'Street lights not working',
    department: 'Municipal Corporation',
    date: '10 Jan 2026',
    priority: 'Medium',
    status: 'Pending',
    description: 'Multiple street lights on MG Road are not functioning, creating safety hazards.',
    images: [],
    timeline: [
      { stage: 'Complaint Submitted', completed: true, date: '10 Jan 2026', remarks: '' },
      { stage: 'Assigned to Officer', completed: false, date: 'Pending', remarks: '' },
      { stage: 'Field Inspection', completed: false, date: 'Pending', remarks: '' },
      { stage: 'Work In Progress', completed: false, date: 'Pending', remarks: '' },
      { stage: 'Resolved', completed: false, date: 'Pending', remarks: '' },
    ],
    officerRemarks: 'Complaint received. Awaiting assignment to field staff.',
  },
  {
    id: 'CMP-2026-004',
    title: 'Garbage not collected regularly',
    department: 'Sanitation Department',
    date: '05 Jan 2026',
    priority: 'Low',
    status: 'Escalated',
    description: 'Garbage bins in the locality are overflowing, waste is scattered on the road.',
    images: [],
    timeline: [
      { stage: 'Complaint Submitted', completed: true, date: '05 Jan 2026', remarks: '' },
      { stage: 'Assigned to Officer', completed: true, date: '06 Jan 2026', remarks: 'Assigned' },
      { stage: 'Field Inspection', completed: true, date: '07 Jan 2026', remarks: 'Issue identified' },
      { stage: 'Work In Progress', completed: false, date: 'Escalated', remarks: 'Escalated to senior management' },
      { stage: 'Resolved', completed: false, date: 'Pending', remarks: '' },
    ],
    officerRemarks: 'Complaint escalated to senior management for priority action.',
  },
];

export default function ComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState<(typeof complaints)[0] | null>(null);
  const [isRaisingComplaint, setIsRaisingComplaint] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    department: '',
    priority: 'Medium',
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Complaints', value: '6', color: 'bg-blue-50 border-blue-200' },
    { label: 'In Progress', value: '2', color: 'bg-yellow-50 border-yellow-200' },
    { label: 'Resolved', value: '3', color: 'bg-green-50 border-green-200' },
    { label: 'Escalated', value: '1', color: 'bg-red-50 border-red-200' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Pending':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Escalated':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Complaints</h1>
            <p className="text-gray-600 text-lg">Monitor complaint progress and resolutions.</p>
          </div>
          <Button
            onClick={() => setIsRaisingComplaint(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap"
          >
            📝 Raise New Complaint
          </Button>
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
            placeholder="🔍 Search Complaint ID..."
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
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Complaints Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Complaint ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                        {complaint.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{complaint.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{complaint.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{complaint.date}</td>
                      <td className="px-6 py-4">
                        <Badge className={getPriorityBadge(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusBadge(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:bg-blue-50"
                          onClick={() => setSelectedComplaint(complaint)}
                        >
                          Track
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-600">
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Raise Complaint Modal */}
        <Dialog open={isRaisingComplaint} onOpenChange={setIsRaisingComplaint}>
          <DialogContent className="w-[120vw] max-w-7xl">
            <DialogHeader>
              <DialogTitle>Raise a New Complaint</DialogTitle>
              <DialogDescription>
                Provide details about your complaint. Our team will review and take appropriate action.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4 md:grid-cols-2">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-2">Complaint Title *</label>
                <Input
                  placeholder="Enter complaint title (e.g., Pothole on Main Road)"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-2">Description *</label>
                <textarea
                  placeholder="Describe your complaint in detail. Include location, time, and any relevant information."
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                />
              </div>

              {/* Department */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Department *</label>
                <Select value={newComplaint.department} onValueChange={(value) => setNewComplaint({ ...newComplaint, department: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Roads Department">Roads Department</SelectItem>
                    <SelectItem value="Water Board">Water Board</SelectItem>
                    <SelectItem value="Municipal Corporation">Municipal Corporation</SelectItem>
                    <SelectItem value="Sanitation Department">Sanitation Department</SelectItem>
                    <SelectItem value="Electricity Board">Electricity Board</SelectItem>
                    <SelectItem value="Public Health">Public Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Priority Level *</label>
                <Select value={newComplaint.priority} onValueChange={(value) => setNewComplaint({ ...newComplaint, priority: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low - Can wait</SelectItem>
                    <SelectItem value="Medium">Medium - Important</SelectItem>
                    <SelectItem value="High">High - Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-2">📎 Attach Photos or Videos</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setUploadedFiles([...uploadedFiles, ...files]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">Supported: JPG, PNG, GIF, MP4, MOV (Max 5 files)</p>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Uploaded Files ({uploadedFiles.length})</label>
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                        <span className="text-xs font-medium text-green-700">
                          {file.type.includes('image') ? '🖼️' : '🎬'} {file.name}
                        </span>
                        <button
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Upload Info */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 md:col-span-2">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> Attach photos or videos of the issue to help us understand and resolve your complaint faster.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end gap-3 pt-2 md:col-span-2">
                <Button
                  onClick={() => {
                    if (newComplaint.title && newComplaint.description && newComplaint.department) {
                      alert(`Complaint "${newComplaint.title}" has been submitted successfully!\n\nYour complaint has been assigned ID: CMP-2026-${Math.floor(Math.random() * 1000)}\n\nAttachments: ${uploadedFiles.length} file(s) uploaded\n\nYou will receive updates via email and SMS.`);
                      setNewComplaint({ title: '', description: '', department: '', priority: 'Medium' });
                      setUploadedFiles([]);
                      setIsRaisingComplaint(false);
                    } else {
                      alert('Please fill in all required fields (marked with *).');
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  ✓ Submit Complaint
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewComplaint({ title: '', description: '', department: '', priority: 'Medium' });
                    setUploadedFiles([]);
                    setIsRaisingComplaint(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Complaint Details Modal */}
        <Dialog open={!!selectedComplaint} onOpenChange={(open) => !open && setSelectedComplaint(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Complaint Details</DialogTitle>
              <DialogDescription>{selectedComplaint?.id}</DialogDescription>
            </DialogHeader>

            {selectedComplaint && (
              <div className="space-y-6 py-4">
                {/* Complaint Info */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{selectedComplaint.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{selectedComplaint.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">DEPARTMENT</p>
                      <p className="font-semibold text-gray-900">{selectedComplaint.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">DATE</p>
                      <p className="font-semibold text-gray-900">{selectedComplaint.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">PRIORITY</p>
                      <Badge className={getPriorityBadge(selectedComplaint.priority)}>
                        {selectedComplaint.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold mb-1">STATUS</p>
                      <Badge className={getStatusBadge(selectedComplaint.status)}>
                        {selectedComplaint.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                {selectedComplaint.images.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">📎 Attachments</h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedComplaint.images.map((img, idx) => (
                        <Button key={idx} variant="outline" size="sm">
                          📷 {img}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Timeline */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">📅 Status Timeline</h3>
                  <div className="space-y-4">
                    {selectedComplaint.timeline.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                              item.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            {item.completed ? '✓' : '○'}
                          </div>
                          {idx < selectedComplaint.timeline.length - 1 && (
                            <div
                              className={`w-0.5 h-12 ${
                                item.completed ? 'bg-green-500' : 'bg-gray-300'
                              } my-1`}
                            ></div>
                          )}
                        </div>
                        <div className="pt-1 flex-1">
                          <p className="font-semibold text-gray-900">{item.stage}</p>
                          <p className="text-sm text-gray-600">{item.date}</p>
                          {item.remarks && (
                            <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">
                              {item.remarks}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Officer Remarks */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">💬 Officer Remarks</h3>
                  <p className="text-sm text-gray-700">{selectedComplaint.officerRemarks}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  {selectedComplaint.status === 'Resolved' && (
                    <Button className="bg-green-600 hover:bg-green-700">⭐ Rate Resolution</Button>
                  )}
                  {selectedComplaint.status !== 'Resolved' && (
                    <>
                      <Button variant="outline">➕ Add Additional Information</Button>
                      {selectedComplaint.status !== 'Pending' && (
                        <Button variant="outline">🔄 Reopen Complaint</Button>
                      )}
                    </>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setSelectedComplaint(null)}
                    className="ml-auto"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
