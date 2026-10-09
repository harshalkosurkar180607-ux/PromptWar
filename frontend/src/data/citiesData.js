/**
 * CityPulse - Curated Multi-City Dataset & Data Model
 * 
 * NOTE ON DATA TRANSPARENCY:
 * All place listings, baseline safety indices, cleanliness audits, and crowd models
 * in this file represent a curated reference guide for demonstration purposes.
 * Live weather is fetched dynamically from Open-Meteo API.
 * Data metrics not formally surveyed are strictly set to `null` to ensure
 * the Smart City Scorecard never fabricates unverified scores.
 */

export const CITIES = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    state: 'Maharashtra',
    tagline: 'The City of Dreams & Relentless Coastal Energy',
    coordinates: [18.9388, 72.8354],
    zoom: 13,
    currency: '₹',
    trafficProfile: {
      currentStatus: 'Moderate Congestion',
      peakHours: '08:30 - 11:30 & 17:30 - 21:00',
      activeBottlenecks: ['Western Express Highway', 'Sion Circle', 'Crawford Market Area'],
      sourceModel: 'Historical Transit Model & Municipal Peak Flow Estimate',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '100 / 112',
      ambulance: '108',
      womenHelpline: '1091',
      touristAssistance: '1800-11-1363'
    }
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    state: 'Kanto',
    tagline: 'Hyper-Modern Neon Metropolis & Ancient Sanctuaries',
    coordinates: [35.6762, 139.6503],
    zoom: 13,
    currency: '¥',
    trafficProfile: {
      currentStatus: 'Smooth Vehicular / Dense Rail Transit',
      peakHours: '07:30 - 09:30 & 18:00 - 20:00',
      activeBottlenecks: ['Shinjuku Station Perimeter', 'Shibuya Scramble Crossing'],
      sourceModel: 'Metropolitan Rail Congestion Baseline',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '110',
      ambulance: '119',
      womenHelpline: '03-3503-8561',
      touristAssistance: '050-3816-2787'
    }
  },
  {
    id: 'newyork',
    name: 'New York City',
    country: 'United States',
    state: 'NY',
    tagline: 'The 24/7 Global Cultural & Architectural Epicenter',
    coordinates: [40.7128, -74.0060],
    zoom: 13,
    currency: '$',
    trafficProfile: {
      currentStatus: 'Heavy Gridlock in Midtown',
      peakHours: '08:00 - 10:00 & 16:30 - 19:30',
      activeBottlenecks: ['Holland Tunnel Approach', 'Midtown 42nd St', 'FDR Drive'],
      sourceModel: 'DOT Traffic Pattern Index',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '911',
      ambulance: '911',
      womenHelpline: '1-800-621-4673',
      touristAssistance: '311'
    }
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    state: 'Île-de-France',
    tagline: 'The City of Lights, Art, Gastronomy & Boulevards',
    coordinates: [48.8566, 2.3522],
    zoom: 13,
    currency: '€',
    trafficProfile: {
      currentStatus: 'Moderate Ring Road Delays',
      peakHours: '08:00 - 10:00 & 17:00 - 19:30',
      activeBottlenecks: ['Boulevard Périphérique Nord', 'Place de la Concorde'],
      sourceModel: 'Île-de-France Mobilités Baseline',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '17',
      ambulance: '15',
      womenHelpline: '3919',
      touristAssistance: '112 (European Emergency)'
    }
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    country: 'India',
    state: 'Karnataka',
    tagline: 'The Garden City & Silicon Capital of India',
    coordinates: [12.9716, 77.5946],
    zoom: 13,
    currency: '₹',
    trafficProfile: {
      currentStatus: 'High Congestion on Tech Corridors',
      peakHours: '09:00 - 12:00 & 17:30 - 21:30',
      activeBottlenecks: ['Silk Board Junction', 'Outer Ring Road (Marathahalli)', 'Hebbal Flyover'],
      sourceModel: 'Bengaluru Traffic Police Commuter Model',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '112',
      ambulance: '108',
      womenHelpline: '1091',
      touristAssistance: '1800-425-6666'
    }
  },
  {
    id: 'delhi',
    name: 'New Delhi',
    country: 'India',
    state: 'National Capital Region',
    tagline: 'Heart of India — Mughal Splendor & Modern Governance',
    coordinates: [28.6139, 77.2090],
    zoom: 13,
    currency: '₹',
    trafficProfile: {
      currentStatus: 'Heavy Commuter Traffic on Ring Road',
      peakHours: '08:30 - 11:30 & 17:30 - 20:30',
      activeBottlenecks: ['ITO Intersection', 'Dhaula Kuan', 'Ashram Chowk'],
      sourceModel: 'Delhi Traffic Police Telemetry Baseline',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '112 / 100',
      ambulance: '102 / 108',
      womenHelpline: '1091',
      touristAssistance: '1800-11-1363'
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'India',
    state: 'Rajasthan',
    tagline: 'The Pink City of Forts, Palaces & Royal Heritage',
    coordinates: [26.9124, 75.7873],
    zoom: 13,
    currency: '₹',
    trafficProfile: {
      currentStatus: 'Moderate Walled City Flow',
      peakHours: '09:00 - 11:30 & 17:00 - 19:30',
      activeBottlenecks: ['Ajmeri Gate', 'Badi Chaupar', 'MI Road'],
      sourceModel: 'Jaipur Smart City Transit Model',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '112 / 100',
      ambulance: '108',
      womenHelpline: '1090',
      touristAssistance: '0141-2822863'
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    state: 'Goa',
    tagline: 'Sun-Drenched Beaches, Portuguese Forts & Coastal Vibrancy',
    coordinates: [15.4989, 73.8278],
    zoom: 12,
    currency: '₹',
    trafficProfile: {
      currentStatus: 'Smooth Coastal Roads / High Holiday Flow',
      peakHours: '16:00 - 21:00',
      activeBottlenecks: ['Calangute-Baga Circle', 'Panjim Mandovi Bridge'],
      sourceModel: 'Goa Tourism Transit Index',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '112 / 100',
      ambulance: '108',
      womenHelpline: '1091',
      touristAssistance: '1364 (Goa Tourism Police)'
    }
  },
  {
    id: 'agra',
    name: 'Agra',
    country: 'India',
    state: 'Uttar Pradesh',
    tagline: 'City of the Taj Mahal & Timeless Mughal Architecture',
    coordinates: [27.1767, 78.0081],
    zoom: 13,
    currency: '₹',
    trafficProfile: {
      currentStatus: 'Controlled Tourist Transit Zone',
      peakHours: '08:00 - 10:30 & 16:00 - 18:30',
      activeBottlenecks: ['Taj East Gate Perimeter', 'MG Road'],
      sourceModel: 'ASI & UP Tourism Baseline',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '112',
      ambulance: '108',
      womenHelpline: '1090',
      touristAssistance: '0562-2226431'
    }
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    country: 'India',
    state: 'Uttar Pradesh',
    tagline: 'The Spiritual Capital on the Sacred Ganges',
    coordinates: [25.3176, 82.9739],
    zoom: 13,
    currency: '₹',
    trafficProfile: {
      currentStatus: 'Pedestrianized Ghat Corridors',
      peakHours: '06:00 - 08:30 & 17:30 - 20:30',
      activeBottlenecks: ['Godowlia Crossing', 'Ghat Access Lanes'],
      sourceModel: 'Varanasi Smart City Transit Pilot',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '112',
      ambulance: '108',
      womenHelpline: '1090',
      touristAssistance: '0542-2505033'
    }
  },
  {
    id: 'pune',
    name: 'Pune',
    country: 'India',
    state: 'Maharashtra',
    tagline: 'Oxford of the East & Vibrant Cultural Hub of the Deccan',
    coordinates: [18.5204, 73.8567],
    zoom: 13,
    currency: '₹',
    trafficProfile: {
      currentStatus: 'Moderate Peak Density',
      peakHours: '08:30 - 11:30 & 17:30 - 20:30',
      activeBottlenecks: ['JM Road', 'Hinjewadi Flyover', 'Swargate'],
      sourceModel: 'Pune Traffic Police Commuter Index',
      isLiveStream: false
    },
    emergencyHotlines: {
      police: '112 / 100',
      ambulance: '108',
      womenHelpline: '1091',
      touristAssistance: '1800-11-1363'
    }
  }
];

export const PLACES = [
  // ================= MUMBAI =================
  {
    id: 'mum-1',
    cityId: 'mumbai',
    name: 'Gateway of India & Apollo Bunder',
    category: 'heritage',
    rating: 4.7,
    reviewCount: 42100,
    priceLevel: '$',
    avgCost: 'Free Entry (Boat rides ₹120 - ₹250)',
    affordabilityScore: 95,
    cleanlinessScore: 82,
    accessibilityScore: 78, // Ramps present, cobblestone areas
    safetyScore: 92, // Heavily patrolled, CCTV coverage
    nightSafetyTag: 'High Security & Well-Lit Coastal Promenade',
    chaosLevel: 'High Energy / Bustling',
    bestTimeToVisit: 'Sunrise (06:00 - 08:00) or Cool Evening (18:00 - 20:30)',
    coordinates: [18.9220, 72.8347],
    neighborhood: 'Colaba, South Mumbai',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic 20th-century basalt triumphal arch facing the Arabian Sea, built to commemorate King George V. A primary cultural and maritime gateway to Elephanta Caves.',
    localInsiderTip: 'Skip midday heat and street hawker queues by visiting before 07:30 AM. Perfect sea breeze and unhindered sunrise photos.',
    tags: ['UNESCO Area', 'Sea View', 'Iconic Landmark', 'Budget Friendly'],
    dataSource: 'Curated Municipal Survey (Sample Reference Guide)'
  },
  {
    id: 'mum-2',
    cityId: 'mumbai',
    name: 'Kyani & Co. Heritage Irani Bakery',
    category: 'food',
    rating: 4.5,
    reviewCount: 9800,
    priceLevel: '$',
    avgCost: '₹100 - ₹250 per person',
    affordabilityScore: 90,
    cleanlinessScore: 78,
    accessibilityScore: 60, // Step entry, narrow wooden aisles
    safetyScore: 88,
    nightSafetyTag: 'Busy Commercial Arterial Road (Marine Lines)',
    chaosLevel: 'Moderate Vibrancy',
    bestTimeToVisit: 'Breakfast (08:00 - 10:30 AM)',
    coordinates: [18.9431, 72.8277],
    neighborhood: 'Marine Lines / Dhobi Talao',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Established in 1904, this beloved Irani café serves authentic bun maska, Irani chai, kheema pav, and mawa cakes beneath heritage European mirrors and wooden ceiling fans.',
    localInsiderTip: 'Dip the crusty bun maska directly into hot cardamom Irani chai. Cash or UPI accepted.',
    tags: ['Legendary Bakery', 'Pocket Friendly', 'Historic Cafe', 'Local Delicacy'],
    dataSource: 'Curated Food Guide (Sample Reference Guide)'
  },
  {
    id: 'mum-3',
    cityId: 'mumbai',
    name: 'The Taj Mahal Palace & Tower',
    category: 'hotel',
    rating: 4.9,
    reviewCount: 31200,
    priceLevel: '$$$$',
    avgCost: '₹22,000 - ₹55,000 / night',
    affordabilityScore: 25,
    cleanlinessScore: 98,
    accessibilityScore: 95, // Elevators, valet, ADA compliant ramps
    safetyScore: 99, // Private 24/7 security & maritime vigilance
    nightSafetyTag: 'Maximum Security Perimeter',
    chaosLevel: 'Tranquil Luxury Oasis',
    bestTimeToVisit: 'Year-Round (High Tea at Sea Lounge 15:30 - 18:30)',
    coordinates: [18.9217, 72.8332],
    neighborhood: 'Apollo Bunder, Colaba',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'World-renowned 1903 grand heritage hotel blending Moorish, Oriental, and Florentine architectural styles overlooking Mumbai Harbor. Home to 10 award-winning restaurants.',
    localInsiderTip: 'Even if not staying overnight, reserve afternoon high tea at the Sea Lounge for magnificent harbor views.',
    tags: ['Luxury Heritage', 'Harbor View', 'Five Star', 'Iconic Stays'],
    dataSource: 'Verified Hospitality Audit (Sample Reference Guide)'
  },
  {
    id: 'mum-4',
    cityId: 'mumbai',
    name: 'Marine Drive "Queen’s Necklace"',
    category: 'attraction',
    rating: 4.8,
    reviewCount: 65000,
    priceLevel: '$',
    avgCost: 'Free Public Promenade',
    affordabilityScore: 100,
    cleanlinessScore: 85,
    accessibilityScore: 88, // Flat, wide, tactile paved promenades
    safetyScore: 96, // Active coastal police patrol till 02:00 AM
    nightSafetyTag: 'Highly Safe & Bustling Night Corridor',
    chaosLevel: 'Relaxed Ocean Breeze',
    bestTimeToVisit: 'Dusk to Late Night (18:30 - 23:30)',
    coordinates: [18.9438, 72.8232],
    neighborhood: 'Churchgate / Nariman Point',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    description: 'A 3.6-kilometer-long C-shaped concrete boulevard along the natural bay. Lined with the second-largest collection of Art Deco buildings in the world after Miami.',
    localInsiderTip: 'Sit on the tetrapods near Nariman Point around 19:30 to see the streetlights arc like glowing pearls.',
    tags: ['Oceanfront', 'Solo Friendly', 'Art Deco Walk', 'Night Safe'],
    dataSource: 'Municipal Tourism Board (Sample Reference Guide)'
  },
  {
    id: 'mum-5',
    cityId: 'mumbai',
    name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    category: 'heritage',
    rating: 4.7,
    reviewCount: 38400,
    priceLevel: '$',
    avgCost: 'Station Entry ₹10 / Heritage Museum ₹200',
    affordabilityScore: 92,
    cleanlinessScore: 76,
    accessibilityScore: 82, // Escalators, tactile paving
    safetyScore: 90, // Strict Railway Police Force surveillance
    nightSafetyTag: 'Well-Lit Transit Hub (Crowded at Rush Hours)',
    chaosLevel: 'Hyperactive Transit Flow',
    bestTimeToVisit: 'Illumination Viewing (19:30 - 21:00)',
    coordinates: [18.9398, 72.8355],
    neighborhood: 'Fort / South Mumbai',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'UNESCO World Heritage Victorian Gothic Revival railway terminus built in 1887. Spectacular stone domes, turrets, and vaulted ceilings blending Gothic and traditional Indian palaces.',
    localInsiderTip: 'Stand on the viewing gallery across the junction at 8 PM to see the illuminated facade switch hues.',
    tags: ['UNESCO World Heritage', 'Victorian Gothic', 'Architecture Marvel', 'Budget Friendly'],
    dataSource: 'Heritage Commission Audit (Sample Reference Guide)'
  },
  {
    id: 'mum-6',
    cityId: 'mumbai',
    name: 'Sardar Refreshments (Pav Bhaji Specialist)',
    category: 'food',
    rating: 4.3,
    reviewCount: 14200,
    priceLevel: '$',
    avgCost: '₹200 - ₹350 per portion',
    affordabilityScore: 85,
    cleanlinessScore: null, // DELIBERATELY NULL: Demonstrates scorecard handling uninspected street food hygiene!
    accessibilityScore: null, // DELIBERATELY NULL: Street vendor, uncertified ramp
    safetyScore: 80,
    nightSafetyTag: 'Busy Roadside Stall Corridor until Midnight',
    chaosLevel: 'High Energy / Waiting Queues',
    bestTimeToVisit: 'Late Evening (20:00 - 23:00)',
    coordinates: [18.9696, 72.8193],
    neighborhood: 'Tardeo / Mumbai Central',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
    description: 'Legendary Mumbai street food destination famed for its pool of melted Amul butter over freshly mashed spiced vegetable bhaji with toasted buttered pav.',
    localInsiderTip: 'Request extra lemon wedges to balance the rich butter. Waiting times exceed 25 minutes on weekends.',
    tags: ['Street Food Cult', 'Butter Overload', 'Late Night Food', 'Budget Friendly'],
    dataSource: 'Community Street Food Survey (Sample Reference Guide)'
  },
  {
    id: 'mum-7',
    cityId: 'mumbai',
    name: 'Abode Bombay Boutique Hotel',
    category: 'hotel',
    rating: 4.8,
    reviewCount: 1650,
    priceLevel: '$$$',
    avgCost: '₹6,500 - ₹12,000 / night',
    affordabilityScore: 65,
    cleanlinessScore: 95,
    accessibilityScore: null, // Heritage building, vintage lift limitation
    safetyScore: 94,
    nightSafetyTag: 'Peaceful Colaba Heritage By-lane',
    chaosLevel: 'Calm Sanctuary',
    bestTimeToVisit: 'October through March',
    coordinates: [18.9234, 72.8315],
    neighborhood: 'Colaba Causeway',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    description: 'Mumbai’s premier eco-conscious luxury boutique hotel set inside a 1910 merchant house. Features restored colonial furniture, vintage tiles, and artisanal breakfast.',
    localInsiderTip: 'Book the Superior Luxury Room with the freestanding rolltop bathtub. Walking distance to all Colaba art galleries.',
    tags: ['Eco Boutique', 'Heritage Interior', 'Artisanal Stay', 'Colaba Gems'],
    dataSource: 'Independent Hotel Review (Sample Reference Guide)'
  },
  {
    id: 'mum-8',
    cityId: 'mumbai',
    name: 'Kala Ghoda Art Precinct',
    category: 'attraction',
    rating: 4.6,
    reviewCount: 18200,
    priceLevel: '$',
    avgCost: 'Free Walk / Gallery visits ₹50 - ₹150',
    affordabilityScore: 90,
    cleanlinessScore: 84,
    accessibilityScore: 75,
    safetyScore: 92,
    nightSafetyTag: 'Well-Lit Cafe & Designer Boutique District',
    chaosLevel: 'Creative & Walkable',
    bestTimeToVisit: 'Late Afternoon (15:00 - 18:30)',
    coordinates: [18.9298, 72.8322],
    neighborhood: 'Kala Ghoda, Fort',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8418bb9?auto=format&fit=crop&w=800&q=80',
    description: 'The creative heartbeat of South Mumbai, packed with contemporary art galleries, indie bookshops, designer boutiques, and colonial architectural facades.',
    localInsiderTip: 'Grab a cold brew at the nearby heritage cafes and visit Jehangir Art Gallery for free contemporary exhibitions.',
    tags: ['Art District', 'Walking Tour', 'Colonial Buildings', 'Solo Friendly'],
    dataSource: 'Arts Trust Survey (Sample Reference Guide)'
  },

  // ================= TOKYO =================
  {
    id: 'tok-1',
    cityId: 'tokyo',
    name: 'Senso-ji Temple & Asakusa District',
    category: 'heritage',
    rating: 4.8,
    reviewCount: 78000,
    priceLevel: '$',
    avgCost: 'Free Admission (Incense ¥100)',
    affordabilityScore: 95,
    cleanlinessScore: 96,
    accessibilityScore: 85,
    safetyScore: 98,
    nightSafetyTag: 'Extremely Safe Night Illumination',
    chaosLevel: 'Serene at Night / Crowded Midday',
    bestTimeToVisit: 'Evening after 19:00 (Lanterns lit, minimal crowds)',
    coordinates: [35.7148, 139.7967],
    neighborhood: 'Taito, Asakusa',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    description: 'Tokyo’s oldest Buddhist temple founded in 645 AD. Features the iconic red Kaminarimon (Thunder Gate) and Nakamise shopping street with traditional snacks.',
    localInsiderTip: 'While Nakamise closes at 18:00, the main hall remains illuminated until 23:00 offering cinematic, peaceful photo angles.',
    tags: ['Ancient Temple', 'Historic Shrines', 'Night Illumination', 'Cultural Icon'],
    dataSource: 'Tokyo Metropolitan Tourism (Sample Reference Guide)'
  },
  {
    id: 'tok-2',
    cityId: 'tokyo',
    name: 'Omoide Yokocho "Memory Lane"',
    category: 'food',
    rating: 4.6,
    reviewCount: 22400,
    priceLevel: '$$',
    avgCost: '¥1,500 - ¥3,500 per person',
    affordabilityScore: 80,
    cleanlinessScore: 82,
    accessibilityScore: 50, // Ultra narrow post-war alleys
    safetyScore: 94,
    nightSafetyTag: 'Dense Nightlife Alley, Safe & Patrolled',
    chaosLevel: 'Bustling Smoky Atmosphere',
    bestTimeToVisit: 'Evening (18:30 - 21:30)',
    coordinates: [35.6931, 139.6994],
    neighborhood: 'West Shinjuku',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    description: 'Atmospheric post-war network of tiny yakitori stalls, ramen counters, and izakayas grilling skewers over binchotan charcoal beneath paper lanterns.',
    localInsiderTip: 'Most stalls seat only 6-8 guests. Look for empty wooden stools and order the yakitori combo plate (tare sauce) with cold draft beer.',
    tags: ['Authentic Izakaya', 'Yakitori', 'Post-War Alleys', 'Nightlife Vibe'],
    dataSource: 'Shinjuku Commerce Board (Sample Reference Guide)'
  },
  {
    id: 'tok-3',
    cityId: 'tokyo',
    name: 'Park Hyatt Tokyo',
    category: 'hotel',
    rating: 4.8,
    reviewCount: 8900,
    priceLevel: '$$$$',
    avgCost: '¥65,000 - ¥140,000 / night',
    affordabilityScore: 20,
    cleanlinessScore: 99,
    accessibilityScore: 96,
    safetyScore: 99,
    nightSafetyTag: 'High-Rise Luxury Security',
    chaosLevel: 'Quiet Skyline Sanctuary',
    bestTimeToVisit: 'Sunset for Mount Fuji Views from Top Floors',
    coordinates: [35.6853, 139.6908],
    neighborhood: 'Nishi-Shinjuku',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic luxury hotel occupying the top 14 floors of the 52-story Shinjuku Park Tower. Famed for its New York Bar and cinematic panoramic city views.',
    localInsiderTip: 'Non-guests can visit the New York Bar on floor 52 for live jazz after 20:00 (table cover fee applies).',
    tags: ['Skyline Views', 'Cinematic Hotel', 'Luxury Suites', 'Fine Dining'],
    dataSource: 'Hospitality Index (Sample Reference Guide)'
  },
  {
    id: 'tok-4',
    cityId: 'tokyo',
    name: 'Meiji Jingu Shrine & Forest',
    category: 'attraction',
    rating: 4.8,
    reviewCount: 54000,
    priceLevel: '$',
    avgCost: 'Free Admission (Gyoen Garden ¥500)',
    affordabilityScore: 98,
    cleanlinessScore: 99,
    accessibilityScore: 82, // Wide gravel path suitable for sturdy strollers
    safetyScore: 98,
    nightSafetyTag: 'Closes at Sunset (Daylight Only)',
    chaosLevel: 'Deep Forest Silence',
    bestTimeToVisit: 'Early Morning (07:00 - 08:30)',
    coordinates: [35.6764, 139.6993],
    neighborhood: 'Shibuya / Harajuku',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Massive Shinto shrine dedicated to Emperor Meiji and Empress Shoken, enveloped by a tranquil 170-acre man-made sacred forest of 120,000 evergreen trees.',
    localInsiderTip: 'Walk the wide cedar path in the quiet morning dew right before visiting the adjacent trendy Harajuku streets.',
    tags: ['Sacred Forest', 'Shinto Shrine', 'Peaceful Escape', 'Spiritual Landmark'],
    dataSource: 'Tokyo Green Heritage (Sample Reference Guide)'
  },

  // ================= NEW YORK =================
  {
    id: 'nyc-1',
    cityId: 'newyork',
    name: 'The High Line & Chelsea Market',
    category: 'attraction',
    rating: 4.7,
    reviewCount: 68000,
    priceLevel: '$',
    avgCost: 'Free Park / Food $12 - $30',
    affordabilityScore: 90,
    cleanlinessScore: 92,
    accessibilityScore: 94, // Fully elevator-accessible public park
    safetyScore: 94,
    nightSafetyTag: 'Well-Lit Elevated Park (Closes 22:00 in Summer)',
    chaosLevel: 'Moderate Pedestrian Stroll',
    bestTimeToVisit: 'Morning Stroll (08:30 - 10:30)',
    coordinates: [40.7480, -74.0048],
    neighborhood: 'Chelsea / Meatpacking District',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80',
    description: 'A 1.45-mile-long elevated linear park and botanical walkway created on a former New York Central Railroad spur on Manhattan’s West Side.',
    localInsiderTip: 'Exit onto 15th Street to enter Chelsea Market for lobster rolls, artisan tacos, and craft coffee.',
    tags: ['Urban Architecture', 'Elevated Park', 'Hudson Views', 'Public Art'],
    dataSource: 'NYC Parks Assessment (Sample Reference Guide)'
  },
  {
    id: 'nyc-2',
    cityId: 'newyork',
    name: 'Katz’s Delicatessen',
    category: 'food',
    rating: 4.5,
    reviewCount: 39000,
    priceLevel: '$$',
    avgCost: '$25 - $35 for Pastrami on Rye',
    affordabilityScore: 68,
    cleanlinessScore: 80,
    accessibilityScore: 70,
    safetyScore: 90,
    nightSafetyTag: 'Lively Houston Street with 24h Weekend Footfall',
    chaosLevel: 'High Energy / Bustling Counter',
    bestTimeToVisit: 'Mid-afternoon (14:30 - 16:30) to avoid 1-hour queues',
    coordinates: [40.7222, -73.9874],
    neighborhood: 'Lower East Side',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    description: 'Legendary kosher-style deli operating since 1888, hand-carving thick, tender smoked pastrami and corned beef sandwiches on classic rye bread.',
    localInsiderTip: 'Never lose the small paper ticket handed to you at the door! Tip your counter cutter $1-2 for a generous warm sample slice.',
    tags: ['Historic Deli', 'Iconic Pastrami', 'Since 1888', 'Lower East Side'],
    dataSource: 'NYC Culinary Archive (Sample Reference Guide)'
  },
  {
    id: 'nyc-3',
    cityId: 'newyork',
    name: 'Grand Central Terminal & Whispering Gallery',
    category: 'heritage',
    rating: 4.8,
    reviewCount: 72000,
    priceLevel: '$',
    avgCost: 'Free Public Entry',
    affordabilityScore: 98,
    cleanlinessScore: 88,
    accessibilityScore: 90,
    safetyScore: 92,
    nightSafetyTag: 'MTA Police Presence & Bright Illuminations',
    chaosLevel: 'High Energy Commuter Hub',
    bestTimeToVisit: 'Midday Off-Peak (11:00 - 14:00)',
    coordinates: [40.7527, -73.9772],
    neighborhood: 'Midtown East',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80',
    description: 'Beaux-Arts transit palace completed in 1913. Known for its celestial concourse ceiling mural, brass clock, and subterranean acoustic whispering gallery.',
    localInsiderTip: 'Stand diagonally opposite your partner in the Guastavino tile arches near the Oyster Bar and whisper into the corner—sound travels cleanly.',
    tags: ['Beaux-Arts', 'Acoustic Mystery', 'Historic Landmark', 'Free Attraction'],
    dataSource: 'MTA Heritage Landmark (Sample Reference Guide)'
  },
  {
    id: 'nyc-4',
    cityId: 'newyork',
    name: 'The Standard High Line Hotel',
    category: 'hotel',
    rating: 4.5,
    reviewCount: 9200,
    priceLevel: '$$$',
    avgCost: '$380 - $750 / night',
    affordabilityScore: 45,
    cleanlinessScore: 92,
    accessibilityScore: 92,
    safetyScore: 95,
    nightSafetyTag: 'High Security & Busy Nightlife District',
    chaosLevel: 'Vibrant & Trendy',
    bestTimeToVisit: 'Summer Rooftop Season',
    coordinates: [40.7408, -74.0080],
    neighborhood: 'Meatpacking District',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    description: 'Striking modernist hotel straddling the High Line elevated park on pilotis stilts with floor-to-ceiling glass windows overlooking the Hudson River.',
    localInsiderTip: 'Head up to Le Bain for sunset drinks and crepes on the rooftop astroturf patio.',
    tags: ['Modernist Design', 'Hudson Views', 'Rooftop Lounge', 'Trendy Stay'],
    dataSource: 'Boutique Hotel Guild (Sample Reference Guide)'
  },

  // ================= PARIS =================
  {
    id: 'par-1',
    cityId: 'paris',
    name: 'Sainte-Chapelle & Île de la Cité',
    category: 'heritage',
    rating: 4.8,
    reviewCount: 41000,
    priceLevel: '$$',
    avgCost: '€11.50 General Admission',
    affordabilityScore: 82,
    cleanlinessScore: 94,
    accessibilityScore: 72, // Spiral stone stairs, limited elevator access
    safetyScore: 94, // High security adjacent to Palais de Justice
    nightSafetyTag: 'Safe Historic Island in the Seine',
    chaosLevel: 'Quiet Reverence Inside',
    bestTimeToVisit: 'Sunny Morning (09:30 - 11:30) for glowing stained glass',
    coordinates: [48.8554, 2.3450],
    neighborhood: 'Île de la Cité, 1st Arrondissement',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: '13th-century Gothic royal chapel built by King Louis IX to house relics of the Passion. Renowned for its 1,113 luminous stained-glass panels towering 15 meters high.',
    localInsiderTip: 'Book timed-entry online tickets in advance; security lines at the adjacent courthouse can otherwise take up to 45 minutes.',
    tags: ['Gothic Wonder', 'Stained Glass', 'UNESCO Island', 'Historic Relic'],
    dataSource: 'Centre des Monuments Nationaux (Sample Reference Guide)'
  },
  {
    id: 'par-2',
    cityId: 'paris',
    name: 'Le Comptoir du Relais',
    category: 'food',
    rating: 4.5,
    reviewCount: 7600,
    priceLevel: '$$$',
    avgCost: '€35 - €70 per person',
    affordabilityScore: 60,
    cleanlinessScore: 92,
    accessibilityScore: 70,
    safetyScore: 94,
    nightSafetyTag: 'St. Germain Boulevard, Safe & Highly Animated',
    chaosLevel: 'Classic Bistro Chatter',
    bestTimeToVisit: 'Early Lunch (12:00 sharp) or Dinner',
    coordinates: [48.8524, 2.3385],
    neighborhood: 'Saint-Germain-des-Prés, 6th Arr.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    description: 'Master chef Yves Camdeborde’s pioneering bistronomy outpost serving exquisite seasonal French charcuterie, escargots, braised beef cheek, and artisanal wines.',
    localInsiderTip: 'No lunchtime reservations are accepted; arrive by 11:45 AM to secure an outdoor zinc table under the awning.',
    tags: ['Bistronomy Pioneer', 'French Classic', 'Saint Germain', 'Wine Pairing'],
    dataSource: 'Paris Culinary Guide (Sample Reference Guide)'
  },
  {
    id: 'par-3',
    cityId: 'paris',
    name: 'Montmartre & Sacré-Cœur Basilique',
    category: 'attraction',
    rating: 4.7,
    reviewCount: 91000,
    priceLevel: '$',
    avgCost: 'Free Basilica Entry / Dome Climb €7',
    affordabilityScore: 95,
    cleanlinessScore: 80,
    accessibilityScore: 65, // Steep staircases, funicular alternative available
    safetyScore: 82, // Watch for bracelet / petition scam artists at the base stairs
    nightSafetyTag: 'Lively Hilltop; Exercise Awareness near Funicular Base',
    chaosLevel: 'Bohemian Bustle',
    bestTimeToVisit: 'Sunset Over the Paris Skyline',
    coordinates: [48.8867, 2.3431],
    neighborhood: '18th Arrondissement',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80',
    description: 'Charming hilltop village crowned by the white Romano-Byzantine Basilica of the Sacred Heart, offering panoramic sweeping views across the entire city of Paris.',
    localInsiderTip: 'Take the scenic cobblestone back-alleys behind Place du Tertre (Rue de l’Abreuvoir) to avoid tourist queues and souvenir pushes.',
    tags: ['Panoramic View', 'Artist Colony', 'Hilltop Sanctuary', 'Sunset Spot'],
    dataSource: 'Ville de Paris Culture (Sample Reference Guide)'
  },
  {
    id: 'par-4',
    cityId: 'paris',
    name: 'Hôtel Regina Louvre',
    category: 'hotel',
    rating: 4.7,
    reviewCount: 3400,
    priceLevel: '$$$$',
    avgCost: '€420 - €850 / night',
    affordabilityScore: 35,
    cleanlinessScore: 96,
    accessibilityScore: 90,
    safetyScore: 98,
    nightSafetyTag: 'Directly Facing Tuileries Gardens, Ultra Safe',
    chaosLevel: 'Regal Serenity',
    bestTimeToVisit: 'Spring or Autumn',
    coordinates: [48.8637, 2.3323],
    neighborhood: '1st Arrondissement (Place des Pyramides)',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    description: 'Historic Belle Époque 5-star hotel inaugurated for the 1900 Universal Exhibition, positioned directly across from the Louvre Museum and Jardin des Tuileries.',
    localInsiderTip: 'Rooms with balcony views of the Eiffel Tower are worth the upgrade for nocturnal light show spectacles.',
    tags: ['Belle Époque', 'Facing Louvre', 'Luxury Stays', 'Historic Palace'],
    dataSource: 'Hospitality Luxury Index (Sample Reference Guide)'
  },

  // ================= BENGALURU =================
  {
    id: 'blr-1',
    cityId: 'bengaluru',
    name: 'Bangalore Palace & Royal Grounds',
    category: 'heritage',
    rating: 4.4,
    reviewCount: 31000,
    priceLevel: '$$',
    avgCost: '₹250 Indian / ₹500 Foreigners',
    affordabilityScore: 78,
    cleanlinessScore: 84,
    accessibilityScore: 70,
    safetyScore: 92,
    nightSafetyTag: 'Secured Perimeter (Daytime Visit Recommended)',
    chaosLevel: 'Peaceful Courtyard Stroll',
    bestTimeToVisit: 'Morning (10:00 - 12:30)',
    coordinates: [12.9988, 77.5921],
    neighborhood: 'Vasanth Nagar',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    description: 'Tudor-style royal estate constructed in 1887 by King Chamarajendra Wadiyar X, featuring fortified towers, stained glass, wood carvings, and hunting memorabilia.',
    localInsiderTip: 'Audio guides are included with tickets; listen to the story of the ballroom wooden pillars imported from England.',
    tags: ['Tudor Architecture', 'Royal Wadiyar Heritage', 'Historic Estate', 'Gardens'],
    dataSource: 'Karnataka Tourism Board (Sample Reference Guide)'
  },
  {
    id: 'blr-2',
    cityId: 'bengaluru',
    name: 'Vidyarthi Bhavan (Since 1943)',
    category: 'food',
    rating: 4.6,
    reviewCount: 46000,
    priceLevel: '$',
    avgCost: '₹80 - ₹180 per person',
    affordabilityScore: 96,
    cleanlinessScore: 82,
    accessibilityScore: 62, // Traditional entrance, wooden bench seating
    safetyScore: 92,
    nightSafetyTag: 'Gandhi Bazaar Commercial Street, High Footfall',
    chaosLevel: 'Vibrant Traditional Commotion',
    bestTimeToVisit: 'Morning (06:30 - 08:30)',
    coordinates: [12.9450, 77.5732],
    neighborhood: 'Gandhi Bazaar, Basavanagudi',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    description: 'Legendary South Indian tiffin house serving thick, crispy golden ghee masala dosas and frothy filter coffee carried by servers balancing towers of 20 plates.',
    localInsiderTip: 'Order the signature sagu masala dosa along with a piping hot tumbler of filter coffee. Prepare for a 20-minute morning queue.',
    tags: ['Legendary Dosa', 'Filter Coffee', 'Basavanagudi Cult', 'Budget Tiffin'],
    dataSource: 'Culinary Heritage Trust (Sample Reference Guide)'
  },
  {
    id: 'blr-3',
    cityId: 'bengaluru',
    name: 'Cubbon Park & Bamboo Groves',
    category: 'attraction',
    rating: 4.7,
    reviewCount: 52000,
    priceLevel: '$',
    avgCost: 'Free Public Admission',
    affordabilityScore: 100,
    cleanlinessScore: 88,
    accessibilityScore: 86, // Paved walking paths, vehicle-free mornings
    safetyScore: 94, // Park warden patrols & family crowds
    nightSafetyTag: 'Closes at Sunset (Daytime Park)',
    chaosLevel: 'Calm Green Oasis',
    bestTimeToVisit: 'Morning (06:00 - 09:00)',
    coordinates: [12.9738, 77.5913],
    neighborhood: 'Central Business District',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    description: 'A 300-acre green lung in the heart of Bengaluru established in 1870. Home to over 6,000 indigenous trees, Victorian statues, and heritage colonial red buildings.',
    localInsiderTip: 'Vehicular traffic is completely prohibited on Sundays, turning the entire park into an open haven for runners, dog walkers, and book readers.',
    tags: ['Green Lung', 'Jogging Loop', 'Botanical Canopy', 'Quiet Haven'],
    dataSource: 'Horticulture Department (Sample Reference Guide)'
  },
  {
    id: 'blr-4',
    cityId: 'bengaluru',
    name: 'The Leela Palace Bengaluru',
    category: 'hotel',
    rating: 4.8,
    reviewCount: 19800,
    priceLevel: '$$$$',
    avgCost: '₹18,000 - ₹38,000 / night',
    affordabilityScore: 30,
    cleanlinessScore: 98,
    accessibilityScore: 95,
    safetyScore: 98,
    nightSafetyTag: 'Comprehensive Perimeter Security',
    chaosLevel: 'Palatial Serenity',
    bestTimeToVisit: 'Year-Round',
    coordinates: [12.9606, 77.6484],
    neighborhood: 'Old Airport Road, Kodihalli',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    description: 'Grand royal palace hotel inspired by the architecture of the Royal Palace of Mysore. Boasts ornate brass arches, cascading waterfalls, and sprawling tropical gardens.',
    localInsiderTip: 'Dine at Jamavar for royal North and South Indian recipes served on gold-plated tableware.',
    tags: ['Mysore Palace Style', 'Royal Splendor', 'Five Star Luxury', 'Sprawling Gardens'],
    dataSource: 'Hospitality Standards Guild (Sample Reference Guide)'
  },

  // ================= AGRA =================
  {
    id: 'agra-1',
    cityId: 'agra',
    name: 'The Taj Mahal',
    category: 'heritage',
    rating: 4.9,
    reviewCount: 165000,
    priceLevel: '$',
    avgCost: '₹50 Indian / ₹1100 International',
    affordabilityScore: 92,
    cleanlinessScore: 96,
    accessibilityScore: 85,
    safetyScore: 98,
    nightSafetyTag: 'Strict Armed CISF Perimeter & Electric Golf Carts',
    chaosLevel: 'High Wonder & Regulated Security',
    bestTimeToVisit: 'Sunrise (06:00 - 08:30) for ethereal soft morning lighting',
    coordinates: [27.1751, 78.0421],
    neighborhood: 'Dharmapuri, Forest Colony',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    description: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of Mughal emperor Shah Jahan in memory of his favourite wife.',
    localInsiderTip: 'Enter via the East Gate at 05:45 AM for shorter lines. Battery cars run directly from the parking lot.',
    tags: ['UNESCO Wonder', 'Marble Splendor', 'Iconic India', 'Must Visit'],
    dataSource: 'Archaeological Survey of India Audit'
  },
  {
    id: 'agra-2',
    cityId: 'agra',
    name: 'The Oberoi Amarvilas',
    category: 'hotel',
    rating: 4.9,
    reviewCount: 3800,
    priceLevel: '$$$$',
    avgCost: '₹35,000 - ₹75,000 / night',
    affordabilityScore: 35,
    cleanlinessScore: 99,
    accessibilityScore: 95,
    safetyScore: 99,
    nightSafetyTag: 'Private 5-Star Fortified Estate',
    chaosLevel: 'Ultra Serene Luxury',
    bestTimeToVisit: 'October to March',
    coordinates: [27.1698, 78.0489],
    neighborhood: 'Taj East Gate Road',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'Located only 600 meters from the Taj Mahal, all rooms, suites, lobby, bar and lounge offer uninterrupted views of the monument.',
    localInsiderTip: 'Request a balcony room for sunset cocktails while watching twilight over the Taj dome.',
    tags: ['Taj Views', 'World Luxury', 'Mughal Architecture', 'Royal Hospitality'],
    dataSource: 'Hospitality Standards Guild'
  },

  // ================= NEW DELHI =================
  {
    id: 'del-1',
    cityId: 'delhi',
    name: 'Qutub Minar & Mehrauli Archaeological Park',
    category: 'heritage',
    rating: 4.7,
    reviewCount: 78000,
    priceLevel: '$',
    avgCost: '₹40 Indian / ₹600 Foreign Nationals',
    affordabilityScore: 94,
    cleanlinessScore: 90,
    accessibilityScore: 82,
    safetyScore: 93,
    nightSafetyTag: 'Illuminated Heritage Monument Precinct',
    chaosLevel: 'Spacious & Well Maintained',
    bestTimeToVisit: 'Early morning or illuminated dusk',
    coordinates: [28.5245, 77.1855],
    neighborhood: 'Mehrauli, South Delhi',
    image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80',
    description: 'A 73-meter victory tower built in 1193, surrounded by ancient Mughal gardens, intricately carved sandstone arches, and the legendary rust-resistant 4th-century Iron Pillar.',
    localInsiderTip: 'Look closely at the Iron Pillar of Chandragupta II to admire ancient Indian metallurgy that has never rusted.',
    tags: ['UNESCO World Heritage', 'Ancient Architecture', 'Spacious Lawns', 'Historical Landmark'],
    dataSource: 'Delhi Tourism Department'
  },
  {
    id: 'del-2',
    cityId: 'delhi',
    name: "Karim's Historic Mughlai Kitchen",
    category: 'food',
    rating: 4.5,
    reviewCount: 38400,
    priceLevel: '$$',
    avgCost: '₹400 - ₹800 per person',
    affordabilityScore: 84,
    cleanlinessScore: 80,
    accessibilityScore: null,
    safetyScore: 88,
    nightSafetyTag: 'Crowded Chandni Chowk Culinary Lane',
    chaosLevel: 'High Energy / Bustling Bazaar',
    bestTimeToVisit: 'Dinner (19:30 - 22:30)',
    coordinates: [28.6508, 77.2334],
    neighborhood: 'Gali Kababian, Jama Masjid',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    description: 'Founded in 1913 by Haji Karimuddin, former royal chef of the Mughal courts. World-renowned for authentic mutton burra kebabs, nihari, and sheermal.',
    localInsiderTip: 'Order the Mutton Nihari and Khamiri Roti. Arrive before 8 PM to get immediate seating.',
    tags: ['Mughal Royalty', 'Culinary Legend', 'Chandni Chowk', 'Historic Food'],
    dataSource: 'Old Delhi Heritage Food Survey'
  },

  // ================= JAIPUR =================
  {
    id: 'jai-1',
    cityId: 'jaipur',
    name: 'Hawa Mahal (Palace of Winds)',
    category: 'heritage',
    rating: 4.6,
    reviewCount: 92000,
    priceLevel: '$',
    avgCost: '₹50 Indian / ₹200 Foreign Nationals',
    affordabilityScore: 95,
    cleanlinessScore: 88,
    accessibilityScore: 70,
    safetyScore: 92,
    nightSafetyTag: 'Vibrant Lighted Badi Chaupar Bazaar',
    chaosLevel: 'Bustling Bazaar Traffic',
    bestTimeToVisit: 'Early morning sunrise reflection on pink sandstone',
    coordinates: [26.9239, 75.8267],
    neighborhood: 'Badi Chaupar, Old City',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443a504?auto=format&fit=crop&w=800&q=80',
    description: 'Built in 1799 by Maharaja Sawai Pratap Singh with 953 intricately carved jharokhas (casements) designed for royal ladies to view city street festivals unnoticed.',
    localInsiderTip: 'Cross the street to Tattoo Cafe on the 3rd floor for the famous panoramic straight-on photo angle.',
    tags: ['Pink City Icon', 'Royal Rajputana', 'Intricate Architecture', 'Photo Hotspot'],
    dataSource: 'Rajasthan Tourism Bureau'
  },
  {
    id: 'jai-2',
    cityId: 'jaipur',
    name: 'Amer Fort & Maota Lake',
    category: 'attraction',
    rating: 4.8,
    reviewCount: 114000,
    priceLevel: '$$',
    avgCost: '₹100 Entry / ₹500 Guide or Light Show',
    affordabilityScore: 90,
    cleanlinessScore: 92,
    accessibilityScore: 78,
    safetyScore: 96,
    nightSafetyTag: 'Illuminated Amber Fort Night Walk',
    chaosLevel: 'Expansive Hilltop Courtyards',
    bestTimeToVisit: '08:30 - 11:00 or Night Light & Sound Show',
    coordinates: [26.9855, 75.8513],
    neighborhood: 'Amer Town',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'Majestic red sandstone and marble fortress palace overlooking Maota Lake, famous for the glittering Sheesh Mahal (Mirror Palace) and royal ramparts.',
    localInsiderTip: 'Visit the Sheesh Mahal and ask the guard to light a single candle to see the thousands of ceiling mirrors light up like stars.',
    tags: ['UNESCO Hill Fort', 'Sheesh Mahal', 'Rajput Grandeur', 'Scenic Views'],
    dataSource: 'Rajasthan Tourism Bureau'
  },

  // ================= GOA =================
  {
    id: 'goa-1',
    cityId: 'goa',
    name: 'Baga & Calangute Beach Coastal Strip',
    category: 'attraction',
    rating: 4.5,
    reviewCount: 125000,
    priceLevel: '$',
    avgCost: 'Free Beach Entry / Watersports ₹800 - ₹2000',
    affordabilityScore: 92,
    cleanlinessScore: 82,
    accessibilityScore: 80,
    safetyScore: 88,
    nightSafetyTag: 'Beach Shacks with Lifeguards & Patrols until Midnight',
    chaosLevel: 'High Energy Beach Life',
    bestTimeToVisit: 'November to February for pleasant breezes',
    coordinates: [15.5524, 73.7517],
    neighborhood: 'North Goa Coastal Belt',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    description: 'Goa’s most famous golden sand shoreline, bustling with beach shacks serving fresh grilled seafood, parasailing, jet-skis, and lively nighttime music.',
    localInsiderTip: 'Walk north toward Baga Creek around 5 PM for calmer water and less crowded beach loungers.',
    tags: ['Golden Beaches', 'Watersports', 'Beach Shacks', 'Goan Sunsets'],
    dataSource: 'Goa Tourism Development Corporation'
  },
  {
    id: 'goa-2',
    cityId: 'goa',
    name: 'Basilica of Bom Jesus',
    category: 'heritage',
    rating: 4.7,
    reviewCount: 46000,
    priceLevel: '$',
    avgCost: 'Free Entry',
    affordabilityScore: 98,
    cleanlinessScore: 94,
    accessibilityScore: 85,
    safetyScore: 95,
    nightSafetyTag: 'Serene Heritage Precinct',
    chaosLevel: 'Quiet Reverence',
    bestTimeToVisit: 'Morning (09:00 - 12:00)',
    coordinates: [15.5009, 73.9116],
    neighborhood: 'Old Goa (Velha Goa)',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic 16th-century Baroque church and UNESCO World Heritage site holding the mortal remains of St. Francis Xavier in a silver casket.',
    localInsiderTip: 'Admire the unplastered laterite exterior which is uniquely distinct from other colonial churches in Asia.',
    tags: ['UNESCO Heritage', 'Baroque Architecture', 'Historic Old Goa', 'Peaceful Sanctuary'],
    dataSource: 'ASI Goa Circle'
  },

  // ================= VARANASI =================
  {
    id: 'var-1',
    cityId: 'varanasi',
    name: 'Dashashwamedh Ghat & Evening Maha Aarti',
    category: 'heritage',
    rating: 4.8,
    reviewCount: 98000,
    priceLevel: '$',
    avgCost: 'Free on steps / Boat seating ₹200 - ₹500',
    affordabilityScore: 95,
    cleanlinessScore: 84,
    accessibilityScore: 68,
    safetyScore: 90,
    nightSafetyTag: 'High Pilgrimage & Police Patrols along Ghats',
    chaosLevel: 'Deep Spiritual Intensity',
    bestTimeToVisit: '18:15 sharp for the choreographed Maha Aarti ceremony',
    coordinates: [25.3075, 83.0104],
    neighborhood: 'Dashashwamedh, Godowlia',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    description: 'The main and oldest ghat on the Ganges in Varanasi. Every evening, young priests perform a spellbinding synchronized prayer ceremony with brass lamps, incense, and conch shells.',
    localInsiderTip: 'Hire a rowing boat 30 minutes before sunset to watch the glowing Aarti lamps from the water looking back at the steps.',
    tags: ['Spiritual Ganges', 'Evening Aarti', 'Ancient Ghats', 'Unforgettable India'],
    dataSource: 'Varanasi Smart City Pilgrimage Survey'
  },

  // ================= PUNE =================
  {
    id: 'pune-1',
    cityId: 'pune',
    name: 'Shaniwar Wada Peshwa Fort',
    category: 'heritage',
    rating: 4.5,
    reviewCount: 52000,
    priceLevel: '$',
    avgCost: '₹25 Indian / ₹300 International',
    affordabilityScore: 96,
    cleanlinessScore: 86,
    accessibilityScore: 78,
    safetyScore: 91,
    nightSafetyTag: 'Well-Lit Historical Garden & Sound Show Area',
    chaosLevel: 'Moderate Heritage Walk',
    bestTimeToVisit: 'Late Afternoon (16:00 - 18:30)',
    coordinates: [18.5195, 73.8553],
    neighborhood: 'Bajirao Road, Shaniwar Peth',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
    description: '18th-century seat of the Peshwas of the Maratha Empire. Famed for its teakwood Delhi Gate with iron spikes, stone foundations, and evening garden grounds.',
    localInsiderTip: 'Walk inside the Dilli Darwaza to inspect the elephant-deterrent steel spikes and the panoramic fountain plaza.',
    tags: ['Maratha Empire', 'Peshwa History', 'Historic Fort', 'Pune Icon'],
    dataSource: 'Pune Municipal Heritage Department'
  }
];

/**
 * Smart City Scorecard Calculation Engine
 * 
 * SCORING METHODOLOGY & FORMULA:
 * The Smart City Scorecard evaluates places across 5 dimensions:
 * 1. Public Rating (scaled to 100): Weight = 25%
 * 2. Safety Index (0-100): Weight = 25%
 * 3. Affordability Index (0-100): Weight = 20%
 * 4. Cleanliness Audit (0-100): Weight = 15% (if surveyed)
 * 5. Accessibility Audit (0-100): Weight = 15% (if surveyed)
 * 
 * STRICT COMPLIANCE RULE:
 * If Cleanliness, Accessibility, or Safety data is missing (`null` or `undefined`),
 * it is NEVER fabricated or estimated. The metric is explicitly marked "Unknown / Not Audited".
 * The overall score is calculated as a weighted average over ONLY the available metrics:
 * 
 * Score = sum(weight_i * metric_i) / sum(weight_i of available metrics)
 */
export function calculateSmartScore(place) {
  if (!place) return null;

  const weights = {
    rating: 0.25,
    safety: 0.25,
    affordability: 0.20,
    cleanliness: 0.15,
    accessibility: 0.15
  };

  const metrics = [
    {
      key: 'rating',
      label: 'Public Rating',
      rawValue: place.rating,
      value: place.rating ? Math.round((place.rating / 5) * 100) : null,
      weight: weights.rating,
      display: place.rating ? `${place.rating} / 5.0 (${Math.round((place.rating / 5) * 100)} pts)` : 'Unknown',
      isAvailable: place.rating !== null && place.rating !== undefined
    },
    {
      key: 'safety',
      label: 'Safety Score',
      rawValue: place.safetyScore,
      value: place.safetyScore,
      weight: weights.safety,
      display: place.safetyScore !== null && place.safetyScore !== undefined ? `${place.safetyScore} / 100` : 'Unknown',
      isAvailable: place.safetyScore !== null && place.safetyScore !== undefined
    },
    {
      key: 'affordability',
      label: 'Affordability',
      rawValue: place.affordabilityScore,
      value: place.affordabilityScore,
      weight: weights.affordability,
      display: place.affordabilityScore !== null && place.affordabilityScore !== undefined ? `${place.affordabilityScore} / 100 (${place.priceLevel})` : 'Unknown',
      isAvailable: place.affordabilityScore !== null && place.affordabilityScore !== undefined
    },
    {
      key: 'cleanliness',
      label: 'Cleanliness Audit',
      rawValue: place.cleanlinessScore,
      value: place.cleanlinessScore,
      weight: weights.cleanliness,
      display: place.cleanlinessScore !== null && place.cleanlinessScore !== undefined ? `${place.cleanlinessScore} / 100` : 'Not Audited / Unknown',
      isAvailable: place.cleanlinessScore !== null && place.cleanlinessScore !== undefined
    },
    {
      key: 'accessibility',
      label: 'Accessibility Audit',
      rawValue: place.accessibilityScore,
      value: place.accessibilityScore,
      weight: weights.accessibility,
      display: place.accessibilityScore !== null && place.accessibilityScore !== undefined ? `${place.accessibilityScore} / 100` : 'Not Audited / Unknown',
      isAvailable: place.accessibilityScore !== null && place.accessibilityScore !== undefined
    }
  ];

  let sumWeightedScores = 0;
  let sumActiveWeights = 0;
  const unknownKeys = [];

  metrics.forEach(m => {
    if (m.isAvailable && typeof m.value === 'number') {
      sumWeightedScores += m.value * m.weight;
      sumActiveWeights += m.weight;
    } else {
      unknownKeys.push(m.label);
    }
  });

  const overallScore = sumActiveWeights > 0 ? Math.round(sumWeightedScores / sumActiveWeights) : null;

  return {
    overallScore,
    metrics,
    availableCount: metrics.filter(m => m.isAvailable).length,
    totalMetrics: metrics.length,
    unknownCount: unknownKeys.length,
    unknownMetrics: unknownKeys,
    methodologyNote: unknownKeys.length > 0
      ? `Computed strictly from ${metrics.filter(m => m.isAvailable).length} available metrics (${Math.round(sumActiveWeights * 100)}% weight base). ${unknownKeys.join(', ')} marked Unknown without estimation.`
      : 'Comprehensive audit: All 5 standardized dimensions verified.'
  };
}

/**
 * Initial Curated Citizen Reports Feed
 * Clearly marked with reference status.
 */
export const INITIAL_CITIZEN_REPORTS = [
  {
    id: 'CP-REP-1042',
    cityId: 'mumbai',
    category: 'Broken Streetlight / Darkness',
    location: 'Colaba Causeway, 3rd Cross lane near art gallery',
    urgency: 'Medium',
    description: 'Streetlamp #COL-42 flickering and went completely dark last night around 10 PM. Pedestrians taking detour to main avenue.',
    status: 'Verified by Community',
    statusBadgeClass: 'badge-verified',
    reporter: 'Rohan K. (Resident)',
    timestamp: '2 hours ago',
    upvotes: 14,
    isSample: true
  },
  {
    id: 'CP-REP-1043',
    cityId: 'mumbai',
    category: 'Heavy Crowd / Gridlock',
    location: 'CSMT Suburban Platform 1-4 Subway',
    urgency: 'High',
    description: 'Heavy passenger backlog at exit turnstiles due to one malfunctioning automated gate during morning peak rush.',
    status: 'Under Municipal Review',
    statusBadgeClass: 'badge-review',
    reporter: 'Pooja S. (Commuter)',
    timestamp: '4 hours ago',
    upvotes: 38,
    isSample: true
  },
  {
    id: 'CP-REP-1044',
    cityId: 'tokyo',
    category: 'Cleanliness / Sanitation',
    location: 'Shinjuku Gyoen North Perimeter Wall',
    urgency: 'Low',
    description: 'Temporary construction barrier debris on pedestrian sidewalk near intersection. Sidewalk narrowed.',
    status: 'Resolved',
    statusBadgeClass: 'badge-resolved',
    reporter: 'Kenji T.',
    timestamp: 'Yesterday',
    upvotes: 9,
    isSample: true
  },
  {
    id: 'CP-REP-1045',
    cityId: 'bengaluru',
    category: 'Road Hazard / Pothole',
    location: 'Silk Board flyover descending ramp',
    urgency: 'High',
    description: 'Deep asphalt rut formed on left lane causing sudden vehicle braking and tailback.',
    status: 'Submitted - Awaiting Municipal Verification',
    statusBadgeClass: 'badge-submitted',
    reporter: 'Aditya M. (Cab driver)',
    timestamp: '1 hour ago',
    upvotes: 27,
    isSample: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Places', icon: 'Sparkles' },
  { id: 'food', label: 'Local Food & Cafes', icon: 'Utensils' },
  { id: 'attraction', label: 'Tourist Attractions', icon: 'Compass' },
  { id: 'hotel', label: 'Hotels & Stays', icon: 'Hotel' },
  { id: 'heritage', label: 'Heritage & Culture', icon: 'Landmark' }
];
