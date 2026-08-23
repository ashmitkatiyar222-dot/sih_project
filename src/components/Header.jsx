import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'How It Works', href: '#workflow' },
  { label: 'Simulator', href: '#workbench-section' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Calculator', href: '#calculator' },
];

export default function Header({ onLaunchConsole }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>


      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled
          ? 'bg-white/92 backdrop-blur-md border-stone-200 shadow-sm'
          : 'bg-transparent border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-stone-900 tracking-tight">Ecoryx</span>
                <span className="text-[10px] text-stone-400 font-mono block -mt-1 tracking-widest">AI CLEARANCE</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-[13px] font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={onLaunchConsole}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-[13px] font-semibold transition-all active:scale-[0.97] cursor-pointer shadow-sm"
              >
                Launch Simulator
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-600 cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white/95 backdrop-blur-md px-4 pb-4 pt-2">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLaunchConsole();
                }}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold cursor-pointer"
              >
                Launch Simulator
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
