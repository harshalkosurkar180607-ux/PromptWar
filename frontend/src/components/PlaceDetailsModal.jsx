import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Compass, 
  Scale, 
  Lightbulb, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { calculateSmartScore } from '../data/citiesData';

export default function PlaceDetailsModal({ 
  place, 
  onClose, 
  onLocateOnMap, 
  onToggleCompare, 
  isSelectedForCompare 
}) {
  // Close modal when pressing ESC key
  useEffect(() => {
    if (!place) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [place, onClose]);

  if (!place) return null;

  const scorecard = calculateSmartScore(place);

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          id="btn-close-modal"
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <img 
          src={place.image} 
          alt={place.name} 
          className="modal-hero-image"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80';
          }}
        />

        <div className="modal-body">
          {/* Title & Category Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="category-tag">{place.category}</span>
                <span className="badge badge-curated">{place.dataSource}</span>
              </div>
              <h2 id="modal-title" style={{ fontSize: '1.65rem' }}>{place.name}</h2>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                <MapPin size={15} color="var(--primary-cyan-light)" />
                <span>{place.neighborhood}</span>
              </p>
            </div>

            {/* Smart Score Pill */}
            <div className="duel-score-hero" style={{ padding: '0.6rem 1rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
                  Smart City Score
                </span>
                <div className="hero-score-num" style={{ fontSize: '2rem' }}>
                  {scorecard.overallScore}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span>
                </div>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            {place.description}
          </p>

          {/* ================= SMART CITY SCORECARD AUDIT ================= */}
          <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.15rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#c7d2fe' }}>
                <Sparkles size={16} color="var(--primary-cyan-light)" />
                Smart City Scorecard Audit Breakdown
              </h4>
              <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                {scorecard.availableCount} of {scorecard.totalMetrics} Audited
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {scorecard.metrics.map((metric) => (
                <div key={metric.key} className="scorecard-metric-row">
                  <div className="scorecard-metric-header">
                    <span>{metric.label}</span>
                    {metric.isAvailable ? (
                      <span style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                        {metric.display}
                      </span>
                    ) : (
                      <span className="metric-unknown-badge">
                        <AlertCircle size={10} style={{ display: 'inline', marginRight: '3px' }} />
                        Not Audited / Unknown
                      </span>
                    )}
                  </div>
                  <div className="progress-bar-bg">
                    {metric.isAvailable ? (
                      <div 
                        className="progress-bar-fill progress-cyan"
                        style={{ width: `${metric.value}%` }}
                      />
                    ) : (
                      <div 
                        style={{ width: '100%', height: '100%', background: 'rgba(239, 68, 68, 0.15)', borderStyle: 'dashed' }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.75rem' }}>
              ℹ <strong>Scoring Transparency:</strong> {scorecard.methodologyNote}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <div className="pillar-card">
              <span className="pillar-name"><DollarSign size={13} /> Average Cost</span>
              <p className="pillar-desc">{place.avgCost}</p>
            </div>
            <div className="pillar-card">
              <span className="pillar-name"><Clock size={13} /> Best Timing</span>
              <p className="pillar-desc">{place.bestTimeToVisit}</p>
            </div>
            <div className="pillar-card">
              <span className="pillar-name"><ShieldCheck size={13} /> Night Safety</span>
              <p className="pillar-desc">{place.nightSafetyTag}</p>
            </div>
          </div>

          {/* Local Insider Tip Highlight */}
          <div style={{ 
            background: 'rgba(6, 182, 212, 0.08)', 
            border: '1px solid rgba(6, 182, 212, 0.25)', 
            borderRadius: 'var(--radius-md)', 
            padding: '1rem',
            display: 'flex',
            gap: '0.75rem'
          }}>
            <Lightbulb size={20} color="var(--primary-cyan-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--primary-cyan-light)', fontSize: '0.86rem' }}>Local Insider Knowledge:</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {place.localInsiderTip}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                onClose();
                onLocateOnMap(place);
              }}
            >
              <Compass size={15} />
              <span>Locate on Map</span>
            </button>

            <button 
              className={`btn ${isSelectedForCompare ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => onToggleCompare(place)}
            >
              {isSelectedForCompare ? <Check size={15} /> : <Scale size={15} />}
              <span>{isSelectedForCompare ? 'In Comparison Duel' : 'Add to Scorecard Duel'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
