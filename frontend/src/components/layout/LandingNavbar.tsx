import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Terminal,
  Activity,
  Network,
  Database,
  FileCode2
} from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090E]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Project Logo / Name */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <div className="w-full h-full bg-[#07090E] rounded-[6px] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black text-white tracking-tight font-heading group-hover:text-indigo-300 transition-colors">
                ROCA
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PROD-v1.0
              </span>
            </div>
          </div>
        </Link>

        {/* Center / Right Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <button
            onClick={() => scrollToSection('overview')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Overview
          </button>

          <button
            onClick={() => scrollToSection('transformation')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Query Engine
          </button>

          <button
            onClick={() => scrollToSection('reproducibility')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Methodology
          </button>

          <button
            onClick={() => scrollToSection('analytics')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Analytics
          </button>

          <Link
            to="/research"
            className="hover:text-white transition-colors"
          >
            Documentation
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => navigate('/workspace')}
            className="group px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-[0.98]"
          >
            <span>Launch Analytics</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090E]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-fade-up">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('overview')}
              className="text-left py-2 hover:text-white"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('transformation')}
              className="text-left py-2 hover:text-white"
            >
              Query Engine
            </button>
            <button
              onClick={() => scrollToSection('reproducibility')}
              className="text-left py-2 hover:text-white"
            >
              Methodology
            </button>
            <button
              onClick={() => scrollToSection('analytics')}
              className="text-left py-2 hover:text-white"
            >
              Analytics
            </button>
            <Link
              to="/research"
              className="py-2 hover:text-white"
            >
              Documentation
            </Link>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/workspace');
            }}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <span>Launch Analytics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
