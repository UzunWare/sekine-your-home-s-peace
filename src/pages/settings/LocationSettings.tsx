import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTVNavigation } from '@/hooks/useTVNavigation';

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
  { city: 'Mecca', country: 'Saudi Arabia', lat: 21.3891, lng: 39.8579, tz: 'Asia/Riyadh' },
  { city: 'Medina', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692, tz: 'Asia/Riyadh' },
  { city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, tz: 'Asia/Karachi' },
  { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, tz: 'Asia/Dhaka' },
];

export default function LocationSettings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  useTVNavigation({
    onBack: () => navigate('/settings'),
  });

  const filteredCities = searchQuery
    ? popularCities.filter(c =>
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularCities;

  const handleCitySelect = (city: typeof popularCities[0]) => {
    updateSettings('location', {
      city: city.city,
      country: city.country,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.tz,
    });
    navigate('/settings');
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center gap-4">
          <button
            data-focusable="true"
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg px-3 py-2 sm:px-4 sm:py-3 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Back</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-gold" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Location</h1>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-4xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            data-focusable="true"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* City List */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pb-6 space-y-2">
          {filteredCities.map((city) => {
            const isSelected = settings.location.city === city.city;
            return (
              <button
                key={`${city.city}-${city.country}`}
                data-focusable="true"
                onClick={() => handleCitySelect(city)}
                className={`w-full p-4 sm:p-5 lg:p-6 rounded-xl flex items-center gap-4 transition-all text-left focus:ring-2 focus:ring-primary focus:outline-none ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'glass-card hover:bg-card/80'
                }`}
              >
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium">{city.city}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{city.country}</p>
                </div>
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer hint */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use ↑↓ to navigate • SELECT to choose • BACK to return
          </p>
        </div>
      </footer>
    </div>
  );
}
