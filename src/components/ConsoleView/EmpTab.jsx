import React from 'react';
import { Shield } from 'lucide-react';

export default function EmpTab() {
  return (
    <div
      className="p-4 sm:p-5 rounded-2xl text-xs space-y-3 leading-relaxed shadow-xs border"
      style={{
        backgroundColor: 'var(--bg-card, #fbfaf6)',
        borderColor: 'var(--border-subtle, #d8d4ca)',
        color: 'var(--text-muted, #73766f)',
      }}
    >
      <div
        className="font-sans font-bold flex items-center gap-1.5 mb-2"
        style={{ color: 'var(--color-primary, #315c48)' }}
      >
        <Shield className="w-4 h-4" style={{ color: 'var(--color-primary, #315c48)' }} />
        Official Action Plan & Safety Guidelines
      </div>
      <p>
        <strong style={{ color: 'var(--text-main, #20231f)' }}>1. Clean Air Action:</strong> Install high-efficiency industrial dust and smoke filters (99.5% capture) on all site exhausts to protect the air quality of nearby communities.
      </p>
      <p>
        <strong style={{ color: 'var(--text-main, #20231f)' }}>2. River & Water Safety:</strong> Build an on-site water recycling plant so that 100% of water is cleaned and reused, with zero dirty wastewater ever entering nearby streams.
      </p>
      <p>
        <strong style={{ color: 'var(--text-main, #20231f)' }}>3. Planting Native Trees:</strong> Plant 2,500 native trees (Neem, Peepal, Banyan) across 33% of the project border to form a protective natural green shield.
      </p>
    </div>
  );
}
