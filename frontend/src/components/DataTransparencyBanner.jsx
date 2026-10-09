import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function DataTransparencyBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="transparency-banner" role="complementary" aria-label="Data Provenance Disclosure">
      <div className="transparency-text">
        <Info size={15} color="var(--primary-cyan-light)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Data Provenance Notice:</strong> Weather is fetched via 
          <span style={{ color: '#34d399', fontWeight: 600 }}> Live Open-Meteo API</span>.
          Maps are powered by <span style={{ color: '#38bdf8', fontWeight: 600 }}>OpenStreetMap</span>.
          Place metrics, baseline safety indices and traffic models use a 
          <span style={{ color: '#fbbf24', fontWeight: 600 }}> Curated Reference Dataset</span>.
        </span>
      </div>

      <button 
        id="btn-toggle-transparency"
        className="btn btn-secondary btn-sm"
        style={{ padding: '0.2rem 0.55rem', fontSize: '0.72rem' }}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{isOpen ? 'Less' : 'Transparency Details'}</span>
        {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {isOpen && (
        <div style={{
          width: '100%',
          marginTop: '0.6rem',
          paddingTop: '0.6rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '0.75rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            <strong style={{ color: '#34d399' }}>● 1. Live Weather:</strong>
            <p>Direct satellite telemetry via Open-Meteo REST endpoints (temperature, precipitation, wind, humidity).</p>
          </div>
          <div>
            <strong style={{ color: '#38bdf8' }}>◈ 2. Map Geospatial Layer:</strong>
            <p>OpenStreetMap and CARTO Voyager vector tiles rendered live in browser via Leaflet.</p>
          </div>
          <div>
            <strong style={{ color: '#fbbf24' }}>ℹ 3. Smart City Scorecard:</strong>
            <p>Places with missing municipal cleanliness or accessibility audits are strictly marked <em>Unknown</em> to prevent false safety claims.</p>
          </div>
          <div>
            <strong style={{ color: '#a855f7' }}>⚠ 4. Citizen Reports:</strong>
            <p>New reports are initialized as <em>Awaiting Verification</em> with client timestamp and tracking ID.</p>
          </div>
        </div>
      )}
    </div>
  );
}
