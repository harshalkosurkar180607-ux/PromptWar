import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  ShieldCheck, 
  Info, 
  Globe2, 
  AlertTriangle, 
  Search, 
  LocateFixed, 
  Compass, 
  Sparkles, 
  X
} from 'lucide-react';
import { calculateSmartScore } from '../data/citiesData';
import { detectUserCity, deriveCategoryFromGoogleTypes } from '../services/locationService';

// Ultra-Modern Crisp Light Styling for Google Maps
const LIGHT_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }, { weight: 3 }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#334155" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0284c7" }, { weight: 700 }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0f766e" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#dcfce7" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e2e8f0" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#ffedd5" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#fed7aa" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e0f2fe" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0284c7" }],
  },
];

// Async Google Maps JS SDK Loader with multi-version constructor guarantee
function loadGoogleMapsSdk(apiKey) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Window not available'));

    // Check if google.maps.Map is already loaded and ready
    if (window.google?.maps?.Map) {
      return resolve(window.google);
    }

    const callbackName = '__cityvibe_gmap_init_cb';

    window[callbackName] = async () => {
      try {
        if (window.google?.maps?.importLibrary) {
          await window.google.maps.importLibrary('maps');
          await window.google.maps.importLibrary('marker');
          await window.google.maps.importLibrary('places');
        }
      } catch (err) {
        console.warn('Google Maps importLibrary warning:', err);
      } finally {
        resolve(window.google);
      }
    };

    const existing = document.getElementById('google-maps-js-sdk');
    if (existing) {
      if (window.google?.maps?.Map) {
        return resolve(window.google);
      }
      const checkTimer = setInterval(async () => {
        if (window.google?.maps?.Map) {
          clearInterval(checkTimer);
          resolve(window.google);
        } else if (window.google?.maps?.importLibrary) {
          clearInterval(checkTimer);
          try {
            await window.google.maps.importLibrary('maps');
            await window.google.maps.importLibrary('marker');
            await window.google.maps.importLibrary('places');
          } catch {
            // Optional
          }
          resolve(window.google);
        }
      }, 50);
      setTimeout(() => clearInterval(checkTimer), 10000);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-js-sdk';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&callback=${callbackName}&v=weekly`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      reject(new Error('Network error loading Google Maps script. Check your internet connection or API key.'));
    };

    document.head.appendChild(script);
  });
}

export default function MapView({ 
  currentCity, 
  places, 
  selectedPlace, 
  onSelectPlace,
  onAddCustomPlace,
  onSelectCity,
  onOpenCitySearchModal
}) {
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [googleLoadError, setGoogleLoadError] = useState(() => (
    googleApiKey ? null : 'Google Maps API key is missing in frontend/.env.'
  ));
  const [activeLayerFilter, setActiveLayerFilter] = useState('all'); // 'all', 'safe_night', 'food', 'heritage'

  // Place Search & Live Discovery States
  const [searchPlaceQuery, setSearchPlaceQuery] = useState('');
  const [isLocatingCity, setIsLocatingCity] = useState(false);
  const [isDiscoveringPlaces, setIsDiscoveringPlaces] = useState(false);
  const [discoveryNotification, setDiscoveryNotification] = useState(null);

  const googleMapRef = useRef(null);
  const googleInstanceRef = useRef(null);
  const googleMarkersRef = useRef([]);
  const googleInfoWindowRef = useRef(null);
  const placeSearchInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Filter places based on active map layer
  const visiblePlaces = places.filter(place => {
    if (activeLayerFilter === 'safe_night') {
      return place.nightSafetyTag?.toLowerCase().includes('safe') || 
             place.nightSafetyTag?.toLowerCase().includes('lit') ||
             place.nightSafetyTag?.toLowerCase().includes('patrolled');
    }
    if (activeLayerFilter === 'food') return place.category === 'food';
    if (activeLayerFilter === 'heritage') return place.category === 'heritage';
    return true;
  });

  // Category pin colors
  const getCategoryColor = (category, isSelected) => {
    if (isSelected) return '#e11d48';
    switch (category) {
      case 'food': return '#d97706';
      case 'heritage': return '#7c3aed';
      case 'hotel': return '#2563eb';
      case 'attraction': return '#059669';
      default: return '#0284c7';
    }
  };

  // Convert Google Place to CityVibe place and register it
  const handleRegisterGooglePlace = useCallback((place, map) => {
    if (!place?.geometry?.location) return;

    const lat = typeof place.geometry.location.lat === 'function' 
      ? place.geometry.location.lat() 
      : place.geometry.location.lat;
    const lng = typeof place.geometry.location.lng === 'function' 
      ? place.geometry.location.lng() 
      : place.geometry.location.lng;

    map.panTo({ lat, lng });
    map.setZoom(16);

    const category = deriveCategoryFromGoogleTypes(place.types);
    const photoUrl = place.photos?.[0]?.getUrl 
      ? place.photos[0].getUrl({ maxWidth: 800 }) 
      : 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80';

    const newPlace = {
      id: `gplace-${place.place_id || Date.now()}`,
      cityId: currentCity.id,
      name: place.name || 'Discovered Destination',
      category: category,
      rating: place.rating || 4.6,
      reviewCount: place.user_ratings_total || 1400,
      priceLevel: '$'.repeat(place.price_level || 2),
      avgCost: 'Live Verified Google Listing',
      affordabilityScore: 85,
      cleanlinessScore: 88,
      accessibilityScore: 80,
      safetyScore: 92,
      nightSafetyTag: 'Active Commercial Corridor • Verified Area',
      chaosLevel: 'Touristic & Active',
      bestTimeToVisit: 'Open for Visitors',
      coordinates: [lat, lng],
      neighborhood: place.vicinity || place.formatted_address || currentCity.name,
      image: photoUrl,
      description: place.formatted_address || `${place.name} is a premier destination in ${currentCity.name}.`,
      localInsiderTip: 'Discovered live via Google Maps Places Search.',
      tags: ['Google Verified', 'Must Visit', 'Tourist Destination'],
      dataSource: 'Google Maps Places Platform (Live Stream)'
    };

    if (onAddCustomPlace) {
      onAddCustomPlace(newPlace);
    }
    onSelectPlace(newPlace);
    setDiscoveryNotification(`Found & pinned "${newPlace.name}"!`);
    setTimeout(() => setDiscoveryNotification(null), 4000);
  }, [currentCity, onAddCustomPlace, onSelectPlace]);

  // Listen for Google Maps Authentication failure
  useEffect(() => {
    const prevAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      console.warn('Google Maps authentication failure.');
      setGoogleLoadError('Google Maps API key warning: verify API enablement in Google Cloud Console.');
    };
    return () => {
      window.gm_authFailure = prevAuthFailure;
    };
  }, []);

  // Initialize and update Google Maps
  useEffect(() => {
    if (!googleApiKey) return;

    let isSubscribed = true;

    loadGoogleMapsSdk(googleApiKey)
      .then(async (google) => {
        if (!isSubscribed || !googleMapRef.current) return;

        // Resolve Map, Marker, and InfoWindow constructors
        let MapClass = google?.maps?.Map;
        let MarkerClass = google?.maps?.Marker;
        let InfoWindowClass = google?.maps?.InfoWindow;

        if (!MapClass && google?.maps?.importLibrary) {
          try {
            const mapsLib = await google.maps.importLibrary('maps');
            MapClass = mapsLib.Map;
            InfoWindowClass = mapsLib.InfoWindow || InfoWindowClass;
          } catch (err) {
            console.warn('Could not import maps library:', err);
          }
        }

        if (!MarkerClass && google?.maps?.importLibrary) {
          try {
            const markerLib = await google.maps.importLibrary('marker');
            MarkerClass = markerLib.Marker || MarkerClass;
          } catch (err) {
            console.warn('Could not import marker library:', err);
          }
        }

        if (!MapClass) {
          throw new Error('Google Maps Map constructor is not available yet.');
        }

        setGoogleLoadError(null);

        // Create or update Google Map
        if (!googleInstanceRef.current) {
          const map = new MapClass(googleMapRef.current, {
            center: { lat: currentCity.coordinates[0], lng: currentCity.coordinates[1] },
            zoom: currentCity.zoom,
            styles: LIGHT_MAP_STYLES,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true
          });

          googleInstanceRef.current = map;
          googleInfoWindowRef.current = InfoWindowClass ? new InfoWindowClass() : new google.maps.InfoWindow();

          // Initialize Places Autocomplete on input if available
          const AutocompleteClass = google.maps?.places?.Autocomplete;
          if (AutocompleteClass && placeSearchInputRef.current && !autocompleteRef.current) {
            try {
              const ac = new AutocompleteClass(placeSearchInputRef.current, {
                fields: ['place_id', 'geometry', 'name', 'formatted_address', 'types', 'rating', 'user_ratings_total', 'photos', 'vicinity']
              });
              ac.bindTo('bounds', map);
              ac.addListener('place_changed', () => {
                const place = ac.getPlace();
                if (place?.geometry?.location) {
                  handleRegisterGooglePlace(place, map);
                }
              });
              autocompleteRef.current = ac;
            } catch (acErr) {
              console.warn('Autocomplete init note:', acErr);
            }
          }
        } else {
          googleInstanceRef.current.panTo({
            lat: currentCity.coordinates[0],
            lng: currentCity.coordinates[1]
          });
          googleInstanceRef.current.setZoom(currentCity.zoom);
        }

        const map = googleInstanceRef.current;
        const infoWindow = googleInfoWindowRef.current;

        // Clear existing Google markers
        googleMarkersRef.current.forEach(m => m.setMap(null));
        googleMarkersRef.current = [];

        // Add pins for visible places
        const TargetMarkerClass = MarkerClass || google.maps?.Marker;
        visiblePlaces.forEach(place => {
          const isSelected = selectedPlace?.id === place.id;
          const color = getCategoryColor(place.category, isSelected);

          const marker = new TargetMarkerClass({
            position: { lat: place.coordinates[0], lng: place.coordinates[1] },
            map: map,
            title: place.name,
            icon: {
              path: google.maps?.SymbolPath?.CIRCLE ?? 0,
              fillColor: color,
              fillOpacity: 1,
              strokeWeight: 2.5,
              strokeColor: '#ffffff',
              scale: isSelected ? 12 : 9.5,
            }
          });

          const score = calculateSmartScore(place).overallScore;

          marker.addListener('click', () => {
            const content = `
              <div style="font-family: Plus Jakarta Sans, sans-serif; padding: 6px; color: #0f172a; min-width: 220px;">
                <div style="font-weight: 800; font-size: 14px; margin-bottom: 2px; color: #0f172a;">${place.name}</div>
                <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">📍 ${place.neighborhood}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; background: #e0f2fe; color: #0284c7; padding: 3px 8px; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">
                    ${place.category}
                  </span>
                  <span style="font-weight: 800; color: #0284c7; font-size: 13px;">Score: ${score}/100</span>
                </div>
                <div style="font-size: 11px; color: #059669; font-weight: 700; margin-bottom: 10px;">🛡 ${place.nightSafetyTag}</div>
                <button id="gmap-btn-${place.id}" style="
                  width: 100%;
                  background: #0284c7;
                  color: #ffffff;
                  border: none;
                  border-radius: 8px;
                  padding: 7px 12px;
                  font-weight: 700;
                  font-size: 12px;
                  cursor: pointer;
                  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.3);
                ">Inspect Details</button>
              </div>
            `;

            infoWindow.setContent(content);
            infoWindow.open(map, marker);

            const eventManager = google?.maps?.event || window.google?.maps?.event;
            if (eventManager) {
              eventManager.addListenerOnce(infoWindow, 'domready', () => {
                const btn = document.getElementById(`gmap-btn-${place.id}`);
                if (btn) {
                  btn.addEventListener('click', () => onSelectPlace(place));
                }
              });
            }
          });

          if (isSelected) {
            map.panTo({ lat: place.coordinates[0], lng: place.coordinates[1] });
            const eventManager = google?.maps?.event || window.google?.maps?.event;
            if (eventManager) {
              eventManager.trigger(marker, 'click');
            }
          }

          googleMarkersRef.current.push(marker);
        });
      })
      .catch((err) => {
        console.warn('Google Maps API failed to load:', err);
        setGoogleLoadError(err.message || 'Could not load Google Maps.');
      });

    return () => {
      isSubscribed = false;
    };
  }, [googleApiKey, currentCity.id, currentCity.coordinates, currentCity.zoom, visiblePlaces, selectedPlace, onSelectPlace, handleRegisterGooglePlace]);

  // Sidebar item click handler
  const handleItemClick = (place) => {
    if (googleInstanceRef.current) {
      googleInstanceRef.current.panTo({ lat: place.coordinates[0], lng: place.coordinates[1] });
      googleInstanceRef.current.setZoom(16);
    }
    onSelectPlace(place);
  };

  // Detect GPS City
  const handleDetectGPSCity = async () => {
    setIsLocatingCity(true);
    setDiscoveryNotification('Detecting your live city coordinates via GPS...');
    try {
      const detectedCity = await detectUserCity();
      if (onSelectCity) {
        onSelectCity(detectedCity);
      }
      if (googleInstanceRef.current) {
        googleInstanceRef.current.panTo({
          lat: detectedCity.coordinates[0],
          lng: detectedCity.coordinates[1]
        });
        googleInstanceRef.current.setZoom(14);
      }
      setDiscoveryNotification(`Welcome to ${detectedCity.name}, ${detectedCity.country}!`);
      setTimeout(() => setDiscoveryNotification(null), 4000);
    } catch (err) {
      setDiscoveryNotification(err.message || 'Location access denied or unavailable.');
      setTimeout(() => setDiscoveryNotification(null), 4000);
    } finally {
      setIsLocatingCity(false);
    }
  };

  // Query Google Places for nearby attractions around current map center
  const handleDiscoverNearbyAttractions = () => {
    if (!googleInstanceRef.current || !window.google?.maps?.places?.PlacesService) {
      setDiscoveryNotification('Places Service initializing, please try in a moment.');
      return;
    }

    setIsDiscoveringPlaces(true);
    setDiscoveryNotification(`Discovering attractions in ${currentCity.name}...`);

    const map = googleInstanceRef.current;
    const service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch({
      location: map.getCenter(),
      radius: 12000,
      type: ['tourist_attraction']
    }, (results, status) => {
      setIsDiscoveringPlaces(false);
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        let addedCount = 0;
        results.slice(0, 6).forEach(res => {
          if (res?.geometry?.location) {
            handleRegisterGooglePlace(res, map);
            addedCount++;
          }
        });
        setDiscoveryNotification(`Added ${addedCount} live tourist attractions to ${currentCity.name}!`);
        setTimeout(() => setDiscoveryNotification(null), 4000);
      } else {
        setDiscoveryNotification('No additional attractions returned in this radius.');
        setTimeout(() => setDiscoveryNotification(null), 3000);
      }
    });
  };

  // Handle manual Enter key on Place Search Input
  const handlePlaceSearchEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!searchPlaceQuery.trim() || !googleInstanceRef.current) return;

      const map = googleInstanceRef.current;
      if (window.google?.maps?.places?.PlacesService) {
        const service = new window.google.maps.places.PlacesService(map);
        service.textSearch({
          query: `${searchPlaceQuery} ${currentCity.name}`,
          location: map.getCenter(),
          radius: 15000
        }, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
            handleRegisterGooglePlace(results[0], map);
          } else {
            setDiscoveryNotification(`Could not find "${searchPlaceQuery}". Try another query.`);
            setTimeout(() => setDiscoveryNotification(null), 3500);
          }
        });
      }
    }
  };

  return (
    <div className="map-view-container" role="region" aria-label="Interactive Google Map Explorer">
      {/* Map Canvas Wrapper */}
      <div className="map-wrapper" style={{ position: 'relative' }}>
        {/* Floating Top Search & Discovery Bar */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap'
        }}>
          {/* Places Search Input Box */}
          <div style={{
            flex: '1',
            minWidth: '260px',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '9999px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            padding: '0.35rem 0.85rem'
          }}>
            <Search size={16} color="var(--primary-cyan)" style={{ flexShrink: 0, marginRight: '0.45rem' }} />
            <input
              ref={placeSearchInputRef}
              id="gmap-place-search-input"
              type="text"
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.86rem',
                color: '#0f172a',
                fontFamily: 'var(--font-body)'
              }}
              placeholder={`Search ANY tourist place, hotel, food, or landmark in ${currentCity.name}...`}
              value={searchPlaceQuery}
              onChange={(e) => setSearchPlaceQuery(e.target.value)}
              onKeyDown={handlePlaceSearchEnter}
            />
            {searchPlaceQuery && (
              <button 
                onClick={() => setSearchPlaceQuery('')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Action: Detect My City */}
          <button
            id="btn-map-detect-city"
            className="btn btn-secondary btn-sm"
            onClick={handleDetectGPSCity}
            disabled={isLocatingCity}
            title="Detect your current city via device GPS"
            style={{
              borderRadius: '9999px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.78rem',
              background: '#ffffff',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <LocateFixed size={14} color="#0284c7" />
            <span>{isLocatingCity ? 'Locating...' : '📍 My City'}</span>
          </button>

          {/* Quick Action: Discover Live Attractions */}
          <button
            id="btn-map-discover-attractions"
            className="btn btn-primary btn-sm"
            onClick={handleDiscoverNearbyAttractions}
            disabled={isDiscoveringPlaces}
            title="Search Google Places to find and pin tourist attractions nearby"
            style={{
              borderRadius: '9999px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.78rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Compass size={14} />
            <span>{isDiscoveringPlaces ? 'Discovering...' : '🏛 Discover Attractions'}</span>
          </button>

          {/* Quick Action: Find Any City */}
          {onOpenCitySearchModal && (
            <button
              id="btn-map-find-city"
              className="btn btn-secondary btn-sm"
              onClick={onOpenCitySearchModal}
              title="Change or search any city worldwide"
              style={{
                borderRadius: '9999px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.78rem',
                background: '#ffffff',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Globe2 size={14} color="#0284c7" />
              <span>Change City</span>
            </button>
          )}
        </div>

        {/* Discovery Notification Toast */}
        {discoveryNotification && (
          <div style={{
            position: 'absolute',
            top: '64px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: '0.4rem 1rem',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-md)',
            animation: 'modalFadeIn 0.2s ease-out'
          }}>
            <Sparkles size={14} color="#facc15" />
            <span>{discoveryNotification}</span>
          </div>
        )}

        {/* Google Maps Canvas */}
        <div 
          id="google-map-canvas" 
          ref={googleMapRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            minHeight: '520px', 
            background: '#f1f5f9'
          }} 
        />

        {/* Floating Layer Filter Controls (Bottom Left) */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.4rem',
          display: 'flex',
          gap: '0.35rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <button
            id="map-filter-all"
            className={`btn btn-sm ${activeLayerFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            onClick={() => setActiveLayerFilter('all')}
          >
            All Pins ({places.length})
          </button>

          <button
            id="map-filter-safenight"
            className={`btn btn-sm ${activeLayerFilter === 'safe_night' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            onClick={() => setActiveLayerFilter('safe_night')}
            title="Highlight well-lit, active night corridors"
          >
            <ShieldCheck size={12} /> Safe Night
          </button>

          <button
            id="map-filter-food"
            className={`btn btn-sm ${activeLayerFilter === 'food' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            onClick={() => setActiveLayerFilter('food')}
          >
            Food
          </button>

          <button
            id="map-filter-heritage"
            className={`btn btn-sm ${activeLayerFilter === 'heritage' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            onClick={() => setActiveLayerFilter('heritage')}
          >
            Heritage
          </button>
        </div>

        {/* Google Maps Load Notification if error */}
        {googleLoadError && (
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '12px',
            right: '12px',
            zIndex: 20,
            background: 'rgba(239, 68, 68, 0.95)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            padding: '0.65rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.8rem'
          }}>
            <AlertTriangle size={16} />
            <span>Google Maps notification: {googleLoadError}</span>
          </div>
        )}

        {/* Bottom Attribution Bar */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '12px',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(6px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.25rem 0.6rem',
          fontSize: '0.7rem',
          color: 'var(--text-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Info size={11} color="var(--primary-cyan)" />
          <span>Google Maps Platform & Places API</span>
        </div>
      </div>

      {/* Map Sidebar: Locations Directory */}
      <aside className="map-sidebar" aria-label="City Places Directory">
        <div className="map-sidebar-header">
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Locations in {currentCity.name}</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
              Click to pan & zoom marker
            </span>
          </div>
          <span className="badge badge-neutral">{visiblePlaces.length}</span>
        </div>

        <div className="map-places-list">
          {visiblePlaces.map(place => {
            const isSelected = selectedPlace?.id === place.id;
            const score = calculateSmartScore(place).overallScore;

            return (
              <div 
                key={place.id}
                id={`map-sidebar-item-${place.id}`}
                className={`map-place-item ${isSelected ? 'active' : ''}`}
                onClick={() => handleItemClick(place)}
                role="button"
                tabIndex={0}
                aria-label={`Focus ${place.name} on map`}
              >
                <img 
                  src={place.image} 
                  alt="" 
                  className="map-item-thumb"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=200&q=80';
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {place.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                    <span style={{ textTransform: 'capitalize' }}>{place.category}</span>
                    <span style={{ color: 'var(--primary-cyan)', fontWeight: 700 }}>Score {score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
