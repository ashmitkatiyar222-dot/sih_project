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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

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
    <section className="relative pt-6 sm:pt-8 pb-8 sm:pb-12 overflow-hidden border-b bg-gradient-to-b from-[#e3ebe5]/60 via-[#f4f1ea] to-[#f4f1ea]" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
      {/* Responsive Nature Trees & Forest Skyline Silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 lg:h-72 pointer-events-none overflow-hidden opacity-[0.18] sm:opacity-[0.24] mix-blend-multiply -z-10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full text-[#1c3b2b]"
          fill="currentColor"
        >
          {/* Mountain Ridge */}
          <path
            d="M0,220 Q200,160 400,200 T800,170 T1200,210 T1440,180 L1440,320 L0,320 Z"
            fill="#2d523e"
            opacity="0.45"
          />
          {/* Secondary Ridge */}
          <path
            d="M0,250 Q160,210 320,235 T640,215 T960,240 T1280,220 T1440,245 L1440,320 L0,320 Z"
            fill="#234433"
            opacity="0.7"
          />
          {/* Dense Pine & Evergreen Tree Silhouette Band */}
          <g fill="#163223">
            <polygon points="30,290 15,290 25,255 18,255 27,225 20,225 30,195 40,225 33,225 42,255 35,255 45,290" />
            <polygon points="75,290 55,290 67,245 59,245 71,205 63,205 75,160 87,205 79,205 91,245 83,245 95,290" />
            <polygon points="120,295 105,295 115,260 108,260 117,230 110,230 120,205 130,230 123,230 132,260 125,260 135,295" />
            <polygon points="160,290 142,290 153,250 145,250 156,220 148,220 160,180 172,220 164,220 175,250 167,250 178,290" />
            <polygon points="205,295 190,295 200,265 193,265 202,238 195,238 205,215 215,238 208,238 217,265 210,265 220,295" />
            <polygon points="260,290 235,290 250,240 240,240 255,195 245,195 260,145 275,195 265,195 280,240 270,240 285,290" />
            <polygon points="315,295 298,295 309,260 302,260 312,228 305,228 315,190 325,228 318,228 328,260 321,260 332,295" />
            <polygon points="365,290 350,290 360,255 353,255 362,225 355,225 365,195 375,225 368,225 377,255 370,255 380,290" />
            <polygon points="410,295 395,295 404,270 398,270 406,245 400,245 410,220 420,245 414,245 422,270 416,270 425,295" />
            <polygon points="455,290 432,290 446,240 436,240 450,195 440,195 455,150 470,195 460,195 474,240 464,240 478,290" />
            <polygon points="505,295 490,295 499,265 493,265 502,238 496,238 505,210 514,238 508,238 517,265 511,265 520,295" />
            <polygon points="555,290 535,290 547,248 539,248 551,215 543,215 555,175 567,215 559,215 571,248 563,248 575,290" />
            <polygon points="610,290 585,290 600,242 590,242 605,198 595,198 610,148 625,198 615,198 630,242 620,242 635,290" />
            <polygon points="665,295 650,295 659,265 653,265 662,238 656,238 665,210 674,238 668,238 677,265 671,265 680,295" />
            <polygon points="715,290 695,290 707,248 699,248 711,215 703,215 715,175 727,215 719,215 731,248 723,248 735,290" />
            <polygon points="770,290 745,290 760,240 750,240 765,195 755,195 770,145 785,195 775,195 790,240 780,240 795,290" />
            <polygon points="825,295 810,295 819,265 813,265 822,238 816,238 825,210 834,238 828,238 837,265 831,265 840,295" />
            <polygon points="875,290 855,290 867,248 859,248 871,215 863,215 875,175 887,215 879,215 891,248 883,248 895,290" />
            <polygon points="930,290 905,290 920,242 910,242 925,198 915,198 930,148 945,198 935,198 950,242 940,242 955,290" />
            <polygon points="985,295 970,295 979,265 973,265 982,238 976,238 985,210 994,238 988,238 997,265 991,265 1000,295" />
            <polygon points="1035,290 1015,290 1027,248 1019,248 1031,215 1023,215 1035,175 1047,215 1039,215 1051,248 1043,248 1055,290" />
            <polygon points="1090,290 1065,290 1080,240 1070,240 1085,195 1075,195 1090,145 1105,195 1095,195 1110,240 1100,240 1115,290" />
            <polygon points="1145,295 1130,295 1139,265 1133,265 1142,238 1136,238 1145,210 1154,238 1148,238 1157,265 1151,265 1160,295" />
            <polygon points="1195,290 1175,290 1187,248 1179,248 1191,215 1183,215 1195,175 1207,215 1199,215 1211,248 1203,248 1215,290" />
            <polygon points="1255,290 1230,290 1245,242 1235,242 1250,198 1240,198 1255,148 1270,198 1260,198 1275,242 1265,242 1280,290" />
            <polygon points="1310,295 1295,295 1304,265 1298,265 1307,238 1301,238 1310,210 1319,238 1313,238 1322,265 1316,265 1325,295" />
            <polygon points="1365,290 1345,290 1357,248 1349,248 1361,215 1353,215 1365,175 1377,215 1369,215 1381,248 1373,248 1385,290" />
            <polygon points="1415,295 1400,295 1409,265 1403,265 1412,238 1406,238 1415,210 1424,238 1418,238 1427,265 1421,265 1430,295" />
          </g>
          <rect x="0" y="305" width="1440" height="15" fill="#163223" />
        </svg>
      </div>

      {/* Radiant Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Editorial Summary & Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-6 text-left">
            <div className="space-y-4 sm:space-y-5 py-1">
              {/* Editorial Headline */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight pb-1"
                style={{ color: 'var(--text-main, #1a1d1a)' }}
              >
                Rapid Environmental Verification
              </h1>

              {/* Plain Technical Subtitle with Highlighted Text Color Only */}
              <p
                className="text-sm sm:text-base leading-relaxed font-normal py-0.5"
                style={{ color: 'var(--text-muted, #5e625a)' }}
              >
                Ecoryx automatically checks your project site against <span className="font-semibold text-emerald-800">106 National Parks</span>, <span className="font-semibold text-emerald-800">573 Wildlife Sanctuaries</span>, <span className="font-semibold text-teal-800">protected forests &amp; rivers</span>, and national environmental laws in under <span className="font-bold text-amber-700 font-mono">0.38 seconds</span>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2 sm:pt-3">
                <button
                  onClick={onLaunchConsole}
                  className="btn-neumorphic px-5 py-3 font-bold font-mono uppercase text-xs sm:text-sm flex items-center justify-center gap-2.5 text-emerald-950 hover:text-emerald-900 active:scale-98"
                >
                  <span className="tracking-wide">Open Clearance Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-emerald-800" />
                </button>
                <a
                  href="#sectors"
                  className="px-4 py-2.5 rounded-lg border font-medium font-mono uppercase text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs hover:bg-[#eae6dc]"
                  style={{
                    backgroundColor: 'var(--bg-card, #faf9f5)',
                    borderColor: 'var(--border-subtle, #d5cfc2)',
                    color: 'var(--text-main, #1a1d1a)',
                  }}
                >
                  <Layers className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
                  <span>Industry Rules</span>
                </a>
              </div>
            </div>

            {/* Live Ingestion Streams Telemetry (Multi-Colored Cards) */}
            <Card className="p-3.5 sm:p-4 space-y-3 flex-1 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
                <span className="font-mono text-xs sm:text-sm uppercase font-bold flex items-center gap-2" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Connected Environmental Data Sources
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100/90 text-emerald-900 border border-emerald-300">
                  4/4 Connected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm flex-1">
                {/* Stream 1: Parks & Forests (Emerald) */}
                <div className="p-2.5 rounded border flex flex-col justify-center bg-emerald-50/70 border-emerald-200/80 transition-all hover:bg-emerald-50">
                  <div className="font-mono text-[11px] sm:text-xs uppercase font-bold text-emerald-800 flex items-center gap-1">
                    <TreePine className="w-3.5 h-3.5 text-emerald-700" />
                    Parks &amp; Forests
                  </div>
                  <div className="font-bold truncate text-xs sm:text-sm mt-0.5 text-emerald-950">679 Protected Areas</div>
                </div>

                {/* Stream 2: Air Quality (Amber / Orange) */}
                <div className="p-2.5 rounded border flex flex-col justify-center bg-amber-50/70 border-amber-200/80 transition-all hover:bg-amber-50">
                  <div className="font-mono text-[11px] sm:text-xs uppercase font-bold text-amber-800 flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-amber-700" />
                    Air Quality
                  </div>
                  <div className="font-bold truncate text-xs sm:text-sm mt-0.5 text-amber-950">1,420 Monitoring Stations</div>
                </div>

                {/* Stream 3: Rivers & Water (Sky Blue / Cyan) */}
                <div className="p-2.5 rounded border flex flex-col justify-center bg-sky-50/70 border-sky-200/80 transition-all hover:bg-sky-50">
                  <div className="font-mono text-[11px] sm:text-xs uppercase font-bold text-sky-800 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-700" />
                    Rivers &amp; Water
                  </div>
                  <div className="font-bold truncate text-xs sm:text-sm mt-0.5 text-sky-950">Lakes &amp; Streams</div>
                </div>

                {/* Stream 4: Clearance Laws (Indigo / Purple) */}
                <div className="p-2.5 rounded border flex flex-col justify-center bg-indigo-50/70 border-indigo-200/80 transition-all hover:bg-indigo-50">
                  <div className="font-mono text-[11px] sm:text-xs uppercase font-bold text-indigo-800 flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-indigo-700" />
                    Clearance Laws
                  </div>
                  <div className="font-bold truncate text-xs sm:text-sm mt-0.5 text-indigo-950">2,400+ Official Rules</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Leaflet Topography GIS Scanner (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <Card className="p-3.5 sm:p-4 relative shadow-xs flex-1 flex flex-col justify-between">
              {/* Header Bar with Live Scanner Status */}
              <div
                className="flex items-center justify-between pb-2 border-b"
                style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
              >
                <div className="flex items-center gap-1.5">
                  <Radar className="w-4 h-4 text-emerald-700" />
                  <span
                    className="font-mono text-xs sm:text-sm font-bold tracking-wider"
                    style={{ color: 'var(--text-main, #1a1d1a)' }}
                  >
                    INTERACTIVE MAP &amp; ENVIRONMENTAL SCANNER
                  </span>
                </div>
              </div>

              {/* Scenario Preset Switcher */}
              <div className="py-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-xs font-mono uppercase font-bold tracking-wider text-emerald-900"
                  >
                    DEMO LOCATIONS
                  </span>
                  <span
                    className="text-xs font-mono font-medium"
                    style={{ color: 'var(--text-main, #1a1d1a)' }}
                  >
                    {activeGeo.typeLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
                        className={`px-3 py-1.5 text-xs font-mono whitespace-nowrap transition-all cursor-pointer font-medium btn-glassmorphic-pill ${
                          isSelected ? 'active font-bold' : ''
                        }`}
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
                  className="mt-2 p-2 px-2.5 rounded border text-xs sm:text-sm font-sans flex items-center justify-between min-h-[34px]"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
                    borderColor: 'var(--border-subtle, #d5cfc2)',
                  }}
                >
                  {hoveredBlip ? (
                    <div>
                      <span className="font-mono font-bold" style={{ color: 'var(--color-secondary, #9c6519)' }}>
                        {hoveredBlip.name} ({hoveredBlip.dist} km)
                      </span>
                      <span className="ml-1.5" style={{ color: 'var(--text-main, #1a1d1a)' }}>
                        · {hoveredBlip.status}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #284e3a)' }} />
                      <span style={{ color: 'var(--text-main, #1a1d1a)' }}>
                        {conflicts.length > 0
                          ? `${conflicts.length} sensitive environmental area(s) within ${bufferRadius} km radius`
                          : `No protected environmental areas found within ${bufferRadius} km radius`}
                      </span>
                    </div>
                  )}
                  <span className="text-xs font-mono shrink-0 hidden sm:inline" style={{ color: 'var(--text-muted, #5e625a)' }}>
                    Drag pin to test
                  </span>
                </div>
              </div>

              {/* Interactive Controls: Radius Slider & Layer Toggles */}
              <div className="pt-2.5 space-y-2">
                {/* Buffer Slider */}
                <div
                  className="p-2 px-2.5 rounded border"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle, #eae6dc)',
                    borderColor: 'var(--border-subtle, #d5cfc2)',
                  }}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-1.5">
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm" style={{ color: 'var(--text-muted, #5e625a)' }}>
                      <Sliders className="w-3.5 h-3.5" />
                      Search Distance Radius
                    </span>
                    <span
                      className="font-mono font-bold px-2 py-0.5 rounded text-xs sm:text-sm"
                      style={{
                        backgroundColor: 'var(--color-primary-light, #e3ebe5)',
                        color: 'var(--color-primary-text, #1a3527)',
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
                      accentColor: 'var(--color-primary, #284e3a)',
                      backgroundColor: 'var(--border-subtle, #d5cfc2)',
                    }}
                  />
                </div>

                {/* Layer Filter Toggles */}
                <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                  <button
                    onClick={() => toggleLayer('wildlife')}
                    className="flex-1 py-1.5 px-2 rounded border text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs uppercase"
                    style={{
                      backgroundColor: activeLayers.wildlife ? 'var(--color-primary-light, #e3ebe5)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeLayers.wildlife ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeLayers.wildlife ? 'var(--text-main, #1a1d1a)' : 'var(--text-muted, #5e625a)',
                    }}
                  >
                    <TreePine className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #284e3a)' }} />
                    <span>Wildlife &amp; Forests</span>
                  </button>

                  <button
                    onClick={() => toggleLayer('aqi')}
                    className="flex-1 py-1.5 px-2 rounded border text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs uppercase"
                    style={{
                      backgroundColor: activeLayers.aqi ? 'var(--color-secondary-light, #fbf0dc)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeLayers.aqi ? 'var(--color-secondary, #9c6519)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeLayers.aqi ? 'var(--text-main, #1a1d1a)' : 'var(--text-muted, #5e625a)',
                    }}
                  >
                    <Wind className="w-3.5 h-3.5" style={{ color: 'var(--color-secondary, #9c6519)' }} />
                    <span>Air Quality</span>
                  </button>

                  <button
                    onClick={() => toggleLayer('hydro')}
                    className="flex-1 py-1.5 px-2 rounded border text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs uppercase"
                    style={{
                      backgroundColor: activeLayers.hydro ? 'var(--color-primary-light, #e3ebe5)' : 'var(--bg-card, #faf9f5)',
                      borderColor: activeLayers.hydro ? 'var(--color-primary, #284e3a)' : 'var(--border-subtle, #d5cfc2)',
                      color: activeLayers.hydro ? 'var(--text-main, #1a1d1a)' : 'var(--text-muted, #5e625a)',
                    }}
                  >
                    <Droplets className="w-3.5 h-3.5" style={{ color: 'var(--color-primary, #284e3a)' }} />
                    <span>Rivers &amp; Water</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Verdict Footer */}
              <div
                className="mt-3 pt-2.5 border-t flex items-center justify-between gap-2"
                style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
              >
                <div>
                  <div className="text-[11px] sm:text-xs font-mono uppercase" style={{ color: 'var(--text-muted, #5e625a)' }}>
                    Clearance Result:
                  </div>
                  <div
                    className="text-sm sm:text-base font-bold font-sans mt-0.5 inline-flex items-center gap-1.5"
                    style={{
                      color: activePreset.riskScore > 75 ? 'var(--color-red, #943b32)' : 'var(--color-primary, #284e3a)',
                    }}
                  >
                    {activePreset.riskScore > 75 ? (
                      <ShieldAlert className="w-4 h-4" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    <span>{activePreset.verdict}</span>
                  </div>
                </div>

                <button
                  onClick={handleInspectInSimulator}
                  className="btn-glass-report px-4 py-2 text-xs sm:text-sm font-mono uppercase font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>View Full Report</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
