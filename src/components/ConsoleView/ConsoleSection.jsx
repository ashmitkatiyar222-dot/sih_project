import React, { useState } from 'react';
import { Terminal, ShieldCheck, Map as MapIcon, FileText, Code, Download } from 'lucide-react';
import { PRESETS } from '../../constants/presets';
import { downloadReportPDF } from '../../utils/pdfExport';
import AuditForm from './AuditForm';
import GisMap from './GisMap';
import ScorecardTab from './ScorecardTab';
import SpatialTab from './SpatialTab';
import EmpTab from './EmpTab';
import JsonTab from './JsonTab';

export default function ConsoleSection({
  isActive,
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
    <div className={`view-panel view-panel-after ${isActive ? 'panel-active' : 'panel-hidden'}`}>
      {/* PRESET BUTTONS */}
      <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span
          className="text-[10px] font-mono uppercase tracking-wider shrink-0 font-bold"
          style={{ color: 'var(--text-muted, #5e625a)' }}
        >
          Presets:
        </span>
        {Object.entries(PRESETS).map(([key, preset]) => {
          let dotColor = '#284e3a';
          if (preset.badgeColor === 'amber') dotColor = '#9c6519';
          if (preset.badgeColor === 'red') dotColor = '#943b32';
          if (preset.badgeColor === 'orange') dotColor = '#9c6519';
          if (preset.badgeColor === 'purple') dotColor = '#284e3a';

          return (
            <button
              key={key}
              onClick={() => onLoadPreset(key)}
              className="px-2 py-0.5 rounded border text-[11px] font-mono transition-all shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 hover:bg-[#eae6dc]"
              style={{
                backgroundColor: 'var(--bg-card, #faf9f5)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
                color: 'var(--text-main, #1a1d1a)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
              <span>{preset.title}</span>
            </button>
          );
        })}
      </div>

      {/* WORKSPACE CONTAINER */}
      <div
        className="rounded border overflow-hidden shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card, #faf9f5)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
        }}
      >
        {/* Console Title Bar */}
        <div
          className="px-3.5 py-2 flex items-center justify-between border-b"
          style={{
            backgroundColor: 'var(--dark-surface, #1c231f)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
            color: '#FFFFFF',
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-medium">
            <Terminal className="w-3.5 h-3.5" style={{ color: 'var(--color-secondary, #9c6519)' }} />
            <span className="text-stone-200">Instant Environmental Clearance</span>
          </div>
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded border flex items-center gap-1 font-semibold"
            style={{
              backgroundColor: 'rgba(40, 78, 58, 0.35)',
              borderColor: 'var(--color-primary, #284e3a)',
              color: '#d1ead7',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-primary, #284e3a)' }}
            />
            System Active
          </span>
        </div>

        {/* 2-COL GRID */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x"
          style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
        >
          {/* LEFT COLUMN: CONTROLS & MAP (5 COLS) */}
          <div
            className="lg:col-span-5 p-3.5 sm:p-4 space-y-3"
            style={{ backgroundColor: 'var(--bg-card, #faf9f5)' }}
          >
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

            <GisMap
              lat={lat}
              lng={lng}
              buffer={buffer}
              footprint={footprint}
              onCoordinatesChange={(newLat, newLng) => {
                onLatChange(newLat);
                onLngChange(newLng);
              }}
              isVisible={isActive}
            />
          </div>

          {/* RIGHT COLUMN: RESULTS & SCORECARD (7 COLS) */}
          <div
            className="lg:col-span-7 p-3.5 sm:p-4 flex flex-col justify-between space-y-3"
            style={{ backgroundColor: 'var(--bg-card-subtle, #eae6dc)' }}
          >
            <div>
              {/* TAB SWITCHERS */}
              <div
                className="flex items-center justify-between border-b pb-2 mb-3 flex-wrap gap-2"
                style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
              >
                <div className="flex gap-1 text-xs font-semibold overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('tab-scorecard')}
                    className="px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border text-[11px] font-mono"
                    style={{
                      backgroundColor: activeTab === 'tab-scorecard' ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeTab === 'tab-scorecard' ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeTab === 'tab-scorecard' ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                    }}
                  >
                    <ShieldCheck
                      className="w-3.5 h-3.5"
                      style={{ color: activeTab === 'tab-scorecard' ? '#FFFFFF' : 'var(--color-primary, #284e3a)' }}
                    />
                    Verdict &amp; Risk
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-spatial')}
                    className="px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border text-[11px] font-mono"
                    style={{
                      backgroundColor: activeTab === 'tab-spatial' ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeTab === 'tab-spatial' ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeTab === 'tab-spatial' ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                    }}
                  >
                    <MapIcon
                      className="w-3.5 h-3.5"
                      style={{ color: activeTab === 'tab-spatial' ? '#FFFFFF' : 'var(--color-primary, #284e3a)' }}
                    />
                    Nearby Protected Areas
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-emp')}
                    className="px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border text-[11px] font-mono"
                    style={{
                      backgroundColor: activeTab === 'tab-emp' ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeTab === 'tab-emp' ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeTab === 'tab-emp' ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                    }}
                  >
                    <FileText
                      className="w-3.5 h-3.5"
                      style={{ color: activeTab === 'tab-emp' ? '#FFFFFF' : 'var(--color-primary, #284e3a)' }}
                    />
                    Required Actions
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-json')}
                    className="px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border text-[11px] font-mono"
                    style={{
                      backgroundColor: activeTab === 'tab-json' ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeTab === 'tab-json' ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeTab === 'tab-json' ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                    }}
                  >
                    <Code
                      className="w-3.5 h-3.5"
                      style={{ color: activeTab === 'tab-json' ? '#FFFFFF' : 'var(--color-primary, #284e3a)' }}
                    />
                    Raw Data (JSON)
                  </button>
                </div>

                {/* PDF Export Button */}
                <button
                  onClick={handleExportPDF}
                  className="px-2.5 py-1 rounded border text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer hover:bg-[#eae6dc]"
                  style={{
                    backgroundColor: 'var(--bg-card, #faf9f5)',
                    borderColor: 'var(--border-subtle, #d5cfc2)',
                    color: 'var(--text-main, #1a1d1a)',
                  }}
                >
                  <Download className="w-3.5 h-3.5" style={{ color: 'var(--text-muted, #5e625a)' }} />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* TAB CONTENTS */}
              <div className="tab-content">
                {activeTab === 'tab-scorecard' && (
                  <ScorecardTab results={results} isVisible={isActive} />
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
            </div>

            {/* BOTTOM STATUS */}
            <div
              className="pt-2 border-t flex justify-between items-center text-xs font-mono"
              style={{
                borderColor: 'var(--border-subtle, #d5cfc2)',
                color: 'var(--text-muted, #5e625a)',
              }}
            >
              <span className="text-[11px]">Automated environmental compliance check</span>
              <span className="text-[11px]">
                Check Time: <strong style={{ color: 'var(--color-primary, #284e3a)' }} className="font-bold">0.38s</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





