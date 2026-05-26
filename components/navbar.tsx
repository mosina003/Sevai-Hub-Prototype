'use client'

import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false)

  const navLinks = [
    'Home',
    'Services',
    'Schemes',
    'Departments',
    'Track Status',
    'Citizen Corner',
    'Contact Us',
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left side - Logo and tagline */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 sm:w-10 h-9 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-white text-base sm:text-lg font-bold shrink-0">
              🏛️
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-lg sm:text-xl font-bold text-primary">SevaiHub</h1>
              <p className="text-xs text-muted-foreground">One Platform, Many Services</p>
            </div>
          </div>

          {/* Center - Navigation menu (hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors">
              Home
            </Link>
            <Link href="/services" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors">
              Services
            </Link>
            <Link href="/schemes" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors">
              Schemes
            </Link>
            <Link href="/departments" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors">
              Departments
            </Link>
            <Link href="/public-transparency" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors">
              Transparency
            </Link>
          </div>

          {/* Right side - Login */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Login */}
            <div className="relative hidden sm:block">
              <Button
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
              >
                Login
                <ChevronDown className="w-4 h-4" />
              </Button>
              {loginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg">
                  <Link href="/login" className="block w-full text-left px-4 py-3 hover:bg-secondary text-sm font-medium border-b border-border rounded-t-lg">
                    Citizen Login
                  </Link>
                  <Link href="/officer-login" className="block w-full text-left px-4 py-3 hover:bg-secondary text-sm font-medium border-b border-border">
                    Officer Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border pb-4">
            <div className="space-y-2">
              <Link href="/" className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md">
                Home
              </Link>
              <Link href="/services" className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md">
                Services
              </Link>
              <Link href="/schemes" className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md">
                Schemes
              </Link>
              <Link href="/departments" className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md">
                Departments
              </Link>
              <Link href="/public-transparency" className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md">
                Transparency
              </Link>
            </div>
            <div className="pt-4 px-4 space-y-2 border-t border-border mt-4">
              <Link href="/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Citizen Login
                </Button>
              </Link>
              <Link href="/officer-login" className="block">
                <Button variant="outline" className="w-full">
                  Officer Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
