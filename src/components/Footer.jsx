import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tighter">AUTOLUSTER</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium mobile car care at your doorstep. We bring the luxury detailing experience directly to you, saving you time without compromising on quality.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Globe size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <MessageCircle size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Options</a></li>
            <li><a href="#packages" className="hover:text-white transition-colors">Combo Offers</a></li>
            <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-gray-500" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-gray-500" />
              <span>hello@autoluster.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-500" />
              <span>Available in Metro Cities, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Autoluster. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for luxury.</p>
      </div>
    </footer>
  );
}
