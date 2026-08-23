import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

// Primary System Palette: Warm Off-White, Charcoal, Muted Forest Green, Amber
const PRIMARY = [49, 92, 72];       // Muted Forest Green #315c48
const PRIMARY_DARK = [36, 71, 55];  // Primary Dark #244737
const DARK_SURFACE = [34, 42, 37];  // Charcoal Dark Surface #222a25
const AMBER = [183, 121, 39];       // Amber for charging states #b77927
const RED = [165, 77, 66];          // Red #a54d42
const TEXT_MAIN = [32, 35, 31];     // Charcoal Text #20231f
const TEXT_MUTED = [115, 118, 111]; // Muted Text #73766f
const BG_CANVAS = [243, 241, 235];  // Background: Warm Off-White #f3f1eb
const BG_SURFACE = [251, 250, 246]; // Surface: Warm Light #fbfaf6
const BORDER = [216, 212, 202];     // Borders #d8d4ca

let y = 18;
const margin = 14;
const pageWidth = 210;
const pageHeight = 297;
const contentWidth = pageWidth - margin * 2;

function checkPageBreak(neededHeight) {
  if (y + neededHeight > pageHeight - 18) {
    doc.addPage();
    y = 18;
    addPageHeaderFooter();
  }
}

function addPageHeaderFooter() {
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Ecoryx: Architecture, API Specifications & Color Sample Guide', margin, 10);
  doc.text(`Page ${pageCount}`, pageWidth - margin, 10, { align: 'right' });
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.line(margin, 12, pageWidth - margin, 12);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
  doc.text('Smart India Hackathon 2026 • Ministry of Environment & Climate Standards', margin, pageHeight - 8);
}

// -------------------------------------------------------------
// COVER / HEADER SECTION
// -------------------------------------------------------------
addPageHeaderFooter();

// Title Container
doc.setFillColor(...BG_CANVAS);
doc.setDrawColor(...BORDER);
doc.roundedRect(margin, y, contentWidth, 32, 4, 4, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(17);
doc.setTextColor(...PRIMARY);
doc.text('ECORYX SYSTEM ARCHITECTURE & API MANUAL', margin + 6, y + 10);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...TEXT_MAIN);
doc.text('AI-Powered Geospatial Environmental Clearance Platform // Technical Guide', margin + 6, y + 17);

doc.setFontSize(8);
doc.setTextColor(...TEXT_MUTED);
doc.text('Official Palette: Warm Off-White, Charcoal, Muted Forest Green, Amber (SIH 2026)', margin + 6, y + 24);

y += 38;

// -------------------------------------------------------------
// SECTION 1: END-TO-END PIPELINE DIAGRAM
// -------------------------------------------------------------
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...PRIMARY);
doc.text('1. End-to-End System Pipeline Architecture', margin, y);
y += 6;

const pipelineBoxes = [
  {
    title: '[ Step 1: User Input Layer ]',
    subtitle: 'Latitude, Longitude, Project Footprint (Ha), Search Radius (km), Industry Category',
    bg: [251, 250, 246],
    border: [216, 212, 202],
    textColor: PRIMARY,
  },
  {
    title: '[ Step 2: FastAPI Data Aggregation Engine ]',
    subtitle: 'High-Throughput Asynchronous Orchestrator (<0.38s parallel multi-source ingestion)',
    bg: [226, 235, 229],
    border: [49, 92, 72],
    textColor: [36, 71, 55],
  },
];

pipelineBoxes.forEach((b) => {
  doc.setFillColor(...b.bg);
  doc.setDrawColor(...b.border);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 14, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...b.textColor);
  doc.text(b.title, margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(b.subtitle, margin + 4, y + 10.5);

  y += 18;
});

// 4 Ingestion Services in 2x2 Grid
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...TEXT_MAIN);
doc.text('Concurrent Ingestion Services (Step 3):', margin, y);
y += 5;

const services = [
  {
    name: '1. Weather & AQI APIs',
    details: 'PM2.5, PM10, AQI Index, Temperature, Wind direction & speed',
    color: PRIMARY,
  },
  {
    name: '2. Overpass (OSM)',
    details: 'River drainage basins, water bodies, wetlands, reserve forests',
    color: AMBER,
  },
  {
    name: '3. PostGIS DB',
    details: 'R-Tree spatial index, Wildlife Sanctuaries, IUCN Red List status',
    color: PRIMARY_DARK,
  },
  {
    name: '4. Demographics',
    details: 'Buffer population density, nearest village/habitation clusters',
    color: RED,
  },
];

const colW = (contentWidth - 6) / 2;
for (let i = 0; i < services.length; i += 2) {
  const s1 = services[i];
  const s2 = services[i + 1];

  // Box 1
  doc.setFillColor(251, 250, 246);
  doc.setDrawColor(...BORDER);
  doc.roundedRect(margin, y, colW, 16, 3, 3, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...s1.color);
  doc.text(s1.name, margin + 3, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(doc.splitTextToSize(s1.details, colW - 6), margin + 3, y + 9.5);

  // Box 2
  if (s2) {
    doc.setFillColor(251, 250, 246);
    doc.setDrawColor(...BORDER);
    doc.roundedRect(margin + colW + 6, y, colW, 16, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...s2.color);
    doc.text(s2.name, margin + colW + 9, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(doc.splitTextToSize(s2.details, colW - 6), margin + colW + 9, y + 9.5);
  }

  y += 20;
}

const finalSteps = [
  {
    title: '[ Step 4: Compiled Site Environmental JSON ]',
    subtitle: 'Consolidated standardized GeoJSON payload ready for statutory cross-referencing',
    bg: [251, 250, 246],
    border: [216, 212, 202],
    textColor: TEXT_MAIN,
  },
  {
    title: '[ Step 5: Gemini API + Regulatory Rulebook ]',
    subtitle: '2,400+ EIA Gazette Laws checked, Sensitivity Score (0-100), Environmental Management Plan (EMP)',
    bg: [34, 42, 37],
    border: [49, 92, 72],
    textColor: [226, 235, 229],
  },
  {
    title: '[ Step 6: PDF Report Engine (ReportLab) ]',
    subtitle: 'Generates finalized, certified, audit-ready EIA Clearance PDF with digital verification seal',
    bg: [226, 235, 229],
    border: [49, 92, 72],
    textColor: [36, 71, 55],
  },
];

finalSteps.forEach((b) => {
  doc.setFillColor(...b.bg);
  doc.setDrawColor(...b.border);
  doc.roundedRect(margin, y, contentWidth, 14, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...b.textColor);
  doc.text(b.title, margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...(b.bg[0] < 50 ? [200, 205, 200] : TEXT_MUTED));
  doc.text(b.subtitle, margin + 4, y + 10.5);

  y += 17;
});

// -------------------------------------------------------------
// SECTION 2: API & DATA SERVICES SPECIFICATIONS (PAGE 2)
// -------------------------------------------------------------
doc.addPage();
y = 18;
addPageHeaderFooter();

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...PRIMARY);
doc.text('2. API & Data Services Specifications', margin, y);
y += 8;

const apiSpecs = [
  {
    name: 'FastAPI Data Aggregation Core',
    endpoint: 'POST /api/v1/clearance/audit',
    provider: 'FastAPI 0.110+ Asynchronous ASGI Server',
    desc: 'Receives user coordinates, dispatches asynchronous asyncio coroutines to query PostGIS, Overpass, Weather, and Demographics in < 0.38s, and produces consolidated JSON.',
    storage: 'src/components/ConsoleView/ConsoleSection.jsx & src/components/ArchitectureSection.jsx',
  },
  {
    name: 'Weather & AQI Atmospheric Monitor',
    endpoint: 'GET https://air-quality-api.open-meteo.com/v1/air-quality',
    provider: 'Open-Meteo Air Quality / CPCB National AQI',
    desc: 'Retrieves PM2.5, PM10, AQI Index, Ambient Temperature (°C), and Wind Direction for air pollution dispersion radius modeling.',
    storage: 'src/constants/presets.js (weather_aqi schema) & src/components/ConsoleView/ScorecardTab.jsx',
  },
  {
    name: 'Overpass API (OpenStreetMap)',
    endpoint: 'POST https://overpass-api.de/api/interpreter',
    provider: 'Overpass QL Spatial Data Engine',
    desc: 'Performs spatial bounding radius queries to detect freshwater streams, river basins, canals, wetlands, and reserve forest boundaries.',
    storage: 'src/components/ConsoleView/SpatialTab.jsx (Hydro & Landuse Layers)',
  },
  {
    name: 'PostGIS Spatial Engine',
    endpoint: 'PostgreSQL 16 + PostGIS 3.4 (Internal Database)',
    provider: 'MoEFCC National Wildlife & Forest Spatial Database',
    desc: 'Executes ST_DWithin & ST_Intersects using R-Tree spatial indexing across 106 National Parks, 573 Wildlife Sanctuaries, and IUCN Red List species habitats.',
    storage: 'src/constants/presets.js (postgis_db schema) & src/components/ConsoleView/ScorecardTab.jsx',
  },
  {
    name: 'Demographics Engine',
    endpoint: 'Local Spatial Census Boundary Service',
    provider: 'National Census Bureau & Open Data Habitation Layers',
    desc: 'Calculates the resident human population residing within the project radial buffer and measures distance to nearest village/habitation.',
    storage: 'src/components/ConsoleView/ScorecardTab.jsx & src/constants/presets.js',
  },
  {
    name: 'Gemini API + Regulatory Rulebook',
    endpoint: 'POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
    provider: 'Google DeepMind Gemini LLM + MoEFCC Gazette Rulebook',
    desc: 'Cross-checks 2,400+ digitized statutory EIA laws (WPA 1972, FCA 1980, Water Act 1974, Air Act 1981, CRZ 2019), computes 0-100 Sensitivity Score, and drafts EMP.',
    storage: 'src/components/ConsoleView/ScorecardTab.jsx & src/components/ConsoleView/EmpTab.jsx',
  },
  {
    name: 'PDF Report Engine (ReportLab)',
    endpoint: 'Client-side jsPDF & Backend Python ReportLab',
    provider: 'ReportLab PDF Generator v3.8 / jsPDF v2.5',
    desc: 'Compiles certified, audit-ready EIA Screening PDF reports with radar charts, spatial tables, and official mitigation action plans.',
    storage: 'src/utils/exportPDF.js & src/components/ConsoleView/ConsoleSection.jsx',
  },
];

apiSpecs.forEach((spec) => {
  checkPageBreak(30);

  doc.setFillColor(251, 250, 246);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY);
  doc.text(spec.name, margin + 4, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MAIN);
  doc.text(`Endpoint/Tech: ${spec.endpoint}`, margin + 4, y + 9.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(doc.splitTextToSize(spec.desc, contentWidth - 8), margin + 4, y + 14);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(...AMBER);
  doc.text(`Code Location: ${spec.storage}`, margin + 4, y + 23);

  y += 29;
});

// -------------------------------------------------------------
// SECTION 3: EXACT COLOR PALETTE SPECIFICATION (PAGE 3)
// -------------------------------------------------------------
doc.addPage();
y = 18;
addPageHeaderFooter();

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...PRIMARY);
doc.text('3. Official Color Palette & Artwork Themes', margin, y);
y += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...TEXT_MUTED);
doc.text('Exact tokens configured across src/index.css and src/context/ThemeContext.jsx:', margin, y);
y += 8;

const officialPaletteTokens = [
  { name: 'Background (Warm Off-White)', hex: '#f3f1eb', role: 'Main page background canvas and backdrop tint', color: [243, 241, 235] },
  { name: 'Surface (Warm Light Card)', hex: '#fbfaf6', role: 'Card containers, UI panels, elevated white widgets', color: [251, 250, 246] },
  { name: 'Dark Surface (Charcoal)', hex: '#222a25', role: 'Dark hero console bar, raw code preview, high-contrast dark buttons', color: [34, 42, 37] },
  { name: 'Primary (Muted Forest Green)', hex: '#315c48', role: 'Primary CTA buttons, brand badges, active GIS layers, headlines', color: [49, 92, 72] },
  { name: 'Primary Dark', hex: '#244737', role: 'Primary button hover states, deep contrast typography', color: [36, 71, 55] },
  { name: 'Amber (Charging States & Caution)', hex: '#b77927', role: 'Active charging states, solar energy, caution notifications', color: [183, 121, 39] },
  { name: 'Red (Alerts)', hex: '#a54d42', role: 'Protected area violations, air quality warnings, old manual process alerts', color: [165, 77, 66] },
  { name: 'Text (Charcoal Body)', hex: '#20231f', role: 'High-contrast readable headings and body copy', color: [32, 35, 31] },
  { name: 'Muted Text', hex: '#73766f', role: 'Subtitles, secondary labels, coordinate metadata', color: [115, 118, 111] },
  { name: 'Borders (Warm Subtle)', hex: '#d8d4ca', role: 'Card borders, table dividers, input bounding lines', color: [216, 212, 202] },
];

officialPaletteTokens.forEach((tok) => {
  checkPageBreak(18);

  doc.setFillColor(...tok.color);
  doc.setDrawColor(...BORDER);
  doc.roundedRect(margin, y, 10, 10, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY);
  doc.text(`${tok.name}  —  ${tok.hex}`, margin + 14, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(tok.role, margin + 14, y + 9);

  y += 14;
});

// -------------------------------------------------------------
// SECTION 4: FILE STRUCTURE & NAVIGATION MAP (PAGE 4)
// -------------------------------------------------------------
doc.addPage();
y = 18;
addPageHeaderFooter();

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...PRIMARY);
doc.text('4. Codebase File Structure & Navigation Map', margin, y);
y += 8;

const fileMap = [
  { path: 'src/App.jsx', role: 'Main page layout orchestrator, state manager for coordinates, presets & audits' },
  { path: 'src/main.jsx', role: 'App entry point wrapping root with ThemeProvider' },
  { path: 'src/index.css', role: 'Global CSS variables (warm off-white, forest green, charcoal), rotary switch styles' },
  { path: 'src/context/ThemeContext.jsx', role: 'Dynamic color theme engine with warm forest palette & localStorage persistence' },
  { path: 'src/components/ThemeSelector.jsx', role: 'Color sample dropdown switcher with live preview in navbar' },
  { path: 'src/constants/presets.js', role: 'Scenario presets with 4-stream architecture data (Aravalli, Ghats, Solar, etc.)' },
  { path: 'src/components/Header.jsx', role: 'Top navigation bar with embedded ThemeSelector dropdown' },
  { path: 'src/components/Hero.jsx', role: 'Hero section with TopographyRadiusMap, GIS stats, and meadow background' },
  { path: 'src/components/TopographyRadiusMap.jsx', role: 'Interactive Leaflet GIS radius scanner with elevation contours & conflict pins' },
  { path: 'src/components/RotarySwitch.jsx', role: 'Skeuomorphic 2-state rotary dial switching Before vs. After Ecoryx view' },
  { path: 'src/components/WorkbenchSection.jsx', role: 'Main comparison container holding rotary switch & views' },
  { path: 'src/components/BeforeEcoryxView.jsx', role: 'Breakdown of old manual paperwork delays, metric cards, & pain points' },
  { path: 'src/components/WorkflowSection.jsx', role: '4-Step automated clearance workflow + Blume-inspired organic cloud quote card' },
  { path: 'src/components/SectorsSection.jsx', role: 'Bento grid showing Solar, Transport, Hydrology & Statutory Legal intelligence' },
  { path: 'src/components/ArchitectureSection.jsx', role: 'Live interactive architecture flowchart matching system pipeline diagram' },
  { path: 'src/components/CalculatorSection.jsx', role: 'Interactive ROI calculator calculating review months & crore rupees preserved' },
  { path: 'src/components/Footer.jsx', role: 'Footer with system status indicator & Smart India Hackathon 2026 credits' },
  { path: 'src/components/ConsoleView/ConsoleSection.jsx', role: 'Clearance workspace with preset selector, tab navigation, & PDF export' },
  { path: 'src/components/ConsoleView/AuditForm.jsx', role: 'Form inputs for Latitude, Longitude, Project Area (Ha), & Industry Category' },
  { path: 'src/components/ConsoleView/ScorecardTab.jsx', role: '4 Ingestion Stream cards (PostGIS, OSM, AQI, Demographics) + Gemini verdict' },
  { path: 'src/components/ConsoleView/SpatialTab.jsx', role: 'PostGIS & Overpass OSM spatial layers table with statutory rules & mitigation' },
  { path: 'src/components/ConsoleView/EmpTab.jsx', role: 'Official Action Plan: Clean Air filters, Zero Liquid Discharge & tree planting' },
  { path: 'src/components/ConsoleView/JsonTab.jsx', role: 'Consolidated site environmental JSON schema viewer with 1-click copy' },
  { path: 'src/components/ConsoleView/RadarChart.jsx', role: 'Chart.js 5-dimension vulnerability radar visualization' },
  { path: 'src/utils/exportPDF.js', role: 'Generates client-side certified EIA audit PDF deliverable' },
];

fileMap.forEach((item) => {
  checkPageBreak(12);

  doc.setFillColor(251, 250, 246);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, y, contentWidth, 9.5, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...PRIMARY);
  doc.text(item.path, margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MAIN);
  doc.text(doc.splitTextToSize(item.role, contentWidth - 6), margin + 3, y + 8);

  y += 11.5;
});

// -------------------------------------------------------------
// SECTION 5: STORED REFERENCE IMAGES (PAGE 5)
// -------------------------------------------------------------
doc.addPage();
y = 18;
addPageHeaderFooter();

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...PRIMARY);
doc.text('5. Stored Reference Images Directory', margin, y);
y += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...TEXT_MUTED);
doc.text('All architecture diagrams, color palettes, and visual design assets are stored in docs/reference_images/:', margin, y);
y += 8;

const refImages = [
  {
    file: '01_architecture_diagram.png',
    title: 'Official Architecture Flowchart',
    desc: 'Pipeline: User Input -> FastAPI -> 4 Ingestion Services (Weather/AQI, Overpass OSM, PostGIS, Demographics) -> JSON -> Gemini API -> ReportLab PDF',
    size: '88.5 KB',
  },
  {
    file: '02_blume_meadow_design_ref.jpg',
    title: 'Blume Meadow Design Benchmark',
    desc: 'Inspiration visual showing lush rolling green hills, wild daisies, pure white cards, and organic cloud-shaped callout containers',
    size: '185.2 KB',
  },
  {
    file: '03_lush_meadow_hill_bg.jpg',
    title: 'Lush Meadow Hill Background Asset',
    desc: 'High-definition rolling green grass hill background photograph with sunlit daisies used in the Hero section and background layers',
    size: '1.08 MB',
  },
  {
    file: '04_color_palette_ref_1.jpg',
    title: 'Artwork Reference 1 (Golden Rapeseed & Sky)',
    desc: 'Cyclists riding through golden yellow rapeseed fields under azure blue sky (#D97706, #0284C7, #FAF7EE)',
    size: '386.6 KB',
  },
  {
    file: '05_color_palette_ref_2.jpg',
    title: 'Artwork Reference 2 (Canola Meadow & Red Accent)',
    desc: 'Field of hope road through lush yellow blooms with red roof accent (#CA8A04, #65A30D, #DC2626)',
    size: '183.5 KB',
  },
  {
    file: '06_color_palette_ref_3.jpg',
    title: 'Artwork Reference 3 (Studio Ghibli Countryside)',
    desc: 'Tabineko calendar scene with rice paddy greens, azure stream, and terracotta accents (#15803D, #0284C7, #FB923C)',
    size: '209.1 KB',
  },
  {
    file: '07_color_palette_ref_4.jpg',
    title: 'Artwork Reference 4 (Cool Summer Lagoon)',
    desc: 'Emerald swimming cove with deep teal water and fresh lime foliage (#047857, #65A30D, #F5FAF7)',
    size: '211.0 KB',
  },
  {
    file: '08_color_palette_ref_5.jpg',
    title: 'Artwork Reference 5 (Minimalist Mustard & Olive)',
    desc: 'Mustard field hillside with olive trees and earthy rustic textures (#B45309, #4D7C0F, #DC2626)',
    size: '106.6 KB',
  },
];

refImages.forEach((img, idx) => {
  checkPageBreak(22);

  doc.setFillColor(251, 250, 246);
  doc.setDrawColor(...BORDER);
  doc.roundedRect(margin, y, contentWidth, 18, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PRIMARY);
  doc.text(`[${idx + 1}] resources/reference_images/${img.file}`, margin + 4, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...TEXT_MAIN);
  doc.text(`${img.title} (${img.size})`, margin + 4, y + 9.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(doc.splitTextToSize(img.desc, contentWidth - 8), margin + 4, y + 13.5);

  y += 21;
});

// Output PDF to file
const outputDir = path.join(__dirname, '..', 'documentation');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'Ecoryx_Architecture_and_API_Guide.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

console.log(`PDF successfully generated at: ${outputPath}`);
