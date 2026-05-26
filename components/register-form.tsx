'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, User, Phone, Mail, MapPin, Lock, Check, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [subscribeUpdates, setSubscribeUpdates] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Password validation
  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
  }

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms || !isPasswordValid || !passwordsMatch) {
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push('/login')
    }, 1000)
  }

  const isFormValid =
    formData.fullName &&
    formData.mobileNumber &&
    formData.email &&
    formData.address &&
    isPasswordValid &&
    passwordsMatch &&
    agreeTerms

  return (
    <div className="w-full max-w-md px-4 sm:px-0">
      {/* Logo and Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-lg flex items-center justify-center text-white text-lg sm:text-xl font-bold">
            🏛️
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">SevaiHub</h1>
            <p className="text-xs text-muted-foreground">Create Your Citizen Account</p>
          </div>
        </div>
      </div>

      {/* Registration Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Citizen Registration</h2>
        <p className="text-muted-foreground text-xs sm:text-sm leading-6">
          Register to access government services, submit grievances, and track your applications
          online.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Full Name</label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <User className="w-4 h-4" />
            </div>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="pl-9 sm:pl-10 h-10 sm:h-11 rounded-lg sm:rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm"
              required
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Mobile Number</label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Phone className="w-4 h-4" />
            </div>
            <Input
              type="tel"
              name="mobileNumber"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              maxLength={10}
              className="pl-9 sm:pl-10 h-10 sm:h-11 rounded-lg sm:rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm"
              required
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail className="w-4 h-4" />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="pl-9 sm:pl-10 h-10 sm:h-11 rounded-lg sm:rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Address</label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-3 text-muted-foreground">
              <MapPin className="w-4 h-4" />
            </div>
            <textarea
              name="address"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="pl-9 sm:pl-10 pt-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary resize-none text-sm"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Password</label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock className="w-4 h-4" />
            </div>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 rounded-lg sm:rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        {formData.password && (
          <div className="bg-slate-50 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2 border border-border">
            <p className="text-xs font-semibold text-foreground mb-3">Password Requirements:</p>
            <div className="space-y-2">
              {[
                {
                  met: passwordRequirements.minLength,
                  text: 'Minimum 8 characters',
                },
                {
                  met: passwordRequirements.hasUpperCase,
                  text: 'One uppercase letter (A-Z)',
                },
                {
                  met: passwordRequirements.hasNumber,
                  text: 'One number (0-9)',
                },
                {
                  met: passwordRequirements.hasSpecialChar,
                  text: 'One special character (!@#$%^&*)',
                },
              ].map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  {req.met ? (
                    <Check className="w-3 sm:w-4 h-3 sm:h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-3 sm:w-4 h-3 sm:h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span
                    className={`text-xs ${req.met ? 'text-green-700' : 'text-muted-foreground'}`}
                  >
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock className="w-4 h-4" />
            </div>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 rounded-lg sm:rounded-xl border bg-slate-50 focus:bg-white focus:border-primary text-sm ${
                formData.confirmPassword
                  ? passwordsMatch
                    ? 'border-green-300'
                    : 'border-red-300'
                  : 'border-border'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {formData.confirmPassword && !passwordsMatch && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 sm:w-5 h-4 sm:h-5 rounded border-border bg-slate-50 cursor-pointer mt-1 sm:mt-0.5 accent-primary flex-shrink-0"
              required
            />
            <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
              I agree to the{' '}
              <Link href="/terms" className="font-semibold text-primary hover:text-primary/80">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-semibold text-primary hover:text-primary/80">
                Privacy Policy
              </Link>
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={subscribeUpdates}
              onChange={(e) => setSubscribeUpdates(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-slate-50 cursor-pointer accent-primary flex-shrink-0"
            />
            <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Subscribe to service updates and announcements
            </span>
          </label>
        </div>

        {/* Create Account Button */}
        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full h-10 sm:h-11 rounded-lg sm:rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4 sm:mt-2 text-sm sm:text-base"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-xs sm:text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Login here
          </Link>
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-4 sm:pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3 sm:mb-4 font-medium">TRUSTED REGISTRATION</p>
        <div className="grid grid-cols-1 gap-2">
          {[
            { icon: '🔒', label: 'Secure Registration', color: 'emerald' },
            { icon: '✓', label: 'Government Verified', color: 'blue' },
            { icon: '🛡️', label: 'Data Privacy Protected', color: 'amber' },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-${item.color}-50 border border-${item.color}-100`}
            >
              <span className="text-base sm:text-lg flex-shrink-0">{item.icon}</span>
              <p className={`text-xs sm:text-xs font-semibold text-${item.color}-700`}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
