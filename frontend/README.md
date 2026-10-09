# CityPulse — Explore Smarter. Move Safer.

> **Hackathon Theme:** City Life: Exploring, Experiencing & Navigating the Chaos We Call Home.

CityPulse is a responsive urban navigation and exploration platform designed to help visitors and residents discover tourist attractions, local food, hotels, and heritage sites, while understanding safety reports, traffic congestion, weather conditions, and differences between neighborhoods.

---

## 🌟 Key Features Implemented

1. **City Pulse Telemetry Bar (Live Weather & Traffic)**:
   - **Live Weather API**: Real-time satellite weather from Open-Meteo (temperature, apparent temp, humidity, wind, precipitation). Zero API keys required.
   - **Traffic Flow Modeling**: Peak hour warnings and commuter bottlenecks derived from municipal traffic models, transparently labeled.

2. **Curated Smart Explorer (Categorized Discovery Grid)**:
   - Categorized directory covering **Local Food & Cafes**, **Tourist Attractions**, **Hotels & Stays**, and **Heritage & Culture** across global metropolitan cities (Mumbai, Tokyo, New York, Paris, Bengaluru).
   - Real-time search by place name, neighborhood, tags, or description.
   - Quick filters: *Budget Friendly ($)*, *High Safety (90+)*, and *Night-Safe Corridors*.
   - Place cards featuring image hero, review counts, affordability, night safety conditions, and provenance labels.

3. **Smart City Scorecard & Comparison Duel**:
   - Multi-dimensional objective civic scorecard evaluating:
     - Public Rating (25%)
     - Safety Index (25%)
     - Affordability (20%)
     - Cleanliness Audit (15%)
     - Accessibility Audit (15%)
   - **Zero-Fabrication Guarantee**: Unaudited dimensions (such as street vendor hygiene or uninspected heritage steps) are strictly flagged as `Not Audited / Unknown` rather than inventing false scores.
   - Side-by-side comparative duel for any two locations.

4. **Interactive Geospatial Map (Leaflet & OpenStreetMap)**:
   - Dynamic map centered on active city with custom colored pins for food, heritage, hotels, and attractions.
   - Interactive popups with instant "Inspect Details" modal trigger.
   - Map layer toggles (*All Pins*, *Safe Night Corridors*, *Food*, *Heritage*).
   - Synchronized sidebar directory allowing users to fly and zoom to any landmark.

5. **Citizen Reporting & Civic Telemetry Feed**:
   - Form to submit civic reports: category (Broken Streetlight, Road Hazard, Crowd Gridlock, Cleanliness, Harassment Risk), landmark location, urgency level, and description.
   - Client-side input validation (minimum 15 characters, required fields).
   - Reports initialized with status: `Submitted - Awaiting Municipal Verification` and a unique tracking ID (`#CP-REP-XXXX`).
   - Persisted across sessions via `localStorage`.
   - Community corroboration / upvoting (`+1 observed this`).

6. **Safety First: SOS Emergency Hotlines**:
   - Instant access modal with official local emergency numbers (Police, Ambulance, Women's Safety, Tourist Helpline) with one-click copy buttons.

---

## 🛠️ Technology Stack

- **Frontend**: React 19 + Vite 8
- **Styling**: Vanilla CSS Design System with dark cyber-urban palette, glassmorphism, responsive CSS grid/flexbox
- **Map Engine**: Leaflet 1.9 + OpenStreetMap & CARTO Voyager tiles
- **Iconography**: Lucide React
- **Live APIs**: Open-Meteo REST API (zero keys, free, reliable)
- **Validation & Quality**: Oxlint + custom Node automated functional test suite

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)

### Development Server
```bash
# Navigate to the frontend directory
cd frontend

# On Windows PowerShell (using npm.cmd):
npm.cmd run dev

# On standard shell / macOS / Linux:
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Running Automated Verification Checks

Run the automated data integrity and API connectivity test:
```bash
cd frontend
node src/tests/functionalCheck.js
```

Run linter checks:
```bash
npm.cmd run lint
```

Build for production:
```bash
npm.cmd run build
```

---

## 🚢 Deployment Considerations

CityPulse is built as a static Single Page Application (SPA), making deployment simple and zero-cost:

### 1. Vercel
```bash
cd frontend
npm install -g vercel
vercel
```

### 2. Netlify
Drag and drop the `frontend/dist` directory into the Netlify web dashboard or connect via Git with build command `npm run build` and publish directory `dist`.

### 3. GitHub Pages
Add `"base": "./"` to `vite.config.js` and deploy the contents of `dist/` to the `gh-pages` branch.
