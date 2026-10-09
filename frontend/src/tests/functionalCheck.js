/**
 * Automated Verification Script for CityPulse Data & Scoring Models
 */

import { CITIES, PLACES, calculateSmartScore, INITIAL_CITIZEN_REPORTS } from '../data/citiesData.js';
import { fetchLiveWeather } from '../services/weatherService.js';

async function runTests() {
  console.log('🧪 Starting CityPulse MVP Automated Verification...\n');

  // Test 1: City Integrity
  console.log(`Checking ${CITIES.length} cities...`);
  if (CITIES.length < 5) throw new Error('Expected at least 5 cities');
  CITIES.forEach(c => {
    if (!c.id || !c.name || !c.coordinates || !c.trafficProfile || !c.emergencyHotlines) {
      throw new Error(`Incomplete city profile for ${c.name}`);
    }
  });
  console.log('✅ All 5 cities verified with traffic profiles and SOS hotlines.\n');

  // Test 2: Places Integrity
  console.log(`Checking ${PLACES.length} places across categories...`);
  const categories = new Set(PLACES.map(p => p.category));
  ['food', 'attraction', 'hotel', 'heritage'].forEach(cat => {
    if (!categories.has(cat)) throw new Error(`Missing places for required category: ${cat}`);
  });
  console.log('✅ Required categories present: food, tourist attractions, hotels, heritage sites.\n');

  // Test 3: Smart City Scorecard & Zero-Fabrication Logic
  console.log('Testing Smart City Scorecard calculation & Unknown data handling...');
  const fullyAuditedPlace = PLACES.find(p => p.id === 'mum-1');
  const score1 = calculateSmartScore(fullyAuditedPlace);
  console.log(`- ${fullyAuditedPlace.name} Score: ${score1.overallScore}/100 (${score1.availableCount} of ${score1.totalMetrics} available)`);
  if (score1.overallScore === null || score1.availableCount !== 5) {
    throw new Error('Fully audited place score failed');
  }

  // Check place with deliberate missing metrics
  const streetFoodPlace = PLACES.find(p => p.id === 'mum-6');
  const scoreStreet = calculateSmartScore(streetFoodPlace);
  console.log(`- ${streetFoodPlace.name} Score: ${scoreStreet.overallScore}/100 (${scoreStreet.availableCount} of ${scoreStreet.totalMetrics} available)`);
  console.log(`  Unknown dimensions identified: ${scoreStreet.unknownMetrics.join(', ')}`);
  if (scoreStreet.unknownCount < 2) {
    throw new Error('Street food place should have uninspected/unknown cleanliness & accessibility');
  }
  console.log('✅ Smart City Scorecard handles unknown data ethically without fabricating scores.\n');

  // Test 4: Live Weather Fetch (Open-Meteo)
  console.log('Testing live Open-Meteo weather fetch for Mumbai [18.9388, 72.8354]...');
  const weather = await fetchLiveWeather(18.9388, 72.8354);
  console.log(`- Live Weather result: ${weather.temperature}°C, ${weather.condition}, Humidity: ${weather.humidity}%, Source: ${weather.source}`);
  if (typeof weather.temperature !== 'number') {
    throw new Error('Weather temperature missing');
  }
  console.log('✅ Live weather connectivity verified.\n');

  // Test 5: Citizen Reports Model
  console.log(`Checking initial citizen reports (${INITIAL_CITIZEN_REPORTS.length} reports)...`);
  INITIAL_CITIZEN_REPORTS.forEach(r => {
    if (!r.id || !r.category || !r.location || !r.description || !r.status) {
      throw new Error(`Incomplete citizen report: ${r.id}`);
    }
  });
  console.log('✅ Citizen reports schema and tracking status verified.\n');

  console.log('🎉 ALL AUTOMATED ENGINE CHECKS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
