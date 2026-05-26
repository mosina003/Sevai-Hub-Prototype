import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 md:pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary text-lg font-bold">
                सेवा
              </div>
              <div>
                <h3 className="font-bold text-lg">SevaiHub</h3>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              A citizen-centric government services platform designed to make accessing government services simple and transparent.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Schemes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Departments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Citizen Corner
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Important Links</h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-white/80 text-sm">
              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">1800-123-4567</p>
                  <p>Toll Free</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>support@sevaihub.gov.in</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>Working Hours: 9:00 AM - 6:00 PM</p>
                  <p>(Monday - Friday)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-white/80 text-sm">
              <p>&copy; 2025 All Rights Reserved.</p>
              <p className="mt-2">
                This is the official portal of Government Services.
              </p>
            </div>
            <div className="flex items-center justify-start md:justify-end gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white/80">
                <span className="text-lg font-bold">🇮🇳</span>
              </div>
              <p className="text-white/80 text-xs">
                Official Digital Services Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
