'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Lock, IdCard, Building2, ArrowRight, Shield } from 'lucide-react'
import Link from 'next/link'

export default function OfficerLoginForm() {
  const [officerId, setOfficerId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [department, setDepartment] = useState('revenue')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const authorizedOfficer = {
    mobile: '9123582088',
    password: 'officer123',
    profile: {
      name: 'R. Kumar',
      officerId: 'OFF-CHN-1045',
      mobile: '9123582088',
      department: 'Revenue Department',
      designation: 'Tahsildar',
      district: 'Chennai District',
    },
  }


  const authorizedDepartmentAdmin = {
    adminId: '1234567890',
    password: 'dept123',
    profile: {
      name: 'R. Suresh',
      adminId: '1234567890',
      department: 'Revenue Department',
      designation: 'Joint Commissioner',
      district: 'Tamil Nadu',
    },
  }

  const authorizedStateAdmin = {
    adminId: '9876543210',
    password: 'state123',
    profile: {
      name: 'Dr. Rajesh Kumar',
      adminId: '9876543210',
      designation: 'Chief Secretary',
      department: 'Chief Minister Office',
      state: 'Tamil Nadu',
    },
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')

    window.setTimeout(() => {
      const isOfficerLogin =
        officerId.trim() === authorizedOfficer.mobile && password === authorizedOfficer.password
      const isDepartmentAdminLogin =
        officerId.trim() === authorizedDepartmentAdmin.adminId && password === authorizedDepartmentAdmin.password
      const isStateAdminLogin =
        officerId.trim() === authorizedStateAdmin.adminId && password === authorizedStateAdmin.password

      if (isOfficerLogin) {
        const officerPayload = {
          ...authorizedOfficer.profile,
          department:
            department === 'revenue' ? authorizedOfficer.profile.department : department,
        }

        window.sessionStorage.setItem('sevaihub-role', 'officer')
        window.sessionStorage.setItem('sevaihub-officer', JSON.stringify(officerPayload))

        if (rememberMe) {
          window.localStorage.setItem('sevaihub-officer', JSON.stringify(officerPayload))
        } else {
          window.localStorage.removeItem('sevaihub-officer')
        }

        window.location.href = '/officer-dashboard'
        return
      }

      if (isDepartmentAdminLogin) {
        const adminPayload = {
          ...authorizedDepartmentAdmin.profile,
          loginTime: new Date().toISOString(),
        }

        window.sessionStorage.setItem('sevaihub-role', 'department-admin')
        window.sessionStorage.setItem('departmentAdmin', JSON.stringify(adminPayload))

        if (rememberMe) {
          window.localStorage.setItem('departmentAdmin', JSON.stringify(adminPayload))
        } else {
          window.localStorage.removeItem('departmentAdmin')
        }

        window.location.href = '/department-admin'
        return
      }

      if (isStateAdminLogin) {
        const stateAdminPayload = {
          ...authorizedStateAdmin.profile,
          loginTime: new Date().toISOString(),
        }

        window.sessionStorage.setItem('sevaihub-role', 'state-admin')
        window.sessionStorage.setItem('stateAdmin', JSON.stringify(stateAdminPayload))

        if (rememberMe) {
          window.localStorage.setItem('stateAdmin', JSON.stringify(stateAdminPayload))
        } else {
          window.localStorage.removeItem('stateAdmin')
        }

        window.location.href = '/state-admin'
        return
      }

      setIsLoading(false)
      setLoginError('Invalid credentials. Use the assigned officer mobile/password, department admin ID/password, or state admin ID/password.')
    }, 900)
  }

  return (
    <div className="w-full max-w-md px-4 sm:px-0">
      {/* Logo and Branding */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-white text-lg font-bold">
            👔
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">SevaiHub</h1>
            <p className="text-xs text-slate-600">Officer Portal</p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Officer Login</h2>
        <p className="text-slate-600 text-xs sm:text-sm leading-6">
          Access your officer dashboard or department admin command center to manage services, track grievances, and generate reports.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
        {/* Officer ID */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
            Officer ID / Department Admin ID
          </label>
          <div className="relative">
            <IdCard className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Enter your officer or admin ID"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              className="h-11 pl-10 sm:pl-12 text-sm sm:text-base rounded-lg sm:rounded-xl border-slate-200 focus:border-slate-700 focus:ring-slate-700"
              required
            />
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
            Department
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-11 w-full pl-10 sm:pl-12 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-200 focus:border-slate-700 focus:ring-slate-700 appearance-none bg-white"
            >
              <option value="revenue">Revenue Department</option>
              <option value="health">Health & Welfare</option>
              <option value="education">Education</option>
              <option value="transport">Transport</option>
              <option value="urban">Urban Development</option>
              <option value="labor">Labor & Employment</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base rounded-lg sm:rounded-xl border-slate-200 focus:border-slate-700 focus:ring-slate-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
              ) : (
                <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-slate-700 focus:ring-slate-700"
            />
            <span className="text-xs sm:text-sm text-slate-600">Remember me for 30 days</span>
          </label>
          <Link href="/forgot-password" className="text-xs sm:text-sm text-slate-700 hover:text-slate-900 font-semibold transition-colors">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        {loginError && (
          <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {loginError}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm md:text-base px-6 py-3 sm:py-4 md:py-6 h-auto rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          {isLoading ? 'Logging in...' : 'Login to Officer Portal'}
          {!isLoading && <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />}
        </Button>
      </form>

      {/* Support Section */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-200">
        <p className="text-xs font-semibold text-slate-700 mb-3">SECURE OFFICER ACCESS</p>
        <div className="space-y-2">
          <div className="flex gap-3">
            <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-slate-700 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600">Officer and department admin authentication enabled</p>
          </div>
          <div className="flex gap-3">
            <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-slate-700 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600">Encrypted connection verified</p>
          </div>
          <div className="flex gap-3">
            <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-slate-700 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600">Activity logging in progress</p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <p className="text-center text-xs sm:text-sm text-slate-600 mt-6 sm:mt-8">
        <Link href="/login" className="text-slate-700 hover:text-slate-900 font-semibold transition-colors">
          Citizen Login
        </Link>
        {' '} • {' '}
        <Link href="/help" className="text-slate-700 hover:text-slate-900 font-semibold transition-colors">
          Help & Support
        </Link>
      </p>
    </div>
  )
}
