/**
 * Open-Meteo Live Weather Integration
 * Free, real-time meteorological API with NO API KEY requirement.
 */

// WMO Weather interpretation codes (WW)
const WMO_CODES = {
  0: { label: 'Clear Sky', icon: 'Sun' },
  1: { label: 'Mainly Clear', icon: 'SunMedium' },
  2: { label: 'Partly Cloudy', icon: 'CloudSun' },
  3: { label: 'Overcast', icon: 'Cloud' },
  45: { label: 'Foggy', icon: 'CloudFog' },
  48: { label: 'Depositing Rime Fog', icon: 'CloudFog' },
  51: { label: 'Light Drizzle', icon: 'CloudDrizzle' },
  53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle' },
  55: { label: 'Dense Drizzle', icon: 'CloudDrizzle' },
  61: { label: 'Slight Rain', icon: 'CloudRain' },
  63: { label: 'Moderate Rain', icon: 'CloudRain' },
  65: { label: 'Heavy Rain', icon: 'CloudRainWind' },
  71: { label: 'Slight Snowfall', icon: 'CloudSnow' },
  73: { label: 'Moderate Snowfall', icon: 'CloudSnow' },
  75: { label: 'Heavy Snowfall', icon: 'CloudSnow' },
  80: { label: 'Light Showers', icon: 'CloudRain' },
  81: { label: 'Moderate Showers', icon: 'CloudRain' },
  82: { label: 'Violent Showers', icon: 'CloudRainWind' },
  95: { label: 'Thunderstorm', icon: 'CloudLightning' },
  96: { label: 'Thunderstorm with Hail', icon: 'CloudLightning' },
  99: { label: 'Severe Thunderstorm', icon: 'CloudLightning' }
};

export async function fetchLiveWeather(lat, lng) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6500);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Open-Meteo API returned status ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const weatherInfo = WMO_CODES[current.weather_code] || { label: 'Fair Conditions', icon: 'CloudSun' };

    return {
      success: true,
      isLive: true,
      source: 'Open-Meteo Real-Time Telemetry',
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      precipitation: current.precipitation,
      condition: weatherInfo.label,
      iconType: weatherInfo.icon,
      isDay: current.is_day === 1,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rawTime: current.time
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Weather API unavailable or timed out, returning structured offline fallback:', err);
    return {
      success: false,
      isLive: false,
      source: 'Offline Fallback / Telemetry Cache',
      error: err.name === 'AbortError' ? 'Weather network request timed out' : err.message,
      temperature: 28,
      apparentTemperature: 30,
      humidity: 65,
      windSpeed: 14,
      precipitation: 0,
      condition: 'Fair (Cached Baseline)',
      iconType: 'CloudSun',
      isDay: true,
      fetchedAt: 'Cached'
    };
  }
}
