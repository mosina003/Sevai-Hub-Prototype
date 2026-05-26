import OfficerLoginForm from '@/components/officer-login-form'
import OfficerLoginIllustration from '@/components/officer-login-illustration'
import Link from 'next/link'

export const metadata = {
  title: 'Officer Login - SevaiHub',
  description: 'Government officer login portal',
}

export default function OfficerLoginPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Illustration (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <OfficerLoginIllustration />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-y-auto">
          {/* Form Container */}
          <OfficerLoginForm />

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
            <p className="text-center text-xs text-muted-foreground mt-6">
              © 2026 SevaiHub. All rights reserved. | Government of India
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
