import React from 'react';
import { Trees, Droplets, Wind } from 'lucide-react';
import RadarChart from './RadarChart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

export default function ScorecardTab({ results, isVisible }) {
  const isHighRisk = results.riskScore > 75;
  const isMediumRisk = results.riskScore > 40;

  return (
    <div className="space-y-3">
      {/* Verdict Card */}
      <Card
        className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5"
      >
        <div>
          <div
            className="text-xs font-mono uppercase tracking-wider mb-1"
            style={{ color: 'var(--text-muted, #5e625a)' }}
          >
            Clearance Verdict
          </div>
          <CardTitle
            className="text-lg sm:text-xl"
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
          <CardDescription className="mt-1 max-w-md">
            {results.verdictDesc}
          </CardDescription>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-xs font-mono uppercase" style={{ color: 'var(--text-muted, #5e625a)' }}>
            Environmental Risk Score
          </div>
          <div
            className="text-2xl sm:text-3xl font-mono font-bold mt-0.5"
            style={{
              color: isHighRisk
                ? 'var(--color-red, #943b32)'
                : 'var(--color-primary, #284e3a)',
            }}
          >
            {results.riskScore} / 100
          </div>
          <span
            className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-mono border uppercase font-bold"
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

      {/* 2-COL DETAILS & RADAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          {/* Sanctuary */}
          <Card className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Trees className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Nearby Wildlife Sanctuary
                </div>
                <div className="text-xs font-mono" style={{ color: 'var(--text-muted, #5e625a)' }}>
                  {results.sanctuary}
                </div>
              </div>
            </div>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded border uppercase font-semibold"
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
          <Card className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Droplets className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Rivers &amp; Water Bodies
                </div>
                <div className="text-xs font-mono" style={{ color: 'var(--text-muted, #5e625a)' }}>
                  {results.hydro}
                </div>
              </div>
            </div>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded border uppercase font-semibold"
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
          <Card className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Wind className="w-4 h-4" style={{ color: 'var(--color-secondary, #9c6519)' }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Local Air Quality (AQI)
                </div>
                <div className="text-xs font-mono" style={{ color: 'var(--text-muted, #5e625a)' }}>
                  {results.aqi}
                </div>
              </div>
            </div>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded border uppercase font-semibold"
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
        <Card className="p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted, #5e625a)' }}>
              Environmental Risk Profile
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--color-primary, #284e3a)' }}>
              Automated Check
            </span>
          </div>
          <div className="h-44 flex items-center justify-center">
            {isVisible && <RadarChart />}
          </div>
        </Card>
      </div>
    </div>
  );
}
