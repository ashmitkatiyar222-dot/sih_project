import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  ShieldAlert,
  FileSpreadsheet,
  FileWarning,
  Scale,
  Sparkles,
} from 'lucide-react';
import { Card, CardTitle } from './ui/card';
import ManualAudit3DCanvas from './ManualAudit3DCanvas';

const AUDIT_DISCREPANCIES = [
  {
    id: 0,
    parameter: 'Sanctuary & Forest Buffer Measurement',
    manualProcess: 'Hand-drawn radial circles on physical topographic survey sheets',
    delay: '6 to 10 weeks',
    risk: 'High risk of boundary overlap penalty (WPA 1972 violation)',
    impact: '₹15L–₹30L Survey Remapping Fine',
  },
  {
    id: 1,
    parameter: 'Statutory Gazette Cross-Referencing',
    manualProcess: 'Lawyers manually thumbing through 2,400+ un-indexed state gazette PDFs',
    delay: '4 to 8 weeks',
    risk: 'Overlooked local wildlife corridor notifications & NGT court stays',
    impact: 'Direct High Court Stay & Work Stoppage',
  },
  {
    id: 2,
    parameter: 'Air & Water Dispersion Modeling',
    manualProcess: 'Hiring external consultants for third-party plume test reports',
    delay: '8 to 14 weeks',
    risk: '₹35-50 Lakhs in repetitive consultant fees per project',
    impact: 'Overpriced Consultant Monopolies',
  },
  {
    id: 3,
    parameter: 'Committee Clearance Drafting',
    manualProcess: 'Stenographers manually typing and mailing physical paperwork',
    delay: '4 to 6 months',
    risk: 'Severe capital blockage and infrastructure commissioning delays',
    impact: '₹1.2Cr+ Monthly Capital Idle Cost',
  },
];

const HISTORIC_CASE_STUDIES = [
  {
    id: 4,
    title: 'Aravalli Quartzite Quarry Corridor',
    location: 'Rajasthan · 4.2 km from Sariska ESZ',
    manualOutcome: '7 Month Approval Delay · ₹42L Consultant Fees · Stayed by NGT due to buffer discrepancy',
  },
  {
    id: 5,
    title: 'Western Ghats Hydroelectric Penstock',
    location: 'Kerala/Karnataka · 2.1 km from Wayanad Tiger Reserve',
    manualOutcome: '11 Month Submergence Review · Incomplete elephant corridor mapping',
  },
  {
    id: 6,
    title: 'NCR Yamuna Chemical Park Expansion',
    location: 'Uttar Pradesh · 1.4 km from River Basin',
    manualOutcome: '5 Month Stoppage · GRAP Airshed Non-Attainment violation penalty',
  },
];

export default function ManualLedgerSection() {
  const [activeFocus, setActiveFocus] = useState(0);

  const handleScrollToWorkflow = () => {
    const el = document.getElementById('workflow');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="manual-ledger"
      className="py-10 sm:py-16 border-t relative overflow-hidden bg-gradient-to-b from-[#e8f1eb] via-[#edf6f0] to-[#e4efe7]"
      style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}
    >
      {/* 3D Three.js Spatial Background with Mountains, Pine Trees, Floating Documents & Drifting Smoke */}
      <ManualAudit3DCanvas activeIndex={activeFocus % 4} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* Main Liquid Glass Section Container */}
        <div
          className="rounded-2xl p-6 sm:p-8 relative border shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6 bg-white/75 backdrop-blur-md transition-all duration-300 border-white/70 overflow-hidden"
          style={{
            boxShadow: '0 20px 50px -10px rgba(28, 59, 43, 0.10), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
          }}
        >
          {/* Liquid Glass Specular Highlight Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20 pointer-events-none" />

          {/* Header Strip */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-300/70 gap-4 relative z-10"
          >
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase mb-1.5 border border-red-300 backdrop-blur-xs"
                style={{
                  backgroundColor: 'rgba(250, 235, 233, 0.9)',
                  color: 'var(--color-red, #a54d42)',
                }}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>TRADITIONAL MANUAL WORKFLOW LEDGER</span>
              </div>
              <h3
                className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold tracking-tight text-left text-stone-900"
              >
                Manual Paper Screening Friction &amp; Audit Discrepancies
              </h3>
            </div>

            <button
              onClick={handleScrollToWorkflow}
              className="px-4 py-2.5 rounded-xl text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 shadow-md shrink-0 self-start sm:self-center bg-[#1b3e2b] hover:scale-102"
            >
              <span>Explore Automated Questline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Structured Ledger Table in Liquid Glass Frame with Theme-Matched / Transparent Scrollbar */}
          <div
            className="overflow-x-auto custom-scrollbar rounded-xl border border-white/80 shadow-xs bg-white/80 backdrop-blur-sm relative z-10"
          >
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead
                className="border-b font-mono text-[11px] sm:text-xs uppercase bg-[#eae6dc]/80 border-stone-300/80 text-stone-900"
              >
                <tr>
                  <th className="p-3.5">Clearance Stage</th>
                  <th className="p-3.5">Traditional Manual Method</th>
                  <th className="p-3.5">Typical Delay</th>
                  <th className="p-3.5">Financial / Legal Exposure</th>
                </tr>
              </thead>
              <tbody
                className="divide-y divide-stone-200/70 text-stone-800"
              >
                {AUDIT_DISCREPANCIES.map((row) => {
                  const isFocused = activeFocus === row.id;

                  return (
                    <tr
                      key={row.id}
                      onMouseEnter={() => setActiveFocus(row.id)}
                      onClick={() => setActiveFocus(row.id)}
                      className={`cursor-pointer transition-all duration-300 ${
                        isFocused
                          ? 'bg-red-50/90 shadow-xs border-l-4 border-l-[#a54d42] translate-x-1 sm:translate-x-1.5'
                          : 'hover:bg-white/90'
                      }`}
                    >
                      <td className="p-3.5 font-bold text-stone-900 flex items-center gap-2">
                        {isFocused && (
                          <span className="w-2 h-2 rounded-full bg-[#a54d42] animate-ping" />
                        )}
                        <span className={isFocused ? 'text-[#a54d42]' : 'text-stone-900'}>
                          {row.parameter}
                        </span>
                      </td>
                      <td className="p-3.5">{row.manualProcess}</td>
                      <td className="p-3.5 font-mono font-bold text-amber-800">
                        {row.delay}
                      </td>
                      <td className="p-3.5 text-xs font-semibold text-[#a54d42]">
                        {row.risk}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Dynamic Interactive Sliding Detail Bar (Liquid Glass Alert) */}
          <div
            className="p-4 rounded-xl border border-red-200 bg-red-50/85 backdrop-blur-md text-xs text-red-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs transition-all duration-300 relative z-10"
          >
            <div className="flex items-center gap-2.5 font-medium">
              <span className="px-2.5 py-0.5 rounded bg-red-700 text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                Focused Friction Point
              </span>
              <span className="font-semibold text-stone-900">
                {AUDIT_DISCREPANCIES[activeFocus % AUDIT_DISCREPANCIES.length]?.parameter}
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-red-900">
              Direct Impact: {AUDIT_DISCREPANCIES[activeFocus % AUDIT_DISCREPANCIES.length]?.impact}
            </div>
          </div>

          {/* Historic Case Studies in Liquid Glass Panels */}
          <div className="space-y-3 text-left relative z-10">
            <div className="text-xs font-mono uppercase font-bold tracking-wider text-stone-700">
              Real-World Project Examples &amp; Time Lost:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {HISTORIC_CASE_STUDIES.map((cs) => {
                const isSelected = activeFocus === cs.id;

                return (
                  <div
                    key={cs.id}
                    onMouseEnter={() => setActiveFocus(cs.id)}
                    onClick={() => setActiveFocus(cs.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 text-left backdrop-blur-md ${
                      isSelected
                        ? 'bg-white/95 shadow-md border-red-300/80 ring-2 ring-red-400/30 -translate-y-1'
                        : 'bg-white/60 hover:bg-white/85 hover:shadow-xs border-white/80'
                    }`}
                  >
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm sm:text-[15px] font-sans font-bold tracking-tight text-stone-900">
                          {cs.title}
                        </div>
                        <div className="text-[11px] sm:text-xs font-mono text-stone-600 mt-0.5">
                          {cs.location}
                        </div>
                      </div>

                      <div
                        className="p-2.5 rounded-lg border border-red-200/80 bg-red-50/80 text-xs leading-relaxed space-y-1"
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold text-white tracking-wider bg-red-700"
                          >
                            Manual Delay
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed font-sans font-medium text-red-950">
                          {cs.manualOutcome}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Key Metric Summary Strip (Liquid Glass Frame) */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-300/80 rounded-xl border border-white/80 p-3.5 bg-white/50 backdrop-blur-md relative z-10"
          >
            <div className="p-2.5 sm:px-4 text-left">
              <div className="text-xs font-mono uppercase text-stone-600">
                Average Clearance Time Lost
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-red-700 mt-1">
                4 to 6 Months
              </div>
              <p className="text-xs mt-1 leading-relaxed text-stone-600">
                Per major civil or highway infrastructure corridor
              </p>
            </div>

            <div className="p-2.5 sm:px-4 text-left">
              <div className="text-xs font-mono uppercase text-stone-600">
                Consultant Expense Leak
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-amber-800 mt-1">
                ₹45 Lakhs+
              </div>
              <p className="text-xs mt-1 leading-relaxed text-stone-600">
                Wasted on routine distance and zoning certifications
              </p>
            </div>

            <div className="p-2.5 sm:px-4 text-left">
              <div className="text-xs font-mono uppercase text-stone-600">
                Survey Measurement Error
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-red-700 mt-1">
                55% Discrepancy
              </div>
              <p className="text-xs mt-1 leading-relaxed text-stone-600">
                Between physical sketches and actual satellite ESZ borders
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
