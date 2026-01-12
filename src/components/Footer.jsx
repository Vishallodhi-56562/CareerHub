import React from "react";
import { FaInstagram, FaFacebookF, FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiMail, HiLocationMarker, HiPhone } from "react-icons/hi";
import { FiArrowRight, FiSend } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaInstagram />, href: "https://instagram.com", color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500", label: "Instagram" },
    { icon: <FaFacebookF />, href: "https://facebook.com", color: "hover:bg-blue-600", label: "Facebook" },
    { icon: <FaXTwitter />, href: "https://x.com", color: "hover:bg-gray-700", label: "Twitter" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com", color: "hover:bg-blue-700", label: "LinkedIn" },
    { icon: <FaGithub />, href: "https://github.com", color: "hover:bg-gray-800", label: "GitHub" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Find Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Resources", href: "/resources" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    "Technology",
    "Design",
    "Marketing",
    "Finance",
    "Healthcare",
    "Education",
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-gray-300 mt-20 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* Top Section - Newsletter & CTA */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 md:p-12 mb-16 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-2">Stay Updated with CareerHub</h3>
              <p className="text-white/80 text-lg">Get weekly career tips, job alerts, and industry insights delivered to your inbox.</p>
            </div>
            <div className="md:flex gap-3 w-auto space-y-5   md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[250px] transition-all "
              />
              <button className="px-8 py-4 w-full   bg-white text-teal-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl">
                Subscribe
                <FiSend className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* === About Section === */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <h3 className="text-2xl font-bold text-white">CareerHub</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Connecting passionate professionals with opportunities that fuel growth and innovation. Your career journey starts here.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors group">
                <HiMail className="text-xl group-hover:scale-110 transition-transform" />
                <span>hello@careerhub.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors group">
                <HiPhone className="text-xl group-hover:scale-110 transition-transform" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors group">
                <HiLocationMarker className="text-xl group-hover:scale-110 transition-transform" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* === Quick Links === */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-blue-600 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-teal-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FiArrowRight className="text-teal-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* === Popular Categories === */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-blue-600 rounded-full"></div>
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((category, idx) => (
                <li key={idx}>
                  <a 
                    href={`/jobs/${category.toLowerCase()}`} 
                    className="text-gray-400 hover:text-teal-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <FiArrowRight className="text-teal-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{category}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* === Social Media & Stats === */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-blue-600 rounded-full"></div>
              Connect With Us
            </h3>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 ${social.color} hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group border border-gray-700/50 hover:border-transparent`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{social.icon}</span>
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-teal-400 mb-1">none</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Active Jobs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">15</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p className="mb-2">
              © {currentYear} <span className="text-teal-400 font-semibold">CareerHub</span> — All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Built with <span className="text-red-400 animate-pulse">❤️</span> using React, Express & MongoDB
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-teal-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-teal-400 transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-teal-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500"></div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Smooth hover transitions */
        a, button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Glass morphism effect */
        .backdrop-blur-sm {
          backdrop-filter: blur(12px);
        }
      `}</style>
    </footer>
  );
}