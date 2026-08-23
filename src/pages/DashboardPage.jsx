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
    <div className="py-4 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
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
              backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
              borderColor: 'var(--border-subtle, #d5cfc2)',
              color: 'var(--text-muted, #5e625a)',
            }}
          >
            Live Engine
          </span>
        </div>

        <button
          onClick={onNavigateToOverview}
          className="px-2.5 py-1 rounded border text-xs font-mono transition-all cursor-pointer hover:bg-[#eae6dc]"
          style={{
            backgroundColor: 'var(--bg-card, #faf9f5)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
            color: 'var(--text-muted, #5e625a)',
          }}
        >
          &larr; Overview
        </button>
      </div>

      {/* Main 2-Pane Architecture: USER INPUTS (Left) vs GENERATED OUTPUTS (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* ==================================================================== */}
        {/* LEFT COLUMN: USER INPUTS (5 COLS)                                    */}
        {/* ==================================================================== */}
        <div className="lg:col-span-5 space-y-3">
          <Card className="overflow-hidden p-0">
            {/* Header: User Input Demarcation */}
            <div
              className="px-3.5 py-2 flex items-center justify-between border-b text-xs font-mono"
              style={{
                backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase text-white"
                  style={{ backgroundColor: 'var(--color-primary, #284e3a)' }}
                >
                  INPUT
                </span>
                <span className="font-semibold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  Project Parameters
                </span>
              </div>
              <span className="text-[11px]" style={{ color: 'var(--text-muted, #5e625a)' }}>
                GPS &amp; Scope
              </span>
            </div>

            {/* Input Form Controls */}
            <div className="p-3.5 sm:p-4 space-y-3">
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
              <div className="space-y-1 pt-0.5">
                <div className="flex justify-between items-center text-xs font-mono" style={{ color: 'var(--text-muted, #5e625a)' }}>
                  <span>Interactive Map Scanner</span>
                  <span className="font-semibold" style={{ color: 'var(--color-primary, #284e3a)' }}>
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
        <div className="lg:col-span-7 space-y-3">
          <Card className="overflow-hidden p-0">
            {/* Header: Generated Output Demarcation */}
            <div
              className="px-3.5 py-2 flex items-center justify-between border-b text-xs font-mono"
              style={{
                backgroundColor: 'var(--dark-surface, #1c231f)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
                color: '#FFFFFF',
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase text-white"
                  style={{ backgroundColor: 'var(--color-secondary, #9c6519)' }}
                >
                  OUTPUT
                </span>
                <span className="font-semibold text-stone-200">
                  Compliance Assessment
                </span>
              </div>
              <span
                className="text-[11px] px-2 py-0.5 rounded border flex items-center gap-1.5 font-semibold"
                style={{
                  backgroundColor: 'rgba(40, 78, 58, 0.35)',
                  borderColor: 'var(--color-primary, #284e3a)',
                  color: '#d1ead7',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary, #284e3a)' }} />
                Instant (0.38s)
              </span>
            </div>

            {/* Output Inspector Tabs & Actions */}
            <div
              className="p-3.5 sm:p-4 space-y-3"
              style={{ backgroundColor: 'var(--bg-card-subtle, #eae6dc)' }}
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
                <span>
                  Runtime: <strong style={{ color: 'var(--color-primary, #284e3a)' }} className="font-bold">0.38s</strong>
                </span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
