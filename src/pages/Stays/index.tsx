import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useSupabaseStays } from '../../hooks/useSupabaseStays';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Helper function to extract plain text from HTML
const extractTextFromHtml = (html: string) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Predefined destinations list
const DESTINATIONS = [
  'ahmedabad', 'alleppey', 'aurangabad', 'bhopal', 'chennai', 'coimbatore', 
  'dehradun', 'delhi', 'dharamshala', 'lucknow', 'faridabad', 'ghaziabad', 
  'goa', 'gurgaon', 'hyderabad', 'indore', 'jabalpur', 'jaipur', 'jim-corbett', 
  'kerala', 'kochi', 'kolkata', 'lonavala', 'mamallapuram', 'masinagudi', 
  'meerut', 'mumbai', 'nashik', 'noida', 'ooty', 'patna', 'pondicherry', 
  'pune', 'raipur', 'rajkot', 'shimla', 'singapore', 'taiwan', 'udaipur', 
  'udupi', 'vadodara', 'vijayawada', 'warangal', 'yelagiri', 'yelagiti', 
  'yercaud', 'agra', 'bangalore', 'chikmagalur', 'coorg', 'dubai', 'gwalior', 
  'kabini', 'kodaikanal', 'kota', 'ludhiana', 'nepal', 'oman', 'ranchi', 
  'rishikesh', 'surat', 'thane', 'varanasi', 'wayanad', 'visakhapatnam',
  'jamshedpur', 'bhubaneshwar', 'chandigarh', 'andaman', 'savli', 'guwahati', 'sasan-gir',
  
  // Additional Karnataka destinations
  'mysore', 'hampi', 'madikeri', 'hassan', 'mangalore', 'dandeli', 'gokarna', 
  'karwar', 'sakleshpur', 'belur', 'halebid', 'badami', 'aihole', 'pattadakal',
  
  // Additional Kerala destinations
  'munnar', 'thekkady', 'kumarakom', 'varkala', 'kovalam', 'kannur', 'kasaragod', 
  'idukki', 'palakkad', 'thrissur', 'kozhikode', 'kollam', 'alappuzha',
  
  // Additional Tamil Nadu destinations
  'madurai', 'trichy', 'salem', 'tiruppur', 'vellore', 'thanjavur', 'kanyakumari', 
  'rameswaram', 'tiruchendur', 'tirunelveli', 'dindigul', 'erode', 'karur',
  
  // Additional Maharashtra destinations
  'nagpur', 'solapur', 'kolhapur', 'satara', 'sangli', 'ahmednagar', 'latur', 
  'akola', 'amravati', 'chandrapur', 'parbhani', 'jalgaon', 'dhule', 'nanded',
  
  // Additional Rajasthan destinations
  'jodhpur', 'bikaner', 'kota', 'ajmer', 'pushkar', 'mount-abu', 'alwar', 
  'bharatpur', 'chittorgarh', 'jhalawar', 'pali', 'sikar', 'tonk', 'banswara',
  
  // Additional Uttar Pradesh destinations
  'kanpur', 'allahabad', 'varanasi', 'meerut', 'bareilly', 'aligarh', 'moradabad', 
  'saharanpur', 'gorakhpur', 'firozabad', 'jhansi', 'muzaffarnagar', 'mathura', 
  'vrindavan', 'ayodhya', 'fatehpur-sikri', 'bulandshahr', 'rampur', 'etawah',
  
  // Additional Himachal Pradesh destinations
  'manali', 'kullu', 'kasauli', 'dalhousie', 'mcleodganj', 'palampur', 'chail', 
  'kufri', 'kasol', 'tosh', 'malana', 'spiti', 'kinnaur', 'lahaul',
  
  // Additional Uttarakhand destinations
  'haridwar', 'mussoorie', 'nainital', 'ranikhet', 'almora', 'pithoragarh', 
  'bageshwar', 'chamoli', 'pauri', 'tehri', 'uttarkashi', 'champawat', 'rudraprayag',
  
  // Additional Gujarat destinations
  'surat', 'baroda', 'bhavnagar', 'jamnagar', 'junagadh', 'gandhinagar', 
  'anand', 'nadiad', 'mehsana', 'palanpur', 'veraval', 'porbandar', 'dwarka', 
  'somnath', 'kutch', 'rann-of-kutch', 'saputara',
  
  // Additional Goa destinations (districts/areas)
  'north-goa', 'south-goa', 'panaji', 'margao', 'mapusa', 'ponda', 'vasco', 
  'curchorem', 'bicholim', 'pernem', 'quepem', 'sanguem', 'canacona',
  
  // Additional Andhra Pradesh destinations
  'vijaywada', 'guntur', 'nellore', 'kurnool', 'kadapa', 'anantapur', 
  'chittoor', 'east-godavari', 'west-godavari', 'krishna', 'prakasam', 'srikakulam',
  
  // Additional Telangana destinations
  'secunderabad', 'nizamabad', 'karimnagar', 'warangal', 'khammam', 'mahbubnagar', 
  'nalgonda', 'medak', 'rangareddy', 'adilabad',
  
  // Additional Haryana destinations
  'faridabad', 'panipat', 'ambala', 'yamunanagar', 'rohtak', 'hisar', 'karnal', 
  'sonipat', 'panchkula', 'bahadurgarh', 'jind', 'sirsa', 'fatehabad', 'mahendragarh',
  
  // Additional Punjab destinations
  'amritsar', 'jalandhar', 'patiala', 'bathinda', 'mohali', 'firozpur', 
  'hoshiarpur', 'batala', 'pathankot', 'abohar', 'malerkotla', 'khanna',
  
  // International destinations
  'sri-lanka', 'maldives', 'thailand', 'bali', 'malaysia', 'vietnam', 'cambodia', 
  'bhutan', 'tibet', 'turkey', 'egypt', 'jordan', 'iran', 'uzbekistan'
];

const StaysPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDestination = searchParams.get('destination');
  const { stays, loading, error } = useSupabaseStays();
  const [searchTerm, setSearchTerm] = useState('');

  // Scroll to top when destination changes or component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedDestination]);

  // Helper function to parse facilities text properly
  const parseFacilities = (facilitiesText: string) => {
    if (!facilitiesText) return [];
    
    const cleanText = extractTextFromHtml(facilitiesText);
    
    // Split by various delimiters and also handle camelCase words
    let facilities = cleanText
      .split(/[.,;]/)
      .flatMap(facility => 
        facility
          .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
          .split(/\s+/) // Split by whitespace
          .filter(word => word.length > 2) // Filter short words
      )
      .filter(facility => facility.trim().length > 0)
      .map(facility => facility.trim())
      .slice(0, 6); // Limit to 6 facilities
    
    return [...new Set(facilities)]; // Remove duplicates
  };

  // Function to match stay location to predefined destination
  const matchDestination = (location: string, stayName?: string) => {
    const cleanLocation = extractTextFromHtml(location || '').toLowerCase();
    const cleanStayName = (stayName || '').toLowerCase();

    // Find matching destination
    for (const dest of DESTINATIONS) {
      const destLower = dest.toLowerCase();
      
      // Direct match in location
      if (cleanLocation.includes(destLower)) {
        return dest;
      }
      
      // Direct match in stay name (for cases like "Resort Name, Gurgaon")
      if (cleanStayName.includes(destLower)) {
        return dest;
      }
      
      // Handle variations
      const variations: { [key: string]: string[] } = {
        'bangalore': ['bengaluru', 'bang', 'doddaballapur', 'rajanukunte', 'cityville'],
        'mumbai': ['bombay', 'mum'],
        'delhi': ['new delhi', 'ncr', 'garhmukteshwar'],
        'chennai': ['madras', 'mugaiyur', 'ecr'],
        'kolkata': ['calcutta', 'diamond harbour', 'bishnupur'],
        'gurgaon': ['gurugram'],
        'kerala': ['keral', 'backwater'],
        'jim-corbett': ['corbett', 'jim corbett', 'ramnagar', 'dhikuli'],
        'pondicherry': ['puducherry', 'pondy'],
        'ooty': ['ootacamund', 'udhagamandalam'],
        'coorg': ['kodagu', 'madikeri'],
        'goa': ['panaji', 'margao', 'calangute', 'baga'],
        'wayanad': ['wayanad'],
        'kodaikanal': ['kodai'],
        'yelagiri': ['elagiri'],
        'masinagudi': ['masinagudi', 'masanagudi'],
        'mysore': ['mysuru'],
        'vadodara': ['baroda'],
        'visakhapatnam': ['vizag', 'visakha'],
        'vijayawada': ['vijaywada', 'bezwada'],
        'thiruvananthapuram': ['trivandrum'],
        'kochi': ['cochin', 'ernakulam'],
        'kozhikode': ['calicut'],
        'thrissur': ['trichur'],
        'alappuzha': ['alleppey'],
        'kannur': ['cannanore'],
        'kollam': ['quilon'],
        'madurai': ['meenakshi'],
        'trichy': ['tiruchirappalli', 'tiruchirapalli'],
        'thanjavur': ['tanjore'],
        'tirunelveli': ['nellai'],
        'kanyakumari': ['cape comorin'],
        'nainital': ['naini tal'],
        'mussoorie': ['queen of hills'],
        'haridwar': ['hardwar'],
        'manali': ['kullu manali'],
        'mcleodganj': ['mcleod ganj', 'dharamshala'],
        'amritsar': ['golden temple'],
        'jalandhar': ['jullundur'],
        'ludhiana': ['ludhiyana'],
        'chandigarh': ['city beautiful', 'chd'],
        'faridabad': ['ballabgarh'],
        'ghaziabad': ['gzb'],
        'noida': ['new okhla'],
        'thane': ['thana', 'bhayandar', 'uttan rd'],
        'aurangabad': ['sambhajinagar'],
        'nagpur': ['orange city'],
        'nashik': ['nasik'],
        'solapur': ['sholapur'],
        'kolhapur': ['kolhapur'],
        'sri-lanka': ['sri lanka', 'lanka'],
        'maldives': ['maldive'],
        'thailand': ['thai'],
        'malaysia': ['kuala lumpur', 'kl'],
        'singapore': ['sing'],
        'dubai': ['uae', 'emirates'],
        'nepal': ['kathmandu'],
        'bhutan': ['thimphu'],
        'jamshedpur': ['jamshed pur', 'jharkhand'],
        'bhubaneshwar': ['bhubaneswar', 'bbsr', 'odisha'],
        'andaman': ['andaman and nicobar', 'port blair', 'havelock'],
        'savli': ['savli gujarat'],
        'guwahati': ['guwahati assam', 'gauhati', 'assam'],
        'sasan-gir': ['sasan gir', 'gir forest', 'gir national park'],
        'hyderabad': ['moinabad', 'telangana', 'tirupati', 'tiruchanoor', 'cyberabad'],
        'pune': ['pubne village', 'maharashtra'],
        'raipur': ['durg', 'pulgaon', 'piperchedi', 'shivnath', 'chhattisgarh'],
        'lonavala': ['pavana dam', 'gevhande khadak', 'tikona peth'],
        'bhopal': ['kolar dam', 'lawakadhi', 'madhya pradesh'],
        'bali': ['indonesia']
      };
      
      const destVariations = variations[dest] || [];
      for (const variation of destVariations) {
        if (cleanLocation.includes(variation) || cleanStayName.includes(variation)) {
          return dest;
        }
      }
    }
    
    return null;
  };

  // Group stays by destination
  const groupedByDestination = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    const unmatchedStays: any[] = [];
    
    // Initialize all destinations
    DESTINATIONS.forEach(dest => {
      groups[dest] = [];
    });
    
    // Group stays
    stays.forEach(stay => {
      const matchedDest = matchDestination(stay.location || '', stay.name || '');
      if (matchedDest && groups[matchedDest]) {
        groups[matchedDest].push(stay);
      } else {
        // Track unmatched stays for debugging
        unmatchedStays.push(stay);
      }
    });
    
    // Add debug information
    if (unmatchedStays.length > 0) {
      console.log(`\n=== UNMATCHED STAYS ANALYSIS ===`);
      console.log(`Found ${unmatchedStays.length} unmatched stays out of ${stays.length} total stays`);
      
      // Group unmatched stays by state/region
      const stateGroups: { [key: string]: any[] } = {};
      
      unmatchedStays.forEach(stay => {
        const location = extractTextFromHtml(stay.location || '').toLowerCase();
        let state = 'Unknown';
        
        // Extract state information from location
        if (location.includes('karnataka') || location.includes('bengaluru') || location.includes('mysore') || location.includes('hampi')) state = 'Karnataka';
        else if (location.includes('tamil nadu') || location.includes('tamilnadu') || location.includes('madurai') || location.includes('trichy')) state = 'Tamil Nadu';
        else if (location.includes('kerala') || location.includes('munnar') || location.includes('thekkady') || location.includes('kumarakom')) state = 'Kerala';
        else if (location.includes('maharashtra') || location.includes('aurangabad') || location.includes('pune')) state = 'Maharashtra';
        else if (location.includes('rajasthan') || location.includes('jodhpur') || location.includes('bikaner')) state = 'Rajasthan';
        else if (location.includes('uttar pradesh') || location.includes('up') || location.includes('vrindavan') || location.includes('mathura')) state = 'Uttar Pradesh';
        else if (location.includes('himachal pradesh') || location.includes('hp') || location.includes('manali') || location.includes('kullu')) state = 'Himachal Pradesh';
        else if (location.includes('uttarakhand') || location.includes('haridwar') || location.includes('nainital')) state = 'Uttarakhand';
        else if (location.includes('gujarat') || location.includes('dwarka') || location.includes('somnath')) state = 'Gujarat';
        else if (location.includes('goa')) state = 'Goa';
        else if (location.includes('andhra pradesh') || location.includes('ap') || location.includes('tirupati')) state = 'Andhra Pradesh';
        else if (location.includes('telangana') || location.includes('hyderabad')) state = 'Telangana';
        else if (location.includes('haryana')) state = 'Haryana';
        else if (location.includes('punjab')) state = 'Punjab';
        else if (location.includes('sri lanka')) state = 'Sri Lanka';
        else if (location.includes('maldives')) state = 'Maldives';
        else if (location.includes('thailand')) state = 'Thailand';
        else if (location.includes('dubai') || location.includes('uae')) state = 'UAE';
        else if (location.includes('singapore')) state = 'Singapore';
        else if (location.includes('nepal')) state = 'Nepal';
        else if (location.includes('bhutan')) state = 'Bhutan';
        
        if (!stateGroups[state]) stateGroups[state] = [];
        stateGroups[state].push(stay);
      });
      
      console.log('\n--- UNMATCHED STAYS BY STATE/REGION ---');
      Object.entries(stateGroups)
        .sort(([,a], [,b]) => b.length - a.length)
        .forEach(([state, staysInState]) => {
          console.log(`${state}: ${staysInState.length} stays`);
          staysInState.slice(0, 3).forEach(stay => {
            console.log(`  - ${stay.name} | Location: ${extractTextFromHtml(stay.location || 'No location')}`);
          });
          if (staysInState.length > 3) {
            console.log(`  ... and ${staysInState.length - 3} more`);
          }
        });
      
      console.log('\n--- TOP 20 UNMATCHED LOCATIONS ---');
      unmatchedStays.slice(0, 20).forEach((stay, index) => {
        console.log(`${index + 1}. ${stay.name} | ${extractTextFromHtml(stay.location || 'No location')}`);
      });
      
      console.log(`\n=== END ANALYSIS ===\n`);
    }
    
    // Filter out destinations with no stays
    Object.keys(groups).forEach(dest => {
      if (groups[dest].length === 0) {
        delete groups[dest];
      }
    });
    
    return groups;
  }, [stays]);

  // Function to get destination description and rating
  const getDestinationInfo = (destName: string) => {
    const destinationInfo: { [key: string]: { description: string; rating: number } } = {
      'bangalore': { description: 'Silicon Valley of India with vibrant tech culture', rating: 4.6 },
      'mumbai': { description: 'City of dreams and commercial capital', rating: 4.7 },
      'delhi': { description: 'Historic capital with rich heritage', rating: 4.5 },
      'hyderabad': { description: 'Cyberabad with royal Nizami charm', rating: 4.6 },
      'chennai': { description: 'Gateway to South India with cultural richness', rating: 4.4 },
      'pune': { description: 'Oxford of the East with pleasant climate', rating: 4.7 },
      'goa': { description: 'Paradise beaches with Portuguese charm', rating: 4.8 },
      'kerala': { description: 'Gods Own Country with backwaters', rating: 4.9 },
      'jaipur': { description: 'Pink City with royal Rajasthani heritage', rating: 4.6 },
      'udaipur': { description: 'City of Lakes with majestic palaces', rating: 4.8 },
      'agra': { description: 'Home to the magnificent Taj Mahal', rating: 4.5 },
      'shimla': { description: 'Queen of Hills with colonial charm', rating: 4.7 },
      'ooty': { description: 'Nilgiri Queen with tea gardens', rating: 4.6 },
      'coorg': { description: 'Scotland of India with coffee plantations', rating: 4.8 },
      'kodaikanal': { description: 'Princess of Hill Stations', rating: 4.5 },
      'wayanad': { description: 'Spice garden of Kerala with wildlife', rating: 4.7 },
      'rishikesh': { description: 'Yoga capital with spiritual vibes', rating: 4.6 },
      'dharamshala': { description: 'Little Lhasa in the Himalayas', rating: 4.5 },
      'jim-corbett': { description: 'Premier wildlife sanctuary experience', rating: 4.7 },
      'gurgaon': { description: 'Millennium City with modern infrastructure', rating: 4.4 },
      'noida': { description: 'Planned city with excellent connectivity', rating: 4.3 },
      'faridabad': { description: 'Industrial hub with modern amenities', rating: 4.3 },
      'thane': { description: 'City of Lakes near Mumbai', rating: 4.4 },
      'singapore': { description: 'Lion City with futuristic skyline', rating: 4.9 },
      'dubai': { description: 'Land of luxury and modern marvels', rating: 4.8 },
      'taiwan': { description: 'Beautiful island with rich culture', rating: 4.6 },
      'nepal': { description: 'Himalayan kingdom with ancient temples', rating: 4.5 },
      'oman': { description: 'Arabian gem with stunning landscapes', rating: 4.7 },
      'kolkata': { description: 'Cultural capital with intellectual heritage', rating: 4.5 },
      'kochi': { description: 'Queen of Arabian Sea', rating: 4.6 },
      'pondicherry': { description: 'French Riviera of the East', rating: 4.7 },
      'alleppey': { description: 'Venice of the East with houseboats', rating: 4.8 },
      'chikmagalur': { description: 'Coffee land with misty mountains', rating: 4.6 },
      'kabini': { description: 'Wildlife paradise by the river', rating: 4.7 },
      'masinagudi': { description: 'Gateway to Nilgiris wildlife', rating: 4.5 },
      'yelagiri': { description: 'Poor mans Ooty with serene beauty', rating: 4.4 },
      'yercaud': { description: 'Jewel of the South with orange groves', rating: 4.5 },
      'lonavala': { description: 'Hill station retreat near Mumbai', rating: 4.6 },
      'mamallapuram': { description: 'Ancient port city with rock temples', rating: 4.4 },
      'ahmedabad': { description: 'Manchester of India with heritage', rating: 4.5 },
      'coimbatore': { description: 'Manchester of South India', rating: 4.4 },
      'dehradun': { description: 'Doon Valley with pleasant weather', rating: 4.5 },
      'lucknow': { description: 'City of Nawabs with royal cuisine', rating: 4.4 },
      'ghaziabad': { description: 'Gateway to UP with modern facilities', rating: 4.3 },
      'indore': { description: 'Commercial capital of Madhya Pradesh', rating: 4.4 },
      'jabalpur': { description: 'Marble city with natural beauty', rating: 4.3 },
      'nashik': { description: 'Wine capital of India', rating: 4.5 },
      'patna': { description: 'Ancient city with historical significance', rating: 4.3 },
      'raipur': { description: 'Rice bowl of India', rating: 4.3 },
      'rajkot': { description: 'Industrial hub of Gujarat', rating: 4.4 },
      'udupi': { description: 'Temple town with pristine beaches', rating: 4.6 },
      'vadodara': { description: 'Cultural capital of Gujarat', rating: 4.5 },
      'vijayawada': { description: 'Business capital of Andhra Pradesh', rating: 4.4 },
      'warangal': { description: 'City of temples and forts', rating: 4.3 },
      'yelagiti': { description: 'Hidden gem in Tamil Nadu hills', rating: 4.4 },
      'bhopal': { description: 'City of lakes with royal heritage', rating: 4.4 },
      'aurangabad': { description: 'City of gates near Ajanta Ellora', rating: 4.5 },
      'gwalior': { description: 'City of music and magnificent fort', rating: 4.4 },
      'kota': { description: 'Coaching capital of India', rating: 4.3 },
      'ludhiana': { description: 'Manchester of India in Punjab', rating: 4.4 },
      'ranchi': { description: 'City of waterfalls and hills', rating: 4.5 },
      'surat': { description: 'Diamond city with textile heritage', rating: 4.4 },
      'varanasi': { description: 'Spiritual capital of India', rating: 4.6 },
      'visakhapatnam': { description: 'Jewel of the East Coast', rating: 4.5 },
      'meerut': { description: 'Sports goods manufacturing hub', rating: 4.3 },
      
      // Additional Karnataka destinations
      'mysore': { description: 'Cultural capital with royal palaces', rating: 4.7 },
      'hampi': { description: 'UNESCO World Heritage site with ancient ruins', rating: 4.8 },
      'madikeri': { description: 'Coffee capital of Karnataka', rating: 4.6 },
      'hassan': { description: 'Gateway to Hoysala architecture', rating: 4.4 },
      'mangalore': { description: 'Coastal city with pristine beaches', rating: 4.5 },
      'dandeli': { description: 'Adventure sports paradise', rating: 4.6 },
      'gokarna': { description: 'Beach town with spiritual vibes', rating: 4.7 },
      'karwar': { description: 'Scenic coastal destination', rating: 4.5 },
      'sakleshpur': { description: 'Hill station with coffee estates', rating: 4.6 },
      
      // Additional Kerala destinations  
      'munnar': { description: 'Tea gardens in the Western Ghats', rating: 4.8 },
      'thekkady': { description: 'Wildlife sanctuary with spice plantations', rating: 4.7 },
      'kumarakom': { description: 'Backwater paradise with bird sanctuary', rating: 4.8 },
      'varkala': { description: 'Cliff-top beaches and spiritual retreats', rating: 4.6 },
      'kovalam': { description: 'Crescent-shaped beaches and resorts', rating: 4.5 },
      'kannur': { description: 'Land of looms and lores', rating: 4.4 },
      'kasaragod': { description: 'Land of forts and beaches', rating: 4.3 },
      'thrissur': { description: 'Cultural capital of Kerala', rating: 4.5 },
      'kozhikode': { description: 'City of spices and trading heritage', rating: 4.4 },
      'kollam': { description: 'Gateway to backwaters', rating: 4.5 },
      'alappuzha': { description: 'Venice of the East', rating: 4.7 },
      
      // Additional Tamil Nadu destinations
      'madurai': { description: 'Temple city with rich heritage', rating: 4.6 },
      'trichy': { description: 'Rock fort city with ancient temples', rating: 4.5 },
      'salem': { description: 'Steel city with textile industry', rating: 4.3 },
      'vellore': { description: 'Fort city with medical colleges', rating: 4.4 },
      'thanjavur': { description: 'Rice bowl with Chola heritage', rating: 4.5 },
      'kanyakumari': { description: 'Southernmost tip of India', rating: 4.6 },
      'rameswaram': { description: 'Pilgrimage island with temples', rating: 4.5 },
      
      // Additional Maharashtra destinations
      'nagpur': { description: 'Orange city and geographical center', rating: 4.4 },
      'kolhapur': { description: 'City of wrestlers and palaces', rating: 4.5 },
      'satara': { description: 'Hill station with strawberry farms', rating: 4.4 },
      'solapur': { description: 'Textile hub with historical sites', rating: 4.3 },
      
      // Additional Rajasthan destinations
      'jodhpur': { description: 'Blue city with magnificent fort', rating: 4.7 },
      'bikaner': { description: 'Camel country with desert culture', rating: 4.6 },
      'ajmer': { description: 'Sufi shrine and pilgrimage center', rating: 4.5 },
      'pushkar': { description: 'Holy city with sacred lake', rating: 4.6 },
      'mount-abu': { description: 'Only hill station in Rajasthan', rating: 4.7 },
      'alwar': { description: 'Tiger reserve and palace city', rating: 4.4 },
      'bharatpur': { description: 'Bird sanctuary and wetlands', rating: 4.5 },
      'chittorgarh': { description: 'Fort city with Rajput valor', rating: 4.6 },
      
      // Additional Uttar Pradesh destinations
      'kanpur': { description: 'Industrial hub of UP', rating: 4.3 },
      'allahabad': { description: 'Sangam city of three rivers', rating: 4.5 },
      'bareilly': { description: 'Furniture and trading center', rating: 4.2 },
      'aligarh': { description: 'Lock manufacturing hub', rating: 4.2 },
      'mathura': { description: 'Birthplace of Lord Krishna', rating: 4.6 },
      'vrindavan': { description: 'Sacred town of Krishna temples', rating: 4.7 },
      'ayodhya': { description: 'Holy city of Lord Rama', rating: 4.6 },
      'fatehpur-sikri': { description: 'Mughal architectural marvel', rating: 4.5 },
      
      // Additional Himachal Pradesh destinations
      'manali': { description: 'Adventure sports and honeymoon capital', rating: 4.8 },
      'kullu': { description: 'Valley of gods with apple orchards', rating: 4.6 },
      'kasauli': { description: 'Colonial hill station with serenity', rating: 4.5 },
      'dalhousie': { description: 'Scottish-style hill station', rating: 4.6 },
      'mcleodganj': { description: 'Little Lhasa with Tibetan culture', rating: 4.7 },
      'palampur': { description: 'Tea gardens in Kangra valley', rating: 4.5 },
      'kasol': { description: 'Mini Israel in Parvati valley', rating: 4.6 },
      
      // Additional Uttarakhand destinations
      'haridwar': { description: 'Gateway to gods with holy Ganges', rating: 4.6 },
      'mussoorie': { description: 'Queen of hill stations', rating: 4.7 },
      'nainital': { description: 'Lake district with colonial charm', rating: 4.7 },
      'ranikhet': { description: 'Queen of meadows with pine forests', rating: 4.6 },
      'almora': { description: 'Cultural town with Himalayan views', rating: 4.5 },
      
      // Additional Gujarat destinations
      'baroda': { description: 'Cultural capital with grand palaces', rating: 4.5 },
      'bhavnagar': { description: 'Coastal city with historical sites', rating: 4.4 },
      'jamnagar': { description: 'Jewel of Kathiawar', rating: 4.4 },
      'junagadh': { description: 'Gir lions and historical monuments', rating: 4.5 },
      'dwarka': { description: 'Krishna sacred city by Arabian Sea', rating: 4.6 },
      'somnath': { description: 'First Jyotirlinga temple', rating: 4.7 },
      'kutch': { description: 'White desert with cultural heritage', rating: 4.8 },
      'saputara': { description: 'Hill station in Dang district', rating: 4.5 },
      
      // Additional Andhra Pradesh destinations
      'guntur': { description: 'Chili and cotton trading center', rating: 4.3 },
      'nellore': { description: 'Coastal city with aquaculture', rating: 4.4 },
      'kurnool': { description: 'Gateway to Rayalaseema', rating: 4.3 },
      'chittoor': { description: 'Mango city near Tirumala', rating: 4.4 },
      
      // Additional Telangana destinations
      'secunderabad': { description: 'Twin city with cantonment heritage', rating: 4.4 },
      'nizamabad': { description: 'City of nizams with turmeric trade', rating: 4.3 },
      'karimnagar': { description: 'Granite city with historical sites', rating: 4.3 },
      
      // Additional Haryana destinations
      'panipat': { description: 'Historic battlefield city', rating: 4.3 },
      'ambala': { description: 'Cantonment city with scientific instruments', rating: 4.4 },
      'karnal': { description: 'Rice bowl of India', rating: 4.3 },
      'rohtak': { description: 'Heart of Haryana with sporting culture', rating: 4.3 },
      
      // Additional Punjab destinations
      'amritsar': { description: 'Golden Temple and Sikh heritage', rating: 4.8 },
      'jalandhar': { description: 'Sports goods manufacturing hub', rating: 4.4 },
      'patiala': { description: 'Royal city with magnificent palace', rating: 4.5 },
      'bathinda': { description: 'Cotton belt with thermal power', rating: 4.3 },
      'mohali': { description: 'Planned city adjacent to Chandigarh', rating: 4.4 },
      
      // Additional destinations from ungrouped stays
      'jamshedpur': { description: 'Steel city with industrial heritage and natural beauty', rating: 4.4 },
      'bhubaneshwar': { description: 'Temple city and modern capital of Odisha', rating: 4.5 },
      'chandigarh': { description: 'Beautiful planned city with modern architecture', rating: 4.6 },
      'andaman': { description: 'Tropical island paradise with pristine beaches', rating: 4.8 },
      'savli': { description: 'Riverside adventure destination in Gujarat', rating: 4.4 },
      'guwahati': { description: 'Gateway to Northeast India with cultural diversity', rating: 4.5 },
      'sasan-gir': { description: 'Wildlife sanctuary home to Asiatic lions', rating: 4.7 },

      // International destinations
      'sri-lanka': { description: 'Pearl of the Indian Ocean', rating: 4.8 },
      'maldives': { description: 'Tropical paradise with pristine waters', rating: 4.9 },
      'thailand': { description: 'Land of smiles with golden temples', rating: 4.7 },
      'bali': { description: 'Island of gods with spiritual culture', rating: 4.8 },
      'malaysia': { description: 'Truly Asia with diverse experiences', rating: 4.6 },
      'vietnam': { description: 'Land of ascending dragon', rating: 4.5 },
      'cambodia': { description: 'Kingdom of wonder with Angkor Wat', rating: 4.6 },
      'bhutan': { description: 'Last Shangri-La with gross happiness', rating: 4.7 },
      'turkey': { description: 'Bridge between Europe and Asia', rating: 4.6 },
      'egypt': { description: 'Land of pharaohs and pyramids', rating: 4.5 }
    };
    
    return destinationInfo[destName] || { 
      description: 'Amazing destination for team outings', 
      rating: 4.5 
    };
  };

  // Create destination data with meta information
  const destinationData = useMemo(() => {
    return Object.keys(groupedByDestination).map(dest => {
      const destStays = groupedByDestination[dest];
      const stayTypes = [...new Set(destStays.map(stay => stay.destination || 'Resort').filter(Boolean))];
      const destInfo = getDestinationInfo(dest);
      
      return {
        name: dest,
        displayName: dest.charAt(0).toUpperCase() + dest.slice(1).replace(/-/g, ' '),
        staysCount: destStays.length,
        stayTypes: stayTypes,
        image: destStays[0]?.image_1 || destStays[0]?.stay_image || '/images/bangalore.jpg',
        description: destInfo.description,
        rating: destInfo.rating,
        topStay: destStays[0],
        allStays: destStays
      };
    }).sort((a, b) => b.staysCount - a.staysCount); // Sort by number of stays
  }, [groupedByDestination]);

  // Filter destinations based on search
  const filteredDestinations = useMemo(() => {
    if (!searchTerm) return destinationData;
    return destinationData.filter(dest => 
      dest.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.stayTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [destinationData, searchTerm]);

  // Filter stays for selected destination view
  const selectedDestinationStays = useMemo(() => {
    if (!selectedDestination) return [];
    return groupedByDestination[selectedDestination] || [];
  }, [groupedByDestination, selectedDestination]);

  const handleDestinationClick = (destinationName: string) => {
    setSearchParams({ destination: destinationName });
  };

  const handleBackToDestinations = () => {
    setSearchParams({});
  };

  const handleStayClick = (stay: any) => {
    if (stay.slug) {
      navigate(`/stay/${stay.slug}`);
    } else {
      navigate(`/stay/${stay.id}`);
    }
  };

  const getStayIcon = (stayType: string) => {
    switch (stayType?.toLowerCase()) {
      case 'resort':
        return '🏖️';
      case 'hotel':
        return '🏨';
      case 'villa':
        return '🏡';
      case 'farmhouse':
        return '🏠';
      case 'camp':
        return '⛺';
      default:
        return '🏨';
    }
  };

  const getDestinationIcon = (destName: string) => {
    const destinationIcons: { [key: string]: string } = {
      // Original destinations
      'bangalore': '🌆', 'mumbai': '🏙️', 'delhi': '🏛️', 'hyderabad': '💎',
      'chennai': '🏖️', 'pune': '🌿', 'goa': '🏝️', 'kerala': '🌴',
      'jaipur': '🏰', 'udaipur': '🏰', 'agra': '🕌', 'shimla': '🏔️',
      'ooty': '🌄', 'coorg': '☕', 'kodaikanal': '🏞️', 'wayanad': '🌲',
      'rishikesh': '🕉️', 'dharamshala': '⛰️', 'jim-corbett': '🐅',
      'gurgaon': '🏢', 'noida': '🏢', 'faridabad': '🏢', 'thane': '🏢',
      'singapore': '🇸🇬', 'dubai': '🇦🇪', 'taiwan': '🇹🇼', 'nepal': '🇳🇵',
      'oman': '🇴🇲', 'kolkata': '🌉', 'kochi': '⛵', 'pondicherry': '🌊',
      'alleppey': '🛶',
      
      // Karnataka destinations
      'mysore': '🏛️', 'hampi': '🏛️', 'madikeri': '☕', 'hassan': '🏛️',
      'mangalore': '🏖️', 'dandeli': '🚣', 'gokarna': '🏖️', 'karwar': '🏖️',
      'sakleshpur': '🌄', 'belur': '🏛️', 'halebid': '🏛️', 'badami': '🏛️',
      
      // Kerala destinations
      'munnar': '🍃', 'thekkady': '🐘', 'kumarakom': '🛶', 'varkala': '🏖️',
      'kovalam': '🏖️', 'kannur': '🏖️', 'kasaragod': '🏰', 'thrissur': '🎭',
      'kozhikode': '🌶️', 'kollam': '🛶', 'alappuzha': '🛶', 'idukki': '🏞️',
      
      // Tamil Nadu destinations
      'madurai': '🕌', 'trichy': '🏰', 'salem': '🏭', 'vellore': '🏰',
      'thanjavur': '🕌', 'kanyakumari': '🌅', 'rameswaram': '🕌',
      'tirunelveli': '🕌', 'yercaud': '🌄', 'yelagiri': '🌄',
      
      // Maharashtra destinations
      'nagpur': '🍊', 'kolhapur': '🤼', 'satara': '🍓', 'solapur': '🧵',
      'sangli': '🍇', 'ahmednagar': '🏛️', 'lonavala': '🌄', 'mamallapuram': '🏛️',
      
      // Rajasthan destinations
      'jodhpur': '🏰', 'bikaner': '🐪', 'ajmer': '🕌', 'pushkar': '🏞️',
      'mount-abu': '🌄', 'alwar': '🐅', 'bharatpur': '🦅', 'chittorgarh': '🏰',
      
      // Uttar Pradesh destinations
      'kanpur': '🏭', 'allahabad': '🌊', 'bareilly': '🪑', 'aligarh': '🔐',
      'mathura': '🕉️', 'vrindavan': '🕉️', 'ayodhya': '🕉️', 'fatehpur-sikri': '🏛️',
      'lucknow': '🏛️', 'varanasi': '🕉️', 'meerut': '⚽',
      
      // Himachal Pradesh destinations
      'manali': '🏔️', 'kullu': '🍎', 'kasauli': '🌲', 'dalhousie': '🏔️',
      'mcleodganj': '🏔️', 'palampur': '🍃', 'kasol': '🏔️', 'spiti': '🏔️',
      
      // Uttarakhand destinations
      'haridwar': '🕉️', 'mussoorie': '🌄', 'nainital': '🏞️', 'ranikhet': '🌲',
      'almora': '🏔️', 'dehradun': '🌄',
      
      // Gujarat destinations
      'ahmedabad': '🏛️', 'surat': '💎', 'baroda': '🏛️', 'bhavnagar': '🏖️',
      'jamnagar': '💎', 'junagadh': '🦁', 'dwarka': '🕉️', 'somnath': '🕉️',
      'kutch': '🏜️', 'saputara': '🌄',
      
      // Andhra Pradesh & Telangana
      'visakhapatnam': '🏖️', 'guntur': '🌶️', 'nellore': '🐟', 'kurnool': '🏛️',
      'secunderabad': '🏛️', 'nizamabad': '🌾', 'karimnagar': '🏛️',
      
      // Haryana & Punjab
      'panipat': '⚔️', 'ambala': '🏛️', 'karnal': '🌾', 'rohtak': '🏟️',
      'amritsar': '🕉️', 'jalandhar': '⚽', 'patiala': '🏰', 'bathinda': '🌾',
      'mohali': '🏟️',
      
      // Additional destinations from ungrouped stays
      'jamshedpur': '🏭', 'bhubaneshwar': '🕌', 'chandigarh': '🌹', 
      'andaman': '🏝️', 'savli': '🌊', 'guwahati': '🌄', 'sasan-gir': '🦁',

      // International destinations
      'sri-lanka': '🇱🇰', 'maldives': '🇲🇻', 'thailand': '🇹🇭', 'bali': '🇮🇩',
      'malaysia': '🇲🇾', 'vietnam': '🇻🇳', 'cambodia': '🇰🇭', 'bhutan': '🇧🇹',
      'turkey': '🇹🇷', 'egypt': '🇪🇬', 'jordan': '🇯🇴',
      
      'default': '🏙️'
    };
    
    return destinationIcons[destName] || destinationIcons['default'];
  };

  // If a destination is selected, show stays for that destination
  if (selectedDestination) {
    const displayName = selectedDestination.charAt(0).toUpperCase() + selectedDestination.slice(1).replace(/-/g, ' ');
    
    return (
      <>
        <Helmet>
          <title>Corporate Team Outing Venues in {displayName} | Team Building Destinations | Trebound</title>
          <meta 
            name="description" 
            content={`Discover exceptional corporate team outing venues and team building destinations in ${displayName}. Handpicked resorts, hotels, and unique stays perfect for team experiences, leadership retreats, and employee engagement programs.`}
          />
        </Helmet>

        <div className="min-h-screen bg-gray-50">
          <Navbar />

          {/* Destination Header */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <button
                  onClick={handleBackToDestinations}
                  className="mb-6 text-blue-600 hover:text-blue-800 flex items-center mx-auto"
                >
                  ← Back to All Destinations
                </button>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {getDestinationIcon(selectedDestination)} <span className="text-[#FF4C39]">{displayName}</span> Stays
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Discover exceptional corporate team outing venues and team building destinations in {displayName}. 
                  Our handpicked collection of resorts, hotels, and unique stays offers the perfect setting for 
                  memorable team experiences, leadership retreats, and employee engagement programs that foster 
                  collaboration and strengthen workplace relationships.
                </p>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                  {selectedDestinationStays.length} amazing stays available in {displayName}
                </p>
              </div>
            </div>
          </div>

          {/* Stays Grid for Selected Destination */}
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {selectedDestinationStays.map((stay, index) => (
                  <motion.div
                    key={stay.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                    onClick={() => handleStayClick(stay)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={stay.image_1 || stay.stay_image || '/images/bangalore.jpg'}
                        alt={stay.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/bangalore.jpg';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {getStayIcon(stay.destination)} {stay.destination || 'Resort'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {stay.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        📍 {extractTextFromHtml(stay.location || '')}
                      </p>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {extractTextFromHtml(stay.stay_description || '')}
                      </p>

                      {/* Facilities */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2">
                          {parseFacilities(stay.facilities || '').map((facility, idx) => (
                            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
    }

  // Default view: Show destination cards
  return (
    <>
      <Helmet>
        <title>Corporate Team Outing Venues & Team Building Destinations | Trebound</title>
        <meta 
          name="description" 
          content="Transform your team dynamics with carefully curated corporate team outing venues across India and beyond. 
          From immersive team building activities in scenic locations to unique team experiences at premium resorts, 
          discover the perfect destinations for memorable corporate retreats, leadership offsites, and employee engagement programs 
          that strengthen bonds and boost productivity."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Explore <span className="text-[#FF4C39]">Destinations</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Transform your team dynamics with carefully curated corporate team outing venues across India and beyond. 
                From immersive team building activities in scenic locations to unique team experiences at premium resorts, 
                discover the perfect destinations for memorable corporate retreats, leadership offsites, and employee engagement programs 
                that strengthen bonds and boost productivity.
              </p>

              {/* Search */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
                    <input
                      type="text"
                  placeholder="Search destinations or stay types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(12)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">Error loading destinations: {error}</div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-6 py-2 rounded-lg hover:opacity-90"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="mb-8">
                  <p className="text-gray-600">
                    Showing {filteredDestinations.length} destinations with {filteredDestinations.reduce((total, dest) => total + dest.staysCount, 0)} amazing stays
                  </p>
                </div>

                {filteredDestinations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🗺️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms to find what you're looking for.
                    </p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-6 py-2 rounded-lg hover:opacity-90"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDestinations.map((destination, index) => (
                      <motion.div
                        key={destination.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                        onClick={() => handleDestinationClick(destination.name)}
                      >
                        <div className="relative h-48 overflow-hidden">
                            <img
                            src={destination.image}
                            alt={destination.displayName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/bangalore.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-2xl font-bold flex items-center">
                              {getDestinationIcon(destination.name)} {destination.displayName}
                            </h3>
                            </div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                              {destination.staysCount} stays
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          {/* Destination Info */}
                          <div className="text-gray-600 mb-4">
                            <div className="text-sm">
                              <span>{destination.description}</span>
                            </div>
                          </div>

                          {/* Stay Types */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {destination.stayTypes.slice(0, 3).map((type, idx) => (
                                <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {getStayIcon(type)} {type}
                                </span>
                              ))}
                              {destination.stayTypes.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{destination.stayTypes.length - 3} more
                                </span>
                              )}
                            </div>
                              </div>

                          {/* Meta Info */}
                          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                            <span>⭐ {destination.rating}/5</span>
                          </div>

                          {/* Action Button */}
                          <button className="w-full bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium">
                            Explore {destination.staysCount} Stays →
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default StaysPage; 