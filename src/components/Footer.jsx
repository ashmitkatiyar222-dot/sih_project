import React from 'react';
import { Trees } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="py-12 relative z-20 border-t"
      style={{
        backgroundColor: 'var(--bg-card, #fbfaf6)',
        borderColor: 'var(--border-subtle, #d8d4ca)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold border"
              style={{
                backgroundColor: 'var(--color-primary-light, #e2ebe5)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
                color: 'var(--color-primary, #315c48)',
              }}
            >
              <Trees className="w-4 h-4" />
            </div>
            <div>
              <span
                className="font-sans font-extrabold text-base tracking-tight"
                style={{ color: 'var(--text-main, #20231f)' }}
              >
                Ecoryx
              </span>
              <span className="text-xs ml-2" style={{ color: 'var(--text-muted, #73766f)' }}>
                AI-Powered Environmental Clearance Platform
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border"
            style={{
              backgroundColor: 'var(--color-primary-light, #e2ebe5)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
              color: 'var(--color-primary-text, #244737)',
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary, #315c48)' }} />
            <span>All GIS &amp; AI Systems Operational</span>
          </div>

          <div className="text-xs font-sans text-center md:text-right" style={{ color: 'var(--text-muted, #73766f)' }}>
            Smart India Hackathon 2026 • Ministry of Environment &amp; Climate Standards
          </div>
        </div>
      </div>
    </footer>
  );
}
