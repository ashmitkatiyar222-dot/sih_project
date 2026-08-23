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
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-mono text-stone-500 uppercase tracking-wider shrink-0 font-bold">
          Presets:
        </span>
        {Object.entries(PRESETS).map(([key, preset]) => {
          let dotColor = 'bg-blue-400';
          if (preset.badgeColor === 'amber') dotColor = 'bg-amber-400';
          if (preset.badgeColor === 'red') dotColor = 'bg-rose-400';
          if (preset.badgeColor === 'orange') dotColor = 'bg-orange-400';
          if (preset.badgeColor === 'purple') dotColor = 'bg-purple-400';

          return (
            <button
              key={key}
              onClick={() => onLoadPreset(key)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm hover:border-emerald-500/40 text-xs font-semibold text-stone-700 transition-all shrink-0 flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
            >
              <span className={`w-2 h-2 rounded-full ${dotColor}`} />
              <span>{preset.title}</span>
            </button>
          );
        })}
      </div>

      {/* WORKSPACE CONTAINER */}
      <div className="bg-white border border-stone-200 shadow-sm rounded-3xl border border-stone-200 overflow-hidden shadow-2xl">
        {/* Console Title Bar */}
        <div className="bg-stone-100/90 text-stone-900 px-6 py-4 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs font-mono font-medium">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-stone-700">Ecoryx Environmental Scanner // Live Clearance Engine</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 shadow-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Engine Operational
          </span>
        </div>

        {/* 2-COL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* LEFT COLUMN: CONTROLS & MAP (5 COLS) */}
          <div className="lg:col-span-5 p-6 bg-white space-y-5">
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
          <div className="lg:col-span-7 p-6 bg-[#F8F7F4] flex flex-col justify-between space-y-6">
            <div>
              {/* TAB SWITCHERS */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-5 flex-wrap gap-2">
                <div className="flex gap-2 text-xs font-semibold overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('tab-scorecard')}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'tab-scorecard'
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 shadow-xs'
                    }`}
                  >
                    <ShieldCheck
                      className={`w-3.5 h-3.5 ${activeTab === 'tab-scorecard' ? 'text-white' : 'text-emerald-600'}`}
                    />
                    Safety Scorecard
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-spatial')}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'tab-spatial'
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 shadow-xs'
                    }`}
                  >
                    <MapIcon className={`w-3.5 h-3.5 ${activeTab === 'tab-spatial' ? 'text-white' : 'text-emerald-600'}`} />
                    Protected Areas
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-emp')}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'tab-emp'
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 shadow-xs'
                    }`}
                  >
                    <FileText className={`w-3.5 h-3.5 ${activeTab === 'tab-emp' ? 'text-white' : 'text-emerald-600'}`} />
                    Action Plan
                  </button>

                  <button
                    onClick={() => setActiveTab('tab-json')}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'tab-json'
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 shadow-xs'
                    }`}
                  >
                    <Code className={`w-3.5 h-3.5 ${activeTab === 'tab-json' ? 'text-white' : 'text-emerald-600'}`} />
                    Raw Data
                  </button>
                </div>

                {/* PDF Export Button */}
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-1.5 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
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
            <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-xs font-sans text-stone-500">
              <span>Automatic national map scanning</span>
              <span>
                Speed: <strong className="text-emerald-600 font-bold">0.38s (Instant)</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





