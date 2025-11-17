import React from "react";
import { FaInstagram, FaFacebookF, FaXTwitter, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-teal-900 to-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* === About Section === */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">About</h3>
          <p className="text-gray-400 leading-relaxed">
            CareerHub is a modern job portal built for developers, designers, and dreamers.
            Our goal is to connect passionate individuals with the opportunities that
            help them grow — whether it’s a startup idea, a global company, or a local
            business looking for talent.
          </p>
        </div>

        {/* === Quick Links === */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-orange-400 transition">Home</a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-orange-400 transition">Dashboard</a>
            </li>
            <li>
              <a href="/resources" className="hover:text-orange-400 transition">Resources</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-400 transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* === Social Media === */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-5 mt-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-500 transition text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-400 transition text-2xl"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition text-2xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* === Bottom Line === */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} Project7 — Built with ❤️ using React, Express & MongoDB.
      </div>
    </footer>
  );
}
