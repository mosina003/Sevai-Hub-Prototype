'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Mosina',
    citizenId: 'SVH2026001',
    memberSince: 'January 2026',
    phone: '+91 98765 43210',
    email: 'mosina@example.com',
    dob: '15-05-1990',
    gender: 'Female',
    address: 'Anna Nagar, Chennai',
  });

  const [editForm, setEditForm] = useState(profile);

  const documents = [
    { name: 'Aadhaar', status: 'Verified', icon: '✅', color: 'bg-green-50' },
    { name: 'PAN', status: 'Verified', icon: '✅', color: 'bg-green-50' },
    { name: 'Driving License', status: 'Verified', icon: '✅', color: 'bg-green-50' },
  ];

  const activityStats = [
    { label: 'Applications Submitted', value: '12', icon: '📋' },
    { label: 'Complaints Raised', value: '6', icon: '⚠️' },
    { label: 'Services Approved', value: '8', icon: '✅' },
    { label: 'Avg. Resolution Time', value: '5 Days', icon: '⏱️' },
  ];

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">👤 Citizen Profile</h1>
          <p className="text-gray-600 text-lg">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 bg-blue-600 text-white border-0 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
                <p className="text-blue-100 mb-4">Citizen ID: {profile.citizenId}</p>
                <p className="text-blue-100 text-sm">Member Since: {profile.memberSince}</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditForm(profile);
                setIsEditMode(!isEditMode);
              }}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              {isEditMode ? '❌ Cancel' : '✏️ Edit Profile'}
            </Button>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📋 Personal Information</h2>
          </div>

          {isEditMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <Input
                    value={editForm.dob}
                    onChange={(e) =>
                      setEditForm({ ...editForm, dob: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <Input
                    value={editForm.gender}
                    onChange={(e) =>
                      setEditForm({ ...editForm, gender: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <Input
                    value={editForm.address}
                    onChange={(e) =>
                      setEditForm({ ...editForm, address: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-green-600 hover:bg-green-700"
                >
                  ✓ Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">FULL NAME</p>
                <p className="font-semibold text-gray-900">{profile.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">PHONE NUMBER</p>
                <p className="font-semibold text-gray-900">{profile.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">EMAIL</p>
                <p className="font-semibold text-gray-900">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">DATE OF BIRTH</p>
                <p className="font-semibold text-gray-900">{profile.dob}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">GENDER</p>
                <p className="font-semibold text-gray-900">{profile.gender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">ADDRESS</p>
                <p className="font-semibold text-gray-900">{profile.address}</p>
              </div>
            </div>
          )}
        </Card>

        {/* Linked Documents */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔐 Linked Documents</h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.name}
                className={`${doc.color} p-4 rounded-lg flex items-center justify-between border border-green-200`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{doc.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{doc.name}</p>
                  </div>
                </div>
                <Badge className="bg-green-600 text-white">{doc.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Account Security */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🛡️ Account Security</h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => setShowPasswordDialog(true)}
            >
              🔒 Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              🔑 Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              📊 Login History
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              💻 Active Sessions
            </Button>
          </div>
        </Card>

        {/* Service Activity Summary */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Service Activity Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activityStats.map((stat) => (
              <Card key={stat.label} className="p-6 bg-blue-50 border-blue-200">
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-600 font-semibold">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-8 border-red-200 bg-red-50">
          <h2 className="text-2xl font-bold text-red-900 mb-4">⚠️ Danger Zone</h2>
          <p className="text-red-700 text-sm mb-4">
            These actions are permanent and cannot be undone. Please be careful.
          </p>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
            🗑️ Delete Account
          </Button>
        </Card>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and new password to proceed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <Input type="password" placeholder="Enter current password" className="h-10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <Input type="password" placeholder="Enter new password" className="h-10" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input type="password" placeholder="Confirm new password" className="h-10" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                ✓ Update Password
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPasswordDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
