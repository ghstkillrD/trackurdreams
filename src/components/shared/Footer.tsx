'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/70 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <img 
                src="/img/MainLogo.png" 
                alt="Track ur Dreams Main Logo" 
                className="h-16 w-auto"
              />
              <img 
                src="/img/SecLogo2.png" 
                alt="Track ur Dreams Secondary Logo" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Unlock the secrets of your subconscious mind through AI-powered dream analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-shimmering-gold dark:hover:text-shimmering-gold transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-gray-600 dark:text-gray-400 hover:text-shimmering-gold dark:hover:text-shimmering-gold transition-colors">
                  Plans
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-600 dark:text-gray-400 hover:text-shimmering-gold dark:hover:text-shimmering-gold transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://github.com/ghstkillrD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-shimmering-gold dark:hover:text-shimmering-gold transition-colors"
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/ghstkillrD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-shimmering-gold dark:hover:text-shimmering-gold transition-colors"
                >
                  <Twitter className="h-5 w-5 mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@trackurdreams.com"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-shimmering-gold dark:hover:text-shimmering-gold transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} Track ur Dreams. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
