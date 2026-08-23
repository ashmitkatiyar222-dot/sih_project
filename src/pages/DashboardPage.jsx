import React, { useState } from 'react';
import {
  Terminal,
  ShieldCheck,
  Map as MapIcon,
  FileText,
  Code,
  Download,
  Sliders,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { PRESETS } from '../constants/presets';
import { downloadReportPDF } from '../utils/pdfExport';
import AuditForm from '../components/ConsoleView/AuditForm';
import GisMap from '../components/ConsoleView/GisMap';
import ScorecardTab from '../components/ConsoleView/ScorecardTab';
import SpatialTab from '../components/ConsoleView/SpatialTab';
import EmpTab from '../components/ConsoleView/EmpTab';
import JsonTab from '../components/ConsoleView/JsonTab';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';

export default function DashboardPage({
  lat,
  lng,
  footprint,
  buffer,
  category,
  results,
  isAuditing,
  onLatChange,
  onLngChange,
  onFootprintChange,
  onBufferChange,
  onCategoryChange,
  onLoadPreset,
  onRunAudit,
  onNavigateToOverview,
}) {
  const [activeTab, setActiveTab] = useState('tab-scorecard');

  const handleExportPDF = () => {
    downloadReportPDF({
      lat,
      lng,
      footprint,
      buffer,
      verdict: results.verdict,
      riskScore: `${results.riskScore} / 100`,
    });
  };

  return (
    <div
      className="relative min-h-[calc(100vh-60px)] overflow-hidden bg-[#EBF3EC] py-6 sm:py-8 border-t"
      style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
    >
      {/* Bottom Edge Vector Silhouette: Geospatial Site Assessment & Environmental Screening Theme */}
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
          {/* Layer 1: Distant Topographic Horizon */}
          <path
            d="M0,155 Q240,95 480,130 T960,110 T1440,135 L1440,320 L0,320 Z"
            fill="#A8C2AF"
            opacity="0.65"
          />
          <path d="M 60, 145 Q 260, 110 480, 140 T 960, 125 T 1400, 145" stroke="#8CA993" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.45" />

          {/* Layer 2: Middle Watershed & Buffer Landscape */}
          <path
            d="M0,200 Q200,145 440,175 T880,155 T1280,190 T1440,170 L1440,320 L0,320 Z"
            fill="#8CA993"
            opacity="0.85"
          />

          {/* Topographic Elevation Iso-Lines */}
          <path d="M 40, 220 Q 240, 180 440, 205 T 880, 185 T 1320, 215" stroke="#A8C2AF" strokeWidth="1.4" opacity="0.5" />
          <path d="M 0, 260 Q 220, 220 440, 245 T 880, 220 T 1280, 250 T 1440, 230" stroke="#A8C2AF" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.4" />

          {/* Geodetic Grid Benchmarks & Protected Buffer Forest Groves */}
          <g stroke="#52785D" fill="#52785D" opacity="0.95">
            {/* Geodetic GPS Triangulation Benchmarks */}
            <circle cx="180" cy="165" r="4" fill="none" strokeWidth="1.5" />
            <circle cx="180" cy="165" r="1.5" />
            <line x1="180" y1="155" x2="180" y2="175" strokeWidth="1.2" />
            <line x1="170" y1="165" x2="190" y2="165" strokeWidth="1.2" />

            <circle cx="720" cy="148" r="4" fill="none" strokeWidth="1.5" />
            <circle cx="720" cy="148" r="1.5" />
            <line x1="720" y1="138" x2="720" y2="158" strokeWidth="1.2" />
            <line x1="710" y1="148" x2="730" y2="148" strokeWidth="1.2" />

            <circle cx="1260" cy="160" r="4" fill="none" strokeWidth="1.5" />
            <circle cx="1260" cy="160" r="1.5" />
            <line x1="1260" y1="150" x2="1260" y2="170" strokeWidth="1.2" />
            <line x1="1250" y1="160" x2="1270" y2="160" strokeWidth="1.2" />

            {/* Geodetic Survey Triangulation Ray */}
            <line x1="180" y1="165" x2="720" y2="148" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
            <line x1="720" y1="148" x2="1260" y2="160" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />

            {/* Protected Wildlife Sanctuary Trees */}
            <polygon points="50,290 35,290 45,255 38,255 47,225 40,225 50,195 60,225 53,225 62,255 55,255 65,290" />
            <circle cx="95" cy="275" r="15" />
            <polygon points="340,290 315,290 330,240 320,240 335,195 325,195 340,145 355,195 345,195 360,240 350,240 365,290" />
            <polygon points="520,295 505,295 514,265 508,265 517,238 511,238 520,210 529,238 523,238 532,265 526,265 535,295" />
            <circle cx="565" cy="274" r="16" />
            <polygon points="890,290 865,290 880,242 870,242 885,198 875,198 890,148 905,198 895,198 910,242 900,242 915,290" />
            <circle cx="950" cy="272" r="18" />
            <polygon points="1080,295 1065,295 1074,265 1068,265 1077,238 1071,238 1080,210 1089,238 1083,238 1092,265 1086,265 1095,295" />
            <polygon points="1380,290 1355,290 1370,242 1360,242 1375,198 1365,198 1380,148 1395,198 1385,198 1400,242 1390,242 1405,290" />
          </g>

          {/* Baseline Ground Strip */}
          <rect x="0" y="305" width="1440" height="15" fill="#8CA993" />
        </svg>
      </div>

      {/* Ambient Subtle Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
        {/* Clean Minimal Header */}
        <div className="flex items-center justify-between pb-2.5 border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
          <div className="flex items-center gap-2.5">
            <h1
              className="text-lg sm:text-xl font-bold tracking-tight"
              style={{ color: 'var(--text-main, #1a1d1a)' }}
            >
              Clearance &amp; Site Assessment
            </h1>
            <span
              className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded border"
              style={{
                backgroundColor: 'rgba(234, 230, 220, 0.9)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
                color: 'var(--text-muted, #5e625a)',
                backdropFilter: 'blur(4px)',
              }}
            >
              Live Engine
            </span>
          </div>

          <button
            onClick={onNavigateToOverview}
            className="px-2.5 py-1 rounded border text-xs font-mono transition-all cursor-pointer hover:bg-[#eae6dc]"
            style={{
              backgroundColor: 'rgba(250, 249, 245, 0.9)',
              borderColor: 'var(--border-subtle, #d5cfc2)',
              color: 'var(--text-muted, #5e625a)',
              backdropFilter: 'blur(4px)',
            }}
          >
            &larr; Overview
          </button>
        </div>

        {/* Main 2-Pane Architecture: USER INPUTS (Left) vs GENERATED OUTPUTS (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* ==================================================================== */}
          {/* LEFT COLUMN: USER INPUTS (5 COLS)                                    */}
          {/* ==================================================================== */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <Card className="overflow-hidden p-0 bg-white/85 backdrop-blur-xs shadow-sm flex flex-col h-full">
              {/* Header: User Input Demarcation */}
              <div
                className="px-3.5 py-2.5 flex items-center justify-between border-b text-xs font-mono"
                style={{
                  backgroundColor: 'rgba(234, 230, 220, 0.85)',
                  borderColor: 'var(--border-subtle, #d5cfc2)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase text-white shadow-2xs"
                    style={{ backgroundColor: 'var(--color-primary, #284e3a)' }}
                  >
                    INPUT
                  </span>
                  <span className="font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                    Project Parameters
                  </span>
                </div>
                <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted, #5e625a)' }}>
                  GPS &amp; Scope
                </span>
              </div>

              {/* Input Form Controls & Interactive Scanner */}
              <div className="p-3.5 sm:p-4 space-y-3 flex-1 flex flex-col justify-between">
                <AuditForm
                  lat={lat}
                  lng={lng}
                  footprint={footprint}
                  buffer={buffer}
                  category={category}
                  isAuditing={isAuditing}
                  onLatChange={onLatChange}
                  onLngChange={onLngChange}
                  onFootprintChange={onFootprintChange}
                  onBufferChange={onBufferChange}
                  onCategoryChange={onCategoryChange}
                  onSubmit={onRunAudit}
                />

                {/* Leaflet Draggable Pin & Boundary Scanner */}
                <div className="space-y-1 pt-1 border-t border-stone-200/70">
                  <div className="flex justify-between items-center text-xs font-mono" style={{ color: 'var(--text-muted, #5e625a)' }}>
                    <span className="font-semibold">Interactive Map Scanner</span>
                    <span className="font-bold text-emerald-800">
                      Radius: {buffer} km
                    </span>
                  </div>
                  <GisMap
                    lat={lat}
                    lng={lng}
                    buffer={buffer}
                    footprint={footprint}
                    onCoordinatesChange={(newLat, newLng) => {
                      onLatChange(newLat);
                      onLngChange(newLng);
                    }}
                    isVisible={true}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* ==================================================================== */}
          {/* RIGHT COLUMN: GENERATED OUTPUTS (7 COLS)                             */}
          {/* ==================================================================== */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <Card className="overflow-hidden p-0 bg-white/85 backdrop-blur-xs shadow-sm flex flex-col h-full">
              {/* Header: Generated Output Demarcation */}
              <div
                className="px-3.5 py-2.5 flex items-center justify-between border-b text-xs font-mono"
                style={{
                  backgroundColor: 'var(--dark-surface, #1c231f)',
                  borderColor: 'var(--border-subtle, #d5cfc2)',
                  color: '#FFFFFF',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase text-white shadow-2xs"
                    style={{ backgroundColor: 'var(--color-secondary, #9c6519)' }}
                  >
                    OUTPUT
                  </span>
                  <span className="font-semibold text-stone-200">
                    Compliance Assessment
                  </span>
                </div>
              </div>

              {/* Output Inspector Tabs & Actions */}
              <div
                className="p-3.5 sm:p-4 space-y-3 flex-1 flex flex-col justify-between"
                style={{ backgroundColor: 'rgba(250, 249, 245, 0.82)' }}
              >
              {/* Tab Navigation Strip */}
              <div
                className="flex items-center justify-between border-b pb-2 flex-wrap gap-2"
                style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
              >
                <div className="flex gap-1.5 text-xs font-semibold overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('tab-scorecard')}
                    className="px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs border text-xs font-mono"
                    style={{
                      backgroundColor: activeTab === 'tab-scorecard' ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeTab === 'tab-scorecard' ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeTab === 'tab-scorecard' ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                    }}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: activeTab === 'tab-scorecard' ? '#FFFFFF' : 'var(--color-primary, #284e3a)' }} />
                    Verdict
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-spatial')}
                    className="px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs border text-xs font-mono"
                    style={{
                      backgroundColor: activeTab === 'tab-spatial' ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeTab === 'tab-spatial' ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeTab === 'tab-spatial' ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                    }}
                  >
                    <MapIcon className="w-3.5 h-3.5" style={{ color: activeTab === 'tab-spatial' ? '#FFFFFF' : 'var(--color-primary, #284e3a)' }} />
                    Protected Zones
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-emp')}
                    className="px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs border text-xs font-mono"
                    style={{
                      backgroundColor: activeTab === 'tab-emp' ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeTab === 'tab-emp' ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeTab === 'tab-emp' ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                    }}
                  >
                    <FileText className="w-3.5 h-3.5" style={{ color: activeTab === 'tab-emp' ? '#FFFFFF' : 'var(--color-primary, #284e3a)' }} />
                    Required EMP
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-json')}
                    className="px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs border text-xs font-mono"
                    style={{
                      backgroundColor: activeTab === 'tab-json' ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeTab === 'tab-json' ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeTab === 'tab-json' ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                    }}
                  >
                    <Code className="w-3.5 h-3.5" style={{ color: activeTab === 'tab-json' ? '#FFFFFF' : 'var(--color-primary, #284e3a)' }} />
                    JSON
                  </button>
                </div>

                {/* PDF Export Action */}
                <button
                  onClick={handleExportPDF}
                  className="px-2.5 py-1 rounded border text-xs font-mono font-medium transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer hover:bg-[#eae6dc]"
                  style={{
                    backgroundColor: 'var(--bg-card, #faf9f5)',
                    borderColor: 'var(--border-subtle, #d5cfc2)',
                    color: 'var(--text-main, #1a1d1a)',
                  }}
                >
                  <Download className="w-3.5 h-3.5" style={{ color: 'var(--text-muted, #5e625a)' }} />
                  <span>Export PDF</span>
                </button>
              </div>

              {/* Dynamic Tab Contents */}
              <div className="tab-content">
                {activeTab === 'tab-scorecard' && (
                  <ScorecardTab results={results} isVisible={true} />
                )}
                {activeTab === 'tab-spatial' && <SpatialTab />}
                {activeTab === 'tab-emp' && <EmpTab />}
                {activeTab === 'tab-json' && (
                  <JsonTab
                    lat={lat}
                    lng={lng}
                    footprint={footprint}
                    buffer={buffer}
                    category={category}
                    results={results}
                  />
                )}
              </div>

              {/* Footer Status Bar */}
              <div
                className="pt-2 border-t flex justify-between items-center text-xs font-mono"
                style={{
                  borderColor: 'var(--border-subtle, #d5cfc2)',
                  color: 'var(--text-muted, #5e625a)',
                }}
              >
                <span>Automated spatial compliance check</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);
}
