import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import WeatherTrafficBar from './components/WeatherTrafficBar';
import FilterBar from './components/FilterBar';
import PlaceCard from './components/PlaceCard';
import PlaceDetailsModal from './components/PlaceDetailsModal';
import MapView from './components/MapView';
import ScorecardComparison from './components/ScorecardComparison';
import CitizenReportsFeed from './components/CitizenReportsFeed';
import EmergencyModal from './components/EmergencyModal';
import DataTransparencyBanner from './components/DataTransparencyBanner';
import LoginPage from './components/LoginPage';
import ErrorBoundary from './components/ErrorBoundary';
import CitySearchModal from './components/CitySearchModal';
import { detectUserCity } from './services/locationService';

import { 
  CITIES, 
  PLACES, 
  INITIAL_CITIZEN_REPORTS 
} from './data/citiesData';
import { 
  SearchX, 
  RotateCcw,
  MapPin
} from 'lucide-react';

export default function App() {
  // Authentication & View Mode State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cityvibe_auth_user') || sessionStorage.getItem('cityvibe_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [currentPage, setCurrentPage] = useState('login'); // 'login' | 'dashboard'

  // Dynamic Cities & Places State
  const [citiesList, setCitiesList] = useState(CITIES);
  const [allPlaces, setAllPlaces] = useState(PLACES);
  const [activeCityId, setActiveCityId] = useState('mumbai');
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'map' | 'scorecard' | 'reports'

  // Global City Search Modal State
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  // Filter Engine State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModifiers, setActiveModifiers] = useState([]);

  // Modals & Details State
  const [selectedPlaceForModal, setSelectedPlaceForModal] = useState(null);
  const [selectedPlaceForMap, setSelectedPlaceForMap] = useState(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Scorecard Comparison State (IDs of 2 places)
  const [comparisonSlots, setComparisonSlots] = useState(['mum-1', 'mum-4']);

  // Citizen Reports State (Persisted in localStorage)
  const [reports, setReports] = useState(() => {
    try {
      const stored = localStorage.getItem('citypulse_citizen_reports');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read reports from localStorage', e);
    }
    return INITIAL_CITIZEN_REPORTS;
  });

  // Save reports to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('citypulse_citizen_reports', JSON.stringify(reports));
    } catch (e) {
      console.warn('Could not save reports to localStorage', e);
    }
  }, [reports]);

  // Current active city object
  const currentCity = useMemo(() => {
    return citiesList.find(c => c.id === activeCityId) || citiesList[0] || CITIES[0];
  }, [citiesList, activeCityId]);

  // Places belonging to current city
  const cityPlaces = useMemo(() => {
    return allPlaces.filter(p => p.cityId === activeCityId);
  }, [allPlaces, activeCityId]);

  // Change city (by ID or full city object) and synchronize default comparison slots
  const handleSelectCity = (cityOrId) => {
    if (!cityOrId) return;

    if (typeof cityOrId === 'string') {
      setActiveCityId(cityOrId);
      setSelectedPlaceForMap(null);
      const newPlaces = allPlaces.filter(p => p.cityId === cityOrId);
      if (newPlaces.length >= 2) {
        setComparisonSlots([newPlaces[0].id, newPlaces[1].id]);
      } else if (newPlaces.length === 1) {
        setComparisonSlots([newPlaces[0].id, newPlaces[0].id]);
      } else {
        setComparisonSlots([]);
      }
    } else if (typeof cityOrId === 'object' && cityOrId.id) {
      setCitiesList(prev => {
        if (!prev.some(c => c.id === cityOrId.id)) {
          return [cityOrId, ...prev];
        }
        return prev;
      });
      setActiveCityId(cityOrId.id);
      setSelectedPlaceForMap(null);
      const newPlaces = allPlaces.filter(p => p.cityId === cityOrId.id);
      if (newPlaces.length >= 2) {
        setComparisonSlots([newPlaces[0].id, newPlaces[1].id]);
      } else if (newPlaces.length === 1) {
        setComparisonSlots([newPlaces[0].id, newPlaces[0].id]);
      } else {
        setComparisonSlots([]);
      }
    }
  };

  // Add custom place discovered via Google Places or user search
  const handleAddCustomPlace = (newPlace) => {
    if (!newPlace || !newPlace.id) return;
    setAllPlaces(prev => {
      if (prev.some(p => p.id === newPlace.id)) {
        return prev;
      }
      return [newPlace, ...prev];
    });
  };

  // Quick GPS City Detection
  const handleDetectLocation = async () => {
    try {
      const detected = await detectUserCity();
      handleSelectCity(detected);
    } catch (err) {
      console.warn('GPS detection failed:', err);
      setIsCityModalOpen(true);
    }
  };

  // Filtered Places for Explore Grid
  const filteredPlaces = useMemo(() => {
    return cityPlaces.filter(place => {
      // Category filter
      if (selectedCategory !== 'all' && place.category !== selectedCategory) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = place.name.toLowerCase().includes(query);
        const matchesNeighborhood = place.neighborhood.toLowerCase().includes(query);
        const matchesDesc = place.description.toLowerCase().includes(query);
        const matchesTags = place.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesNeighborhood && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Modifiers
      if (activeModifiers.includes('budget')) {
        if (place.priceLevel !== '$' && (place.affordabilityScore || 0) < 80) return false;
      }
      if (activeModifiers.includes('safety')) {
        if ((place.safetyScore || 0) < 90) return false;
      }
      if (activeModifiers.includes('night')) {
        const tag = place.nightSafetyTag?.toLowerCase() || '';
        if (!tag.includes('safe') && !tag.includes('lit') && !tag.includes('patrolled')) return false;
      }

      return true;
    });
  }, [cityPlaces, selectedCategory, searchQuery, activeModifiers]);

  // Toggle modifier
  const handleToggleModifier = (modifierKey) => {
    setActiveModifiers(prev => 
      prev.includes(modifierKey) ? prev.filter(m => m !== modifierKey) : [...prev, modifierKey]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setActiveModifiers([]);
  };

  // Toggle place in scorecard comparison duel
  const handleToggleCompare = (place) => {
    if (comparisonSlots.includes(place.id)) {
      setComparisonSlots(prev => prev.filter(id => id !== place.id));
    } else {
      if (comparisonSlots.length < 2) {
        setComparisonSlots(prev => [...prev, place.id]);
      } else {
        // Replace second slot
        setComparisonSlots([comparisonSlots[0], place.id]);
      }
      // Navigate to comparison tab
      setActiveTab('scorecard');
    }
  };

  // Locate place on interactive map
  const handleLocateOnMap = (place) => {
    setSelectedPlaceForMap(place);
    setActiveTab('map');
  };

  // Add new citizen report
  const handleAddReport = (newReport) => {
    setReports(prev => [newReport, ...prev]);
  };

  // Upvote / Corroborate report
  const handleUpvoteReport = (reportId) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return { ...r, upvotes: (r.upvotes || 0) + 1 };
      }
      return r;
    }));
  };

  // Authentication Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleExploreAsGuest = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('cityvibe_auth_user');
    sessionStorage.removeItem('cityvibe_auth_user');
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleOpenLogin = () => {
    setCurrentPage('login');
  };

  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onExploreAsGuest={handleExploreAsGuest}
      />
    );
  }

  return (
    <div className="app-layout">
      {/* ================= STICKY NAVBAR ================= */}
      <Navbar 
        citiesList={citiesList}
        activeCityId={activeCityId}
        setActiveCityId={handleSelectCity}
        onDetectLocation={handleDetectLocation}
        onOpenCitySearchModal={() => setIsCityModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
        comparisonCount={comparisonSlots.length}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={handleOpenLogin}
      />

      {/* ================= HERO & LIVE TELEMETRY ================= */}
      <header className="hero-banner">
        <div className="hero-header-row">
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-cyan-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              {currentCity.country} • {currentCity.state}
            </span>
            <h2 className="hero-headline">{currentCity.name}</h2>
            <p className="hero-subtitle">{currentCity.tagline}</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="badge badge-neutral" style={{ padding: '0.35rem 0.85rem' }}>
              Currency: <strong>{currentCity.currency}</strong>
            </span>
          </div>
        </div>

        {/* Live Weather & Traffic Section */}
        <WeatherTrafficBar currentCity={currentCity} />

        {/* Data Provenance & Transparency Banner */}
        <DataTransparencyBanner />
      </header>

      {/* ================= MAIN VIEW CONTAINER ================= */}
      <main className="main-content" role="main">
        {/* VIEW 1: EXPLORE & DISCOVER */}
        {activeTab === 'explore' && (
          <>
            <FilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              activeModifiers={activeModifiers}
              toggleModifier={handleToggleModifier}
              resetFilters={handleResetFilters}
              totalPlacesCount={cityPlaces.length}
              filteredPlacesCount={filteredPlaces.length}
              cityName={currentCity.name}
            />

            {filteredPlaces.length === 0 ? (
              <div className="state-box" id="empty-places-state">
                <div className="state-icon">
                  <SearchX size={28} />
                </div>
                <h3>{cityPlaces.length === 0 ? `No places indexed yet for ${currentCity.name}` : 'No places match your search criteria'}</h3>
                <p>
                  {cityPlaces.length === 0 
                    ? `You can search and pin ANY tourist attraction, hotel, or food spot in ${currentCity.name} directly on Google Maps, or discover them automatically!`
                    : 'Try adjusting your category filter, clearing query keywords or disabling active modifiers.'}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                  {cityPlaces.length === 0 ? (
                    <button 
                      id="btn-empty-open-map"
                      className="btn btn-primary"
                      onClick={() => setActiveTab('map')}
                    >
                      <MapPin size={15} />
                      <span>Search & Discover on Google Map</span>
                    </button>
                  ) : (
                    <button 
                      id="btn-empty-reset"
                      className="btn btn-primary"
                      onClick={handleResetFilters}
                    >
                      <RotateCcw size={15} />
                      <span>Reset All Filters</span>
                    </button>
                  )}
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsCityModalOpen(true)}
                  >
                    <span>Change City</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="places-grid" id="places-grid">
                {filteredPlaces.map(place => (
                  <PlaceCard 
                    key={place.id}
                    place={place}
                    onSelectPlace={(p) => setSelectedPlaceForModal(p)}
                    onLocateOnMap={handleLocateOnMap}
                    onToggleCompare={handleToggleCompare}
                    isSelectedForCompare={comparisonSlots.includes(place.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* VIEW 2: INTERACTIVE MAP */}
        {activeTab === 'map' && (
          <ErrorBoundary onFallback={() => setActiveTab('explore')}>
            <MapView 
              currentCity={currentCity}
              places={cityPlaces}
              selectedPlace={selectedPlaceForMap}
              onSelectPlace={(p) => setSelectedPlaceForModal(p)}
              onAddCustomPlace={handleAddCustomPlace}
              onSelectCity={handleSelectCity}
              onOpenCitySearchModal={() => setIsCityModalOpen(true)}
            />
          </ErrorBoundary>
        )}

        {/* VIEW 3: SMART CITY SCORECARD DUEL */}
        {activeTab === 'scorecard' && (
          <ScorecardComparison 
            places={cityPlaces}
            currentCity={currentCity}
            comparisonSlots={comparisonSlots}
            setComparisonSlots={setComparisonSlots}
          />
        )}

        {/* VIEW 4: CITIZEN REPORTS & CIVIC FEED */}
        {activeTab === 'reports' && (
          <CitizenReportsFeed 
            currentCity={currentCity}
            reports={reports}
            onAddReport={handleAddReport}
            onUpvoteReport={handleUpvoteReport}
          />
        )}
      </main>

      {/* ================= PLACE DETAILS MODAL ================= */}
      {selectedPlaceForModal && (
        <PlaceDetailsModal 
          place={selectedPlaceForModal}
          onClose={() => setSelectedPlaceForModal(null)}
          onLocateOnMap={handleLocateOnMap}
          onToggleCompare={handleToggleCompare}
          isSelectedForCompare={comparisonSlots.includes(selectedPlaceForModal.id)}
        />
      )}

      {/* ================= EMERGENCY HOTLINES MODAL ================= */}
      {isEmergencyModalOpen && (
        <EmergencyModal 
          currentCity={currentCity}
          onClose={() => setIsEmergencyModalOpen(false)}
        />
      )}

      {/* ================= GLOBAL CITY SEARCH & GPS MODAL ================= */}
      <CitySearchModal 
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        citiesList={citiesList}
        activeCityId={activeCityId}
        onSelectCity={handleSelectCity}
      />

      {/* ================= FOOTER ================= */}
      <footer className="app-footer">
        <p>
          <strong>CityVibe</strong> — Explore • Experience • Stay Safe. Powered by Google Maps Platform & Open-Meteo APIs.
        </p>
        <p style={{ marginTop: '0.3rem', fontSize: '0.74rem' }}>
          Data transparency: Unaudited dimensions are strictly flagged <em>Unknown</em>. Never invent municipal safety or cleanliness claims.
        </p>
      </footer>
    </div>
  );
}
