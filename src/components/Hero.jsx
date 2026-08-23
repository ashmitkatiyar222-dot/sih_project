import React, { useState } from 'react';
import {
  Layers,
  Factory,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Radar,
  Zap,
  Sliders,
  TreePine,
  Wind,
  Droplets,
  Sun,
  Sparkles,
  RefreshCw,
  Anchor,
  Flame,
} from 'lucide-react';
import { PRESETS } from '../constants/presets';

const PRESET_GEO_DATA = {
  aravalli: {
    icon: Factory,
    typeLabel: 'Mining & Quarrying',
    maxRange: 15,
    blips: [
      {
        id: 'tiger',
        name: 'Sariska Tiger Reserve',
        dist: 4.2,
        angle: -35,
        type: 'wildlife',
        severity: 'amber',
        status: 'Buffer Intersect (4.2 km < 10 km ESZ)',
        rule: 'MoEFCC ESZ Notification 2011 · Wildlife Board Mandate',
      },
      {
        id: 'aqi',
        name: 'Aravalli Airshed Monitor',
        dist: 5.0,
        angle: 75,
        type: 'aqi',
        severity: 'amber',
        status: 'PM2.5: 142 µg/m³ (Non-Attainment)',
        rule: 'National Ambient Air Quality Standards (NAAQS)',
      },
      {
        id: 'hydro',
        name: 'Aquifer Recharge Zone',
        dist: 8.5,
        angle: 145,
        type: 'hydro',
        severity: 'orange',
        status: 'High Runoff Catchment Zone',
        rule: 'Central Ground Water Authority (CGWA) Guidelines',
      },
    ],
  },
  western_ghats: {
    icon: Droplets,
    typeLabel: 'Hydroelectric Dam',
    maxRange: 20,
    blips: [
      {
        id: 'wayanad',
        name: 'Wayanad Wildlife Sanctuary',
        dist: 1.1,
        angle: 25,
        type: 'wildlife',
        severity: 'red',
        status: 'CRITICAL: Direct Canopy Edge (1.1 km)',
        rule: 'UNESCO World Heritage Sensitive Core Zone',
      },
      {
        id: 'river',
        name: 'Kabini River Perennial Basin',
        dist: 0.8,
        angle: -80,
        type: 'hydro',
        severity: 'red',
        status: 'Immediate River Catchment Ingress',
        rule: 'River Valley Project Statutory Clearance (Cat A)',
      },
      {
        id: 'aqi',
        name: 'Western Ghats Pristine Station',
        dist: 5.0,
        angle: 155,
        type: 'aqi',
        severity: 'emerald',
        status: 'PM2.5: 28 µg/m³ (Pristine Airshed)',
        rule: 'CPCB Baseline Forest Airshed Metrics',
      },
    ],
  },
  bhadla_solar: {
    icon: Sun,
    typeLabel: '500MW Solar PV Farm',
    maxRange: 15,
    blips: [
      {
        id: 'desert',
        name: 'Desert National Park',
        dist: 42.0,
        angle: 110,
        type: 'wildlife',
        severity: 'emerald',
        status: 'Clear (>40 km Outside Buffer)',
        rule: 'MoEFCC SOP for Utility-Scale Solar Projects',
      },
      {
        id: 'arid',
        name: 'Arid Non-Basin Layer',
        dist: 10.0,
        angle: -40,
        type: 'hydro',
        severity: 'emerald',
        status: 'Zero Groundwater Depletion Risk',
        rule: 'State Water Policy Exemption Tier-1',
      },
      {
        id: 'aqi',
        name: 'Desert Air Station',
        dist: 5.0,
        angle: -130,
        type: 'aqi',
        severity: 'emerald',
        status: 'PM2.5: 64 µg/m³ (Desert Dust Baseline)',
        rule: 'Air Pollution Control Act 1981',
      },
    ],
  },
  yamuna_corridor: {
    icon: Flame,
    typeLabel: 'Synthetic Chemicals',
    maxRange: 15,
    blips: [
      {
        id: 'okhla',
        name: 'Okhla Bird Sanctuary',
        dist: 9.8,
        angle: -55,
        type: 'wildlife',
        severity: 'orange',
        status: 'Adjoining 10 km Buffer Fringe',
        rule: 'National Green Tribunal (NGT) NCR Radius Act',
      },
      {
        id: 'floodplain',
        name: 'Yamuna Floodplain 500m Line',
        dist: 2.5,
        angle: 70,
        type: 'hydro',
        severity: 'orange',
        status: '500m Buffer Adherence Checked',
        rule: 'Yamuna River Protection Order',
      },
      {
        id: 'aqi',
        name: 'NCR Severe Airshed CEMS',
        dist: 5.0,
        angle: 175,
        type: 'aqi',
        severity: 'red',
        status: 'PM2.5: 210 µg/m³ (Severe Non-Attainment)',
        rule: 'Commission for Air Quality Management (CAQM)',
      },
    ],
  },
  sundarbans: {
    icon: Anchor,
    typeLabel: 'Coastal Logistics Port',
    maxRange: 18,
    blips: [
      {
        id: 'sundar_bio',
        name: 'Sundarbans Biosphere Reserve',
        dist: 2.8,
        angle: 40,
        type: 'wildlife',
        severity: 'purple',
        status: 'CRZ-I Ecologically Sensitive Zone (2.8 km)',
        rule: 'Coastal Regulation Zone Notification 2019',
      },
      {
        id: 'tidal',
        name: 'Tidal Estuarine Ingress',
        dist: 1.5,
        angle: -115,
        type: 'hydro',
        severity: 'purple',
        status: 'High Salinity & Mangrove Canopy',
        rule: 'Compensatory Afforestation Fund (CAMPA) Act',
      },
      {
        id: 'aqi',
        name: 'Coastal Marine Airshed',
        dist: 5.0,
        angle: 120,
        type: 'aqi',
        severity: 'emerald',
        status: 'PM2.5: 35 µg/m³ (Marine Air)',
        rule: 'CPCB Baseline Coastal Guidelines',
      },
    ],
  },
};

export default function Hero({ onLaunchConsole, onLoadPreset }) {
  const [selectedKey, setSelectedKey] = useState('aravalli');
  const [bufferRadius, setBufferRadius] = useState(10);
  const [activeLayers, setActiveLayers] = useState({
    wildlife: true,
    aqi: true,
    hydro: true,
  });
  const [hoveredBlip, setHoveredBlip] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const activePreset = PRESETS[selectedKey] || PRESETS.aravalli;
  const activeGeo = PRESET_GEO_DATA[selectedKey] || PRESET_GEO_DATA.aravalli;
  const ProjectIcon = activeGeo.icon || Factory;

  const handleSelectPreset = (key) => {
    setSelectedKey(key);
    const data = PRESETS[key];
    if (data) {
      setBufferRadius(data.buffer);
    }
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 400);
  };

  const toggleLayer = (layerKey) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleInspectInSimulator = () => {
    if (onLoadPreset) {
      onLoadPreset(selectedKey);
    }
    if (onLaunchConsole) {
      onLaunchConsole();
    }
  };

  // Check if buffer touches any wildlife/hydro blip
  const conflicts = activeGeo.blips.filter(
    (b) => activeLayers[b.type] && b.dist <= bufferRadius
  );

  const getSeverityBadge = (color) => {
    switch (color) {
      case 'red':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'amber':
      case 'orange':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'emerald':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-32 overflow-hidden">
      {/* Clean grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E2DC_1px,transparent_1px),linear-gradient(to_bottom,#E5E2DC_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F5F4F0] to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-sans text-stone-600 font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI-Powered Geospatial Environmental Clearance</span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="text-4xl sm:text-6xl font-sans font-extrabold text-stone-900 tracking-tight leading-[1.08]">
              Instant green clearance for any project.{' '}
              <span className="text-emerald-700 block mt-1">
                Zero paperwork. 0.38s speed.
              </span>
            </h1>

            {/* Plain English Subtitle */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl font-sans font-normal bg-white/90 p-5 rounded-2xl border border-stone-200 shadow-sm backdrop-blur-xs">
              Ecoryx automatically screens infrastructure sites against national wildlife sanctuaries, protected forest zones, and clean air acts in sub-second time. Eliminates 6 months of manual paper reviews with verified AI compliance reports.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onLaunchConsole}
                className="px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95 cursor-pointer group"
              >
                <span>Launch Live Simulator</span>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#sectors"
                className="px-7 py-3.5 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                Explore Project Types
              </a>
            </div>

            {/* Live 3-Column Stats Showcase */}
            <div className="pt-2 grid grid-cols-3 gap-3">
              <div className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-sm">
                <div className="text-2xl font-extrabold text-stone-900">&lt; 0.38s</div>
                <div className="text-[11px] text-stone-500 font-medium mt-0.5">PostGIS Latency</div>
              </div>
              <div className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-sm">
                <div className="text-2xl font-extrabold text-emerald-600">100%</div>
                <div className="text-[11px] text-stone-500 font-medium mt-0.5">Rule Automation</div>
              </div>
              <div className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-sm">
                <div className="text-2xl font-extrabold text-stone-900">2,400+</div>
                <div className="text-[11px] text-stone-500 font-medium mt-0.5">MoEFCC Gazette Rules</div>
              </div>
            </div>
          </div>

          {/* Right Interactive Radar Audit Console (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
              {/* Header with Live Status */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-stone-900 tracking-wider flex items-center gap-1.5">
                      <Radar className="w-3.5 h-3.5 text-emerald-600" />
                      LIVE RADIUS AUDIT
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-600" />
                  0.38s GIS Scan
                </span>
              </div>

              {/* Interactive Scenario Presets Bar */}
              <div className="pt-3 pb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
                    Simulate Project Site:
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {activeGeo.typeLabel}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { key: 'aravalli', label: 'Aravalli Mining', icon: '⛏️' },
                    { key: 'western_ghats', label: 'W. Ghats Dam', icon: '🌊' },
                    { key: 'bhadla_solar', label: 'Bhadla Solar', icon: '☀️' },
                    { key: 'yamuna_corridor', label: 'Yamuna Chem', icon: '🏭' },
                    { key: 'sundarbans', label: 'Sundarbans Port', icon: '⚓' },
                  ].map((p) => {
                    const isSelected = selectedKey === p.key;
                    return (
                      <button
                        key={p.key}
                        onClick={() => handleSelectPreset(p.key)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
                          isSelected
                            ? 'bg-stone-900 text-white shadow-sm'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80'
                        }`}
                      >
                        <span className="text-[11px]">{p.icon}</span>
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Radar Screen Visualizer */}
              <div className="bg-stone-900 rounded-2xl p-4 border border-stone-800 relative overflow-hidden text-white shadow-inner">
                {/* Radial Grid Backdrop */}
                <div className="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center">
                  {/* Outer Radar Ring (15km) */}
                  <div className="absolute inset-0 rounded-full border border-stone-700/60 flex items-center justify-center">
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-stone-500">
                      15 km
                    </span>
                  </div>

                  {/* Dynamic Buffer Radius Ring (User controllable) */}
                  <div
                    style={{
                      width: `${Math.min(100, (bufferRadius / 15) * 100)}%`,
                      height: `${Math.min(100, (bufferRadius / 15) * 100)}%`,
                    }}
                    className={`absolute rounded-full border border-dashed transition-all duration-300 flex items-center justify-center ${
                      conflicts.length > 0
                        ? 'border-amber-400/80 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                        : 'border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    }`}
                  >
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.2 text-[8px] font-mono font-bold rounded bg-stone-900 text-emerald-400 border border-emerald-500/40">
                      SCAN: {bufferRadius} km
                    </span>
                  </div>

                  {/* 10km Statutory ESZ Reference Ring */}
                  <div className="absolute w-[66.6%] h-[66.6%] rounded-full border border-dotted border-emerald-500/30 flex items-center justify-center pointer-events-none">
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-emerald-400/60">
                      10 km ESZ Standard
                    </span>
                  </div>

                  {/* 5km Air Quality Zone Ring */}
                  <div className="absolute w-[33.3%] h-[33.3%] rounded-full border border-dashed border-amber-400/40 flex items-center justify-center pointer-events-none">
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-amber-400/60">
                      5 km
                    </span>
                  </div>

                  {/* Rotating Radar Sweep Beam */}
                  <div
                    className={`absolute inset-0 rounded-full pointer-events-none ${
                      isScanning ? 'animate-radar-sweep' : 'animate-radar-sweep'
                    }`}
                    style={{
                      background:
                        'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.25) 0deg, rgba(16, 185, 129, 0.05) 45deg, transparent 90deg)',
                    }}
                  />

                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-full h-[1px] bg-stone-500" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="h-full w-[1px] bg-stone-500" />
                  </div>

                  {/* Dynamic POI Blips */}
                  {activeGeo.blips.map((blip) => {
                    if (!activeLayers[blip.type]) return null;
                    const rad = (blip.angle * Math.PI) / 180;
                    // Normalized distance relative to 15km radar scale
                    const normalizedDist = Math.min(1.0, blip.dist / 15);
                    const leftPct = 50 + normalizedDist * 44 * Math.cos(rad);
                    const topPct = 50 + normalizedDist * 44 * Math.sin(rad);

                    let blipColor = 'bg-emerald-400 text-emerald-300 border-emerald-400';
                    if (blip.severity === 'amber' || blip.severity === 'orange') {
                      blipColor = 'bg-amber-400 text-amber-300 border-amber-400';
                    } else if (blip.severity === 'red') {
                      blipColor = 'bg-rose-500 text-rose-300 border-rose-500';
                    } else if (blip.severity === 'purple') {
                      blipColor = 'bg-purple-400 text-purple-300 border-purple-400';
                    }

                    const isHovered = hoveredBlip?.id === blip.id;

                    return (
                      <div
                        key={blip.id}
                        style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                        onMouseEnter={() => setHoveredBlip(blip)}
                        onMouseLeave={() => setHoveredBlip(null)}
                        onClick={() => setHoveredBlip(blip)}
                      >
                        {/* Blip Ping Animation */}
                        <div
                          className={`w-3 h-3 rounded-full ${blipColor.split(' ')[0]} animate-ping-slow absolute inset-0 opacity-75`}
                        />
                        {/* Blip Dot */}
                        <div
                          className={`w-3 h-3 rounded-full ${blipColor.split(' ')[0]} border-2 border-stone-900 shadow-md relative flex items-center justify-center`}
                        >
                          <span className="w-1 h-1 rounded-full bg-stone-900" />
                        </div>

                        {/* Blip Label */}
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-mono whitespace-nowrap bg-stone-950/90 px-1.5 py-0.5 rounded border border-stone-700 text-stone-300 shadow group-hover:border-emerald-400 group-hover:text-white transition-all">
                          {blip.name.split(' ')[0]} ({blip.dist}km)
                        </span>
                      </div>
                    );
                  })}

                  {/* Center Core Project Node */}
                  <div className="relative z-20 w-12 h-12 rounded-full bg-stone-800 border-2 border-emerald-500 flex flex-col items-center justify-center text-center p-1 shadow-lg group">
                    <ProjectIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-[6.5px] font-mono font-bold text-stone-200 tracking-tighter">
                      PROJECT
                    </span>
                  </div>
                </div>

                {/* Blip Detail / Active Scan Notification Overlay */}
                <div className="mt-3 pt-2.5 border-t border-stone-800 text-[11px] font-sans flex items-center justify-between min-h-[32px]">
                  {hoveredBlip ? (
                    <div className="text-left animate-fadeIn">
                      <span className="text-emerald-400 font-bold font-mono">
                        {hoveredBlip.name}
                      </span>
                      <span className="text-stone-300 ml-1.5">
                        · {hoveredBlip.status}
                      </span>
                    </div>
                  ) : (
                    <div className="text-stone-400 flex items-center gap-1.5 text-[11px]">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>
                        {conflicts.length > 0
                          ? `⚠️ ${conflicts.length} statutory layer buffer intersect detected`
                          : '✅ Zero protected buffer conflicts within scan radius'}
                      </span>
                    </div>
                  )}
                  <span className="text-[10px] font-mono text-stone-400 shrink-0">
                    Hover blips for rules
                  </span>
                </div>
              </div>

              {/* Real-Time Interactive Controls: Buffer Slider & Layer Toggles */}
              <div className="pt-3.5 space-y-3">
                {/* Buffer Slider */}
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-stone-500" />
                      Live Buffer Scan Radius
                    </span>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded text-[11px]">
                      {bufferRadius} km
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={bufferRadius}
                    onChange={(e) => setBufferRadius(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
                    <span>5 km (Local)</span>
                    <span>10 km (MoEFCC Standard)</span>
                    <span>20 km (Extended)</span>
                  </div>
                </div>

                {/* Layer Filter Toggles */}
                <div className="flex items-center justify-between gap-1.5 text-xs">
                  <button
                    onClick={() => toggleLayer('wildlife')}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      activeLayers.wildlife
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-400 opacity-60'
                    }`}
                  >
                    <TreePine className="w-3 h-3 text-emerald-600" />
                    <span>Wildlife (ESZ)</span>
                  </button>

                  <button
                    onClick={() => toggleLayer('aqi')}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      activeLayers.aqi
                        ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-400 opacity-60'
                    }`}
                  >
                    <Wind className="w-3 h-3 text-amber-600" />
                    <span>Air Quality</span>
                  </button>

                  <button
                    onClick={() => toggleLayer('hydro')}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      activeLayers.hydro
                        ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-400 opacity-60'
                    }`}
                  >
                    <Droplets className="w-3 h-3 text-blue-600" />
                    <span>Hydrology</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Real-Time Verdict & Action Footer */}
              <div className="mt-3.5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <div className="text-left">
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                    Computed Verdict:
                  </div>
                  <div
                    className={`text-xs font-bold font-sans mt-0.5 inline-flex items-center gap-1 px-2 py-0.5 rounded border ${getSeverityBadge(
                      activePreset.badgeColor
                    )}`}
                  >
                    {activePreset.riskScore > 75 ? (
                      <ShieldAlert className="w-3 h-3" />
                    ) : (
                      <ShieldCheck className="w-3 h-3" />
                    )}
                    <span>{activePreset.verdict}</span>
                  </div>
                </div>

                <button
                  onClick={handleInspectInSimulator}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer shrink-0 group"
                >
                  <span>Audit in Console</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






