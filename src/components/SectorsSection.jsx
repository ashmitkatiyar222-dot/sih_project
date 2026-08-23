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
  const [focusedRow, setFocusedRow] = useState(null);

  return (
    <section
      id="sectors"
      className="py-8 sm:py-12 border-t relative overflow-hidden bg-[#EBF3EC]"
      style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
    >
      {/* Bottom Edge Vector Silhouette: National Clean Infrastructure & Energy Grid Corridors */}
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
          {/* Layer 1: Distant Topographic Ridgeline */}
          <path
            d="M0,150 Q240,90 480,125 T960,105 T1440,130 L1440,320 L0,320 Z"
            fill="#A8C2AF"
            opacity="0.65"
          />
          <path d="M 60, 140 Q 260, 105 480, 135 T 960, 120 T 1400, 140" stroke="#8CA993" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.45" />

          {/* Layer 2: Middle Infrastructure Landscape */}
          <path
            d="M0,195 Q200,140 440,170 T880,150 T1280,185 T1440,165 L1440,320 L0,320 Z"
            fill="#8CA993"
            opacity="0.85"
          />

          {/* Topographic Elevation Iso-Lines */}
          <path d="M 40, 215 Q 240, 175 440, 200 T 880, 180 T 1320, 210" stroke="#A8C2AF" strokeWidth="1.4" opacity="0.5" />
          <path d="M 0, 255 Q 220, 215 440, 240 T 880, 215 T 1280, 245 T 1440, 225" stroke="#A8C2AF" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.4" />

          {/* Unique National Infrastructure Elements: Solar Arrays, Transmission Pylons, Expressway Bridge, Port Cranes */}
          <g stroke="#52785D" fill="#52785D" opacity="0.95">
            {/* 1. Solar Photovoltaic Grid Array on the Left Slope */}
            <g strokeWidth="1.2" fill="#658C70" opacity="0.85">
              <polygon points="120,175 160,168 158,180 118,187" />
              <polygon points="168,167 208,160 206,172 166,179" />
              <polygon points="216,159 256,152 254,164 214,171" />
              <polygon points="125,193 165,186 163,198 123,205" />
              <polygon points="173,185 213,178 211,190 171,197" />
              <polygon points="221,177 261,170 259,182 219,189" />
            </g>

            {/* 2. High-Voltage Transmission Grid Lattice Pylons */}
            {/* Pylon 1 */}
            <path d="M 374, 190 L 378, 85 L 382, 85 L 386, 190 M 372, 110 L 388, 110 M 368, 130 L 392, 130 M 365, 150 L 395, 150 M 374, 190 L 386, 150 L 374, 150 L 386, 190 M 375, 150 L 385, 130 L 375, 130 L 385, 150 M 377, 130 L 383, 110 L 377, 110 L 383, 130" fill="none" strokeWidth="1.6" />
            <circle cx="380" cy="85" r="2" />

            {/* Pylon 2 */}
            <path d="M 554, 180 L 558, 75 L 562, 75 L 566, 180 M 552, 100 L 568, 100 M 548, 120 L 572, 120 M 545, 140 L 575, 140 M 554, 180 L 566, 140 L 554, 140 L 566, 180 M 555, 140 L 565, 120 L 555, 120 L 565, 140 M 557, 120 L 563, 100 L 557, 100 L 563, 120" fill="none" strokeWidth="1.6" />
            <circle cx="560" cy="75" r="2" />

            {/* Sweeping Catenary Power Transmission Cables */}
            <path d="M 368, 130 Q 464, 150 548, 120" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
            <path d="M 372, 110 Q 466, 130 552, 100" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
            <path d="M 572, 120 Q 660, 145 750, 130" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.75" />

            {/* 3. Expressway Suspension Bridge */}
            <rect x="740" y="168" width="200" height="4" rx="1" fill="#52785D" />
            <rect x="790" y="125" width="5" height="43" fill="#52785D" />
            <rect x="885" y="125" width="5" height="43" fill="#52785D" />
            <path d="M 740, 168 Q 792, 130 838, 155 Q 887, 130 940, 168" fill="none" strokeWidth="1.5" />
            <line x1="770" y1="168" x2="770" y2="152" strokeWidth="1" />
            <line x1="815" y1="168" x2="815" y2="146" strokeWidth="1" />
            <line x1="838" y1="168" x2="838" y2="155" strokeWidth="1" />
            <line x1="860" y1="168" x2="860" y2="146" strokeWidth="1" />
            <line x1="910" y1="168" x2="910" y2="152" strokeWidth="1" />

            {/* 4. Sustainable Industrial Eco-Hub & Coastal Port Silhouette */}
            <path d="M 1060, 195 L 1060, 175 Q 1085, 150 1110, 175 L 1110, 195 Z" fill="#658C70" opacity="0.8" />
            <rect x="1118" y="165" width="22" height="30" rx="1" fill="#52785D" />
            <rect x="1144" y="155" width="16" height="40" rx="1" fill="#52785D" />
            <line x1="1152" y1="155" x2="1152" y2="135" strokeWidth="1.8" />

            {/* Port Gantry Crane Silhouette */}
            <rect x="1230" y="155" width="4" height="40" fill="#52785D" />
            <rect x="1255" y="155" width="4" height="40" fill="#52785D" />
            <polygon points="1215,155 1280,155 1275,148 1220,148" fill="#52785D" />
            <line x1="1230" y1="155" x2="1255" y2="195" strokeWidth="1.2" />
            <line x1="1255" y1="155" x2="1230" y2="195" strokeWidth="1.2" />
            <line x1="1265" y1="155" x2="1265" y2="175" strokeWidth="1.5" />
            <rect x="1260" y="175" width="10" height="6" fill="#52785D" />

            {/* Coastal Lighthouse / Navigation Tower */}
            <polygon points="1335,210 1345,210 1342,145 1338,145" fill="#52785D" />
            <circle cx="1340" cy="142" r="4" fill="#658C70" />
            <line x1="1340" y1="138" x2="1340" y2="130" strokeWidth="1.5" />
          </g>

          {/* Baseline Ground Strip */}
          <rect x="0" y="305" width="1440" height="15" fill="#8CA993" />
        </svg>
      </div>

      {/* Soft Ambient Subtle Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
        {/* Structured 2-Column Matrix Container */}
        <Card className="overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x p-0 scroll-reveal shadow-sm bg-white/80 backdrop-blur-xs">
          {/* Left Column: Sector Selector Tabs (5 Cols) */}
          <div className="lg:col-span-5 p-4 sm:p-5 space-y-2">
            <div className="text-xs font-mono uppercase font-bold tracking-wider mb-1.5" style={{ color: 'var(--text-muted, #5e625a)' }}>
              Select Infrastructure Sector:
            </div>
            {SECTOR_DATA.map((sec) => {
              const isSelected = activeSector.id === sec.id;
              const IconComp = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSector(sec)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ease-out flex items-center justify-between cursor-pointer ${isSelected
                      ? 'border-l-2 translate-x-0.5 shadow-2xs'
                      : 'hover:translate-x-0.5 hover:bg-white/60'
                    }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-primary-light, #e3ebe5)' : 'transparent',
                    borderColor: isSelected ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                    borderLeftColor: isSelected ? 'var(--color-primary, #284e3a)' : undefined,
                    color: 'var(--text-main, #1a1d1a)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 shrink-0"
                      style={{
                        backgroundColor: isSelected
                          ? 'var(--color-primary, #284e3a)'
                          : 'rgba(255, 255, 255, 0.55)',
                        borderColor: isSelected
                          ? 'var(--color-primary, #284e3a)'
                          : 'rgba(255, 255, 255, 0.75)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
                        backdropFilter: isSelected ? 'none' : 'blur(8px)',
                        WebkitBackdropFilter: isSelected ? 'none' : 'blur(8px)',
                        boxShadow: isSelected
                          ? '0 2px 8px rgba(40, 78, 58, 0.3)'
                          : 'inset 0 1px 1px rgba(255, 255, 255, 0.85), 0 2px 6px -1px rgba(0, 0, 0, 0.06)',
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
                    <span className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                      Active ▸
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Regulatory Breakdown (7 Cols) */}
          <div
            className="lg:col-span-7 p-4 sm:p-5 flex flex-col justify-between"
            style={{ backgroundColor: 'rgba(250, 249, 245, 0.85)' }}
          >
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
                className="px-2.5 py-1 rounded border text-xs font-mono font-bold shrink-0"
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
            <div className="space-y-2.5 my-3 flex-1 flex flex-col justify-between">
              {/* 1. Mandatory Environmental Safety Checks - Soft Sage Green */}
              <div
                className="p-3 rounded-lg border flex-1 flex flex-col justify-center transition-all"
                style={{
                  backgroundColor: 'rgba(238, 245, 240, 0.85)',
                  borderColor: 'rgba(40, 78, 58, 0.22)',
                }}
              >
                <div className="text-xs font-mono uppercase font-bold flex items-center gap-1.5" style={{ color: '#1e3e2c' }}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Mandatory Environmental Safety Checks
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  {activeSector.constraints}
                </p>
              </div>

              {/* 2. Applicable National Environmental Laws - Soft Warm Amber */}
              <div
                className="p-3 rounded-lg border flex-1 flex flex-col justify-center transition-all"
                style={{
                  backgroundColor: 'rgba(253, 247, 237, 0.85)',
                  borderColor: 'rgba(156, 101, 25, 0.25)',
                }}
              >
                <div className="text-xs font-mono uppercase font-bold flex items-center gap-1.5" style={{ color: '#7a4d10' }}>
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  Applicable National Environmental Laws
                </div>
                <p className="text-xs sm:text-sm mt-1 font-mono leading-relaxed" style={{ color: '#52564e' }}>
                  {activeSector.statutoryActs}
                </p>
              </div>

              {/* 3. Spatial Boundary Verification Logic - Soft Slate Blue */}
              <div
                className="p-3 rounded-lg border flex-1 flex flex-col justify-center transition-all"
                style={{
                  backgroundColor: 'rgba(240, 246, 252, 0.85)',
                  borderColor: 'rgba(30, 80, 130, 0.22)',
                }}
              >
                <div className="text-xs font-mono uppercase font-bold flex items-center gap-1.5" style={{ color: '#1b456b' }}>
                  <Compass className="w-3.5 h-3.5 text-sky-700" />
                  Spatial Boundary Verification Logic
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  {activeSector.gisCheck}
                </p>
              </div>
            </div>

            {/* Clearance Issuing Authority Box */}
            <div
              className="p-2.5 rounded-lg border flex items-center justify-between text-xs font-mono shadow-2xs"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              <span style={{ color: 'var(--text-muted, #5e625a)' }}>Clearance Issuing Authority:</span>
              <span className="font-bold text-stone-900">{activeSector.clearanceBody}</span>
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

          <div className="w-full overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm font-sans table-auto">
              <thead className="font-mono text-xs uppercase border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)', color: 'var(--text-muted, #5e625a)' }}>
                <tr>
                  <th className="pb-2">Industry Sector</th>
                  <th className="pb-2">Protected Zone Distance</th>
                  <th className="pb-2">Forest Conservation Rule</th>
                  <th className="pb-2">Approval Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs sm:text-sm" style={{ borderColor: 'var(--border-subtle, #d5cfc2)', color: 'var(--text-main, #1a1d1a)' }}>
                {SECTOR_SUMMARY_MATRIX.map((row, idx) => {
                  const isFocused = focusedRow === idx;
                  return (
                    <tr
                      key={idx}
                      onMouseEnter={() => setFocusedRow(idx)}
                      onMouseLeave={() => setFocusedRow(null)}
                      className={`cursor-pointer transition-all duration-200 ease-out ${isFocused
                          ? 'bg-[#e3ebe5]/80 shadow-2xs border-l-2 translate-x-0.5'
                          : 'hover:bg-[#e3ebe5]/40'
                        }`}
                      style={{
                        borderLeftColor: isFocused ? 'var(--color-primary, #284e3a)' : undefined,
                      }}
                    >
                      <td className="py-2.5 font-semibold flex items-center gap-2">
                        {isFocused && (
                          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--color-primary, #284e3a)' }} />
                        )}
                        {row.sector}
                      </td>
                      <td className="py-2.5 font-mono" style={{ color: 'var(--color-secondary, #9c6519)' }}>{row.eszBuffer}</td>
                      <td className="py-2.5">{row.fcaThreshold}</td>
                      <td className="py-2.5 font-mono" style={{ color: 'var(--color-primary, #284e3a)' }}>{row.statutoryBody}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}
