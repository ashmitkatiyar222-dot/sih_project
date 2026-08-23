import React from 'react';
import { MapPin, Cpu, Scale, FileCheck2, ArrowRight, Zap, Lock, ShieldCheck } from 'lucide-react';

const WORKFLOW_STAGES = [
  {
    step: '01',
    title: 'Site Coordinate Ingestion',
    tech: 'POST /api/v1/clearance/audit',
    latency: '0.02s Latency',
    manualTime: '14 Days Manual',
    desc: 'Inputs project GPS center, footprint (Ha), search radius, and industrial sector category.',
    output: 'Standardized GeoJSON Polygon',
    Icon: MapPin,
  },
  {
    step: '02',
    title: 'Asynchronous Spatial Sweep',
    tech: 'PostgreSQL 16 + PostGIS & OSM Overpass',
    latency: '0.18s Latency',
    manualTime: '45 Days Manual',
    desc: 'Dispatches parallel asyncio coroutines across 106 National Parks, 573 Sanctuaries, and river basins in < 0.38s.',
    output: 'R-Tree Buffer Intersect Table',
    Icon: Cpu,
  },
  {
    step: '03',
    title: 'Statutory Law Cross-Check',
    tech: 'Gemini 1.5 Pro + MoEFCC Gazette Engine',
    latency: '0.14s Latency',
    manualTime: '60 Days Manual',
    desc: 'Cross-references 2,400+ digitized environmental acts (WPA 1972, FCA 1980, Water Act 1974, Air Act 1981).',
    output: 'Sensitivity Score & Legal Verdict',
    Icon: Scale,
  },
  {
    step: '04',
    title: 'Certified Report Compilation',
    tech: 'Python ReportLab / Client jsPDF',
    latency: '0.04s Latency',
    manualTime: '30 Days Manual',
    desc: 'Compiles audit-ready EIA Screening PDF with radar safety charts, spatial layers, and EMP mitigation plans.',
    output: 'Digitally Verified PDF Deliverable',
    Icon: FileCheck2,
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-10 sm:py-14 border-t" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono mb-2 border"
            style={{
              backgroundColor: 'var(--bg-card, #fbfaf6)',
              borderColor: 'var(--border-subtle, #d8d4ca)',
              color: 'var(--text-main, #20231f)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-primary, #315c48)' }}
            />
            <span>SYSTEM PIPELINE TIMELINE</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-1"
            style={{ color: 'var(--text-main, #20231f)' }}
          >
            From Geographic Coordinates to Official Clearance
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted, #73766f)' }}>
            Four deterministic stages executed sequentially in under 0.38 seconds.
          </p>
        </div>

        {/* Connected Horizontal Timeline Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {WORKFLOW_STAGES.map((st, idx) => {
            const IconComp = st.Icon;
            return (
              <div
                key={st.step}
                className="rounded-xl p-4 border relative flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--bg-card, #fbfaf6)',
                  borderColor: 'var(--border-subtle, #d8d4ca)',
                }}
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                    <span className="font-mono text-sm font-bold" style={{ color: 'var(--color-primary, #315c48)' }}>
                      STEP {st.step}
                    </span>
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center border"
                      style={{
                        backgroundColor: 'var(--bg-card-subtle, #edeae1)',
                        borderColor: 'var(--border-subtle, #d8d4ca)',
                        color: 'var(--text-main, #20231f)',
                      }}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Stage Title */}
                  <h3 className="font-serif font-bold text-sm mb-1" style={{ color: 'var(--text-main, #20231f)' }}>
                    {st.title}
                  </h3>

                  {/* Tech Stack Badge */}
                  <div
                    className="font-mono text-[10px] px-1.5 py-0.5 rounded border inline-block mb-2 line-clamp-1"
                    style={{
                      backgroundColor: 'var(--bg-card-subtle, #edeae1)',
                      borderColor: 'var(--border-subtle, #d8d4ca)',
                      color: 'var(--text-muted, #73766f)',
                    }}
                  >
                    {st.tech}
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted, #73766f)' }}>
                    {st.desc}
                  </p>
                </div>

                <div>
                  {/* Execution vs Manual Comparison Pill */}
                  <div className="mt-3 pt-2 border-t flex items-center justify-between text-[10px] font-mono" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                    <span className="font-bold" style={{ color: 'var(--color-primary, #315c48)' }}>{st.latency}</span>
                    <span className="line-through" style={{ color: 'var(--text-muted, #73766f)' }}>{st.manualTime}</span>
                  </div>

                  {/* Output Strip */}
                  <div
                    className="mt-1 pt-1 text-[11px] font-mono flex items-center justify-between"
                    style={{ color: 'var(--color-primary, #315c48)' }}
                  >
                    <span className="text-[10px] uppercase" style={{ color: 'var(--text-muted, #73766f)' }}>Output:</span>
                    <span className="font-semibold text-right line-clamp-1">{st.output}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SLA Summary Strip Below Steps (Fills empty space) */}
        <div
          className="mt-4 p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{
            backgroundColor: 'var(--bg-card, #fbfaf6)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: 'var(--color-primary-light, #e2ebe5)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
                color: 'var(--color-primary, #315c48)',
              }}
            >
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'var(--text-main, #20231f)' }}>
                Total End-to-End Processing SLA: 0.38 Seconds
              </div>
              <div className="text-[11px]" style={{ color: 'var(--text-muted, #73766f)' }}>
                99.8% reduction against statutory 180-day manual screening cycle under EIA Notification 2006
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
            <span className="px-2 py-1 rounded border" style={{ backgroundColor: 'var(--bg-card-subtle, #edeae1)', borderColor: 'var(--border-subtle, #d8d4ca)', color: 'var(--text-main, #20231f)' }}>
              SHA-256 Verified
            </span>
            <span className="px-2 py-1 rounded border" style={{ backgroundColor: 'var(--color-primary-light, #e2ebe5)', borderColor: 'var(--border-subtle, #d8d4ca)', color: 'var(--color-primary-text, #244737)' }}>
              100% Deterministic
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
