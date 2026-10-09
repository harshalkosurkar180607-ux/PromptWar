import React, { useState, useEffect, useCallback } from 'react';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  RefreshCw, 
  Car, 
  Clock, 
  Info,
  AlertCircle
} from 'lucide-react';
import { fetchLiveWeather } from '../services/weatherService';

export default function WeatherTrafficBar({ currentCity }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  const loadWeather = useCallback(async () => {
    if (!currentCity) return;
    setIsLoadingWeather(true);
    setWeatherError(null);
    try {
      const [lat, lng] = currentCity.coordinates;
      const result = await fetchLiveWeather(lat, lng);
      setWeatherData(result);
      if (!result.success) {
        setWeatherError(result.error);
      }
    } catch (err) {
      console.warn('Weather fetch error:', err);
      setWeatherError('Failed to fetch weather data.');
    } finally {
      setIsLoadingWeather(false);
    }
  }, [currentCity]);

  useEffect(() => {
    let active = true;
    const fetchAsync = async () => {
      if (active) {
        await loadWeather();
      }
    };
    fetchAsync();
    return () => {
      active = false;
    };
  }, [loadWeather]);

  const traffic = currentCity.trafficProfile;

  return (
    <section className="telemetry-grid" aria-label="City Real-Time Telemetry">
      {/* ================= LIVE WEATHER CARD ================= */}
      <div className="telemetry-card" id="weather-telemetry-card">
        <div className="telemetry-header">
          <div className="telemetry-title">
            <CloudSun size={17} color="var(--primary-cyan-light)" />
            <span>Atmospheric Pulse</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {weatherData?.isLive ? (
              <span className="badge badge-live" title="Live meteorological data from Open-Meteo">
                <span className="pulse-dot" /> Live API: Open-Meteo
              </span>
            ) : (
              <span className="badge badge-warning" title="Showing cached fallback baseline">
                <AlertCircle size={12} /> Baseline Telemetry
              </span>
            )}
            
            <button 
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.2rem 0.5rem' }}
              onClick={loadWeather}
              title="Refresh Weather"
              disabled={isLoadingWeather}
              aria-label="Refresh Weather Data"
            >
              <RefreshCw size={13} className={isLoadingWeather ? 'spinner' : ''} />
            </button>
          </div>
        </div>

        {isLoadingWeather ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 0' }}>
            <div className="spinner" />
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Polling Open-Meteo satellite feed for {currentCity.name}...
            </span>
          </div>
        ) : weatherData ? (
          <>
            <div className="weather-stats">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                <span className="temp-large">{weatherData.temperature}°C</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Feels like {weatherData.apparentTemperature}°C
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                  {weatherData.condition}
                </span>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>
                  {weatherData.precipitation > 0 ? `Rain: ${weatherData.precipitation} mm` : 'No precipitation'}
                </p>
              </div>
            </div>

            <div className="weather-sub-metrics">
              <div className="metric-pill">
                <Droplets size={14} color="#38bdf8" />
                <span>Humidity: {weatherData.humidity}%</span>
              </div>
              <div className="metric-pill">
                <Wind size={14} color="#a5b4fc" />
                <span>Wind: {weatherData.windSpeed} km/h</span>
              </div>
            </div>

            <div className="telemetry-meta">
              <span>Station: Coordinates [{currentCity.coordinates[0].toFixed(2)}, {currentCity.coordinates[1].toFixed(2)}]</span>
              <span>Updated: {weatherData.fetchedAt}</span>
            </div>
          </>
        ) : (
          <div style={{ color: '#fb7185', fontSize: '0.85rem' }}>
            {weatherError || 'Live weather service temporarily unavailable.'}
          </div>
        )}
      </div>

      {/* ================= TRAFFIC & CONGESTION CARD ================= */}
      <div className="telemetry-card" id="traffic-telemetry-card">
        <div className="telemetry-header">
          <div className="telemetry-title">
            <Car size={17} color="#fbbf24" />
            <span>Transit & Flow Mobility</span>
          </div>

          <span className="badge badge-curated" title="Traffic model derived from municipal flow patterns">
            <Info size={12} /> Flow Model [Sample Archive]
          </span>
        </div>

        <div className="traffic-status-value">
          <Clock size={18} color="#fbbf24" />
          <span>{traffic.currentStatus}</span>
        </div>

        <div className="traffic-bottlenecks">
          <strong style={{ color: 'var(--text-main)' }}>Active Transit Bottlenecks:</strong>{' '}
          {traffic.activeBottlenecks.join(' • ')}
        </div>

        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <div className="metric-pill">
            <Clock size={14} color="#fbbf24" />
            <span>Rush Hours: {traffic.peakHours}</span>
          </div>
        </div>

        <div className="telemetry-meta">
          <span>Source: {traffic.sourceModel}</span>
          <span style={{ color: '#34d399' }}>● Pedestrian Access Open</span>
        </div>
      </div>
    </section>
  );
}
