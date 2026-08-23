import React from 'react';
import { Trees } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              <Trees className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-base text-stone-900 tracking-tight">Ecoryx</span>
              <span className="text-stone-500 text-xs ml-2">
                AI-Powered Environmental Clearance Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>All GIS &amp; AI Systems Operational</span>
          </div>

          <div className="text-xs text-stone-500 font-sans text-center md:text-right">
            Smart India Hackathon 2026 • Ministry of Environment &amp; Climate Standards
          </div>
        </div>
      </div>
    </footer>
  );
}





