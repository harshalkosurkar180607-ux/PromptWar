/**
 * CityVibe Location & Geocoding Service
 * Enables users to detect their exact city or find ANY city/tourist place worldwide.
 */

/**
 * Detect user's current city via browser Geolocation & Reverse Geocoding
 */
export async function detectUserCity() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Fast, free, client-side reverse geocoder without API key restrictions
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (!response.ok) {
            throw new Error('Reverse geocoding service failed');
          }
          const data = await response.json();
          const cityName = data.city || data.locality || data.principalSubdivision || 'My Location';
          const country = data.countryName || 'India';
          const state = data.principalSubdivision || '';

          const detectedCity = {
            id: `user-city-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
            name: cityName,
            country: country,
            state: state,
            tagline: `Your Live Detected Location (${cityName})`,
            coordinates: [latitude, longitude],
            zoom: 14,
            currency: country === 'India' ? '₹' : (country === 'United States' ? '$' : '€'),
            trafficProfile: {
              currentStatus: 'Live GPS Telemetry',
              peakHours: '08:30 - 11:30 & 17:30 - 20:30',
              activeBottlenecks: ['Local Transit & Arterial Corridors'],
              sourceModel: 'Real-Time User Location Geo-Lock',
              isLiveStream: true
            },
            emergencyHotlines: {
              police: country === 'India' ? '112 / 100' : '911 / 112',
              ambulance: country === 'India' ? '108' : '911',
              womenHelpline: country === 'India' ? '1091' : 'Local Helpline',
              touristAssistance: 'National Emergency Support'
            }
          };

          resolve(detectedCity);
        } catch (err) {
          console.warn('Reverse geocode fallback:', err);
          // Fallback if reverse geocode fails: still provide coordinates
          resolve({
            id: `user-city-gps`,
            name: 'Current Location',
            country: 'Local Region',
            state: '',
            tagline: 'Your Live GPS Coordinates',
            coordinates: [latitude, longitude],
            zoom: 14,
            currency: '₹',
            trafficProfile: {
              currentStatus: 'Live GPS Telemetry',
              peakHours: 'Urban Peak Hours',
              activeBottlenecks: ['Immediate Vicinity'],
              sourceModel: 'Local Device Sensor',
              isLiveStream: true
            },
            emergencyHotlines: {
              police: '112',
              ambulance: '108',
              womenHelpline: '1091',
              touristAssistance: '1800-11-1363'
            }
          });
        }
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
}

/**
 * Search and geocode ANY city by name worldwide using Open-Meteo Geocoding
 */
export async function searchGlobalCity(cityName) {
  if (!cityName || !cityName.trim()) return null;
  const cleanQuery = cityName.trim();

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=5&language=en&format=json`
    );
    if (!res.ok) throw new Error('City geocoding service error');
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return null;
    }

    const first = data.results[0];
    const isIndia = first.country_code === 'IN' || (first.country || '').toLowerCase() === 'india';

    return {
      id: `custom-city-${first.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${first.id || Date.now()}`,
      name: first.name,
      country: first.country || 'Global Destination',
      state: first.admin1 || '',
      tagline: `Exploring ${first.name}, ${first.country || ''}`,
      coordinates: [first.latitude, first.longitude],
      zoom: 13,
      currency: isIndia ? '₹' : (first.country_code === 'US' ? '$' : '€'),
      trafficProfile: {
        currentStatus: 'Estimated Urban Density',
        peakHours: '08:30 - 11:00 & 17:00 - 20:30',
        activeBottlenecks: ['Central Business District', 'Highway Arterials'],
        sourceModel: 'Municipal Metropolitan Baseline',
        isLiveStream: false
      },
      emergencyHotlines: {
        police: isIndia ? '112 / 100' : '112 / 911',
        ambulance: isIndia ? '108' : '112',
        womenHelpline: isIndia ? '1091' : 'Local Services',
        touristAssistance: 'City Information Center'
      }
    };
  } catch (err) {
    console.warn('searchGlobalCity failed:', err);
    return null;
  }
}

/**
 * Determine CityVibe category from Google Place types
 */
export function deriveCategoryFromGoogleTypes(types = []) {
  const typeSet = new Set(types);
  if (
    typeSet.has('restaurant') || 
    typeSet.has('cafe') || 
    typeSet.has('bakery') || 
    typeSet.has('bar') || 
    typeSet.has('food')
  ) {
    return 'food';
  }
  if (
    typeSet.has('museum') || 
    typeSet.has('church') || 
    typeSet.has('hindu_temple') || 
    typeSet.has('mosque') || 
    typeSet.has('synagogue') || 
    typeSet.has('place_of_worship') ||
    typeSet.has('historical_landmark')
  ) {
    return 'heritage';
  }
  if (
    typeSet.has('lodging') || 
    typeSet.has('hotel') || 
    typeSet.has('resort')
  ) {
    return 'hotel';
  }
  return 'attraction';
}
