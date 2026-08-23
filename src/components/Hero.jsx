import React, { useState } from 'react';
import {
  Layers,
  Factory,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Radar,
  Zap,
  Sliders,
  TreePine,
  Wind,
  Droplets,
  Sparkles,
  Database,
  CheckCircle2,
  Scale,
  Activity,
} from 'lucide-react';
import { PRESETS } from '../constants/presets';
import TopographyRadiusMap from './TopographyRadiusMap';

// Calculate Haversine distance in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

const PRESET_GEO_DATA = {
  aravalli: {
    icon: Factory,
    typeLabel: 'Mining & Quarrying',
    lat: 27.0238,
    lng: 76.3557,
    zoom: 12,
    terrainTitle: 'Aravalli Quartzite Ridge',
    elevation: '462m AMSL · Rugged Hill Contours',
    maxRange: 15,
    blips: [
      {
        id: 'tiger',
        name: 'Sariska Tiger Reserve',
        dist: 4.2,
        lat: 27.054,
        lng: 76.385,
        type: 'wildlife',
        severity: 'amber',
        status: 'Buffer Intersect (4.2 km < 10 km ESZ)',
        rule: 'MoEFCC ESZ Notification 2011 · Wildlife Board Mandate',
        elevation: '510m AMSL (Forest Ridge)',
      },
      {
        id: 'aqi',
        name: 'Aravalli Airshed Monitor',
        dist: 5.0,
        lat: 27.0245,
        lng: 76.4062,
        type: 'aqi',
        severity: 'amber',
        status: 'PM2.5: 142 µg/m³ (Non-Attainment)',
        rule: 'National Ambient Air Quality Standards (NAAQS)',
        elevation: '445m AMSL',
      },
      {
        id: 'hydro',
        name: 'Aquifer Recharge Zone',
        dist: 8.5,
        lat: 26.965,
        lng: 76.402,
        type: 'hydro',
        severity: 'amber',
        status: 'High Runoff Catchment Zone',
        rule: 'Central Ground Water Authority (CGWA) Guidelines',
        elevation: '410m AMSL (Valley Basin)',
      },
    ],
  },
  western_ghats: {
    icon: Droplets,
    typeLabel: 'Hydroelectric Dam',
    lat: 11.9139,
    lng: 75.9863,
    zoom: 12,
    terrainTitle: 'Western Ghats Rainforest Basin',
    elevation: '895m AMSL · Steep Mountain Escarpment',
    maxRange: 20,
    blips: [
      {
        id: 'wayanad',
        name: 'Wayanad Wildlife Corridor',
        dist: 2.1,
        lat: 11.925,
        lng: 75.998,
        type: 'wildlife',
        severity: 'red',
        status: 'Critical Tiger & Elephant Habitat Corridor',
        rule: 'Wildlife Protection Act 1972 · Schedule I Species',
        elevation: '940m AMSL (Rainforest)',
      },
      {
        id: 'river',
        name: 'Kabini River Headwaters',
        dist: 0.9,
        lat: 11.911,
        lng: 75.982,
        type: 'hydro',
        severity: 'red',
        status: 'Primary Perennial River Tributary Buffer',
        rule: 'National Water Policy · 500m Riparian Buffer Strict Rule',
        elevation: '880m AMSL (Riverbed)',
      },
      {
        id: 'rainforest',
        name: 'Brahmagiri Shola Forest',
        dist: 5.8,
        lat: 11.94,
        lng: 75.96,
        type: 'wildlife',
        severity: 'amber',
        status: 'Eco-Sensitive Mountain Crest Zone',
        rule: 'Gadgil Committee Western Ghats Ecologically Sensitive Area (ESA)',
        elevation: '1,120m AMSL',
      },
    ],
  },
  bhadla_solar: {
    icon: Factory,
    typeLabel: 'Solar Power Park (500 MW)',
    lat: 27.5385,
    lng: 71.9174,
    zoom: 12,
    terrainTitle: 'Thar Desert Scrub Plain',
    elevation: '218m AMSL · Flat Arid Sand Plain',
    maxRange: 15,
    blips: [
      {
        id: 'desert',
        name: 'Desert National Park Buffer',
        dist: 14.2,
        lat: 27.42,
        lng: 71.85,
        type: 'wildlife',
        severity: 'amber',
        status: 'Clear of 10km Core Sanctuary Zone',
        rule: 'Rajasthan State Solar Policy 2019 · No Forest Clearance Required',
        elevation: '230m AMSL',
      },
      {
        id: 'canal',
        name: 'Indira Gandhi Canal Branch',
        dist: 6.8,
        lat: 27.58,
        lng: 71.96,
        type: 'hydro',
        severity: 'amber',
        status: 'Surface Water Distancing Standard Compliant',
        rule: 'Irrigation Dept Guidelines · > 2 km Buffer Observed',
        elevation: '215m AMSL',
      },
      {
        id: 'gop',
        name: 'Great Indian Bustard Priority Area',
        dist: 8.9,
        lat: 27.5,
        lng: 71.82,
        type: 'wildlife',
        severity: 'amber',
        status: 'Bird Diverters Required on High-Voltage Lines',
        rule: 'Hon\'ble Supreme Court Order on GIB Conservation',
        elevation: '222m AMSL',
      },
    ],
  },
  yamuna_corridor: {
    icon: Factory,
    typeLabel: 'Chemical Processing Hub',
    lat: 28.5355,
    lng: 77.391,
    zoom: 12,
    terrainTitle: 'Indo-Gangetic Floodplain',
    elevation: '202m AMSL · High Water Table Plain',
    maxRange: 10,
    blips: [
      {
        id: 'yamuna',
        name: 'Yamuna Floodplain Core Buffer',
        dist: 1.4,
        lat: 28.545,
        lng: 77.378,
        type: 'hydro',
        severity: 'red',
        status: 'High Effluent Discharge Risk (O-Zone Violation)',
        rule: 'NGT Yamuna Rejuvenation Order 2015 · Zero Liquid Discharge Mandatory',
        elevation: '198m AMSL',
      },
      {
        id: 'aqi_delhi',
        name: 'NCR Continuous AQI Station',
        dist: 3.2,
        lat: 28.52,
        lng: 77.41,
        type: 'aqi',
        severity: 'red',
        status: 'Severely Polluted Airshed (PM2.5: 298 µg/m³)',
        rule: 'Graded Response Action Plan (GRAP Stage IV Restrictions)',
        elevation: '204m AMSL',
      },
      {
        id: 'okhla',
        name: 'Okhla Bird Sanctuary ESZ',
        dist: 4.8,
        lat: 28.56,
        lng: 77.31,
        type: 'wildlife',
        severity: 'red',
        status: 'Eco-Sensitive Zone (Within 5 km radius)',
        rule: 'MoEFCC Notification S.O. 2262(E) · Category A Clearance Required',
        elevation: '200m AMSL',
      },
    ],
  },
  sundarbans: {
    icon: Factory,
    typeLabel: 'Coastal Port Terminal',
    lat: 21.8465,
    lng: 88.3562,
    zoom: 12,
    terrainTitle: 'Ganges Delta Mangrove Estuary',
    elevation: '3m AMSL · Tidal Mudflats & Salt Marsh',
    maxRange: 15,
    blips: [
      {
        id: 'biosphere',
        name: 'Sundarbans Biosphere Reserve',
        dist: 3.8,
        lat: 21.82,
        lng: 88.38,
        type: 'wildlife',
        severity: 'red',
        status: 'UNESCO World Heritage Site & Ramsar Wetland',
        rule: 'CRZ Notification 2019 (CRZ-I Strict Prohibition Area)',
        elevation: '2m AMSL (Mangrove Tidal Mudflat)',
      },
      {
        id: 'estuary',
        name: 'Matla River Estuary Flow',
        dist: 0.6,
        lat: 21.85,
        lng: 88.35,
        type: 'hydro',
        severity: 'red',
        status: 'Tidal Fluvial Inundation & Saline Intrusion Risk',
        rule: 'State Coastal Zone Management Authority (SCZMA) Clearance',
        elevation: '1m AMSL',
      },
      {
        id: 'mangrove',
        name: 'Sundari & Rhizophora Forest Area',
        dist: 1.9,
        lat: 21.86,
        lng: 88.37,
        type: 'wildlife',
        severity: 'red',
        status: 'Dense Mangrove Canopy Forest',
        rule: 'Forest (Conservation) Act 1980 · Non-Forestry Diversion Prohibited',
        elevation: '3m AMSL',
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
  const [customCoords, setCustomCoords] = useState(null);

  const activePreset = PRESETS[selectedKey] || PRESETS.aravalli;
  const baseGeo = PRESET_GEO_DATA[selectedKey] || PRESET_GEO_DATA.aravalli;
  const activeGeo = {
    ...baseGeo,
    lat: customCoords ? customCoords.lat : baseGeo.lat,
    lng: customCoords ? customCoords.lng : baseGeo.lng,
  };

  const handleSelectPreset = (key) => {
    setSelectedKey(key);
    setCustomCoords(null);
    const data = PRESETS[key];
    if (data) {
      setBufferRadius(data.buffer);
    }
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

  const conflicts = activeGeo.blips.filter((b) => {
    if (!activeLayers[b.type]) return false;
    const dist = calculateDistanceKm(activeGeo.lat, activeGeo.lng, b.lat, b.lng);
    return dist <= bufferRadius;
  });

  return (
    <section className="relative pt-6 sm:pt-10 pb-10 sm:pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Editorial Summary & Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 text-left">
            <div className="space-y-3">
              {/* System Status Tag */}
              <div
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono border"
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
                <span>MoEFCC EIA COMPLIANCE ENGINE // SIH 2026</span>
              </div>

              {/* Editorial Headline */}
              <h1
                className="text-2xl sm:text-4xl font-serif font-bold tracking-tight leading-tight"
                style={{ color: 'var(--text-main, #20231f)' }}
              >
                Automated geospatial clearance for national infrastructure.
              </h1>

              {/* Plain Technical Subtitle */}
              <p
                className="text-xs sm:text-sm leading-relaxed font-normal"
                style={{ color: 'var(--text-muted, #73766f)' }}
              >
                Ecoryx audits project coordinates against 106 National Parks, 573 Wildlife Sanctuaries, river riparian zones, and 2,400+ EIA Gazette notifications in &lt; 0.38 seconds.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={onLaunchConsole}
                  className="px-4 py-2 rounded-lg text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98 cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: 'var(--dark-surface, #222a25)' }}
                >
                  <span>Launch Interactive Console</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
                </button>
                <a
                  href="#sectors"
                  className="px-4 py-2 rounded-lg border font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#edeae1]"
                  style={{
                    backgroundColor: 'var(--bg-card, #fbfaf6)',
                    borderColor: 'var(--border-subtle, #d8d4ca)',
                    color: 'var(--text-main, #20231f)',
                  }}
                >
                  <Layers className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #315c48)' }} />
                  <span>Sector Specifications</span>
                </a>
              </div>
            </div>

            {/* Live Ingestion Streams Telemetry (Fills vertical space) */}
            <div
              className="rounded-xl border p-3 space-y-2"
              style={{
                backgroundColor: 'var(--bg-card, #fbfaf6)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
              }}
            >
              <div className="flex items-center justify-between pb-1.5 border-b" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                <span className="font-mono text-[10px] uppercase font-bold flex items-center gap-1.5" style={{ color: 'var(--text-main, #20231f)' }}>
                  <Activity className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #315c48)' }} />
                  Active Spatial Ingestion Streams
                </span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--color-primary, #315c48)' }}>
                  4/4 Connected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded border" style={{ backgroundColor: 'var(--bg-card-subtle, #edeae1)', borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                  <div className="font-mono text-[10px] uppercase font-semibold" style={{ color: 'var(--text-muted, #73766f)' }}>PostGIS DB</div>
                  <div className="font-bold truncate" style={{ color: 'var(--text-main, #20231f)' }}>679 Sanctuaries &amp; NPs</div>
                </div>
                <div className="p-2 rounded border" style={{ backgroundColor: 'var(--bg-card-subtle, #edeae1)', borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                  <div className="font-mono text-[10px] uppercase font-semibold" style={{ color: 'var(--text-muted, #73766f)' }}>CPCB Airshed</div>
                  <div className="font-bold truncate" style={{ color: 'var(--text-main, #20231f)' }}>1,420 CAAQMS Stations</div>
                </div>
                <div className="p-2 rounded border" style={{ backgroundColor: 'var(--bg-card-subtle, #edeae1)', borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                  <div className="font-mono text-[10px] uppercase font-semibold" style={{ color: 'var(--text-muted, #73766f)' }}>OSM Hydrology</div>
                  <div className="font-bold truncate" style={{ color: 'var(--text-main, #20231f)' }}>Perennial Rivers &amp; ZLD</div>
                </div>
                <div className="p-2 rounded border" style={{ backgroundColor: 'var(--bg-card-subtle, #edeae1)', borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                  <div className="font-mono text-[10px] uppercase font-semibold" style={{ color: 'var(--text-muted, #73766f)' }}>Gazette Rules</div>
                  <div className="font-bold truncate" style={{ color: 'var(--text-main, #20231f)' }}>2,400+ EIA Notifications</div>
                </div>
              </div>
            </div>

            {/* Technical Metric Strip */}
            <div
              className="grid grid-cols-3 divide-x rounded-xl border p-2.5"
              style={{
                backgroundColor: 'var(--bg-card, #fbfaf6)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
              }}
            >
              <div className="px-2">
                <div className="font-mono text-sm font-bold" style={{ color: 'var(--text-main, #20231f)' }}>
                  &lt; 0.38s
                </div>
                <div className="text-[10px] uppercase font-mono mt-0.5" style={{ color: 'var(--text-muted, #73766f)' }}>
                  Spatial Query
                </div>
              </div>
              <div className="px-2">
                <div className="font-mono text-sm font-bold" style={{ color: 'var(--color-primary, #315c48)' }}>
                  100%
                </div>
                <div className="text-[10px] uppercase font-mono mt-0.5" style={{ color: 'var(--text-muted, #73766f)' }}>
                  Rule Check
                </div>
              </div>
              <div className="px-2">
                <div className="font-mono text-sm font-bold" style={{ color: 'var(--color-secondary, #b77927)' }}>
                  2,400+
                </div>
                <div className="text-[10px] uppercase font-mono mt-0.5" style={{ color: 'var(--text-muted, #73766f)' }}>
                  Gazette Laws
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Leaflet Topography GIS Scanner (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className="rounded-xl border p-4 sm:p-5 relative shadow-xs flex-1 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card, #fbfaf6)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
              }}
            >
              {/* Header Bar with Live Scanner Status */}
              <div
                className="flex items-center justify-between pb-3 border-b"
                style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}
              >
                <div className="flex items-center gap-2">
                  <Radar className="w-4 h-4" style={{ color: 'var(--color-primary, #315c48)' }} />
                  <span
                    className="font-mono text-xs font-bold tracking-wider"
                    style={{ color: 'var(--text-main, #20231f)' }}
                  >
                    GEOSPATIAL TOPOGRAPHY SCANNER
                  </span>
                </div>

                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold flex items-center gap-1"
                  style={{
                    backgroundColor: 'var(--color-primary-light, #e2ebe5)',
                    color: 'var(--color-primary-text, #244737)',
                    borderColor: 'var(--border-subtle, #d8d4ca)',
                  }}
                >
                  <Zap className="w-3 h-3" style={{ color: 'var(--color-primary, #315c48)' }} />
                  Live GIS Feed
                </span>
              </div>

              {/* Scenario Preset Switcher */}
              <div className="py-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider"
                    style={{ color: 'var(--text-muted, #73766f)' }}
                  >
                    Active Scenario:
                  </span>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: 'var(--text-muted, #73766f)' }}
                  >
                    {activeGeo.typeLabel}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { key: 'aravalli', label: 'Aravalli Mining' },
                    { key: 'western_ghats', label: 'W. Ghats Dam' },
                    { key: 'bhadla_solar', label: 'Bhadla Solar' },
                    { key: 'yamuna_corridor', label: 'Yamuna Chemical' },
                    { key: 'sundarbans', label: 'Sundarbans Port' },
                  ].map((p) => {
                    const isSelected = selectedKey === p.key;
                    return (
                      <button
                        key={p.key}
                        onClick={() => handleSelectPreset(p.key)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer border"
                        style={{
                          backgroundColor: isSelected ? 'var(--dark-surface, #222a25)' : 'var(--bg-card-subtle, #edeae1)',
                          color: isSelected ? '#FFFFFF' : 'var(--text-main, #20231f)',
                          borderColor: isSelected ? 'var(--dark-surface, #222a25)' : 'var(--border-subtle, #d8d4ca)',
                        }}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Leaflet Topography Map */}
              <div className="relative">
                <TopographyRadiusMap
                  presetKey={selectedKey}
                  geoData={activeGeo}
                  bufferRadius={bufferRadius}
                  activeLayers={activeLayers}
                  hoveredBlip={hoveredBlip}
                  onHoverBlip={setHoveredBlip}
                  onCoordinatesChange={(newLat, newLng) =>
                    setCustomCoords({ lat: newLat, lng: newLng })
                  }
                  conflicts={conflicts}
                />

                {/* Hover Pin Status Card */}
                <div
                  className="mt-2 p-2 rounded-lg border text-[11px] font-sans flex items-center justify-between min-h-[32px]"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle, #edeae1)',
                    borderColor: 'var(--border-subtle, #d8d4ca)',
                  }}
                >
                  {hoveredBlip ? (
                    <div>
                      <span className="font-mono font-bold" style={{ color: 'var(--color-secondary, #b77927)' }}>
                        {hoveredBlip.name} ({hoveredBlip.dist} km)
                      </span>
                      <span className="ml-1.5" style={{ color: 'var(--text-main, #20231f)' }}>
                        · {hoveredBlip.status}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" style={{ color: 'var(--color-primary, #315c48)' }} />
                      <span style={{ color: 'var(--text-main, #20231f)' }}>
                        {conflicts.length > 0
                          ? `${conflicts.length} statutory layer intersect(s) within ${bufferRadius} km radius`
                          : `Zero statutory protected conflicts detected in ${bufferRadius} km buffer`}
                      </span>
                    </div>
                  )}
                  <span className="text-[10px] font-mono shrink-0 hidden sm:inline" style={{ color: 'var(--text-muted, #73766f)' }}>
                    Drag pin to test
                  </span>
                </div>
              </div>

              {/* Interactive Controls: Radius Slider & Layer Toggles */}
              <div className="pt-3 space-y-2">
                {/* Buffer Slider */}
                <div
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle, #edeae1)',
                    borderColor: 'var(--border-subtle, #d8d4ca)',
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-medium mb-1">
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-muted, #73766f)' }}>
                      <Sliders className="w-3 h-3" />
                      Buffer Scan Radius
                    </span>
                    <span
                      className="font-mono font-bold px-1.5 py-0.5 rounded text-[11px]"
                      style={{
                        backgroundColor: 'var(--color-primary-light, #e2ebe5)',
                        color: 'var(--color-primary-text, #244737)',
                      }}
                    >
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
                    className="w-full cursor-pointer h-1.5 rounded appearance-none"
                    style={{
                      accentColor: 'var(--color-primary, #315c48)',
                      backgroundColor: 'var(--border-subtle, #d8d4ca)',
                    }}
                  />
                </div>

                {/* Layer Filter Toggles */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => toggleLayer('wildlife')}
                    className="flex-1 py-1 px-2 rounded-md border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                    style={{
                      backgroundColor: activeLayers.wildlife ? 'var(--color-primary-light, #e2ebe5)' : 'var(--bg-card, #fbfaf6)',
                      borderColor: activeLayers.wildlife ? 'var(--color-primary, #315c48)' : 'var(--border-subtle, #d8d4ca)',
                      color: activeLayers.wildlife ? 'var(--text-main, #20231f)' : 'var(--text-muted, #73766f)',
                    }}
                  >
                    <TreePine className="w-3 h-3" style={{ color: 'var(--color-primary, #315c48)' }} />
                    <span>Wildlife (ESZ)</span>
                  </button>

                  <button
                    onClick={() => toggleLayer('aqi')}
                    className="flex-1 py-1 px-2 rounded-md border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                    style={{
                      backgroundColor: activeLayers.aqi ? 'var(--color-secondary-light, #fdf4e8)' : 'var(--bg-card, #fbfaf6)',
                      borderColor: activeLayers.aqi ? 'var(--color-secondary, #b77927)' : 'var(--border-subtle, #d8d4ca)',
                      color: activeLayers.aqi ? 'var(--text-main, #20231f)' : 'var(--text-muted, #73766f)',
                    }}
                  >
                    <Wind className="w-3 h-3" style={{ color: 'var(--color-secondary, #b77927)' }} />
                    <span>Air Quality</span>
                  </button>

                  <button
                    onClick={() => toggleLayer('hydro')}
                    className="flex-1 py-1 px-2 rounded-md border text-[11px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                    style={{
                      backgroundColor: activeLayers.hydro ? 'var(--color-primary-light, #e2ebe5)' : 'var(--bg-card, #fbfaf6)',
                      borderColor: activeLayers.hydro ? 'var(--color-primary, #315c48)' : 'var(--border-subtle, #d8d4ca)',
                      color: activeLayers.hydro ? 'var(--text-main, #20231f)' : 'var(--text-muted, #73766f)',
                    }}
                  >
                    <Droplets className="w-3 h-3" style={{ color: 'var(--color-primary, #315c48)' }} />
                    <span>Hydrology</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Verdict Footer */}
              <div
                className="mt-3 pt-3 border-t flex items-center justify-between gap-2"
                style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}
              >
                <div>
                  <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted, #73766f)' }}>
                    Statutory Verdict:
                  </div>
                  <div
                    className="text-xs font-bold font-sans mt-0.5 inline-flex items-center gap-1"
                    style={{
                      color: activePreset.riskScore > 75 ? 'var(--color-red, #a54d42)' : 'var(--color-primary, #315c48)',
                    }}
                  >
                    {activePreset.riskScore > 75 ? (
                      <ShieldAlert className="w-3.5 h-3.5" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    )}
                    <span>{activePreset.verdict}</span>
                  </div>
                </div>

                <button
                  onClick={handleInspectInSimulator}
                  className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer hover:opacity-90 shadow-xs"
                  style={{ backgroundColor: 'var(--dark-surface, #222a25)' }}
                >
                  <span>Audit in Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
