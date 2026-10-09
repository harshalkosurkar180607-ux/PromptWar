import React from 'react';
import { 
  MapPin, 
  Layers, 
  BarChart3, 
  AlertTriangle, 
  PhoneCall, 
  Sparkles,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { CITIES } from '../data/citiesData';

export default function Navbar({ 
  citiesList = CITIES,
  activeCityId, 
  setActiveCityId, 
  onDetectLocation,
  onOpenCitySearchModal,
  activeTab, 
  setActiveTab,
  onOpenEmergencyModal,
  comparisonCount,
  currentUser,
  onLogout,
  onOpenLogin
}) {
  return (
    <header className="navbar" role="banner">
      {/* Brand & Tagline */}
      <div 
        className="nav-brand" 
        onClick={() => setActiveTab('explore')}
        role="button"
        tabIndex={0}
        aria-label="CityVibe Home"
      >
        <img 
          src="./cityvibe_logo.jpg" 
          alt="CityVibe Official Logo" 
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid rgba(250, 204, 21, 0.75)',
            boxShadow: '0 0 14px rgba(250, 204, 21, 0.45)',
            flexShrink: 0
          }}
        />
        <div>
          <h1 className="brand-title">
            <span>City</span><span style={{ color: '#0284c7' }}>Vibe</span>
            <span className="pulse-dot" title="Live Telemetry Active" />
          </h1>
          <p className="brand-subtitle">Explore • Experience • Stay Safe</p>
        </div>
      </div>

      {/* City Selector & Discovery Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <div className="city-selector-wrap" title="Select Metro Area">
          <MapPin size={16} color="var(--primary-cyan)" />
          <select 
            id="city-select"
            className="city-select"
            value={activeCityId}
            onChange={(e) => setActiveCityId(e.target.value)}
            aria-label="Select City"
          >
            {citiesList.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        </div>

        {/* Quick GPS Location Detection Button */}
        <button
          id="btn-nav-detect-location"
          className="btn btn-secondary btn-sm"
          onClick={onDetectLocation}
          title="Detect My Current City via GPS"
          style={{ padding: '0.35rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem' }}
        >
          <span>📍 My City</span>
        </button>

        {/* Find Any City Search Modal Button */}
        <button
          id="btn-nav-search-cities"
          className="btn btn-secondary btn-sm"
          onClick={onOpenCitySearchModal}
          title="Search ANY City across India or Worldwide"
          style={{ padding: '0.35rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem' }}
        >
          <span>🔍 Find City</span>
        </button>
      </div>

      {/* View Navigation Tabs */}
      <nav className="nav-tabs" role="navigation" aria-label="Main Navigation">
        <button 
          id="tab-explore"
          className={`nav-tab-btn ${activeTab === 'explore' ? 'active' : ''}`}
          onClick={() => setActiveTab('explore')}
          aria-pressed={activeTab === 'explore'}
        >
          <Sparkles size={16} />
          <span>Explore</span>
        </button>

        <button 
          id="tab-map"
          className={`nav-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
          aria-pressed={activeTab === 'map'}
        >
          <Layers size={16} />
          <span>Interactive Map</span>
        </button>

        <button 
          id="tab-scorecard"
          className={`nav-tab-btn ${activeTab === 'scorecard' ? 'active' : ''}`}
          onClick={() => setActiveTab('scorecard')}
          aria-pressed={activeTab === 'scorecard'}
        >
          <BarChart3 size={16} />
          <span>Scorecard Duel</span>
          {comparisonCount > 0 && (
            <span className="badge badge-live" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
              {comparisonCount}
            </span>
          )}
        </button>

        <button 
          id="tab-reports"
          className={`nav-tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
          aria-pressed={activeTab === 'reports'}
        >
          <AlertTriangle size={16} />
          <span>Citizen Reports</span>
        </button>
      </nav>

      {/* Action Buttons: Emergency, Safety & User Profile */}
      <div className="nav-actions">
        <button 
          id="btn-emergency-hotlines"
          className="btn btn-danger btn-sm"
          onClick={onOpenEmergencyModal}
          title="Emergency Help & Municipal Hotlines"
          aria-label="Emergency Hotlines"
        >
          <PhoneCall size={14} />
          <span>SOS Hotlines</span>
        </button>

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span 
              className="badge badge-curated" 
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              title={`Logged in as ${currentUser.email || currentUser.name}`}
            >
              <User size={13} />
              <span>{currentUser.name}</span>
            </span>

            <button
              id="btn-nav-logout"
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
              onClick={onLogout}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={13} />
              <span>Exit</span>
            </button>
          </div>
        ) : (
          <button
            id="btn-nav-login"
            className="btn btn-primary btn-sm"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
            onClick={onOpenLogin}
            title="Log In"
            aria-label="Log In"
          >
            <LogIn size={13} />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
}
