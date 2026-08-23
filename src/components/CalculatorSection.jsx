import React, { useState } from 'react';
import { Calculator, Clock, DollarSign, ArrowUpRight, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

const AGENCY_SAVINGS = [
  { agency: 'NHAI / National Expressways', typicalPipeline: '45 Corridors / yr', delaySaved: '180 Months', feeSaved: '₹15.75 Cr', metric: '6 Months Accelerated Commissioning' },
  { agency: 'SECI / Solar Power Parks', typicalPipeline: '30 Ultra-Mega Parks', delaySaved: '120 Months', feeSaved: '₹10.50 Cr', metric: 'Zero GIB Avian Corridor Delay' },
  { agency: 'State Water & Irrigation Depts', typicalPipeline: '25 Hydro Projects', delaySaved: '100 Months', feeSaved: '₹8.75 Cr', metric: 'Automated Submergence Survey' },
  { agency: 'State Industrial Dev Corps (SIDC)', typicalPipeline: '40 Manufacturing Hubs', delaySaved: '160 Months', feeSaved: '₹14.00 Cr', metric: 'Instant ZLD Effluent Certification' },
];

export default function CalculatorSection() {
  const [projects, setProjects] = useState(120);
  const [months, setMonths] = useState(4.5);

  const monthsSaved = Math.round(projects * months);
  const capitalPreservedCrores = ((projects * 25000 * 0.98) / 100000).toFixed(2);
  const consultantFeesSavedCrores = ((projects * 3500000) / 10000000).toFixed(2);

  return (
    <section
      id="calculator"
      className="py-8 sm:py-12 border-t relative overflow-hidden bg-[#EBF3EC]"
      style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
    >
      {/* Bottom Edge Vector Silhouette: Rolling Hills & Wind Turbines */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 lg:h-[420px] pointer-events-none overflow-hidden opacity-[0.85] z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
        >
          {/* Distant Rolling Hills Layer 1 */}
          <path
            d="M0,150 Q220,80 460,120 T940,95 T1440,125 L1440,320 L0,320 Z"
            fill="#A8C2AF"
            opacity="0.65"
          />

          {/* Topographic Contour Lines on Far Slope */}
          <path d="M 80, 140 Q 260, 105 440, 135 T 920, 115 T 1380, 140" stroke="#8CA993" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.45" />
          <path d="M 0, 175 Q 220, 135 460, 160 T 940, 140 T 1440, 165" stroke="#8CA993" strokeWidth="1.2" opacity="0.35" />

          {/* Foreground Rolling Hills Layer 2 */}
          <path
            d="M0,195 Q200,140 420,170 T860,145 T1260,180 T1440,160 L1440,320 L0,320 Z"
            fill="#8CA993"
            opacity="0.85"
          />

          {/* Topographic Contour Lines on Near Slope */}
          <path d="M 50, 215 Q 240, 175 440, 200 T 880, 175 T 1320, 205" stroke="#A8C2AF" strokeWidth="1.4" opacity="0.5" />
          <path d="M 0, 250 Q 200, 210 420, 235 T 860, 210 T 1280, 240 T 1440, 220" stroke="#A8C2AF" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.4" />

          {/* Clean Wind Turbine Silhouettes on Hill Crests */}
          <g fill="#5F8369" opacity="0.95">
            {/* Wind Turbine 1 (x=210, y=95) */}
            <polygon points="208.5,185 211.5,185 210.8,95 209.2,95" />
            <circle cx="210" cy="95" r="3" />
            <line x1="210" y1="95" x2="210" y2="52" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="210" y1="95" x2="246" y2="116" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="210" y1="95" x2="174" y2="116" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />

            {/* Wind Turbine 2 (x=460, y=120) */}
            <polygon points="458.5,200 461.5,200 460.8,120 459.2,120" />
            <circle cx="460" cy="120" r="3" />
            <line x1="460" y1="120" x2="442" y2="80" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="460" y1="120" x2="495" y2="102" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="460" y1="120" x2="445" y2="160" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />

            {/* Wind Turbine 3 (x=730, y=102) */}
            <polygon points="728.5,180 731.5,180 730.8,102 729.2,102" />
            <circle cx="730" cy="102" r="3" />
            <line x1="730" y1="102" x2="730" y2="59" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="730" y1="102" x2="766" y2="123" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="730" y1="102" x2="694" y2="123" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />

            {/* Wind Turbine 4 (x=1020, y=112) */}
            <polygon points="1018.5,195 1021.5,195 1020.8,112 1019.2,112" />
            <circle cx="1020" cy="112" r="3" />
            <line x1="1020" y1="112" x2="1002" y2="72" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="1020" y1="112" x2="1055" y2="94" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="1020" y1="112" x2="1005" y2="152" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />

            {/* Wind Turbine 5 (x=1310, y=125) */}
            <polygon points="1308.5,210 1311.5,210 1310.8,125 1309.2,125" />
            <circle cx="1310" cy="125" r="3" />
            <line x1="1310" y1="125" x2="1310" y2="82" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="1310" y1="125" x2="1346" y2="146" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="1310" y1="125" x2="1274" y2="146" stroke="#5F8369" strokeWidth="2.2" strokeLinecap="round" />
          </g>

          {/* Baseline Ground Strip */}
          <rect x="0" y="305" width="1440" height="15" fill="#8CA993" />
        </svg>
      </div>

      {/* Soft Ambient Subtle Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
        <Card className="p-4 sm:p-6 space-y-4 scroll-reveal shadow-sm bg-white/80 backdrop-blur-xs">
          {/* Header */}
          <div className="max-w-3xl mb-2 text-left scroll-reveal-header">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-emerald-100/90 text-emerald-950 border border-emerald-300 flex items-center gap-1.5 backdrop-blur-xs">
                <Landmark className="w-3.5 h-3.5 text-emerald-800" />
                NATIONAL SAVINGS &amp; ROI
              </span>
              <span className="text-xs font-mono text-stone-600">Calculated review acceleration &amp; budget preservation</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5 font-sans"
              style={{ color: 'var(--text-main, #1a1d1a)' }}
            >
              Estimated National Time &amp; Budget Savings
            </h3>
            <p className="text-sm sm:text-base leading-relaxed font-sans text-stone-600">
              Projected savings generated by replacing slow manual paperwork with instant automated compliance checks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Input Sliders (6 Cols) */}
            <div className="lg:col-span-6 space-y-3.5">
              <div
                className="p-3.5 sm:p-4 rounded-xl border transition-all"
                style={{
                  backgroundColor: 'rgba(238, 245, 240, 0.85)',
                  borderColor: 'rgba(40, 78, 58, 0.22)',
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase font-bold tracking-wider text-emerald-950">
                    Annual Number of Projects
                  </span>
                  <span className="font-mono font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900 shadow-2xs">
                    {projects} Projects / Year
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={projects}
                  onChange={(e) => setProjects(parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    accentColor: 'var(--color-primary, #284e3a)',
                    backgroundColor: '#c4dfd0',
                  }}
                />
              </div>

              <div
                className="p-3.5 sm:p-4 rounded-xl border transition-all"
                style={{
                  backgroundColor: 'rgba(253, 247, 237, 0.85)',
                  borderColor: 'rgba(156, 101, 25, 0.25)',
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase font-bold tracking-wider text-amber-950">
                    Average Manual Review Delay (Months)
                  </span>
                  <span className="font-mono font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 shadow-2xs">
                    {months.toFixed(1)} Months / Project
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={months}
                  onChange={(e) => setMonths(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    accentColor: 'var(--color-secondary, #9c6519)',
                    backgroundColor: '#ebd8bc',
                  }}
                />
              </div>
            </div>

            {/* Computed Ledger Results (6 Cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
              <div
                className="p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xs"
                style={{
                  backgroundColor: 'rgba(238, 245, 240, 0.85)',
                  borderColor: 'rgba(40, 78, 58, 0.22)',
                }}
              >
                <div>
                  <div className="text-xs font-mono uppercase font-bold tracking-wider text-emerald-900">
                    Total Review Time Saved
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold mt-1 text-emerald-950">
                    {monthsSaved} Months
                  </div>
                </div>
                <p className="text-xs sm:text-sm mt-1.5 leading-relaxed text-stone-600">
                  Equivalent to {(monthsSaved / 12).toFixed(1)} years of manual review
                </p>
              </div>

              <div
                className="p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xs"
                style={{
                  backgroundColor: 'rgba(253, 247, 237, 0.85)',
                  borderColor: 'rgba(156, 101, 25, 0.25)',
                }}
              >
                <div>
                  <div className="text-xs font-mono uppercase font-bold tracking-wider text-amber-900">
                    Consultant Fees Saved
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold mt-1 text-amber-950">
                    ₹{consultantFeesSavedCrores} Cr
                  </div>
                </div>
                <p className="text-xs sm:text-sm mt-1.5 leading-relaxed text-stone-600">
                  Preserved in project budgets
                </p>
              </div>
            </div>
          </div>

          {/* Agency & Department Level Impact Breakdown Table */}
          <div
            className="p-4 sm:p-5 rounded-xl border mt-2"
            style={{
              backgroundColor: 'var(--bg-card, #faf9f5)',
              borderColor: 'var(--border-subtle, #d5cfc2)',
            }}
          >
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
              <span className="text-base sm:text-lg font-sans font-bold text-stone-900">
                Government Agency &amp; Infrastructure Projects
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-100/90 text-emerald-950 border border-emerald-300">
                Annual Benchmark
              </span>
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm font-sans table-auto">
                <thead className="font-mono text-xs uppercase border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)', color: 'var(--text-muted, #5e625a)' }}>
                  <tr>
                    <th className="pb-2.5 font-bold tracking-wider">Organization / Agency</th>
                    <th className="pb-2.5 font-bold tracking-wider">Annual Projects</th>
                    <th className="pb-2.5 font-bold tracking-wider">Time Saved</th>
                    <th className="pb-2.5 font-bold tracking-wider">Fees Saved</th>
                    <th className="pb-2.5 font-bold tracking-wider">Key Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm" style={{ borderColor: 'var(--border-subtle, #d5cfc2)', color: 'var(--text-main, #1a1d1a)' }}>
                  {AGENCY_SAVINGS.map((ag, idx) => (
                    <tr key={idx} className="hover:bg-[#e3ebe5]/40 transition-colors">
                      <td className="py-2.5 font-semibold text-stone-900">{ag.agency}</td>
                      <td className="py-2.5 font-mono text-stone-700">{ag.typicalPipeline}</td>
                      <td className="py-2.5 font-mono font-bold text-emerald-800">{ag.delaySaved}</td>
                      <td className="py-2.5 font-mono font-bold text-amber-800">{ag.feeSaved}</td>
                      <td className="py-2.5 text-stone-700">{ag.metric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
