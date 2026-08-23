import React, { useState } from 'react';
import { Mountain, Compass, Rotate3D, Sliders, Layers, Radio, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import Terrain3DViewer from './Terrain3DViewer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { PRESETS } from '../constants/presets';

const SHOWCASE_PRESETS = [
  { key: 'aravalli', name: 'Aravalli Quartzite Ridge', state: 'Rajasthan', elev: '462m AMSL', type: 'Rugged Hill Ridge', color: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
  { key: 'western_ghats', name: 'Western Ghats Escarpment', state: 'Kerala/Karnataka', elev: '920m AMSL', type: 'Steep Montane Catchment', color: 'border-blue-300 bg-blue-50 text-blue-900' },
  { key: 'bhadla_solar', name: 'Bhadla Desert Plain', state: 'Rajasthan', elev: '220m AMSL', type: 'Arid Sand Dune Plain', color: 'border-amber-300 bg-amber-50 text-amber-900' },
  { key: 'yamuna_corridor', name: 'Yamuna River Basin', state: 'Uttar Pradesh', elev: '198m AMSL', type: 'Alluvial River Floodplain', color: 'border-cyan-300 bg-cyan-50 text-cyan-900' },
  { key: 'sundarbans', name: 'Sundarbans Delta Channels', state: 'West Bengal', elev: '3m AMSL', type: 'Coastal Mangrove Estuary', color: 'border-purple-300 bg-purple-50 text-purple-900' },
];

const PRESET_GEO = {
  aravalli: {
    lat: 27.0238,
    lng: 76.3557,
    blips: [
      { id: 'sariska', name: 'Sariska National Park', dist: 4.2, type: 'park' },
      { id: 'lake', name: 'Siliserh Lake Catchment', dist: 8.7, type: 'river' },
      { id: 'aqi', name: 'Bhiwadi Monitoring Station', dist: 6.4, type: 'aqi' },
    ],
  },
  western_ghats: {
    lat: 11.6854,
    lng: 76.1320,
    blips: [
      { id: 'wayanad', name: 'Wayanad Wildlife Sanctuary', dist: 2.1, type: 'park' },
      { id: 'kabini', name: 'Kabini River Tributary', dist: 3.4, type: 'river' },
      { id: 'elephant', name: 'Nilgiri Elephant Corridor', dist: 1.8, type: 'park' },
    ],
  },
  bhadla_solar: {
    lat: 27.5386,
    lng: 71.9161,
    blips: [
      { id: 'gib', name: 'Great Indian Bustard Sanctuary', dist: 9.8, type: 'park' },
      { id: 'canal', name: 'Indira Gandhi Canal Feeder', dist: 11.2, type: 'river' },
    ],
  },
  yamuna_corridor: {
    lat: 28.4595,
    lng: 77.5126,
    blips: [
      { id: 'yamuna', name: 'Yamuna River Active Channel', dist: 1.4, type: 'river' },
      { id: 'okhla', name: 'Okhla Bird Sanctuary', dist: 8.6, type: 'park' },
      { id: 'aqi_ncr', name: 'Greater Noida CAAQMS Station', dist: 2.8, type: 'aqi' },
    ],
  },
  sundarbans: {
    lat: 21.8465,
    lng: 88.3562,
    blips: [
      { id: 'biosphere', name: 'Sundarbans Biosphere Reserve', dist: 3.8, type: 'park' },
      { id: 'matla', name: 'Matla River Estuary Flow', dist: 0.6, type: 'river' },
      { id: 'mangrove', name: 'Rhizophora Canopy Forest', dist: 1.9, type: 'park' },
    ],
  },
};

export default function TerrainShowcaseSection() {
  const [selectedKey, setSelectedKey] = useState('aravalli');
  const [bufferRadius, setBufferRadius] = useState(10);

  const activePreset = SHOWCASE_PRESETS.find((p) => p.key === selectedKey) || SHOWCASE_PRESETS[0];
  const geoData = PRESET_GEO[selectedKey] || PRESET_GEO.aravalli;

  return (
    <section id="terrain-3d-showcase" className="py-8 sm:py-12 border-t relative overflow-hidden bg-gradient-to-b from-[#e8f5ec]/70 via-[#f2faf5] to-[#f4f1ea]" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
      {/* Ambient Light Green / Emerald Glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left scroll-reveal-header">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                <Rotate3D className="w-3.5 h-3.5" />
                3D SHOWCASE
              </span>
              <span className="text-xs font-mono text-stone-500">Three.js WebGL DEM</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5"
              style={{ color: 'var(--text-main, #1a1d1a)' }}
            >
              3D Digital Elevation &amp; Terrain Modeling
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted, #5e625a)' }}>
              Interactive 3D topography mesh scanner rendering real-time elevation ridges, regulatory buffer boundary envelopes, and spatial hazard markers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono self-start sm:self-auto shrink-0">
            <span className="px-2.5 py-1 rounded border bg-white/80 border-stone-300 text-stone-700 shadow-xs flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              Orbit · Tilt · Zoom
            </span>
          </div>
        </div>

        {/* 3D Showcase Card Container */}
        <Card className="p-4 sm:p-6 space-y-4 scroll-reveal shadow-md bg-white/90">
          {/* Preset Region Buttons & Buffer Range Slider */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
            {/* Region Selector Pills */}
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase font-bold text-stone-600">
                Select 3D Topography Region:
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {SHOWCASE_PRESETS.map((p) => {
                  const isSelected = selectedKey === p.key;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setSelectedKey(p.key)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#284e3a] text-white border-[#284e3a] shadow-xs font-bold'
                          : 'bg-stone-100/80 text-stone-700 border-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      <Mountain className="w-3.5 h-3.5" />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Buffer Envelope Slider */}
            <div className="min-w-[240px] space-y-1 bg-stone-50 p-2.5 rounded border border-stone-200">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-semibold text-stone-700">3D Buffer Envelope Radius:</span>
                <span className="font-bold text-emerald-800">{bufferRadius} km</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={bufferRadius}
                onChange={(e) => setBufferRadius(parseInt(e.target.value, 10))}
                className="w-full h-1.5 rounded appearance-none cursor-pointer accent-emerald-700 bg-stone-300"
              />
            </div>
          </div>

          {/* 3D WebGL Canvas */}
          <div className="rounded overflow-hidden border border-stone-300 shadow-inner">
            <Terrain3DViewer
              presetKey={selectedKey}
              geoData={geoData}
              bufferRadius={bufferRadius}
            />
          </div>

          {/* Bottom Telemetry & Topography Specifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-2.5 rounded border bg-emerald-50/70 border-emerald-200">
              <div className="text-xs font-mono uppercase font-bold text-emerald-800">
                Terrain Regime
              </div>
              <div className="text-sm sm:text-base font-bold mt-0.5 text-emerald-950 truncate">
                {activePreset.type}
              </div>
              <p className="text-xs text-emerald-800/80 mt-0.5">{activePreset.state}</p>
            </div>

            <div className="p-2.5 rounded border bg-emerald-50/70 border-emerald-200">
              <div className="text-xs font-mono uppercase font-bold text-emerald-800">
                Peak Elevation
              </div>
              <div className="text-sm sm:text-base font-mono font-bold mt-0.5 text-emerald-950">
                {activePreset.elev}
              </div>
              <p className="text-xs text-emerald-800/80 mt-0.5">Topographic survey</p>
            </div>

            <div className="p-2.5 rounded border bg-amber-50/70 border-amber-200">
              <div className="text-xs font-mono uppercase font-bold text-amber-800">
                Regulatory Cylinder
              </div>
              <div className="text-sm sm:text-base font-mono font-bold mt-0.5 text-amber-950">
                {bufferRadius} km ESZ Radius
              </div>
              <p className="text-xs text-amber-800/80 mt-0.5">Automated raycast zone</p>
            </div>

            <div className="p-2.5 rounded border bg-purple-50/70 border-purple-200">
              <div className="text-xs font-mono uppercase font-bold text-purple-800">
                Hazard Proximity
              </div>
              <div className="text-sm sm:text-base font-mono font-bold mt-0.5 text-purple-950">
                {geoData.blips.length} Spatial Hazards
              </div>
              <p className="text-xs text-purple-800/80 mt-0.5">Real-time distance check</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
