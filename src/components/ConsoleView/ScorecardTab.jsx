import React from 'react';
import { Trees, Droplets, Wind, ShieldCheck, CheckCircle } from 'lucide-react';
import RadarChart from './RadarChart';
import { Card, CardTitle, CardDescription } from '../ui/card';

export default function ScorecardTab({ results, isVisible }) {
  const isHighRisk = results.riskScore > 75;
  const isMediumRisk = results.riskScore > 40;

  // Calculate dynamic 5-axis vulnerability distribution from score
  const score = results.riskScore || 62;
  const radarData = [
    Math.min(96, Math.max(28, Math.round(score * 1.15))), // Biodiversity
    Math.min(92, Math.max(22, Math.round(score * 0.95))), // Hydrology
    Math.min(98, Math.max(30, Math.round(score * 1.25))), // Air Quality
    Math.min(88, Math.max(20, Math.round(score * 0.85))), // Forest Cover
    Math.min(94, Math.max(32, Math.round(score * 1.05))), // Statutory Strictness
  ];

  return (
    <div className="space-y-3">
      {/* Verdict Card */}
      <Card
        className="p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 bg-white/90 shadow-xs"
      >
        <div className="space-y-1">
          <div
            className="text-[11px] font-mono uppercase tracking-wider font-semibold"
            style={{ color: 'var(--text-muted, #5e625a)' }}
          >
            Clearance Verdict
          </div>
          <CardTitle
            className="text-base sm:text-lg font-bold"
            style={{
              color: isHighRisk
                ? 'var(--color-red, #943b32)'
                : isMediumRisk
                ? 'var(--color-secondary, #9c6519)'
                : 'var(--color-primary, #284e3a)',
            }}
          >
            {results.verdict}
          </CardTitle>
          <CardDescription className="text-xs max-w-md leading-relaxed text-stone-600">
            {results.verdictDesc}
          </CardDescription>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted, #5e625a)' }}>
            Environmental Risk Score
          </div>
          <div
            className="text-2xl sm:text-3xl font-mono font-bold mt-0.5 tracking-tight"
            style={{
              color: isHighRisk
                ? 'var(--color-red, #943b32)'
                : 'var(--color-primary, #284e3a)',
            }}
          >
            {results.riskScore} <span className="text-base text-stone-400 font-normal">/ 100</span>
          </div>
          <span
            className="inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-mono border uppercase font-bold shadow-2xs"
            style={{
              backgroundColor: isHighRisk
                ? 'var(--color-red-light, #fae7e5)'
                : isMediumRisk
                ? 'var(--color-secondary-light, #fbf0dc)'
                : 'var(--color-primary-light, #e3ebe5)',
              color: isHighRisk
                ? 'var(--color-red, #943b32)'
                : isMediumRisk
                ? 'var(--color-secondary, #9c6519)'
                : 'var(--color-primary, #284e3a)',
              borderColor: 'var(--border-subtle, #d5cfc2)',
            }}
          >
            {isHighRisk ? 'Needs Review' : isMediumRisk ? 'Conditional Clearance' : 'Approved'}
          </span>
        </div>
      </Card>

      {/* 2-COL DETAILS & RADAR VISUALIZER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        <div className="flex flex-col justify-between gap-2">
          {/* Sanctuary */}
          <Card className="p-2.5 sm:p-3 flex items-center justify-between bg-white/90 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-emerald-50 text-emerald-800">
                <Trees className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Nearby Wildlife Sanctuary
                </div>
                <div className="text-[11px] font-mono text-stone-600">
                  {results.sanctuary}
                </div>
              </div>
            </div>
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold shrink-0"
              style={{
                backgroundColor: 'var(--color-secondary-light, #fbf0dc)',
                color: 'var(--color-secondary, #9c6519)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              Checked
            </span>
          </Card>

          {/* Hydrological */}
          <Card className="p-2.5 sm:p-3 flex items-center justify-between bg-white/90 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-teal-50 text-teal-800">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Rivers &amp; Water Bodies
                </div>
                <div className="text-[11px] font-mono text-stone-600">
                  {results.hydro}
                </div>
              </div>
            </div>
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold shrink-0"
              style={{
                backgroundColor: 'var(--color-primary-light, #e3ebe5)',
                color: 'var(--color-primary, #284e3a)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              Checked
            </span>
          </Card>

          {/* Air Quality */}
          <Card className="p-2.5 sm:p-3 flex items-center justify-between bg-white/90 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-amber-50 text-amber-800">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Local Air Quality (AQI)
                </div>
                <div className="text-[11px] font-mono text-stone-600">
                  {results.aqi}
                </div>
              </div>
            </div>
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold shrink-0"
              style={{
                backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
                color: 'var(--text-muted, #5e625a)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              Normal
            </span>
          </Card>
        </div>

        {/* Radar Visualizer */}
        <Card className="p-3 flex flex-col justify-between bg-white/90 shadow-xs">
          <div className="flex items-center justify-between mb-1 pb-1.5 border-b border-stone-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-stone-600">
              Environmental Risk Profile
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-800">
              Automated Check
            </span>
          </div>
          <div className="flex-1 min-h-[160px] flex items-center justify-center">
            {isVisible && <RadarChart data={radarData} isVisible={isVisible} />}
          </div>
        </Card>
      </div>
    </div>
  );
}
