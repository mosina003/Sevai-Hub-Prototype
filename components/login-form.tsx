'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Lock, Mail, Phone, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export default function LoginForm() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="w-full max-w-md px-4 sm:px-0">
      {/* Logo and Branding */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-lg flex items-center justify-center text-white text-lg sm:text-xl font-bold">
            🏛️
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">SevaiHub</h1>
            <p className="text-xs text-muted-foreground">One Platform for Public Services</p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground text-xs sm:text-sm leading-6">
          Sign in to access government services, track applications, and manage grievances.
        </p>
      </div>

      {/* Login Method Toggle */}
      <div className="mb-6 inline-flex gap-1 sm:gap-2 rounded-full bg-secondary p-1">
        <button
          onClick={() => setLoginMethod('password')}
          className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            loginMethod === 'password'
              ? 'bg-white text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Password
        </button>
        <button
          onClick={() => setLoginMethod('otp')}
          className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            loginMethod === 'otp'
              ? 'bg-white text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          OTP
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-3 sm:space-y-5">
        {/* Mobile Number / Email Input */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            Mobile Number / Email
          </label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Phone className="w-4 h-4" />
            </div>
            <Input
              type="text"
              placeholder="Enter mobile or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="pl-9 sm:pl-10 h-10 sm:h-11 sm:h-12 rounded-lg sm:rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm"
              required
            />
          </div>
        </div>

        {/* Password / OTP Input */}
        {loginMethod === 'password' ? (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 sm:h-12 rounded-lg sm:rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm"
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
        ) : (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
              One-Time Password (OTP)
            </label>
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail className="w-4 h-4" />
              </div>
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
                className="pl-9 sm:pl-10 h-10 sm:h-11 sm:h-12 rounded-lg sm:rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary text-center tracking-widest text-sm"
                required
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              OTP sent to your registered mobile number
            </p>
          </div>
        )}

        {/* Remember Me and Forgot Password */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-slate-50 cursor-pointer accent-primary"
            />
            <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors\">
              Remember me for 30 days
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 sm:h-11 sm:h-12 rounded-lg sm:rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Login to Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-4 sm:my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Alternative Login */}
      {loginMethod === 'password' && (
        <button
          onClick={() => setLoginMethod('otp')}
          className="w-full h-10 sm:h-11 sm:h-12 rounded-lg sm:rounded-xl border-2 border-primary/20 text-primary font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Mail className="w-4 h-4" />
          Login using OTP
        </button>
      )}

      {/* Create Account */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-xs sm:text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Create New Account
          </Link>
        </p>
      </div>

      {/* Security Indicators */}
      <div className="mt-8 pt-4 sm:pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3 sm:mb-4 font-medium">SECURE LOGIN</p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Lock className="w-3 sm:w-4 h-3 sm:h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-emerald-700 font-semibold text-center leading-tight">
              Encrypted
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100">
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Check className="w-3 sm:w-4 h-3 sm:h-4 text-blue-600" />
            </div>
            <p className="text-xs text-blue-700 font-semibold text-center leading-tight">
              Verified
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-100">
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm">
              🇮🇳
            </div>
            <p className="text-xs text-amber-700 font-semibold text-center leading-tight">
              Official
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
