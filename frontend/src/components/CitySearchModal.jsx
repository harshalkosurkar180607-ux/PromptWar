import React, { useState } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  LocateFixed, 
  Sparkles, 
  Check, 
  Globe2, 
  AlertCircle 
} from 'lucide-react';
import { detectUserCity, searchGlobalCity } from '../services/locationService';

export default function CitySearchModal({ 
  isOpen, 
  onClose, 
  citiesList, 
  activeCityId, 
  onSelectCity 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  // Filter existing cities
  const filteredCities = citiesList.filter(city => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return city.name.toLowerCase().includes(query) || 
           city.country.toLowerCase().includes(query) ||
           (city.state && city.state.toLowerCase().includes(query));
  });

  // Handle Detect GPS Location
  const handleDetectGPS = async () => {
    setIsLocating(true);
    setStatusMessage({ type: 'info', text: 'Requesting device GPS coordinates...' });
    try {
      const detectedCity = await detectUserCity();
      onSelectCity(detectedCity);
      setStatusMessage({ type: 'success', text: `Located: ${detectedCity.name}, ${detectedCity.country}` });
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      console.warn('Location detection failed:', err);
      setStatusMessage({ 
        type: 'error', 
        text: err.message || 'Could not access GPS location. Please allow location permissions in your browser.' 
      });
    } finally {
      setIsLocating(false);
    }
  };

  // Handle Online Search for any global city
  const handleSearchOnlineCity = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearchingOnline(true);
    setStatusMessage({ type: 'info', text: `Geocoding "${searchQuery}" worldwide...` });
    try {
      const foundCity = await searchGlobalCity(searchQuery);
      if (foundCity) {
        onSelectCity(foundCity);
        setStatusMessage({ type: 'success', text: `Discovered: ${foundCity.name}, ${foundCity.country}` });
        setTimeout(() => {
          onClose();
        }, 700);
      } else {
        setStatusMessage({ 
          type: 'error', 
          text: `No coordinates found for "${searchQuery}". Please check the spelling or try another city.` 
        });
      }
    } catch (err) {
      console.warn('Geocoding error:', err);
      setStatusMessage({ type: 'error', text: err?.message || 'Geocoding request failed. Check internet connection.' });
    } finally {
      setIsSearchingOnline(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content" 
        style={{ maxWidth: '580px', borderRadius: '24px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close City Selector"
        >
          <X size={18} />
        </button>

        <div className="modal-body" style={{ padding: '2rem 1.75rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--primary-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Explore Any Destination
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginTop: '0.2rem' }}>
              Find Your City or Destination
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Detect your current location with live GPS or search any city across India & the globe.
            </p>
          </div>

          {/* Quick Action: Detect GPS City */}
          <button
            id="btn-modal-detect-gps"
            onClick={handleDetectGPS}
            disabled={isLocating}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              borderRadius: '14px',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              marginBottom: '1.25rem'
            }}
          >
            <LocateFixed size={18} className={isLocating ? 'spin-icon' : ''} />
            <span>{isLocating ? 'Detecting Your City...' : '📍 Detect My Current City (GPS)'}</span>
          </button>

          {/* Search Input */}
          <form onSubmit={handleSearchOnlineCity} style={{ position: 'relative', marginBottom: '1rem' }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} 
            />
            <input
              id="city-modal-search-input"
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.8rem', paddingRight: '5rem', height: '46px', fontSize: '0.94rem' }}
              placeholder="Type ANY city name (e.g. Pune, Goa, Agra, Delhi, London)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                type="submit"
                disabled={isSearchingOnline}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--primary-cyan)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isSearchingOnline ? 'Finding...' : 'Find'}
              </button>
            )}
          </form>

          {/* Status Alert Banner */}
          {statusMessage && (
            <div style={{
              background: statusMessage.type === 'error' ? '#fff1f2' : (statusMessage.type === 'success' ? '#ecfdf5' : '#f0f9ff'),
              border: `1px solid ${statusMessage.type === 'error' ? '#fecdd3' : (statusMessage.type === 'success' ? '#a7f3d0' : '#bae6fd')}`,
              color: statusMessage.type === 'error' ? '#e11d48' : (statusMessage.type === 'success' ? '#059669' : '#0284c7'),
              borderRadius: '12px',
              padding: '0.65rem 0.95rem',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {statusMessage.type === 'error' ? <AlertCircle size={16} /> : <Sparkles size={16} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Cities List / Results */}
          <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Available Destinations ({filteredCities.length})
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {filteredCities.map(city => {
                const isActive = city.id === activeCityId;
                return (
                  <button
                    key={city.id}
                    id={`btn-select-city-${city.id}`}
                    onClick={() => {
                      onSelectCity(city);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      border: `1px solid ${isActive ? 'var(--primary-cyan)' : 'var(--border-subtle)'}`,
                      background: isActive ? '#e0f2fe' : '#ffffff',
                      color: isActive ? '#0284c7' : '#0f172a',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
                      <MapPin size={14} color={isActive ? '#0284c7' : '#94a3b8'} />
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <div>{city.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{city.country}</div>
                      </div>
                    </div>
                    {isActive && <Check size={14} color="#0284c7" />}
                  </button>
                );
              })}
            </div>

            {/* If query has no local matches, show action to search globally */}
            {filteredCities.length === 0 && searchQuery.trim() && (
              <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
                <Globe2 size={32} color="#0284c7" style={{ margin: '0 auto 0.5rem' }} />
                <h4 style={{ fontSize: '0.95rem', color: '#0f172a' }}>"{searchQuery}" is not in local catalog</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.25rem 0 0.85rem' }}>
                  Click below to geocode and add this city live into CityVibe!
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleSearchOnlineCity}
                  disabled={isSearchingOnline}
                  style={{ borderRadius: '9999px', padding: '0.55rem 1.25rem' }}
                >
                  <Sparkles size={14} />
                  <span>{isSearchingOnline ? 'Locating...' : `Search & Add "${searchQuery}" Worldwide`}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
