import React, { useState, useEffect } from 'react';
import { personalInfo, hireMeMailto } from '../data/portfolioData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isOpen
          ? 'bg-[#0d0b16] py-4 border-b border-white/10'
          : isScrolled
            ? 'bg-[#08070d]/70 backdrop-blur-xl py-4 border-b border-white/5'
            : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo/Name */}
        <a href="#home" className="text-white text-2xl font-black tracking-tight whitespace-nowrap font-display">
          {personalInfo.brandName}<span className="text-cyan-400">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-white font-medium relative group transition-colors duration-300 text-sm tracking-wide"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href={hireMeMailto}
            className="px-6 py-2.5 rounded-full bg-white/5 border border-white/15 text-white font-semibold text-sm hover:bg-violet-600/20 hover:border-violet-400/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 backdrop-blur-md"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[26rem] py-4 opacity-100 bg-[#0d0b16] shadow-2xl border-b border-white/10' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-cyan-300 font-bold text-lg border-b border-white/10 pb-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={hireMeMailto}
            onClick={() => setIsOpen(false)}
            className="mt-2 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-black hover:opacity-90 transition-all w-full text-center shadow-lg"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
