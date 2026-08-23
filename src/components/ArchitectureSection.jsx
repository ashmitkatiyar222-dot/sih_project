import React from 'react';
import { Cpu, Zap, Database, CloudRain, Scale, FileText, ArrowDown, Network, ShieldCheck, Server, Radio, Code2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

const ARCH_BENCHMARKS = [
  { metric: 'System Capacity', value: '1,200 checks/sec', desc: 'Handles over a thousand concurrent clearance audits without delay' },
  { metric: 'Map Search Time', value: '180 ms', desc: 'Instantly searches across all 679 national protected areas' },
  { metric: 'Environmental Laws', value: '2,400+ Laws', desc: 'Indexed national acts and official rules for instant compliance checks' },
  { metric: 'Digital Verification', value: 'Digital Seal', desc: 'Tamper-proof digital seal embedded in every generated PDF report' },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-8 sm:py-12 border-t relative overflow-hidden bg-gradient-to-b from-[#e4f5f1]/70 via-[#f0faf7] to-[#f4f1ea]" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
      {/* Ambient Teal/Cyan Glow */}
      <div className="absolute top-10 right-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-6 scroll-reveal-header">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5"
            style={{ color: 'var(--text-main, #1a1d1a)' }}
          >
            How the System Works Behind the Scenes
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted, #5e625a)' }}>
            High-speed engine checking 4 parallel environmental and geographic data sources in real-time.
          </p>
        </div>

        {/* Technical Pipeline Flow Container */}
        <Card className="p-4 sm:p-6 space-y-4 scroll-reveal shadow-sm">
          {/* Top Layer: User Input */}
          <div
            className="p-3.5 sm:p-4 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/70 border-emerald-200"
          >
            <div>
              <span className="font-mono text-xs uppercase font-bold text-emerald-800">
                Step 1: Project Details Entered
              </span>
              <h4 className="font-sans font-bold text-sm sm:text-base mt-0.5 text-emerald-950">
                Site GPS Coordinates, Land Area (Ha), Search Distance (km), Industry Sector
              </h4>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded border self-start sm:self-center font-bold bg-emerald-100 text-emerald-900 border-emerald-300">
              Instant Input
            </span>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-4 h-4 text-teal-700" />
          </div>

          {/* Middle Orchestrator: FastAPI Engine */}
          <div
            className="p-3.5 sm:p-4 rounded border text-center bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border-teal-700 shadow-sm"
            style={{
              color: '#FFFFFF',
            }}
          >
            <div className="flex items-center justify-center gap-2 font-mono text-sm sm:text-base font-bold text-emerald-300 mb-1">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Central Processing Engine (&lt; 0.38s Response Time)
            </div>
            <p className="text-xs sm:text-sm text-teal-100/80">
              Checks 4 key environmental data sources simultaneously in parallel
            </p>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-4 h-4 text-teal-700" />
          </div>

          {/* 4 Parallel Ingestion Streams Grid (Multi-Colored) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Stream 1 */}
            <Card className="p-3.5 sm:p-4 text-left bg-sky-50/70 border-sky-300/80 shadow-xs hover:shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-sky-800">
                  DATA SOURCE 1
                </span>
                <CloudRain className="w-4 h-4 text-sky-600" />
              </div>
              <CardTitle className="mb-1 text-sm sm:text-base text-sky-950">
                Weather &amp; Air Quality
              </CardTitle>
              <CardDescription className="text-sky-900/80">
                Real-time pollution levels, PM2.5, PM10, and air quality index
              </CardDescription>
            </Card>

            {/* Stream 2 */}
            <Card className="p-3.5 sm:p-4 text-left bg-amber-50/70 border-amber-300/80 shadow-xs hover:shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-amber-800">
                  DATA SOURCE 2
                </span>
                <Network className="w-4 h-4 text-amber-600" />
              </div>
              <CardTitle className="mb-1 text-sm sm:text-base text-amber-950">
                Rivers &amp; Water Bodies
              </CardTitle>
              <CardDescription className="text-amber-900/80">
                River channels, lakes, wetlands, and water protection zones
              </CardDescription>
            </Card>

            {/* Stream 3 */}
            <Card className="p-3.5 sm:p-4 text-left bg-emerald-50/70 border-emerald-300/80 shadow-xs hover:shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-emerald-800">
                  DATA SOURCE 3
                </span>
                <Database className="w-4 h-4 text-emerald-600" />
              </div>
              <CardTitle className="mb-1 text-sm sm:text-base text-emerald-950">
                Protected Areas &amp; Forests
              </CardTitle>
              <CardDescription className="text-emerald-900/80">
                106 National Parks, 573 Sanctuaries, and wildlife zones
              </CardDescription>
            </Card>

            {/* Stream 4 */}
            <Card className="p-3.5 sm:p-4 text-left bg-indigo-50/70 border-indigo-300/80 shadow-xs hover:shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-indigo-800">
                  DATA SOURCE 4
                </span>
                <Zap className="w-4 h-4 text-indigo-600" />
              </div>
              <CardTitle className="mb-1 text-sm sm:text-base text-indigo-950">
                Local Communities
              </CardTitle>
              <CardDescription className="text-indigo-900/80">
                Distance to nearest towns, villages, and human settlements
              </CardDescription>
            </Card>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-4 h-4" style={{ color: 'var(--text-muted, #5e625a)' }} />
          </div>

          {/* AI Statutory Cross-Referencing & PDF Report Engine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="p-3.5 sm:p-4 rounded border"
              style={{
                backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Scale className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
                <span className="font-sans font-bold text-sm sm:text-base" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Smart Rule &amp; Law Evaluator
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted, #5e625a)' }}>
                Matches location against 2,400+ national environmental laws and creates required mitigation actions.
              </p>
            </div>

            <div
              className="p-3.5 sm:p-4 rounded border"
              style={{
                backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
                <span className="font-sans font-bold text-sm sm:text-base" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Official PDF Report Generator
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted, #5e625a)' }}>
                Compiles all map findings, risk charts, and required safety steps into a submission-ready PDF.
              </p>
            </div>
          </div>
        </Card>

        {/* Engine Performance & Throughput Specifications Grid */}
        <Card className="p-4 sm:p-5 scroll-reveal">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
            <span className="text-sm sm:text-base font-sans font-bold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
              System Performance &amp; Reliability
            </span>
            <span className="text-xs font-mono font-semibold" style={{ color: 'var(--color-primary, #284e3a)' }}>
              99.99% Uptime
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ARCH_BENCHMARKS.map((b, idx) => (
              <div
                key={idx}
                className="p-3 rounded border"
                style={{
                  backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
                  borderColor: 'var(--border-subtle, #d5cfc2)',
                }}
              >
                <div className="text-xs font-mono uppercase" style={{ color: 'var(--text-muted, #5e625a)' }}>
                  {b.metric}
                </div>
                <div className="text-base sm:text-lg font-mono font-bold mt-0.5" style={{ color: 'var(--color-primary, #284e3a)' }}>
                  {b.value}
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-muted, #5e625a)' }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
