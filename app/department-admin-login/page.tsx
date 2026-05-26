'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const COLORS = {
  navyBlue: '#0F3D73',
  govBlue: '#1E5AA8',
  white: '#FFFFFF',
  lightGray: '#F5F7FA',
  darkGray: '#2D3748',
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444',
}

export default function DepartmentAdminLoginPage() {
  const router = useRouter()
  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Demo credentials
      if (adminId === '1234567890' && password === 'dept123') {
        // Store admin profile in session storage
        const adminProfile = {
          name: 'R. Suresh',
          adminId,
          designation: 'Joint Commissioner',
          department: 'Revenue Department',
          employeeId: 'ADM-CHN-2024',
          region: 'Tamil Nadu',
          district: 'Chennai',
          loginTime: new Date().toISOString(),
        }
        sessionStorage.setItem('departmentAdmin', JSON.stringify(adminProfile))

        setSuccess(true)
        setTimeout(() => {
          router.push('/department-admin')
        }, 1000)
      } else {
        setError('Invalid admin ID or password. Try 1234567890 / dept123')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.navyBlue }}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 rounded-lg bg-white bg-opacity-20">
                <Shield size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">SevaiHub</h1>
                <p className="text-blue-200 text-sm">Government Command Center</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4">Department Admin Portal</h2>
            <p className="text-xl text-blue-100 mb-12">
              Real-time monitoring, analytics, and management for department executives
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            {[
              { icon: '📊', title: 'Executive Analytics', desc: 'Real-time department performance metrics' },
              { icon: '👥', title: 'Officer Management', desc: 'Monitor and manage your department team' },
              { icon: '⚠️', title: 'SLA Governance', desc: 'Track compliance and resolve escalations' },
              { icon: '🤖', title: 'AI Insights', desc: 'Predictive analysis and recommendations' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-blue-200 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-blue-200 text-sm">
            <p>Government of India | Ministry of Personnel, Public Grievances and Pensions</p>
            <p className="mt-2">Secure Government System • Multi-layer Authentication</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div
          className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12"
          style={{ backgroundColor: COLORS.white }}
        >
          {/* Form Container */}
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.navyBlue }}>
                Welcome Back
              </h1>
              <p className="text-gray-600">Department Admin Login</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Admin ID</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="1234567890"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="pl-10 py-2.5"
                    style={{ borderColor: COLORS.lightGray }}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 py-2.5"
                    style={{ borderColor: COLORS.lightGray }}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Demo Credentials Info */}
              <Card className="p-4 border-2" style={{ borderColor: COLORS.lightGray, backgroundColor: '#F0F7FF' }}>
                <div className="flex gap-3">
                  <AlertCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Demo Credentials:</p>
                    <p className="text-gray-700 mt-1">
                      Admin ID: <code className="font-mono text-xs bg-white px-2 py-1 rounded">1234567890</code>
                    </p>
                    <p className="text-gray-700">
                      Password: <code className="font-mono text-xs bg-white px-2 py-1 rounded">dept123</code>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-lg flex gap-3" style={{ backgroundColor: '#FEE2E2', borderLeft: `4px solid ${COLORS.red}` }}>
                  <AlertCircle size={18} style={{ color: COLORS.red }} className="shrink-0 mt-0.5" />
                  <p style={{ color: COLORS.red, fontSize: '14px' }}>{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 rounded-lg flex gap-3" style={{ backgroundColor: '#ECFDF5', borderLeft: `4px solid ${COLORS.green}` }}>
                  <CheckCircle2 size={18} style={{ color: COLORS.green }} className="shrink-0 mt-0.5" />
                  <p style={{ color: COLORS.green, fontSize: '14px' }}>Login successful! Redirecting...</p>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading || success}
                className="w-full py-2.5 font-semibold flex items-center justify-center gap-2"
                style={{
                  backgroundColor: success ? COLORS.green : COLORS.govBlue,
                  color: 'white',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Logged in successfully</span>
                  </>
                ) : (
                  <>
                    <span>Login to Dashboard</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-3 text-sm text-gray-600 flex-wrap">
                <Link href="/help" className="hover:text-gray-900 transition-colors">
                  Help & Support
                </Link>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <Link href="/terms" className="hover:text-gray-900 transition-colors">
                  Terms of Use
                </Link>
              </div>
              <p className="text-center text-xs text-gray-500 mt-6">
                © 2026 SevaiHub. All rights reserved. | Government of India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
