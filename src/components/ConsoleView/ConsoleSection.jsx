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
      <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span
          className="text-[10px] font-mono uppercase tracking-wider shrink-0 font-bold"
          style={{ color: 'var(--text-muted, #73766f)' }}
        >
          Presets:
        </span>
        {Object.entries(PRESETS).map(([key, preset]) => {
          let dotColor = '#315c48';
          if (preset.badgeColor === 'amber') dotColor = '#b77927';
          if (preset.badgeColor === 'red') dotColor = '#a54d42';
          if (preset.badgeColor === 'orange') dotColor = '#b77927';
          if (preset.badgeColor === 'purple') dotColor = '#315c48';

          return (
            <button
              key={key}
              onClick={() => onLoadPreset(key)}
              className="px-2.5 py-1 rounded-md border text-[11px] font-medium transition-all shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 hover:bg-[#edeae1]"
              style={{
                backgroundColor: 'var(--bg-card, #fbfaf6)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
                color: 'var(--text-main, #20231f)',
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
        className="rounded-xl border overflow-hidden shadow-xs"
        style={{
          backgroundColor: 'var(--bg-card, #fbfaf6)',
          borderColor: 'var(--border-subtle, #d8d4ca)',
        }}
      >
        {/* Console Title Bar */}
        <div
          className="px-4 py-2.5 flex items-center justify-between border-b"
          style={{
            backgroundColor: 'var(--dark-surface, #222a25)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
            color: '#FFFFFF',
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-medium">
            <Terminal className="w-4 h-4" style={{ color: 'var(--color-secondary, #b77927)' }} />
            <span className="text-stone-200">Ecoryx Environmental Scanner // Live Clearance Engine</span>
          </div>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 font-bold"
            style={{
              backgroundColor: 'rgba(49, 92, 72, 0.25)',
              borderColor: 'var(--color-primary, #315c48)',
              color: '#d1ead7',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-primary, #315c48)' }}
            />
            Engine Operational
          </span>
        </div>

        {/* 2-COL GRID */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x"
          style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}
        >
          {/* LEFT COLUMN: CONTROLS & MAP (5 COLS) */}
          <div
            className="lg:col-span-5 p-4 sm:p-5 space-y-4"
            style={{ backgroundColor: 'var(--bg-card, #fbfaf6)' }}
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
            className="lg:col-span-7 p-4 sm:p-5 flex flex-col justify-between space-y-4"
            style={{ backgroundColor: 'var(--bg-card-subtle, #edeae1)' }}
          >
            <div>
              {/* TAB SWITCHERS */}
              <div
                className="flex items-center justify-between border-b pb-2.5 mb-4 flex-wrap gap-2"
                style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}
              >
                <div className="flex gap-1.5 text-xs font-semibold overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('tab-scorecard')}
                    className="px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border text-[11px]"
                    style={{
                      backgroundColor: activeTab === 'tab-scorecard' ? 'var(--color-primary, #315c48)' : 'var(--bg-card, #fbfaf6)',
                      borderColor: activeTab === 'tab-scorecard' ? 'var(--color-primary, #315c48)' : 'var(--border-subtle, #d8d4ca)',
                      color: activeTab === 'tab-scorecard' ? '#FFFFFF' : 'var(--text-main, #20231f)',
                    }}
                  >
                    <ShieldCheck
                      className="w-3.5 h-3.5"
                      style={{ color: activeTab === 'tab-scorecard' ? '#FFFFFF' : 'var(--color-primary, #315c48)' }}
                    />
                    Safety Scorecard
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-spatial')}
                    className="px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border text-[11px]"
                    style={{
                      backgroundColor: activeTab === 'tab-spatial' ? 'var(--color-primary, #315c48)' : 'var(--bg-card, #fbfaf6)',
                      borderColor: activeTab === 'tab-spatial' ? 'var(--color-primary, #315c48)' : 'var(--border-subtle, #d8d4ca)',
                      color: activeTab === 'tab-spatial' ? '#FFFFFF' : 'var(--text-main, #20231f)',
                    }}
                  >
                    <MapIcon
                      className="w-3.5 h-3.5"
                      style={{ color: activeTab === 'tab-spatial' ? '#FFFFFF' : 'var(--color-primary, #315c48)' }}
                    />
                    Protected Areas
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-emp')}
                    className="px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border text-[11px]"
                    style={{
                      backgroundColor: activeTab === 'tab-emp' ? 'var(--color-primary, #315c48)' : 'var(--bg-card, #fbfaf6)',
                      borderColor: activeTab === 'tab-emp' ? 'var(--color-primary, #315c48)' : 'var(--border-subtle, #d8d4ca)',
                      color: activeTab === 'tab-emp' ? '#FFFFFF' : 'var(--text-main, #20231f)',
                    }}
                  >
                    <FileText
                      className="w-3.5 h-3.5"
                      style={{ color: activeTab === 'tab-emp' ? '#FFFFFF' : 'var(--color-primary, #315c48)' }}
                    />
                    Action Plan
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-json')}
                    className="px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border text-[11px]"
                    style={{
                      backgroundColor: activeTab === 'tab-json' ? 'var(--color-primary, #315c48)' : 'var(--bg-card, #fbfaf6)',
                      borderColor: activeTab === 'tab-json' ? 'var(--color-primary, #315c48)' : 'var(--border-subtle, #d8d4ca)',
                      color: activeTab === 'tab-json' ? '#FFFFFF' : 'var(--text-main, #20231f)',
                    }}
                  >
                    <Code
                      className="w-3.5 h-3.5"
                      style={{ color: activeTab === 'tab-json' ? '#FFFFFF' : 'var(--color-primary, #315c48)' }}
                    />
                    Raw Data
                  </button>
                </div>

                {/* PDF Export Button */}
                <button
                  onClick={handleExportPDF}
                  className="px-3 py-1 rounded-md border text-[11px] font-semibold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer hover:bg-[#edeae1]"
                  style={{
                    backgroundColor: 'var(--bg-card, #fbfaf6)',
                    borderColor: 'var(--border-subtle, #d8d4ca)',
                    color: 'var(--text-main, #20231f)',
                  }}
                >
                  <Download className="w-3.5 h-3.5" style={{ color: 'var(--text-muted, #73766f)' }} />
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
              className="pt-3 border-t flex justify-between items-center text-xs font-sans"
              style={{
                borderColor: 'var(--border-subtle, #d8d4ca)',
                color: 'var(--text-muted, #73766f)',
              }}
            >
              <span>Automatic national map scanning</span>
              <span>
                Speed: <strong style={{ color: 'var(--color-primary, #315c48)' }} className="font-bold">0.38s (Instant)</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





