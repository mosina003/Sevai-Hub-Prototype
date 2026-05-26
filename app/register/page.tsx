import RegisterForm from '@/components/register-form'
import RegisterIllustration from '@/components/register-illustration'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Register - SevaiHub',
  description: 'Create your SevaiHub account to access government services and manage grievances',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Illustration (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <RegisterIllustration />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-y-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-xl font-bold">
                🏛️
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SevaiHub</h1>
                <p className="text-xs text-muted-foreground">Create Your Citizen Account</p>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <RegisterForm />

          {/* Footer Links */}
          <div className="mt-8 w-full max-w-md pt-6 sm:pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs text-muted-foreground flex-wrap">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <div className="w-1 h-1 rounded-full bg-border" />
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Use
              </Link>
              <div className="w-1 h-1 rounded-full bg-border" />
              <Link href="/help" className="hover:text-foreground transition-colors">
                Help & Support
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 sm:mt-6 w-full max-w-md text-center">
            <p className="text-xs text-muted-foreground">
              © 2026 SevaiHub. All rights reserved. | Government of India
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
