import React from 'react';
import { Trees, Droplets, Wind } from 'lucide-react';
import RadarChart from './RadarChart';

export default function ScorecardTab({ results, isVisible }) {
  const isHighRisk = results.riskScore > 75;
  const isMediumRisk = results.riskScore > 40;

  return (
    <div className="space-y-4">
      {/* Verdict Card */}
      <div
        className="p-4 rounded-xl border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          backgroundColor: 'var(--bg-card, #fbfaf6)',
          borderColor: 'var(--border-subtle, #d8d4ca)',
        }}
      >
        <div>
          <div
            className="text-[10px] font-mono uppercase tracking-wider mb-1"
            style={{ color: 'var(--text-muted, #73766f)' }}
          >
            Statutory Clearance Verdict
          </div>
          <div
            className="text-lg font-serif font-bold"
            style={{
              color: isHighRisk
                ? 'var(--color-red, #a54d42)'
                : isMediumRisk
                ? 'var(--color-secondary, #b77927)'
                : 'var(--color-primary, #315c48)',
            }}
          >
            {results.verdict}
          </div>
          <p className="text-xs mt-0.5 max-w-md" style={{ color: 'var(--text-muted, #73766f)' }}>
            {results.verdictDesc}
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted, #73766f)' }}>
            Sensitivity Index
          </div>
          <div
            className="text-2xl font-mono font-bold"
            style={{
              color: isHighRisk
                ? 'var(--color-red, #a54d42)'
                : 'var(--color-primary, #315c48)',
            }}
          >
            {results.riskScore} / 100
          </div>
          <span
            className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono border uppercase font-bold"
            style={{
              backgroundColor: isHighRisk
                ? 'var(--color-red-light, #faebe9)'
                : isMediumRisk
                ? 'var(--color-secondary-light, #fdf4e8)'
                : 'var(--color-primary-light, #e2ebe5)',
              color: isHighRisk
                ? 'var(--color-red, #a54d42)'
                : isMediumRisk
                ? 'var(--color-secondary, #b77927)'
                : 'var(--color-primary, #315c48)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
            }}
          >
            {isHighRisk ? 'Critical Review' : isMediumRisk ? 'Conditional Clearance' : 'Approved'}
          </span>
        </div>
      </div>

      {/* 2-COL DETAILS & RADAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          {/* Sanctuary */}
          <div
            className="p-3 rounded-lg border flex items-center justify-between shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card, #fbfaf6)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
            }}
          >
            <div className="flex items-center gap-2">
              <Trees className="w-4 h-4" style={{ color: 'var(--color-primary, #315c48)' }} />
              <div>
                <div className="text-xs font-semibold" style={{ color: 'var(--text-main, #20231f)' }}>
                  Wildlife Sanctuary Buffer
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted, #73766f)' }}>
                  {results.sanctuary}
                </div>
              </div>
            </div>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--color-secondary-light, #fdf4e8)',
                color: 'var(--color-secondary, #b77927)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
              }}
            >
              ESZ Check
            </span>
          </div>

          {/* Hydrological */}
          <div
            className="p-3 rounded-lg border flex items-center justify-between shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card, #fbfaf6)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
            }}
          >
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4" style={{ color: 'var(--color-primary, #315c48)' }} />
              <div>
                <div className="text-xs font-semibold" style={{ color: 'var(--text-main, #20231f)' }}>
                  Hydrology &amp; Drainage
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted, #73766f)' }}>
                  {results.hydro}
                </div>
              </div>
            </div>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--color-primary-light, #e2ebe5)',
                color: 'var(--color-primary, #315c48)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
              }}
            >
              ZLD Valid
            </span>
          </div>

          {/* Air Quality */}
          <div
            className="p-3 rounded-lg border flex items-center justify-between shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card, #fbfaf6)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
            }}
          >
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4" style={{ color: 'var(--color-secondary, #b77927)' }} />
              <div>
                <div className="text-xs font-semibold" style={{ color: 'var(--text-main, #20231f)' }}>
                  Airshed &amp; CAAQMS AQI
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted, #73766f)' }}>
                  {results.aqi}
                </div>
              </div>
            </div>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--bg-card-subtle, #edeae1)',
                color: 'var(--text-muted, #73766f)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
              }}
            >
              NAAQS
            </span>
          </div>
        </div>

        {/* Radar Visualizer */}
        <div
          className="p-3 rounded-lg border flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--bg-card, #fbfaf6)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted, #73766f)' }}>
              Vulnerability Radar (5 Dims)
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'var(--color-primary, #315c48)' }}>
              PostGIS Ingestion
            </span>
          </div>
          <div className="h-44 flex items-center justify-center">
            {isVisible && <RadarChart />}
          </div>
        </div>
      </div>
    </div>
  );
}
