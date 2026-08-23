import React from 'react';
import { Trees } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="py-8 relative z-20 border-t"
      style={{
        backgroundColor: 'var(--bg-card, #faf9f5)',
        borderColor: 'var(--border-subtle, #d5cfc2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded flex items-center justify-center font-bold border"
              style={{
                backgroundColor: 'var(--color-primary-light, #e3ebe5)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
                color: 'var(--color-primary, #284e3a)',
              }}
            >
              <Trees className="w-3.5 h-3.5" />
            </div>
            <div>
              <span
                className="font-bold text-base tracking-tight"
                style={{ color: 'var(--text-main, #1a1d1a)' }}
              >
                Ecoryx
              </span>
              <span className="text-xs sm:text-sm text-stone-500 ml-2">
                Automated Environmental Clearance Platform
              </span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-stone-500 font-mono text-center md:text-right">
            Smart India Hackathon 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
