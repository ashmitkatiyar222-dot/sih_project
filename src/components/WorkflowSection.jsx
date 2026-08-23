import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Cpu,
  Scale,
  FileCheck2,
  ArrowRight,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Trees,
  Sparkles,
} from 'lucide-react';
import { playDialClickSound } from '../utils/audio';

const WORKFLOW_STAGES = [
  {
    step: '01',
    quest: 'STAGE 1: GEO-DATUM INGESTION',
    title: 'Enter Project Location',
    tech: 'WGS84 Datum & Spatial Index',
    desc: 'Enter GPS coordinates, polygon boundary, land area (Ha), and search envelope radius.',
    details: [
      'Automatic coordinate validation (EPSG:4326)',
      'Sub-meter polygon footprint rasterization',
      'Dynamic buffer cylinder generation (1-25km)',
    ],
    output: 'Validated GIS Point & Polygon Vector',
    status: 'Coordinates Locked',
    Icon: MapPin,
    theme: {
      border: 'border-emerald-300/80',
      activeBorder: 'border-emerald-500/60 ring-2 ring-emerald-500/20',
      badgeBg: 'bg-emerald-100/90 text-emerald-950 border-emerald-300',
      phaseText: 'text-emerald-900',
      lineColor: '#059669',
    },
  },
  {
    step: '02',
    quest: 'STAGE 2: SPATIAL RAYCAST AUDIT',
    title: 'Automatic Map Search',
    tech: 'R-Tree Spatial Indexing',
    desc: 'Instantly scans 106 National Parks, 573 Wildlife Sanctuaries, protected forests, and river basins.',
    details: [
      '679 Protected areas scanned nationwide',
      'Continuous river channel proximity raycast',
      'Real-time Eco-Sensitive Zone (ESZ) distance check',
    ],
    output: 'Spatial Hazard Distance Matrix',
    status: 'Spatial Intersects Computed',
    Icon: Cpu,
    theme: {
      border: 'border-sky-300/80',
      activeBorder: 'border-sky-500/60 ring-2 ring-sky-500/20',
      badgeBg: 'bg-sky-100/90 text-sky-950 border-sky-300',
      phaseText: 'text-sky-900',
      lineColor: '#0284c7',
    },
  },
  {
    step: '03',
    quest: 'STAGE 3: STATUTORY RULE MATCHING',
    title: 'Environmental Law Check',
    tech: 'Automated Rule Inference Engine',
    desc: 'Matches your site against 2,400+ national environmental laws, forest acts, and clean water rules.',
    details: [
      'Wildlife Protection Act 1972 Section 38O compliance',
      'EPA 1986 & Water (Prevention of Pollution) Act 1974',
      'Automated EMP conditions & ZLD mandate generator',
    ],
    output: 'Legal Compliance Clearance Verdict',
    status: 'Statutory Act Evaluation Complete',
    Icon: Scale,
    theme: {
      border: 'border-amber-300/80',
      activeBorder: 'border-amber-500/60 ring-2 ring-amber-500/20',
      badgeBg: 'bg-amber-100/90 text-amber-950 border-amber-300',
      phaseText: 'text-amber-900',
      lineColor: '#d97706',
    },
  },
  {
    step: '04',
    quest: 'STAGE 4: CRYPTOGRAPHIC VERDICT SEAL',
    title: 'Download Official PDF Report',
    tech: 'Cryptographic PDF Engine',
    desc: 'Creates a complete, submission-ready clearance report with maps, risk scores, and required safety steps.',
    details: [
      'SHA-256 Digital Verification Seal embedded',
      'High-resolution satellite GIS map annexures',
      'Ready for statutory state committee submission',
    ],
    output: 'Ready-to-Submit Clearance PDF',
    status: 'Verified PDF Package Ready',
    Icon: FileCheck2,
    theme: {
      border: 'border-purple-300/80',
      activeBorder: 'border-purple-500/60 ring-2 ring-purple-500/20',
      badgeBg: 'bg-purple-100/90 text-purple-950 border-purple-300',
      phaseText: 'text-purple-900',
      lineColor: '#9333ea',
    },
  },
];

export default function WorkflowSection() {
  const sectionRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([0]);

  // Rotator knob angle in degrees
  const [rotaryAngle, setRotaryAngle] = useState(-45);
  const lastStepRef = useRef(-1);

  // Target step is hovered step or active step
  const currentSelected = hoveredStep !== null ? hoveredStep : activeStep;
  const curStage = WORKFLOW_STAGES[currentSelected];
  const IconComp = curStage.Icon;
  const colors = curStage.theme;

  // =========================================================================
  // SCROLL-DRIVEN ROTATOR & GAME STAGE REVEAL LOGIC
  // =========================================================================
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isPlaying || !sectionRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Only compute when section is in active view range
          if (rect.bottom < 0 || rect.top > windowHeight) {
            ticking = false;
            return;
          }

          // Calibrated scroll coordinates: Starts when section is 70% in view and spans entire section height
          const startThreshold = windowHeight * 0.70;
          const totalSpan = rect.height + windowHeight * 0.35;
          const currentOffset = startThreshold - rect.top;
          const progress = Math.max(0, Math.min(1, currentOffset / totalSpan));

          // Smooth dial rotation: -45deg to +135deg
          const angle = -45 + progress * 180;
          setRotaryAngle(angle);

          // Calibrated discrete step selection: L01 (0-0.25), L02 (0.25-0.5), L03 (0.5-0.75), L04 (0.75-1.0)
          let stepIdx = 0;
          if (progress < 0.25) stepIdx = 0;
          else if (progress < 0.50) stepIdx = 1;
          else if (progress < 0.75) stepIdx = 2;
          else stepIdx = 3;

          setActiveStep(stepIdx);

          if (stepIdx !== lastStepRef.current) {
            lastStepRef.current = stepIdx;
            playDialClickSound();
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying]);

  // =========================================================================
  // MANUAL LEVEL SWITCHER
  // =========================================================================
  const handleSelectLevel = (idx) => {
    setActiveStep(idx);
    const angles = [-45, 15, 75, 135];
    setRotaryAngle(angles[idx] || 0);
    playDialClickSound();
  };

  const handleToggleDial = () => {
    const nextIdx = (activeStep + 1) % WORKFLOW_STAGES.length;
    handleSelectLevel(nextIdx);
  };

  // =========================================================================
  // SPEEDRUN 40-SECOND SIMULATION (10S PER SLIDE)
  // =========================================================================
  const handleRunSpeedrun = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCompletedSteps([0]);
    setActiveStep(0);
    setRotaryAngle(-45);
    playDialClickSound();

    const timeouts = [];
    timeouts.push(
      setTimeout(() => {
        setActiveStep(1);
        setCompletedSteps([0, 1]);
        setRotaryAngle(15);
        playDialClickSound();
      }, 10000)
    );
    timeouts.push(
      setTimeout(() => {
        setActiveStep(2);
        setCompletedSteps([0, 1, 2]);
        setRotaryAngle(75);
        playDialClickSound();
      }, 20000)
    );
    timeouts.push(
      setTimeout(() => {
        setActiveStep(3);
        setCompletedSteps([0, 1, 2, 3]);
        setRotaryAngle(135);
        playDialClickSound();
      }, 30000)
    );
    timeouts.push(
      setTimeout(() => {
        setIsPlaying(false);
      }, 40000)
    );
  };

  const handleNext = () => {
    const nextIdx = (activeStep + 1) % WORKFLOW_STAGES.length;
    handleSelectLevel(nextIdx);
    if (!completedSteps.includes(nextIdx)) {
      setCompletedSteps([...completedSteps, nextIdx]);
    }
  };

  const handlePrev = () => {
    const prevIdx = (activeStep - 1 + WORKFLOW_STAGES.length) % WORKFLOW_STAGES.length;
    handleSelectLevel(prevIdx);
  };

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="py-10 sm:py-16 border-t relative overflow-hidden bg-gradient-to-b from-[#e3eee6] via-[#edf5f0] to-[#e4f0e8]"
      style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}
    >
      {/* ========================================================================= */}
      {/* ATMOSPHERIC FOREST SKYLINE & NATURE LANDSCAPE BACKGROUND                  */}
      {/* ========================================================================= */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 sm:h-72 lg:h-84 pointer-events-none overflow-hidden opacity-[0.20] sm:opacity-[0.26] mix-blend-multiply z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full text-[#143322]"
          fill="currentColor"
        >
          {/* Distant Forest Ridge */}
          <path
            d="M0,210 Q220,150 440,190 T880,160 T1320,200 T1440,180 L1440,320 L0,320 Z"
            fill="#234934"
            opacity="0.5"
          />
          {/* Dense Pine Silhouette Band */}
          <g fill="#143322">
            <polygon points="25,290 10,290 20,250 14,250 22,220 16,220 25,185 34,220 28,220 36,250 30,250 40,290" />
            <polygon points="70,290 50,290 62,245 54,245 66,205 58,205 70,160 82,205 74,205 86,245 78,245 90,290" />
            <polygon points="120,295 105,295 115,260 108,260 117,230 110,230 120,205 130,230 123,230 132,260 125,260 135,295" />
            <polygon points="165,290 145,290 158,248 150,248 162,215 154,215 165,175 176,215 168,215 180,248 172,248 185,290" />
            <polygon points="220,295 200,295 212,255 205,255 215,225 208,225 220,195 232,225 225,225 235,255 228,255 240,295" />
            <polygon points="275,290 250,290 265,240 255,240 270,195 260,195 275,145 290,195 280,195 295,240 285,240 300,290" />
            <polygon points="330,295 315,295 324,265 318,265 327,238 321,238 330,210 339,238 333,238 342,265 336,265 345,295" />
            <polygon points="385,290 365,290 377,248 369,248 381,215 373,215 385,175 397,215 389,215 401,248 393,248 405,290" />
            <polygon points="440,290 415,290 430,242 420,242 435,198 425,198 440,148 455,198 445,198 460,242 450,242 465,290" />
            <polygon points="495,295 480,295 489,265 483,265 492,238 486,238 495,210 504,238 498,238 507,265 501,265 510,295" />
            <polygon points="550,290 530,290 542,248 534,248 546,215 538,215 550,175 562,215 554,215 566,248 558,248 570,290" />
            <polygon points="605,290 580,290 595,240 585,240 600,195 590,195 605,145 620,195 610,195 625,240 615,240 630,290" />
            <polygon points="660,295 645,295 654,265 648,265 657,238 651,238 660,210 669,238 663,238 672,265 666,265 675,295" />
            <polygon points="715,290 695,290 707,248 699,248 711,215 703,215 715,175 727,215 719,215 731,248 723,248 735,290" />
            <polygon points="770,290 745,290 760,240 750,240 765,195 755,195 770,145 785,195 775,195 790,240 780,240 795,290" />
            <polygon points="825,295 810,295 819,265 813,265 822,238 816,238 825,210 834,238 828,238 837,265 831,265 840,295" />
            <polygon points="880,290 860,290 872,248 864,248 876,215 868,215 880,175 892,215 884,215 896,248 888,248 900,290" />
            <polygon points="935,290 910,290 925,242 915,242 930,198 920,198 935,148 950,198 940,198 955,242 945,242 960,290" />
            <polygon points="990,295 975,295 984,265 978,265 987,238 981,238 990,210 999,238 993,238 1002,265 996,265 1005,295" />
            <polygon points="1045,290 1025,290 1037,248 1029,248 1041,215 1033,215 1045,175 1057,215 1049,215 1061,248 1053,248 1065,290" />
            <polygon points="1100,290 1075,290 1090,240 1080,240 1095,195 1085,195 1100,145 1115,195 1105,195 1120,240 1110,240 1125,290" />
            <polygon points="1155,295 1140,295 1149,265 1143,265 1152,238 1146,238 1155,210 1164,238 1158,238 1167,265 1161,265 1170,295" />
            <polygon points="1210,290 1190,290 1202,248 1194,248 1206,215 1198,215 1210,175 1222,215 1214,215 1226,248 1218,248 1230,290" />
            <polygon points="1265,290 1240,290 1255,242 1245,242 1260,198 1250,198 1265,148 1280,198 1270,198 1285,242 1275,242 1290,290" />
            <polygon points="1320,295 1305,295 1314,265 1308,265 1317,238 1311,238 1320,210 1329,238 1323,238 1332,265 1326,265 1335,295" />
            <polygon points="1375,290 1355,290 1367,248 1359,248 1371,215 1363,215 1375,175 1387,215 1379,215 1391,248 1383,248 1395,290" />
            <polygon points="1425,295 1410,295 1419,265 1413,265 1422,238 1416,238 1425,210 1434,238 1428,238 1437,265 1431,265 1440,295" />
          </g>
          <rect x="0" y="305" width="1440" height="15" fill="#143322" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* ========================================================================= */}
        {/* SECTION HEADER WITH 40S SPEEDRUN BUTTON                                   */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left scroll-reveal-header">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-emerald-100/90 text-emerald-950 border border-emerald-300 flex items-center gap-1.5 backdrop-blur-xs">
                <Trees className="w-3.5 h-3.5 text-emerald-800" />
                CLEARANCE QUESTLINE
              </span>
              <span className="text-xs font-mono text-stone-600">Scroll to rotate dial &amp; advance mission</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
              style={{ color: 'var(--text-main, #1a1d1a)' }}
            >
              From Project Coordinates to Official Clearance
            </h2>
          </div>

          {/* Prominent Large Gamified Speedrun Controller */}
          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
            <button
              onClick={handleRunSpeedrun}
              disabled={isPlaying}
              className={`btn-neumorphic px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer shadow-md ${
                isPlaying ? 'opacity-70 scale-98' : 'hover:scale-102 hover:shadow-lg'
              }`}
            >
              <Zap className={`w-5 h-5 ${isPlaying ? 'text-amber-600 animate-spin' : 'text-emerald-800'}`} />
              <span>{isPlaying ? '⚡ Running 40s Simulation...' : '⚡ Run 40s Speedrun'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CALIBRATED ROTARY SWITCH CONTROLLER (ROTATES ON SCROLL)                   */}
        {/* ========================================================================= */}
        <div className="flex justify-center my-4 relative z-20">
          <div className="bg-white/80 backdrop-blur-md border border-white/90 p-2 sm:p-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center gap-3 sm:gap-5">
            <div className="text-xs font-mono font-bold uppercase text-emerald-950 px-2 sm:px-3 hidden sm:inline">
              MISSION DIAL:
            </div>

            {/* Central Calibrated Rotary Knob (Rotates on Scroll) */}
            <div
              className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center rounded-2xl bg-[#eae6dc] border border-[#d5cfc2] shadow-[inset_0_2px_6px_rgba(0,0,0,0.12)] cursor-pointer hover:border-emerald-700 transition-colors"
              onClick={handleToggleDial}
              title="Rotate dial on scroll or click to advance levels"
            >
              {/* Dial Angle Knob */}
              <div
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#faf9f5] to-[#ece8de] border border-[#d5cfc2] shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: `rotate(${rotaryAngle}deg)`,
                }}
              >
                {/* Pointer Needle */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3.5 bg-emerald-700 rounded-full shadow-xs" />
                {/* Metallic Center Cap */}
                <div className="w-4 h-4 rounded-full bg-[#d5cfc2] border border-white shadow-inner" />
              </div>
            </div>

            {/* Stage Level Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {WORKFLOW_STAGES.map((st, i) => (
                <button
                  key={st.step}
                  onClick={() => handleSelectLevel(i)}
                  className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeStep === i
                      ? 'bg-emerald-950 text-white shadow-md'
                      : 'bg-white/80 text-stone-700 hover:bg-white border border-stone-200 shadow-2xs'
                  }`}
                >
                  L{st.step}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIQUID GLASS CONNECTING PATH RIBBON & LEVEL CHECKPOINTS (MY-6 SM:MY-8)    */}
        {/* ========================================================================= */}
        <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.05)] relative overflow-hidden my-6 sm:my-8">
          {/* Liquid Glass Highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20 pointer-events-none" />

          {/* Level Tracker Status Bar */}
          <div className="flex items-center justify-between text-xs font-mono mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-950 bg-emerald-100/90 px-3 py-1 rounded border border-emerald-300 backdrop-blur-xs">
                LEVEL 0{currentSelected + 1} OF 04
              </span>
              <span className="text-stone-700 font-semibold text-xs sm:text-sm">{curStage.quest}</span>
            </div>
          </div>

          {/* Connected Neon Energy Line */}
          <div className="relative my-3 z-10">
            <div className="h-2.5 w-full bg-stone-300/60 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-purple-500 transition-all duration-700 ease-in-out rounded-full shadow-xs"
                style={{
                  width: `${((currentSelected + 1) / 4) * 100}%`,
                }}
              />
            </div>

            {/* 4 Interactive Level Node Buttons */}
            <div className="grid grid-cols-4 gap-2 -mt-5 relative z-10">
              {WORKFLOW_STAGES.map((st, idx) => {
                const isCur = idx === currentSelected;
                const isPassed = completedSteps.includes(idx) || idx <= currentSelected;

                return (
                  <button
                    key={st.step}
                    onClick={() => handleSelectLevel(idx)}
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                      isCur ? 'scale-105' : 'hover:scale-102'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-bold border-2 transition-all duration-500 ${
                        isCur
                          ? 'bg-emerald-950 text-white border-emerald-400 ring-4 ring-emerald-500/25 shadow-md scale-110'
                          : isPassed
                          ? 'bg-emerald-800 text-white border-emerald-600 shadow-xs'
                          : 'bg-white/90 backdrop-blur-sm text-stone-600 border-white/80 hover:border-stone-400 shadow-2xs'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : st.step}
                    </div>

                    <div className="mt-2 text-center">
                      <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-tight truncate max-w-[85px] sm:max-w-none text-stone-900">
                        {st.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SINGLE FULL-STAGE LIQUID GLASS GAME LEVEL HUD CARD                        */}
        {/* ========================================================================= */}
        <div
          className={`p-6 sm:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border transition-all duration-500 ease-in-out relative overflow-hidden bg-white/70 backdrop-blur-md my-6 sm:my-8 ${colors.activeBorder}`}
          style={{
            boxShadow: '0 20px 50px -10px rgba(28, 59, 43, 0.10), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
          }}
        >
          {/* Ambient Liquid Flare */}
          <div
            className="absolute -top-10 -right-10 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none -z-10"
            style={{ backgroundColor: colors.lineColor }}
          />

          {/* Top Mission HUD Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-300/70">
            <div className="flex items-center gap-3.5">
              {/* Neumorphic Icon Badge */}
              <div className="neumorphic-icon-badge w-12 h-12 rounded-xl shrink-0 shadow-sm">
                <IconComp className="w-6 h-6 text-[#1e3b2b]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-bold uppercase ${colors.phaseText}`}>
                    LEVEL {curStage.step} PROTOCOL
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 mt-0.5">
                  {curStage.title}
                </h3>
              </div>
            </div>

            {/* Quick Level Navigation Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handlePrev}
                className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-stone-300/80 bg-white/70 hover:bg-white text-stone-800 transition-all cursor-pointer backdrop-blur-sm shadow-xs"
              >
                ◀ Prev Level
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-1.5 text-xs font-mono font-bold rounded-lg border border-emerald-700 bg-emerald-850 hover:bg-emerald-900 text-white transition-all cursor-pointer flex items-center gap-1 shadow-xs bg-[#1a3828]"
              >
                <span>Next Level</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2-Column Tactical Mission Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
            {/* Left Column: Mission Briefing & Active Engine (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Mission Briefing */}
              <div className="space-y-1.5">
                <div className="text-xs font-mono uppercase font-bold text-stone-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-800" />
                  Mission Objective &amp; Ingestion Layer:
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-stone-800 font-normal">
                  {curStage.desc}
                </p>
              </div>

              {/* Core Engine Specifications HUD (Liquid Glass Card) */}
              <div className="p-4 rounded-xl border border-white/80 bg-white/50 backdrop-blur-md shadow-xs space-y-2.5">
                <div className="text-xs font-mono uppercase font-bold text-stone-700">
                  Active Clearance Engine:
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-mono text-xs px-3 py-1 rounded-md border font-bold shadow-2xs ${colors.badgeBg}`}>
                    {curStage.tech}
                  </span>
                  <span className="font-mono text-xs px-3 py-1 rounded-md border bg-white/80 border-stone-300 font-semibold text-stone-900 shadow-2xs">
                    Payload: {curStage.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Tactical Verification HUD & Deliverable (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Tactical Verification Checklist (Liquid Glass Container) */}
              <div className="p-4 rounded-xl border border-white/80 bg-white/50 backdrop-blur-md shadow-xs space-y-2.5">
                <div className="text-xs font-mono uppercase font-bold text-stone-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  Real-Time Verification Checklist:
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-stone-800 font-sans">
                  {curStage.details.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-white/80 border border-white shadow-2xs backdrop-blur-xs"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                        ✓
                      </div>
                      <span className="leading-tight font-medium text-stone-900">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Milestone Package */}
              <div className="p-4 rounded-xl border border-emerald-900/40 bg-[#163223]/95 text-white space-y-1.5 shadow-md">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold uppercase">
                    Stage Deliverable:
                  </span>
                  <span className="text-[11px] text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/50">
                    SHA-256 Verified
                  </span>
                </div>
                <div className="font-bold text-sm sm:text-base text-emerald-50 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{curStage.output}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
