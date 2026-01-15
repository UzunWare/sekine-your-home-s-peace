import { Link } from 'react-router-dom';
import { Tv, Clock, MapPin, Volume2, Plus, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/DashboardLayout';

// Mock data for connected devices
const connectedDevices = [
  {
    id: '1',
    name: 'Living Room TV',
    status: 'online',
    location: 'London, UK',
    lastSeen: 'Now',
    currentScreen: 'Idle',
    nextPrayer: 'Maghrib',
    nextPrayerTime: '18:42',
  },
  {
    id: '2',
    name: 'Bedroom TV',
    status: 'online',
    location: 'London, UK',
    lastSeen: 'Now',
    currentScreen: 'Screensaver',
    nextPrayer: 'Maghrib',
    nextPrayerTime: '18:42',
  },
  {
    id: '3',
    name: 'Guest Room',
    status: 'offline',
    location: 'London, UK',
    lastSeen: '2 hours ago',
    currentScreen: '-',
    nextPrayer: '-',
    nextPrayerTime: '-',
  },
];

const quickActions = [
  { label: 'Play Adhan', icon: Volume2, color: 'bg-primary/10 text-primary' },
  { label: 'Open Quran', icon: '📖', color: 'bg-emerald/10 text-emerald' },
  { label: 'Screensaver', icon: '🌙', color: 'bg-secondary/10 text-secondary' },
];

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">Welcome back, John</h1>
            <p className="text-muted-foreground mt-1">Manage your Sekine TV devices from here</p>
          </div>
          <Link to="/dashboard/pair">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Device
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Tv className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{connectedDevices.length}</p>
                <p className="text-sm text-muted-foreground">Total Devices</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald/10">
                <div className="w-6 h-6 rounded-full bg-emerald flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {connectedDevices.filter(d => d.status === 'online').length}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {connectedDevices.filter(d => d.status === 'online').length}
                </p>
                <p className="text-sm text-muted-foreground">Online Now</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gold/10">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">Maghrib</p>
                <p className="text-sm text-muted-foreground">Next Prayer</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-sage/10">
                <MapPin className="w-6 h-6 text-sage" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">London</p>
                <p className="text-sm text-muted-foreground">Primary Location</p>
              </div>
            </div>
          </div>
        </div>

        {/* Devices Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Your Devices</h2>
            <Link to="/dashboard/devices" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {connectedDevices.map((device) => (
              <Link
                key={device.id}
                to={`/dashboard/devices/${device.id}`}
                className="glass-card p-6 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Tv className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{device.name}</h3>
                      <p className="text-sm text-muted-foreground">{device.location}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs ${
                    device.status === 'online' 
                      ? 'bg-emerald/10 text-emerald' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      device.status === 'online' ? 'bg-emerald' : 'bg-muted-foreground'
                    }`} />
                    {device.status === 'online' ? 'Online' : 'Offline'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current Screen</p>
                    <p className="text-foreground font-medium">{device.currentScreen}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Prayer</p>
                    <p className="text-foreground font-medium">
                      {device.nextPrayer} {device.nextPrayerTime !== '-' && `• ${device.nextPrayerTime}`}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Last seen: {device.lastSeen}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="glass-card p-6 text-left hover:border-primary/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}>
                  {typeof action.icon === 'string' ? (
                    <span className="text-2xl">{action.icon}</span>
                  ) : (
                    <action.icon className="w-6 h-6" />
                  )}
                </div>
                <h3 className="font-medium text-foreground">{action.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">Send to all devices</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
