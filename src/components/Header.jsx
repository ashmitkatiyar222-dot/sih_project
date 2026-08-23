import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, ArrowRight } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

const NAV_LINKS = [
  { label: 'How It Works', href: '#workflow' },
  { label: 'Simulator', href: '#workbench-section' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'ROI Calculator', href: '#calculator' },
];

export default function Header({ onLaunchConsole }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all border-b"
      style={{
        backgroundColor: scrolled ? '#fbfaf6' : 'var(--bg-canvas, #f3f1eb)',
        borderColor: 'var(--border-subtle, #d8d4ca)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Technical Version Tag */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--color-primary, #315c48)' }}
              >
                <Leaf className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-base font-serif font-bold tracking-tight"
                  style={{ color: 'var(--text-main, #20231f)' }}
                >
                  Ecoryx
                </span>
                <span
                  className="text-[10px] font-mono tracking-wider"
                  style={{ color: 'var(--text-muted, #73766f)' }}
                >
                  // GOVTECH EIA
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors hover:bg-[#edeae1]"
                style={{ color: 'var(--text-main, #20231f)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls: Palette Switcher + Primary Button */}
          <div className="flex items-center gap-2.5">
            <ThemeSelector />

            <button
              onClick={onLaunchConsole}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer hover:opacity-90 shadow-xs"
              style={{ backgroundColor: 'var(--dark-surface, #222a25)' }}
            >
              <span>Launch Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 rounded-lg border transition-colors cursor-pointer"
              style={{
                borderColor: 'var(--border-subtle, #d8d4ca)',
                color: 'var(--text-main, #20231f)',
                backgroundColor: 'var(--bg-card, #fbfaf6)',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-3"
          style={{
            backgroundColor: 'var(--bg-card, #fbfaf6)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
          }}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium rounded-md transition-colors hover:bg-[#edeae1]"
                style={{ color: 'var(--text-main, #20231f)' }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onLaunchConsole();
              }}
              className="mt-2 w-full px-4 py-2.5 rounded-lg text-white text-xs font-semibold cursor-pointer"
              style={{ backgroundColor: 'var(--dark-surface, #222a25)' }}
            >
              Launch Simulator
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
