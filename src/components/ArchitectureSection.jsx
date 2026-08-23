import React from 'react';
import { Cpu, Zap, Database, CloudRain, Scale, FileText, ArrowDown, Network, ShieldCheck, Server, Radio, Code2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

const ARCH_BENCHMARKS = [
  { metric: 'System Capacity', value: '1,200 checks/sec', desc: 'Handles over a thousand concurrent clearance audits without delay' },
  { metric: 'Map Search Time', value: '180 ms', desc: 'Instantly searches across all 679 national protected areas' },
  { metric: 'Environmental Laws', value: '2,400+ Laws', desc: 'Indexed national acts and official rules for instant compliance checks' },
  { metric: 'Digital Verification', value: 'Digital Seal', desc: 'Tamper-proof digital seal embedded in every generated PDF report' },
];

export default function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="py-8 sm:py-12 border-t relative overflow-hidden bg-gradient-to-b from-[#e7f3ec] via-[#eff7f2] to-[#e8f1eb]"
      style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
    >
      {/* 1. Subtle Geodetic Coordinate Dot Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-multiply -z-10"
        style={{
          backgroundImage: 'radial-gradient(#284e3a 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* 2. Topographic Elevation Contour Lines SVG Layer */}
      <div
        className="absolute top-0 right-0 w-full sm:w-2/3 h-96 sm:h-[480px] pointer-events-none overflow-hidden opacity-[0.14] sm:opacity-[0.18] -z-10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 800 500"
          preserveAspectRatio="none"
          className="w-full h-full text-[#1c3b2b]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Concentric Topo Elevation Rings */}
          <path d="M 450, -50 C 580, 40 700, 110 820, 90 C 760, 240 680, 310 540, 270 C 420, 230 380, 90 450, -50 Z" opacity="0.6" strokeDasharray="6 4" />
          <path d="M 490, -20 C 600, 50 680, 120 770, 110 C 720, 220 650, 270 550, 240 C 460, 210 430, 90 490, -20 Z" opacity="0.75" />
          <path d="M 530, 10 C 620, 70 670, 130 730, 130 C 690, 200 630, 240 560, 215 C 490, 190 470, 95 530, 10 Z" opacity="0.9" />
          <path d="M 570, 40 C 640, 90 670, 140 700, 150 C 670, 190 620, 215 570, 195 C 520, 175 510, 105 570, 40 Z" opacity="0.8" />
          <path d="M 610, 70 C 660, 110 670, 145 685, 165 C 660, 185 625, 195 590, 180 C 555, 165 550, 115 610, 70 Z" opacity="0.65" />

          {/* Topo Survey Elevation Line Marks */}
          <path d="M -50, 320 C 150, 280 320, 340 520, 310 C 680, 290 760, 360 850, 330" opacity="0.5" />
          <path d="M -50, 360 C 160, 320 330, 375 530, 350 C 700, 330 770, 395 850, 370" opacity="0.4" strokeDasharray="4 4" />
          <path d="M -50, 400 C 170, 360 340, 410 540, 390 C 710, 370 780, 430 850, 410" opacity="0.3" />
        </svg>
      </div>

      {/* 3. Responsive Nature Trees & Forest Skyline Silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 sm:h-60 pointer-events-none overflow-hidden opacity-[0.16] sm:opacity-[0.22] mix-blend-multiply -z-10"
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

      {/* 4. Soft Ambient Subtle Glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-6 scroll-reveal-header">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-emerald-100/90 text-emerald-950 border border-emerald-300 flex items-center gap-1.5 backdrop-blur-xs">
              <Server className="w-3.5 h-3.5 text-emerald-800" />
              SYSTEM ARCHITECTURE
            </span>
            <span className="text-xs font-mono text-stone-600">Parallel ingestion &amp; automated rule engine</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5 font-sans"
            style={{ color: 'var(--text-main, #1a1d1a)' }}
          >
            How the System Works Behind the Scenes
          </h2>
          <p className="text-sm sm:text-base leading-relaxed font-sans" style={{ color: 'var(--text-muted, #5e625a)' }}>
            High-speed engine checking 4 parallel environmental and geographic data sources in real-time.
          </p>
        </div>

        {/* Technical Pipeline Flow Container */}
        <Card className="p-4 sm:p-6 space-y-4 scroll-reveal shadow-sm">
          {/* Top Layer: User Input */}
          <div
            className="p-3.5 sm:p-4 rounded-xl border transition-all"
            style={{
              backgroundColor: 'rgba(238, 245, 240, 0.85)',
              borderColor: 'rgba(40, 78, 58, 0.22)',
            }}
          >
            <div>
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-900">
                Step 1: Project Details Entered
              </span>
              <h4 className="font-sans font-bold text-base sm:text-lg mt-0.5 text-stone-900">
                Site GPS Coordinates, Land Area (Ha), Search Distance (km), Industry Sector
              </h4>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
          </div>

          {/* Middle Orchestrator: FastAPI Engine */}
          <div
            className="p-4 sm:p-5 rounded-xl border text-center transition-all duration-300 shadow-xs"
            style={{
              backgroundColor: '#1c3a2b',
              borderColor: '#2d5843',
              color: '#FFFFFF',
            }}
          >
            <div className="flex items-center justify-center gap-2 font-sans text-base sm:text-lg font-bold text-emerald-300 mb-1">
              <Cpu className="w-5 h-5 text-emerald-400" />
              Central Processing Engine
            </div>
            <p className="font-mono text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Checks 4 key environmental data sources simultaneously in parallel
            </p>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
          </div>

          {/* 4 Parallel Ingestion Streams Grid (Harmonized Soft Pastels) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Stream 1 */}
            <div
              className="p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(240, 246, 252, 0.85)',
                borderColor: 'rgba(30, 80, 130, 0.22)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-900">
                    DATA SOURCE 1
                  </span>
                  <CloudRain className="w-4 h-4 text-sky-700" />
                </div>
                <div className="font-sans font-bold text-base text-stone-900 mb-1">
                  Weather &amp; Air Quality
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                Real-time pollution levels, PM2.5, PM10, and air quality index
              </p>
            </div>

            {/* Stream 2 */}
            <div
              className="p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(253, 247, 237, 0.85)',
                borderColor: 'rgba(156, 101, 25, 0.25)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900">
                    DATA SOURCE 2
                  </span>
                  <Network className="w-4 h-4 text-amber-700" />
                </div>
                <div className="font-sans font-bold text-base text-stone-900 mb-1">
                  Rivers &amp; Water Bodies
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                River channels, lakes, wetlands, and water protection zones
              </p>
            </div>

            {/* Stream 3 */}
            <div
              className="p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(238, 245, 240, 0.85)',
                borderColor: 'rgba(40, 78, 58, 0.22)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-900">
                    DATA SOURCE 3
                  </span>
                  <Database className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="font-sans font-bold text-base text-stone-900 mb-1">
                  Protected Areas &amp; Forests
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                106 National Parks, 573 Sanctuaries, and wildlife zones
              </p>
            </div>

            {/* Stream 4 */}
            <div
              className="p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(247, 243, 252, 0.85)',
                borderColor: 'rgba(110, 60, 160, 0.22)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-900">
                    DATA SOURCE 4
                  </span>
                  <Zap className="w-4 h-4 text-purple-700" />
                </div>
                <div className="font-sans font-bold text-base text-stone-900 mb-1">
                  Local Communities
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                Distance to nearest towns, villages, and human settlements
              </p>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
          </div>

          {/* AI Statutory Cross-Referencing & PDF Report Engine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="p-4 rounded-xl border transition-all duration-300 hover:shadow-xs"
              style={{
                backgroundColor: 'var(--bg-card, #faf9f5)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Scale className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
                <span className="font-sans font-bold text-base sm:text-lg text-stone-900">
                  Smart Rule &amp; Law Evaluator
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                Matches location against 2,400+ national environmental laws and creates required mitigation actions.
              </p>
            </div>

            <div
              className="p-4 rounded-xl border transition-all duration-300 hover:shadow-xs"
              style={{
                backgroundColor: 'var(--bg-card, #faf9f5)',
                borderColor: 'var(--border-subtle, #d5cfc2)',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="w-4 h-4" style={{ color: 'var(--color-primary, #284e3a)' }} />
                <span className="font-sans font-bold text-base sm:text-lg text-stone-900">
                  Official PDF Report Generator
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                Compiles all map findings, risk charts, and required safety steps into a submission-ready PDF.
              </p>
            </div>
          </div>
        </Card>

        {/* Engine Performance & Throughput Specifications Grid */}
        <Card className="p-4 sm:p-5 scroll-reveal">
          <div className="pb-2.5 mb-3 border-b" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
            <span className="text-base sm:text-lg font-sans font-bold text-stone-900">
              System Performance &amp; Reliability
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ARCH_BENCHMARKS.map((b, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border transition-all duration-300 hover:border-emerald-700/40 hover:shadow-xs"
                style={{
                  backgroundColor: 'var(--bg-card, #faf9f5)',
                  borderColor: 'var(--border-subtle, #d5cfc2)',
                }}
              >
                <div className="text-xs font-mono uppercase font-bold tracking-wider text-stone-600">
                  {b.metric}
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold mt-1" style={{ color: 'var(--color-primary, #284e3a)' }}>
                  {b.value}
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed text-stone-600">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
