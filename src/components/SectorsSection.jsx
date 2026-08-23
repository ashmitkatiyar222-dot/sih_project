import React, { useState } from 'react';
import { Sun, Route, Waves, ShieldCheck, Factory, CheckCircle2, FileText, Compass, HardHat, Building2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

const SECTOR_DATA = [
  {
    id: 'energy',
    name: 'Solar & Renewable Energy',
    icon: Sun,
    category: 'Category B2 / Special Priority',
    constraints: 'Great Indian Bustard (GIB) flight corridors, scrub forest buffers, transmission right-of-way.',
    statutoryActs: 'Rajasthan State Solar Policy · SC Order on GIB Conservation · MoEFCC 2019 Amendments',
    gisCheck: 'Automated check against bird migration paths and 2 km river drainage channels.',
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
    gisCheck: 'Route distance check against all 106 National Park boundaries.',
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
    gisCheck: 'Elevation and water flow calculations across river basins.',
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
    gisCheck: 'Air quality and smoke dispersion modeling for nearest towns and villages.',
    bufferThreshold: '5 km Radial Demographics',
    clearanceBody: 'Central Pollution Control Board (CPCB) & MoEFCC',
  },
  {
    id: 'mining',
    name: 'Mining & Mineral Corridors',
    icon: HardHat,
    category: 'Category A / Major Minerals Lease',
    constraints: 'Eco-Sensitive Zone (ESZ) strict perimeter exclusion, groundwater table intersection barrier, topsoil preservation plan.',
    statutoryActs: 'Mines and Minerals (Development and Regulation) Act 1957 · Forest (Conservation) Act 1980 · MoEFCC 2006 EIA Notification',
    gisCheck: 'Automated 10 km spatial intersect query against all Tiger Reserves, Wildlife Sanctuaries and Aravalli Core Ridge zones.',
    bufferThreshold: '10.0 km ESZ Absolute Buffer',
    clearanceBody: 'Ministry of Environment, Forest and Climate Change (MoEFCC EAC) & National Board for Wildlife (NBWL)',
  },
  {
    id: 'urban',
    name: 'Urban & Commercial Townships',
    icon: Building2,
    category: 'Category B1 / Built Environment >20,000 sqm',
    constraints: 'Rainwater harvesting percolation pits, local solid waste processing facility, minimum green belt tree coverage.',
    statutoryActs: 'State EIA Authority Urban Masterplans · National Building Code (NBC) 2016 Part 11 · Central Ground Water Authority (CGWA)',
    gisCheck: 'Municipal storm-water drain proximity and city master-plan zone classification check.',
    bufferThreshold: '500m Natural Drainage Protection Buffer',
    clearanceBody: 'State Level Environment Impact Assessment Authority (SEIAA)',
  },
];

const SECTOR_SUMMARY_MATRIX = [
  { sector: 'Mining & Minerals', eszBuffer: '10.0 km', fcaThreshold: 'Strict Approval Needed', statutoryBody: 'Central Ministry (MoEFCC)' },
  { sector: 'Thermal Power', eszBuffer: '5.0 km', fcaThreshold: 'Forest Diversion Rules', statutoryBody: 'Central Ministry (MoEFCC)' },
  { sector: 'Solar Parks', eszBuffer: 'Exempt (>1km)', fcaThreshold: 'Non-Forest Land Only', statutoryBody: 'State Authority (SEIAA)' },
  { sector: 'Highways & Roads', eszBuffer: 'Corridor Check', fcaThreshold: 'Tree Plantation 1:10', statutoryBody: 'Central / State Authority' },
  { sector: 'Ports & Harbors', eszBuffer: 'Coastal Zone', fcaThreshold: 'Mangrove Protection', statutoryBody: 'National Coastal Authority' },
];

export default function SectorsSection() {
  const [activeSector, setActiveSector] = useState(SECTOR_DATA[0]);

  return (
    <section id="sectors" className="py-8 sm:py-12 border-t relative overflow-hidden bg-gradient-to-b from-[#f7eefc]/70 via-[#faf5fd] to-[#f4f1ea]" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
      {/* Ambient Purple/Magenta Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-6 scroll-reveal-header">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5"
            style={{ color: 'var(--text-main, #1a1d1a)' }}
          >
            National Infrastructure &amp; Industrial Sector Rules
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted, #5e625a)' }}>
            Automated clearance rules tailored for major industry and infrastructure projects.
          </p>
        </div>

        {/* Structured 2-Column Matrix Container */}
        <Card className="overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x p-0 scroll-reveal shadow-sm">
          {/* Left Column: Sector Selector Tabs (5 Cols) */}
          <div className="lg:col-span-5 p-4 sm:p-5 space-y-2">
            <div className="text-xs font-mono uppercase font-bold tracking-wider mb-1.5 text-purple-900">
              Select Infrastructure Sector:
            </div>
            {SECTOR_DATA.map((sec) => {
              const isSelected = activeSector.id === sec.id;
              const IconComp = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSector(sec)}
                  className="w-full text-left p-3 rounded border transition-all flex items-center justify-between cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? 'var(--color-primary-light, #e3ebe5)' : 'transparent',
                    borderColor: isSelected ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                    color: 'var(--text-main, #1a1d1a)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded flex items-center justify-center border"
                      style={{
                        backgroundColor: isSelected ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
                        borderColor: isSelected ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                      }}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{sec.name}</div>
                      <div className="text-xs font-mono line-clamp-1" style={{ color: 'var(--text-muted, #5e625a)' }}>
                        {sec.category}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-xs font-mono font-bold text-emerald-800">
                      Active ▸
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Regulatory Breakdown (7 Cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-4" style={{ backgroundColor: 'var(--bg-card-subtle, #eae6dc)' }}>
            <div>
              {/* Active Sector Title & Category */}
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
                <div>
                  <h3 className="font-sans font-bold text-lg sm:text-xl" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                    {activeSector.name}
                  </h3>
                  <div className="font-mono text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-primary, #284e3a)' }}>
                    {activeSector.category}
                  </div>
                </div>
                <div
                  className="px-2.5 py-1 rounded border text-xs font-mono font-bold"
                  style={{
                    backgroundColor: 'var(--bg-card, #faf9f5)',
                    borderColor: 'var(--border-subtle, #d5cfc2)',
                    color: 'var(--color-secondary, #9c6519)',
                  }}
                >
                  {activeSector.bufferThreshold}
                </div>
              </div>

              {/* Specification Grid */}
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded border" style={{ backgroundColor: 'var(--bg-card, #faf9f5)', borderColor: 'var(--border-subtle, #d5cfc2)' }}>
                  <div className="text-xs font-mono uppercase font-bold flex items-center gap-1.5" style={{ color: 'var(--text-muted, #5e625a)' }}>
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #284e3a)' }} />
                    Mandatory Environmental Safety Checks
                  </div>
                  <p className="text-xs sm:text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                    {activeSector.constraints}
                  </p>
                </div>

                <div className="p-3 rounded border" style={{ backgroundColor: 'var(--bg-card, #faf9f5)', borderColor: 'var(--border-subtle, #d5cfc2)' }}>
                  <div className="text-xs font-mono uppercase font-bold flex items-center gap-1.5" style={{ color: 'var(--text-muted, #5e625a)' }}>
                    <FileText className="w-3.5 h-3.5" style={{ color: 'var(--color-secondary, #9c6519)' }} />
                    Applicable National Environmental Laws
                  </div>
                  <p className="text-xs sm:text-sm mt-1.5 font-mono leading-relaxed" style={{ color: 'var(--text-muted, #5e625a)' }}>
                    {activeSector.statutoryActs}
                  </p>
                </div>

                <div className="p-3 rounded border" style={{ backgroundColor: 'var(--bg-card, #faf9f5)', borderColor: 'var(--border-subtle, #d5cfc2)' }}>
                  <div className="text-xs font-mono uppercase font-bold flex items-center gap-1.5" style={{ color: 'var(--text-muted, #5e625a)' }}>
                    <Compass className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #284e3a)' }} />
                    Spatial Boundary Verification Logic
                  </div>
                  <p className="text-xs sm:text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                    {activeSector.gisCheck}
                  </p>
                </div>

                <div className="p-2.5 rounded border flex items-center justify-between text-xs font-mono" style={{ backgroundColor: 'var(--bg-card, #faf9f5)', borderColor: 'var(--border-subtle, #d5cfc2)' }}>
                  <span style={{ color: 'var(--text-muted, #5e625a)' }}>Clearance Issuing Authority:</span>
                  <span className="font-bold" style={{ color: 'var(--text-main, #1a1d1a)' }}>{activeSector.clearanceBody}</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div
              className="pt-2.5 border-t flex items-center justify-between text-xs font-mono"
              style={{
                borderColor: 'var(--border-subtle, #d5cfc2)',
                color: 'var(--color-primary, #284e3a)',
              }}
            >
              <span>100% Consistent Compliance</span>
              <span>Check Time: &lt; 0.38s</span>
            </div>
          </div>
        </Card>

        {/* Sector Summary Matrix Table */}
        <Card className="p-4 sm:p-5 scroll-reveal">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
            <span className="text-sm sm:text-base font-sans font-bold" style={{ color: 'var(--text-main, #1a1d1a)' }}>
              Clearance Requirements by Industry Sector
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted, #5e625a)' }}>
              Official Standards
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="font-mono text-xs uppercase border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)', color: 'var(--text-muted, #5e625a)' }}>
                <tr>
                  <th className="pb-2">Industry Sector</th>
                  <th className="pb-2">Protected Zone Distance</th>
                  <th className="pb-2">Forest Conservation Rule</th>
                  <th className="pb-2">Approval Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs sm:text-sm" style={{ borderColor: 'var(--border-subtle, #d5cfc2)', color: 'var(--text-main, #1a1d1a)' }}>
                {SECTOR_SUMMARY_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#eae6dc]/30">
                    <td className="py-2.5 font-semibold">{row.sector}</td>
                    <td className="py-2.5 font-mono" style={{ color: 'var(--color-secondary, #9c6519)' }}>{row.eszBuffer}</td>
                    <td className="py-2.5">{row.fcaThreshold}</td>
                    <td className="py-2.5 font-mono" style={{ color: 'var(--color-primary, #284e3a)' }}>{row.statutoryBody}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}
