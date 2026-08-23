import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, ArrowRight, Workflow, Building2, Cpu, Calculator, Sparkles } from 'lucide-react';
import HeaderClouds3D from './HeaderClouds3D';

const NAV_LINKS = [
  { label: 'How It Works', href: '#workflow', icon: Workflow },
  { label: 'Sectors', href: '#sectors', icon: Building2 },
  { label: 'Architecture', href: '#architecture', icon: Cpu },
  { label: 'ROI Calculator', href: '#calculator', icon: Calculator },
];

export default function Header({ currentPage, onNavigate, onLaunchConsole }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-200 border-b relative overflow-hidden backdrop-blur-md bg-white/80 border-white/70 shadow-[0_4px_20px_rgba(28,59,43,0.05)]"
      style={{
        boxShadow: scrolled
          ? '0 8px 30px -10px rgba(28, 59, 43, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)'
          : '0 4px 20px -10px rgba(28, 59, 43, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
      }}
    >
      {/* 3D Floating Clouds Three.js Canvas */}
      <HeaderClouds3D />

      {/* Top Specular Rim Reflection */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/95 to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Increased Height Header Bar: h-18 sm:h-20 */}
        <div className="flex items-center justify-between h-18 sm:h-20 py-3 sm:py-3.5">
          {/* Logo */}
          <div className="flex items-center gap-3.5 relative z-30">
            <button
              onClick={() => onNavigate('overview')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 bg-[#1b3d2b] border border-white/40"
              >
                <Leaf className="w-4.5 h-4.5 text-emerald-300" />
              </div>
              <span
                className="text-lg sm:text-xl font-sans font-bold tracking-tight text-stone-900"
              >
                Ecoryx
              </span>
            </button>

            {/* Primary Page Switcher Tabs in Liquid Glass Capsule */}
            <div
              className="hidden sm:flex items-center p-1 rounded-xl border border-white/80 ml-2 text-xs font-mono bg-white/50 backdrop-blur-md shadow-2xs"
            >
              <button
                onClick={() => onNavigate('overview')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                  currentPage === 'overview'
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                  currentPage === 'dashboard'
                    ? 'bg-[#1b3d2b] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full inline-block ${
                    currentPage === 'dashboard' ? 'bg-emerald-300 animate-pulse' : 'bg-emerald-700'
                  }`}
                />
                <span>Live Dashboard</span>
              </button>
            </div>
          </div>

          {/* Desktop Anchor Navigation in Liquid Glass Capsules */}
          {currentPage === 'overview' && (
            <nav className="hidden lg:flex items-center gap-1.5 relative z-30">
              {NAV_LINKS.map((link) => {
                const IconComp = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 text-xs font-sans font-semibold rounded-xl transition-all hover:bg-white/80 hover:shadow-xs border border-transparent hover:border-white/80 flex items-center gap-2 group text-stone-800"
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/70 border border-white shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComp className="w-3.5 h-3.5 text-[#1e3b2b]" />
                    </div>
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>
          )}

          {/* Controls: Primary Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3 relative z-30">
            {currentPage === 'overview' ? (
              <button
                type="button"
                onClick={() => {
                  if (typeof onLaunchConsole === 'function') {
                    onLaunchConsole();
                  } else {
                    onNavigate('dashboard');
                  }
                }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 rounded-xl text-xs sm:text-sm font-sans font-bold tracking-wide transition-all duration-200 active:scale-[0.98] cursor-pointer text-white bg-[#1b3d2b] hover:bg-[#143222] border border-emerald-600/40 shadow-sm hover:shadow-md shrink-0"
              >
                <span>Launch Console</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('overview')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 rounded-xl border border-white/80 text-xs sm:text-sm font-sans font-bold tracking-wide transition-all active:scale-[0.98] cursor-pointer bg-white/70 hover:bg-white text-stone-900 shadow-xs backdrop-blur-md shrink-0"
              >
                <span>Overview Page</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl border border-white/80 bg-white/70 hover:bg-white shadow-xs transition-colors cursor-pointer text-stone-800"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-stone-200/80 bg-white/95 backdrop-blur-2xl px-4 py-4 space-y-3 relative z-30 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-stone-100 text-xs font-mono mb-2">
            <button
              onClick={() => {
                onNavigate('overview');
                setMenuOpen(false);
              }}
              className={`flex-1 py-2 rounded-lg font-bold text-center transition-all ${
                currentPage === 'overview' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMenuOpen(false);
              }}
              className={`flex-1 py-2 rounded-lg font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
                currentPage === 'dashboard' ? 'bg-[#1b3d2b] text-white shadow-sm' : 'text-stone-600'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dashboard</span>
            </button>
          </div>

          {currentPage === 'overview' && (
            <div className="space-y-1.5 pt-1">
              {NAV_LINKS.map((link) => {
                const IconComp = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-100 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center">
                      <IconComp className="w-4 h-4 text-emerald-800" />
                    </div>
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={() => {
                if (typeof onLaunchConsole === 'function') {
                  onLaunchConsole();
                } else {
                  onNavigate('dashboard');
                }
                setMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-[#1b3d2b] hover:bg-[#143222] text-white font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 border border-emerald-600/30"
            >
              <span>Launch Clearance Console</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
