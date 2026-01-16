import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';
import { MapPin, Search } from 'lucide-react';

const popularCities = [
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, tz: 'Europe/London' },
  { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, tz: 'America/New_York' },
  { city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, tz: 'Asia/Dubai' },
  { city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, tz: 'Asia/Riyadh' },
  { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, tz: 'Europe/Istanbul' },
  { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, tz: 'Africa/Cairo' },
  { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, tz: 'Asia/Kuala_Lumpur' },
  { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, tz: 'Asia/Jakarta' },
  { city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, tz: 'America/Toronto' },
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, tz: 'Australia/Sydney' },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, tz: 'Europe/Paris' },
  { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, tz: 'Europe/Berlin' },
];

const SetupLocation = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<typeof popularCities[0] | null>(
    settings.location.city ? popularCities.find(c => c.city === settings.location.city) || null : null
  );

  useTVNavigation({
    onBack: () => navigate('/setup/mode'),
  });

  const filteredCities = searchQuery
    ? popularCities.filter(c => 
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularCities;

  const handleCitySelect = (city: typeof popularCities[0]) => {
    setSelectedCity(city);
  };

  const handleContinue = () => {
    if (selectedCity) {
      updateSettings('location', {
        city: selectedCity.city,
        country: selectedCity.country,
        latitude: selectedCity.lat,
        longitude: selectedCity.lng,
        timezone: selectedCity.tz,
      });
      navigate('/setup/calculation');
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col p-6 sm:p-8 lg:p-12">
      {/* Progress indicator */}
      <div className="absolute top-6 sm:top-8 lg:top-12 right-6 sm:right-8 lg:right-12 flex items-center gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Step 4 of 7</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${step <= 4 ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center pt-12 sm:pt-16 max-w-3xl lg:max-w-4xl mx-auto w-full">
        <MapPin className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary mb-2 sm:mb-4" />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-4">Set Your Location</h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8">
          Select your city for accurate prayer times
        </p>

        {/* Search */}
        <div className="relative w-full max-w-md lg:max-w-lg mb-4 sm:mb-6 lg:mb-8">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-card border border-border rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            data-focusable="true"
          />
        </div>

        {/* City grid */}
        <div className="flex-1 w-full overflow-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {filteredCities.map((city) => (
              <button
                key={city.city}
                data-focusable="true"
                onClick={() => handleCitySelect(city)}
                className={`p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border-2 transition-all text-left ${
                  selectedCity?.city === city.city
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                } focus:ring-2 focus:ring-primary`}
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-medium">{city.city}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{city.country}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <div className="pt-4 sm:pt-6 lg:pt-8">
          <button
            data-focusable="true"
            onClick={handleContinue}
            disabled={!selectedCity}
            className={`px-8 sm:px-10 lg:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all ${
              selectedCity
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-primary/50'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupLocation;
