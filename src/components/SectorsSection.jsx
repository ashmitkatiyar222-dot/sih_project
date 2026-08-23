import React, { useState } from 'react';
import { Sun, Route, Waves, ShieldCheck, Factory, CheckCircle2, FileText, Compass, HardHat, Building2 } from 'lucide-react';

const SECTOR_DATA = [
  {
    id: 'energy',
    name: 'Solar & Renewable Energy',
    icon: Sun,
    category: 'Category B2 / Special Priority',
    constraints: 'Great Indian Bustard (GIB) flight corridors, scrub forest buffers, transmission right-of-way.',
    statutoryActs: 'Rajasthan State Solar Policy · SC Order on GIB Conservation · MoEFCC 2019 Amendments',
    gisCheck: 'R-Tree collision against avian migration paths & 2 km surface water drainage channels.',
    bufferThreshold: '500m to 2 km Buffer',
    clearanceBody: 'State Level Environment Impact Assessment Authority (SEIAA)',
  },
  {
    id: 'transport',
    name: 'Highways & Linear Corridors',
    icon: Route,
    category: 'Category A / National Highway Expansion',
    constraints: 'Eco-Sensitive Zone (ESZ) dissection, elephant & tiger crossing animal underpasses.',
    statutoryActs: 'Forest (Conservation) Act 1980 Sec 2 · NBWL Animal Underpass Clearance Guidelines',
    gisCheck: 'Continuous polyline buffer intersection against 106 National Park boundaries.',
    bufferThreshold: '10 km ESZ Radial Corridor',
    clearanceBody: 'National Board for Wildlife (NBWL) & MoEFCC EAC',
  },
  {
    id: 'hydro',
    name: 'Hydropower & Dams',
    icon: Waves,
    category: 'Category A / River Valley Project',
    constraints: 'Submergence forest area calculation, minimum environmental flow (e-flow) preservation.',
    statutoryActs: 'Water (Prevention and Control of Pollution) Act 1974 · Dam Safety Act 2021',
    gisCheck: 'DEM slope & elevation contour runoff calculations across catchment river basins.',
    bufferThreshold: 'Catchment River Basin Sweep',
    clearanceBody: 'Expert Appraisal Committee (River Valley & Hydro)',
  },
  {
    id: 'industry',
    name: 'Chemical & Industrial Parks',
    icon: Factory,
    category: 'Category A / Red Category Industry',
    constraints: 'Zero Liquid Discharge (ZLD) effluent compliance, continuous ambient air monitoring (CAAQMS).',
    statutoryActs: 'Air (Prevention and Control of Pollution) Act 1981 · CPCB Red Category Notification 2016',
    gisCheck: 'Gaussian plume air dispersion radius modeling against nearest demographic settlement.',
    bufferThreshold: '5 km Radial Demographics',
    clearanceBody: 'Central Pollution Control Board (CPCB) & MoEFCC',
  },
];

const SECTOR_SUMMARY_MATRIX = [
  { sector: 'Solar / Wind Parks', eszBuffer: '500m - 2 km', fcaThreshold: 'Non-Forest Lands Exempt', statutoryBody: 'SEIAA B2 Standard' },
  { sector: 'NHAI Highway Corridors', eszBuffer: '10 km ESZ Corridor', fcaThreshold: 'Strict Sec 2 Diversion', statutoryBody: 'MoEFCC EAC / NBWL' },
  { sector: 'River Valley & Hydro Dams', eszBuffer: 'Catchment Perennial Flow', fcaThreshold: 'Submergence NPV Audit', statutoryBody: 'Central Water Commission' },
  { sector: 'Red Category Chemicals', eszBuffer: '5 km Population Buffer', fcaThreshold: 'ZLD Plant Mandatory', statutoryBody: 'CPCB / State SPCB' },
  { sector: 'Mining & Mineral Extraction', eszBuffer: '10 km Strict ESZ Ban', fcaThreshold: 'Mine Closure Plan EMP', statutoryBody: 'Indian Bureau of Mines' },
  { sector: 'Coastal Ports & Harbours', eszBuffer: 'CRZ-I/II/III Intertidal', fcaThreshold: 'Mangrove Preservation', statutoryBody: 'National Coastal Zone Auth' },
];

export default function SectorsSection() {
  const [activeSector, setActiveSector] = useState(SECTOR_DATA[0]);

  return (
    <section id="sectors" className="py-10 sm:py-14 border-t" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
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
            <span>SECTOR REGULATORY MATRIX</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-1"
            style={{ color: 'var(--text-main, #20231f)' }}
          >
            National Infrastructure &amp; Industrial Sector Rules
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted, #73766f)' }}>
            Custom spatial clearance algorithms designed specifically for major infrastructure pipelines.
          </p>
        </div>

        {/* Structured 2-Column Matrix Container */}
        <div
          className="rounded-xl border overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x"
          style={{
            backgroundColor: 'var(--bg-card, #fbfaf6)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
          }}
        >
          {/* Left Column: Sector Selector Tabs (5 Cols) */}
          <div className="lg:col-span-5 p-4 sm:p-5 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted, #73766f)' }}>
              Select Infrastructure Sector:
            </div>
            {SECTOR_DATA.map((sec) => {
              const isSelected = activeSector.id === sec.id;
              const IconComp = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSector(sec)}
                  className="w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-card-subtle, #edeae1)' : 'transparent',
                    borderColor: isSelected ? 'var(--color-primary, #315c48)' : 'var(--border-subtle, #d8d4ca)',
                    color: 'var(--text-main, #20231f)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded flex items-center justify-center border"
                      style={{
                        backgroundColor: isSelected ? 'var(--color-primary, #315c48)' : 'var(--bg-card, #fbfaf6)',
                        borderColor: isSelected ? 'var(--color-primary, #315c48)' : 'var(--border-subtle, #d8d4ca)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-main, #20231f)',
                      }}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{sec.name}</div>
                      <div className="text-[10px] font-mono line-clamp-1" style={{ color: 'var(--text-muted, #73766f)' }}>
                        {sec.category}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold" style={{ color: 'var(--color-primary, #315c48)' }}>
                      Active ▸
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Regulatory Breakdown (7 Cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4" style={{ backgroundColor: 'var(--bg-card-subtle, #edeae1)' }}>
            <div>
              {/* Active Sector Title & Category */}
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                <div>
                  <h3 className="font-serif font-bold text-lg" style={{ color: 'var(--text-main, #20231f)' }}>
                    {activeSector.name}
                  </h3>
                  <span className="text-xs font-mono" style={{ color: 'var(--color-primary, #315c48)' }}>
                    {activeSector.category}
                  </span>
                </div>
                <div
                  className="px-2 py-0.5 rounded text-[10px] font-mono border"
                  style={{
                    backgroundColor: 'var(--bg-card, #fbfaf6)',
                    borderColor: 'var(--border-subtle, #d8d4ca)',
                    color: 'var(--text-muted, #73766f)',
                  }}
                >
                  Automated Audit Code
                </div>
              </div>

              {/* Specification Grid */}
              <div className="mt-4 space-y-3.5 text-xs">
                <div>
                  <div className="font-mono text-[10px] uppercase font-semibold mb-1" style={{ color: 'var(--text-muted, #73766f)' }}>
                    1. Primary Spatial &amp; Habitat Constraints:
                  </div>
                  <p className="leading-relaxed font-normal" style={{ color: 'var(--text-main, #20231f)' }}>
                    {activeSector.constraints}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase font-semibold mb-1" style={{ color: 'var(--text-muted, #73766f)' }}>
                    2. Statutory Gazette Notifications Checked:
                  </div>
                  <div
                    className="p-2.5 rounded-lg border text-[11px] font-mono leading-relaxed"
                    style={{
                      backgroundColor: 'var(--bg-card, #fbfaf6)',
                      borderColor: 'var(--border-subtle, #d8d4ca)',
                      color: 'var(--text-main, #20231f)',
                    }}
                  >
                    {activeSector.statutoryActs}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase font-semibold mb-1" style={{ color: 'var(--text-muted, #73766f)' }}>
                    3. PostGIS Ingestion Query Algorithm:
                  </div>
                  <p className="leading-relaxed text-[11px]" style={{ color: 'var(--text-muted, #73766f)' }}>
                    {activeSector.gisCheck}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div
              className="pt-3 border-t flex items-center justify-between text-[11px] font-mono"
              style={{
                borderColor: 'var(--border-subtle, #d8d4ca)',
                color: 'var(--color-primary, #315c48)',
              }}
            >
              <span>Deterministic Spatial Compliance</span>
              <span>Latency: &lt; 0.38s</span>
            </div>
          </div>
        </div>

        {/* Sector Summary Matrix Table (Fills empty space) */}
        <div
          className="rounded-xl border p-4 sm:p-5"
          style={{
            backgroundColor: 'var(--bg-card, #fbfaf6)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
          }}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
            <span className="text-xs font-serif font-bold" style={{ color: 'var(--text-main, #20231f)' }}>
              Comprehensive Statutory Clearances by Infrastructure Domain
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted, #73766f)' }}>
              MoEFCC Gazette Gazette SOP 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="font-mono text-[11px] border-b" style={{ borderColor: 'var(--border-subtle, #d8d4ca)', color: 'var(--text-muted, #73766f)' }}>
                <tr>
                  <th className="pb-2">Sector Domain</th>
                  <th className="pb-2">Mandatory ESZ Distance</th>
                  <th className="pb-2">Forest Act (FCA 1980) Rule</th>
                  <th className="pb-2">Statutory Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y text-[11px]" style={{ borderColor: 'var(--border-subtle, #d8d4ca)', color: 'var(--text-main, #20231f)' }}>
                {SECTOR_SUMMARY_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#edeae1]/30">
                    <td className="py-2.5 font-semibold">{row.sector}</td>
                    <td className="py-2.5 font-mono" style={{ color: 'var(--color-secondary, #b77927)' }}>{row.eszBuffer}</td>
                    <td className="py-2.5">{row.fcaThreshold}</td>
                    <td className="py-2.5 font-mono" style={{ color: 'var(--color-primary, #315c48)' }}>{row.statutoryBody}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
