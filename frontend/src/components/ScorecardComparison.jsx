import React from 'react';
import { 
  Sparkles, 
  AlertCircle,
  Info
} from 'lucide-react';
import { calculateSmartScore } from '../data/citiesData';

export default function ScorecardComparison({ 
  places, 
  currentCity, 
  comparisonSlots, 
  setComparisonSlots 
}) {
  // Default to first two places if empty, or selected places
  const place1Id = comparisonSlots[0] || (places[0] ? places[0].id : null);
  const place2Id = comparisonSlots[1] || (places[1] ? places[1].id : null);

  const place1 = places.find(p => p.id === place1Id) || places[0];
  const place2 = places.find(p => p.id === place2Id) || places[1] || places[0];

  const scorecard1 = place1 ? calculateSmartScore(place1) : null;
  const scorecard2 = place2 ? calculateSmartScore(place2) : null;

  const handleSelectPlace1 = (e) => {
    setComparisonSlots([e.target.value, place2Id]);
  };

  const handleSelectPlace2 = (e) => {
    setComparisonSlots([place1Id, e.target.value]);
  };

  return (
    <div className="comparison-container" role="region" aria-label="Smart City Scorecard Comparison">
      {/* ================= SCORING METHODOLOGY BOX ================= */}
      <div className="scorecard-method-box">
        <h3 className="method-title">
          <Sparkles size={18} color="var(--primary-cyan-light)" />
          <span>Smart City Scorecard Methodology & Ethical Standards</span>
        </h3>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          CityPulse uses an objective, multi-dimensional urban evaluation model. Rather than relying on simple subjective star ratings, places are evaluated across 5 weighted civic factors.
        </p>

        <div className="method-formula">
          Overall Score = ∑ (Weight_i × Metric_i) / ∑ (Weight_available)
        </div>

        <div className="method-pillars">
          <div className="pillar-card">
            <div className="pillar-name"><span>Public Rating</span> <span>25%</span></div>
            <div className="pillar-desc">Crowdsourced traveler consensus normalized to 100 points.</div>
          </div>

          <div className="pillar-card">
            <div className="pillar-name"><span>Safety Index</span> <span>25%</span></div>
            <div className="pillar-desc">Night lighting, police patrols, emergency proximity & crowd safety.</div>
          </div>

          <div className="pillar-card">
            <div className="pillar-name"><span>Affordability</span> <span>20%</span></div>
            <div className="pillar-desc">Relative cost tier, value-for-money, free public accessibility.</div>
          </div>

          <div className="pillar-card">
            <div className="pillar-name"><span>Cleanliness Audit</span> <span>15%</span></div>
            <div className="pillar-desc">Sanitation, waste infrastructure and municipal hygiene records.</div>
          </div>

          <div className="pillar-card">
            <div className="pillar-name"><span>Accessibility</span> <span>15%</span></div>
            <div className="pillar-desc">Transit proximity, wheelchair ramps, barrier-free access.</div>
          </div>
        </div>

        {/* Ethical Non-Fabrication Rule */}
        <div style={{
          marginTop: '0.85rem',
          padding: '0.65rem 0.85rem',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.78rem',
          color: '#b91c1c'
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0, color: '#dc2626' }} />
          <span>
            <strong>Zero-Fabrication Guarantee:</strong> If cleanliness or accessibility has not been formally audited by municipal surveyors or verified field studies, it is strictly flagged as <em>"Not Audited / Unknown"</em> and omitted from the divisor. We never invent scores.
          </span>
        </div>
      </div>

      {/* ================= SIDE-BY-SIDE DUEL VIEW ================= */}
      {(!place1 || !place2) ? (
        <div className="state-box">
          <Info size={32} />
          <p>Please select at least 2 places from {currentCity.name} to run the scorecard duel.</p>
        </div>
      ) : (
        <div className="duel-grid">
          {/* ================= COLUMN 1 ================= */}
          <div className="duel-column" id={`duel-col-${place1.id}`}>
            <div className="duel-select-wrap">
              <label htmlFor="duel-select-1" className="form-label">Location A</label>
              <select 
                id="duel-select-1"
                className="duel-select"
                value={place1.id}
                onChange={handleSelectPlace1}
                aria-label="Select first place to compare"
              >
                {places.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                ))}
              </select>
            </div>

            {/* Score Hero */}
            <div className="duel-score-hero">
              <div>
                <span className="category-tag">{place1.category}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.35rem' }}>{place1.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{place1.neighborhood}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Overall Score</span>
                <div className="hero-score-num">
                  {scorecard1.overallScore}
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/100</span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {scorecard1.metrics.map(metric => (
                <div key={metric.key} className="scorecard-metric-row">
                  <div className="scorecard-metric-header">
                    <span>{metric.label}</span>
                    {metric.isAvailable ? (
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{metric.display}</span>
                    ) : (
                      <span className="metric-unknown-badge">Not Audited / Unknown</span>
                    )}
                  </div>
                  <div className="progress-bar-bg">
                    {metric.isAvailable ? (
                      <div className="progress-bar-fill progress-cyan" style={{ width: `${metric.value}%` }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'rgba(239, 68, 68, 0.15)' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contextual Comparison Attributes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.84rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Cost:</span>
                <strong style={{ color: 'var(--text-main)' }}>{place1.avgCost}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Chaos / Crowd:</span>
                <strong style={{ color: '#fbbf24' }}>{place1.chaosLevel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Night Safety:</span>
                <strong style={{ color: '#34d399' }}>{place1.nightSafetyTag}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Optimal Hours:</span>
                <strong style={{ color: 'var(--text-main)' }}>{place1.bestTimeToVisit}</strong>
              </div>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontStyle: 'italic', marginTop: 'auto' }}>
              Provenance: {place1.dataSource}
            </div>
          </div>

          {/* ================= COLUMN 2 ================= */}
          <div className="duel-column" id={`duel-col-${place2.id}`}>
            <div className="duel-select-wrap">
              <label htmlFor="duel-select-2" className="form-label">Location B</label>
              <select 
                id="duel-select-2"
                className="duel-select"
                value={place2.id}
                onChange={handleSelectPlace2}
                aria-label="Select second place to compare"
              >
                {places.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                ))}
              </select>
            </div>

            {/* Score Hero */}
            <div className="duel-score-hero">
              <div>
                <span className="category-tag">{place2.category}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.35rem' }}>{place2.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{place2.neighborhood}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Overall Score</span>
                <div className="hero-score-num">
                  {scorecard2.overallScore}
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/100</span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {scorecard2.metrics.map(metric => (
                <div key={metric.key} className="scorecard-metric-row">
                  <div className="scorecard-metric-header">
                    <span>{metric.label}</span>
                    {metric.isAvailable ? (
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{metric.display}</span>
                    ) : (
                      <span className="metric-unknown-badge">Not Audited / Unknown</span>
                    )}
                  </div>
                  <div className="progress-bar-bg">
                    {metric.isAvailable ? (
                      <div className="progress-bar-fill progress-cyan" style={{ width: `${metric.value}%` }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'rgba(239, 68, 68, 0.15)' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contextual Comparison Attributes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.84rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Cost:</span>
                <strong style={{ color: 'var(--text-main)' }}>{place2.avgCost}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Chaos / Crowd:</span>
                <strong style={{ color: '#fbbf24' }}>{place2.chaosLevel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Night Safety:</span>
                <strong style={{ color: '#34d399' }}>{place2.nightSafetyTag}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Optimal Hours:</span>
                <strong style={{ color: 'var(--text-main)' }}>{place2.bestTimeToVisit}</strong>
              </div>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontStyle: 'italic', marginTop: 'auto' }}>
              Provenance: {place2.dataSource}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
