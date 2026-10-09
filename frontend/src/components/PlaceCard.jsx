import React from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Eye, 
  Compass, 
  Scale, 
  Sparkles,
  Check
} from 'lucide-react';
import { calculateSmartScore } from '../data/citiesData';

export default function PlaceCard({ 
  place, 
  onSelectPlace, 
  onLocateOnMap, 
  onToggleCompare, 
  isSelectedForCompare 
}) {
  const scorecard = calculateSmartScore(place);

  return (
    <article className="place-card" id={`place-card-${place.id}`}>
      {/* Visual Image Header */}
      <div className="card-image-wrap">
        <img 
          src={place.image} 
          alt={place.name} 
          className="card-image"
          loading="lazy"
          onError={(e) => {
            // Elegant geometric SVG fallback if remote image fails
            e.currentTarget.src = 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80';
          }}
        />

        <div className="card-top-badges">
          <span className="category-tag">{place.category}</span>
          
          <div className="card-score-badge" title="Smart City Scorecard index (0-100)">
            <Sparkles size={13} color="var(--primary-cyan-light)" />
            <span>Score: {scorecard.overallScore}/100</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title">{place.name}</h3>
          <span className="card-location">
            <MapPin size={13} color="var(--text-subtle)" />
            {place.neighborhood}
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="card-metrics-row">
          <div className="card-metric-item">
            <span className="metric-label">Public Rating</span>
            <span className="metric-value">
              <Star size={13} fill="#fbbf24" color="#fbbf24" />
              <span>{place.rating}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>({place.reviewCount.toLocaleString()})</span>
            </span>
          </div>

          <div className="card-metric-item">
            <span className="metric-label">Affordability</span>
            <span className="metric-value" style={{ color: place.priceLevel === '$' ? '#34d399' : 'var(--text-main)' }}>
              <span>{place.priceLevel}</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>({place.affordabilityScore}/100)</span>
            </span>
          </div>
        </div>

        {/* Night Safety Pill */}
        <div className="safety-night-pill" title="Observed night lighting and security environment">
          <ShieldCheck size={14} />
          <span>{place.nightSafetyTag}</span>
        </div>

        {/* Transparent Data Provenance Tag */}
        <div className="card-source-tag">
          Provenance: {place.dataSource}
        </div>

        {/* Action Buttons */}
        <div className="card-actions-row">
          <button 
            id={`btn-details-${place.id}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
            onClick={() => onSelectPlace(place)}
            aria-label={`View full details for ${place.name}`}
          >
            <Eye size={14} />
            <span>Details</span>
          </button>

          <button 
            id={`btn-locate-${place.id}`}
            className="btn btn-secondary btn-sm"
            onClick={() => onLocateOnMap(place)}
            title="Locate on interactive map"
            aria-label={`Locate ${place.name} on map`}
          >
            <Compass size={14} />
          </button>

          <button 
            id={`btn-compare-${place.id}`}
            className={`btn btn-sm ${isSelectedForCompare ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onToggleCompare(place)}
            title={isSelectedForCompare ? "Remove from comparison duel" : "Add to comparison duel"}
            aria-pressed={isSelectedForCompare}
            aria-label={`Compare ${place.name}`}
          >
            {isSelectedForCompare ? <Check size={14} /> : <Scale size={14} />}
          </button>
        </div>
      </div>
    </article>
  );
}
