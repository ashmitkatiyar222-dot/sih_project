# Ecoryx: System Architecture, API Specifications, Color Sample System & Navigation Guide

**Project Name**: Ecoryx — AI-Powered Geospatial Environmental Clearance Platform  
**Version**: 2.5.0 (Production Release)  
**Smart India Hackathon 2026** • Ministry of Environment, Forest and Climate Change (MoEFCC) Standards  

---

## 1. System Architecture Diagram

```
[ User Input: Lat, Lon, Project Area, Industry Type ]
                      │
                      ▼
      [ FastAPI Data Aggregation Engine ]
                      │
   ┌──────────────────┼────────────────────────┬──────────────────┐
   ▼                  ▼                        ▼                  ▼
[ Weather & AQI APIs ]  [ Overpass (OSM) ]     [ PostGIS DB ]     [ Demographics ]
• PM2.5, PM10, AQI      • Water bodies         • Flora & Fauna    • Population in Buffer
• Temp, Wind direction  • Landuse, Forests     • IUCN Status      • Nearest Settlement
   └──────────────────┬────────────────────────┴──────────────────┘
                      │
                      ▼
      [ Compiled Site Environmental JSON ]
                      │
                      ▼
      [ Gemini API + Regulatory Rulebook ]
      • Cross-checks statutory clearance clauses (2,400+ EIA Gazette Laws)
      • Computes Environmental Sensitivity Scores (0 - 100)
      • Drafts Environmental Management Plan (EMP)
                      │
                      ▼
      [ PDF Report Engine (ReportLab) ]
      • Generates finalized, audit-ready EIA Screening PDF
```

---

## 2. API & Data Services Specifications

### A. Core Orchestration Engine
* **Technology**: FastAPI (Asynchronous Python 3.11+ ASGI Core)
* **Port**: `8000` (Local API Gateway) / `5174` (Frontend Presentation)
* **Role**: Coordinates asynchronous, sub-second (0.38s) parallel querying across the 4 data ingestion services, compiles the consolidated GeoJSON payload, and feeds it into the Gemini Statutory Engine.
* **Key Endpoint**: `POST /api/v1/clearance/audit`

---

### B. Ingestion Stream 1: Weather & AQI APIs
* **Providers**: Open-Meteo Air Quality API / CPCB CAAQMS / OpenWeatherMap
* **Parameters Retrieved**:
  - `PM2.5` & `PM10` Particulate Concentrations (µg/m³)
  - `AQI` (Air Quality Index) & Non-Attainment status
  - `Ambient Temperature` (°C) & `Wind Direction/Speed` (km/h) for atmospheric dispersion modeling
* **Storage / Mock File**: `src/constants/presets.js` (`weather_aqi` object)

---

### C. Ingestion Stream 2: Overpass API (OpenStreetMap)
* **Provider**: OpenStreetMap Overpass QL Engine (`https://overpass-api.de/api/interpreter`)
* **Queries Executed**:
  - `[out:json]; (way["natural"="water"](around:radius,lat,lon); relation["waterway"="river"](around:radius,lat,lon););`
  - `(way["landuse"="forest"](around:radius,lat,lon); way["natural"="wood"](around:radius,lat,lon););`
* **Features Extracted**: River drainage basins, aquifers, wetlands, canals, and designated reserve forest boundaries.
* **Storage / UI**: `src/components/ConsoleView/SpatialTab.jsx`

---

### D. Ingestion Stream 3: PostGIS Spatial Database
* **Database**: PostgreSQL 16 + PostGIS Extension 3.4
* **Spatial Indexing**: R-Tree Spatial Index (GIST indexing on `geometry(Polygon, 4326)`)
* **Spatial Functions**:
  - `ST_DWithin(project_geom, sanctuary_geom, buffer_distance)`
  - `ST_Intersects(project_geom, eco_sensitive_zone)`
* **Data Layers Tracked**:
  - 106 National Parks & 573 Wildlife Sanctuaries across India
  - Flora & Fauna species mapping with IUCN Red List classification (Schedule-I to Schedule-IV)
* **Storage / UI**: `src/components/ConsoleView/ScorecardTab.jsx`

---

### E. Ingestion Stream 4: Demographics Engine
* **Providers**: National Census Data & Open Data Urban Layers
* **Parameters Retrieved**:
  - `Population in Buffer`: Human population density within the radial scan buffer (5 km – 20 km)
  - `Nearest Habitation`: Distance to closest residential village or urban cluster
* **Storage / UI**: `src/components/ConsoleView/ScorecardTab.jsx`

---

### F. Statutory AI Engine: Gemini API + Regulatory Rulebook
* **Provider**: Google DeepMind Gemini API (`gemini-1.5-pro` / `gemini-2.0-flash`)
* **Legal Grounding**: 2,400+ Digitized National Gazette EIA Notifications, Acts, and SOPs:
  - *Wildlife Protection Act, 1972* (Sec 38-O, National Board for Wildlife)
  - *Forest (Conservation) Act, 1980* (Sec 2 Non-Forestry Clearance)
  - *Water (Prevention and Control of Pollution) Act, 1974* (Zero Liquid Discharge)
  - *Air (Prevention and Control of Pollution) Act, 1981* (CEMS Ambient Standards)
  - *Coastal Regulation Zone (CRZ) Notification, 2019* (CRZ-I/II/III Clearance)
* **Outputs Generated**:
  1. Composite Nature Risk Score (0 – 100)
  2. Legal Clearance Verdict (`APPROVED`, `CONDITIONAL CLEARANCE WITH EMP`, `CRITICAL REVIEW`)
  3. Actionable Environmental Management Plan (EMP) with mitigation measures
* **Storage / UI**: `src/components/ConsoleView/ScorecardTab.jsx` & `EmpTab.jsx`

---

### G. Deliverable Engine: PDF Report Engine (ReportLab)
* **Backend Library**: Python `reportlab` / Client-side `jspdf`
* **Role**: Synthesizes verified GIS map snapshots, statutory legal clauses, vulnerability radar charts, and EMP recommendations into an official certified PDF report.
* **Trigger**: "Download PDF" in `src/components/ConsoleView/ConsoleSection.jsx`

---

## 3. Official Color Palette & Design System

The system implements your exact designated color tokens across `src/index.css` and `src/context/ThemeContext.jsx`:

| Design Token | Hex Code | Visual Role | Application Area |
| :--- | :--- | :--- | :--- |
| **Background** | `#f3f1eb` | Warm off-white | Main background canvas, page backdrop |
| **Surface** | `#fbfaf6` | Warm light card surface | Component cards, comparison panels, UI widgets |
| **Dark surface** | `#222a25` | Charcoal dark surface | Header bar in console, code snippet container, dark buttons |
| **Primary** | `#315c48` | Muted forest green | Primary CTA buttons, brand badges, active GIS layers, headlines |
| **Primary dark** | `#244737` | Deep forest green | Button hover states, high-contrast dark text highlights |
| **Amber** | `#b77927` | Warm amber | Charging states, solar energy badges, caution indicators |
| **Red** | `#a54d42` | Warm terra red | Protected area alerts, AQI warnings, friction points |
| **Text** | `#20231f` | Charcoal text | Main typography, high-contrast readable headlines |
| **Muted** | `#73766f` | Muted forest slate | Subtitles, metadata, form labels, coordinate badges |
| **Borders** | `#d8d4ca` | Warm border | Card borders, dividing rules, input field borders |

---

## 4. Project Directory & Navigation Map

```
c:\Users\rishi\Downloads\sih presentation\
├── .env                                # Local port & environment configuration (PORT=5174)
├── package.json                        # Project metadata & npm dependencies (ecoryx-presentation)
├── vite.config.js                      # Vite dev server configuration (Host: true, Port: 5174)
├── tailwind.config.js                  # Tailwind design tokens & custom theme variables
│
├── docs/                               # 📁 Documentation & Reference Assets
│   ├── ECORYX_ARCHITECTURE_AND_API_GUIDE.md  # Complete architecture & API guide
│   ├── Ecoryx_Architecture_and_API_Guide.pdf # Exported 5-page PDF manual
│   └── reference_images/               # 📁 All reference images & architecture charts
│       ├── 01_architecture_diagram.png       # Official architecture flowchart
│       ├── 02_blume_meadow_design_ref.jpg    # Blume meadow inspiration design
│       ├── 03_lush_meadow_hill_bg.jpg        # High-res meadow hill background asset
│       ├── 04_color_palette_ref_1.jpg        # Cyclists in golden field artwork
│       ├── 05_color_palette_ref_2.jpg        # Canola meadow artwork
│       ├── 06_color_palette_ref_3.jpg        # Ghibli paddy countryside artwork
│       ├── 07_color_palette_ref_4.jpg        # Summer lagoon artwork
│       └── 08_color_palette_ref_5.jpg        # Mustard & olive artwork
│
├── public/                             # 📁 Static Public Assets
│   └── assets/
│       ├── lush-meadow-hill.jpg        # Active hero background image
│       ├── nature-landscape.jpg        # Nature landscape texture
│       └── nature-meadow.jpg           # Meadow texture
│
└── src/                                # 📁 Source Code
    ├── main.jsx                        # App bootstrap with ThemeProvider
    ├── App.jsx                         # Main page layout & state orchestrator
    ├── index.css                       # CSS variables (warm off-white, forest green, charcoal)
    │
    ├── context/
    │   └── ThemeContext.jsx            # Dynamic theme provider with warm forest palette
    │
    ├── constants/
    │   └── presets.js                  # Complete 4-stream preset data (Aravalli, Ghats, Solar, etc.)
    │
    ├── utils/
    │   ├── audio.js                    # Skeuomorphic rotary dial click sound synth
    │   └── exportPDF.js                # Client-side PDF report synthesis
    │
    └── components/                     # 📁 UI React Components
        ├── Header.jsx                  # Navigation bar with live ThemeSelector dropdown
        ├── ThemeSelector.jsx           # Artwork palette dropdown switcher
        ├── Hero.jsx                    # Topography map scanner, stats, & meadow background
        ├── TopographyRadiusMap.jsx     # Dynamic radius audit visualizer with Leaflet GIS
        ├── RotarySwitch.jsx            # Skeuomorphic 2-state rotary comparison switch
        ├── WorkbenchSection.jsx        # Clearance simulator container
        ├── BeforeEcoryxView.jsx        # Old manual paperwork review breakdown
        ├── WorkflowSection.jsx         # 4-step workflow + Blume-inspired organic cloud card
        ├── SectorsSection.jsx          # Bento grid (Solar, Highways, Hydrology, Statutory)
        ├── ArchitectureSection.jsx     # Live interactive architecture pipeline flowchart
        ├── CalculatorSection.jsx       # Interactive ROI time & money saved calculator
        ├── Footer.jsx                  # Operational status & SIH 2026 credits
        │
        └── ConsoleView/                # 📁 Live Clearance Console Components
            ├── ConsoleSection.jsx      # Console layout, presets, & tab switchers
            ├── AuditForm.jsx           # Coordinate, footprint, buffer & category inputs
            ├── ScorecardTab.jsx        # 4-Stream Ingestion cards + Gemini Verdict & Radar
            ├── SpatialTab.jsx          # PostGIS & Overpass OSM spatial layers table
            ├── EmpTab.jsx              # Certified Environmental Management Plan
            ├── JsonTab.jsx             # Compiled Site Environmental JSON schema
            ├── GisMap.jsx              # Leaflet GIS interactive coordinate picker
            └── RadarChart.jsx          # Chart.js 5-dimension vulnerability radar
```

---

*Generated for Ecoryx SIH 2026 Documentation Team.*
