import React from 'react';
import { Shield } from 'lucide-react';

export default function EmpTab() {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-700 space-y-3 leading-relaxed shadow-xs">
      <div className="font-sans font-bold text-emerald-700 flex items-center gap-1.5 mb-2">
        <Shield className="w-4 h-4 text-emerald-600" />
        Official Action Plan & Safety Guidelines
      </div>
      <p>
        <strong className="text-stone-900">1. Clean Air Action:</strong> Install high-efficiency industrial dust and smoke filters (99.5% capture) on all site exhausts to protect the air quality of nearby communities.
      </p>
      <p>
        <strong className="text-stone-900">2. River & Water Safety:</strong> Build an on-site water recycling plant so that 100% of water is cleaned and reused, with zero dirty wastewater ever entering nearby streams.
      </p>
      <p>
        <strong className="text-stone-900">3. Planting Native Trees:</strong> Plant 2,500 native trees (Neem, Peepal, Banyan) across 33% of the project border to form a protective natural green shield.
      </p>
    </div>
  );
}





