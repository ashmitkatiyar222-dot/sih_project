import React from 'react';
import { Shield } from 'lucide-react';

export default function EmpTab() {
  return (
    <div
      className="p-4 sm:p-5 rounded text-xs sm:text-sm space-y-3 leading-relaxed shadow-xs border"
      style={{
        backgroundColor: 'var(--bg-card, #faf9f5)',
        borderColor: 'var(--border-subtle, #d5cfc2)',
        color: 'var(--text-muted, #5e625a)',
      }}
    >
      <div
        className="font-mono text-sm sm:text-base font-bold flex items-center gap-2 mb-1.5"
        style={{ color: 'var(--color-primary, #284e3a)' }}
      >
        <Shield className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
        <span>Required Environmental Safety Steps (EMP)</span>
      </div>
      <div className="space-y-2.5 text-xs sm:text-sm">
        <p className="p-3 rounded border leading-relaxed" style={{ backgroundColor: 'var(--bg-card-subtle, #eae6dc)', borderColor: 'var(--border-subtle, #d5cfc2)' }}>
          <strong style={{ color: 'var(--text-main, #1a1d1a)' }}>1. Clean Air Action:</strong> Install high-efficiency industrial dust and smoke filters (99.5% capture) on all site exhausts to protect the air quality of nearby communities.
        </p>
        <p className="p-3 rounded border leading-relaxed" style={{ backgroundColor: 'var(--bg-card-subtle, #eae6dc)', borderColor: 'var(--border-subtle, #d5cfc2)' }}>
          <strong style={{ color: 'var(--text-main, #1a1d1a)' }}>2. River &amp; Water Safety:</strong> Build an on-site water recycling plant so that 100% of water is cleaned and reused, with zero dirty wastewater ever entering nearby streams.
        </p>
        <p className="p-3 rounded border leading-relaxed" style={{ backgroundColor: 'var(--bg-card-subtle, #eae6dc)', borderColor: 'var(--border-subtle, #d5cfc2)' }}>
          <strong style={{ color: 'var(--text-main, #1a1d1a)' }}>3. Green Shield Plantation:</strong> Plant 2,500 native trees (Neem, Peepal, Banyan) across 33% of the project border to form a protective natural green shield.
        </p>
      </div>
    </div>
  );
}
