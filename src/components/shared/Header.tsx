'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { createClientComponentClient } from '@/lib/db/supabase';
import { useRouter, usePathname } from 'next/navigation';
import { AuthModal } from './AuthModal';

export default function Header() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-md shadow-lg' 
          : 'bg-white/90'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <img 
                src="/img/MainLogo.png" 
                alt="Track ur Dreams Main Logo" 
                className="h-10 w-auto"
              />
              <img 
                src="/img/SecLogo.png" 
                alt="Track ur Dreams Secondary Logo" 
                className="h-10 w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/plans"
                className={`font-medium hover:text-shimmering-gold transition-colors ${
                  pathname === '/plans' ? 'text-shimmering-gold' : 'text-gray-600'
                }`}
              >
                Plans
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`font-medium hover:text-shimmering-gold transition-colors ${
                      pathname === '/dashboard' ? 'text-shimmering-gold' : 'text-gray-600'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md ${
                      pathname === '/profile'
                        ? 'bg-shimmering-gold/10 text-shimmering-gold border border-shimmering-gold'
                        : 'text-gray-600 border border-transparent hover:border-shimmering-gold hover:bg-shimmering-gold/5'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Profile</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-white border border-red-600 hover:bg-red-600 rounded-lg transition-all duration-300 hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="flex items-center gap-2 px-4 py-2 font-medium text-gray-700 hover:text-shimmering-gold border border-transparent hover:border-shimmering-gold rounded-lg transition-all duration-300 hover:shadow-md hover:bg-shimmering-gold/5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-shimmering-gold to-yellow-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`md:hidden fixed inset-0 z-50 bg-gray-800/50 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={`absolute right-0 top-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 space-y-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <nav className="space-y-3">
                  <Link
                    href="/plans"
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      pathname === '/plans'
                        ? 'bg-shimmering-gold/10 text-shimmering-gold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Plans
                  </Link>
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/dashboard"
                        className={`block px-4 py-2 rounded-lg transition-colors ${
                          pathname === '/dashboard'
                            ? 'bg-shimmering-gold/10 text-shimmering-gold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className={`block px-4 py-2 rounded-lg transition-colors ${
                          pathname === '/profile'
                            ? 'bg-shimmering-gold/10 text-shimmering-gold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          openAuthModal('signin');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          openAuthModal('signup');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 bg-gradient-to-r from-shimmering-gold to-yellow-500 text-white rounded-lg font-medium shadow-md"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          if (pathname === '/') {
            router.push('/dashboard');
          }
        }}
        mode={authMode}
      />
    </>
  );
}
