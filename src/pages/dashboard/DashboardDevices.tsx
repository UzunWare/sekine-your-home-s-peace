import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tv, MoreVertical, Settings, Trash2, Power, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DashboardLayout from '@/layouts/DashboardLayout';

// Mock data for devices
const devices = [
  {
    id: '1',
    name: 'Living Room TV',
    status: 'online',
    location: 'London, UK',
    lastSeen: 'Now',
    currentScreen: 'Idle',
    model: 'Samsung Smart TV',
    pairedAt: 'Jan 15, 2024',
  },
  {
    id: '2',
    name: 'Bedroom TV',
    status: 'online',
    location: 'London, UK',
    lastSeen: 'Now',
    currentScreen: 'Screensaver',
    model: 'LG OLED',
    pairedAt: 'Feb 2, 2024',
  },
  {
    id: '3',
    name: 'Guest Room',
    status: 'offline',
    location: 'London, UK',
    lastSeen: '2 hours ago',
    currentScreen: '-',
    model: 'Sony Bravia',
    pairedAt: 'Mar 10, 2024',
  },
  {
    id: '4',
    name: 'Mosque Main Hall',
    status: 'online',
    location: 'London, UK',
    lastSeen: 'Now',
    currentScreen: 'Idle',
    model: 'Commercial Display',
    pairedAt: 'Dec 1, 2023',
  },
];

const DashboardDevices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all');

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || device.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">My Devices</h1>
            <p className="text-muted-foreground mt-1">Manage all your connected Sekine TV devices</p>
          </div>
          <Link to="/dashboard/pair">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Pair New Device
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'online', 'offline'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'all' && ` (${devices.length})`}
                {status === 'online' && ` (${devices.filter(d => d.status === 'online').length})`}
                {status === 'offline' && ` (${devices.filter(d => d.status === 'offline').length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Devices Grid */}
        {filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className="glass-card p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      device.status === 'online' ? 'bg-emerald/10' : 'bg-muted'
                    }`}>
                      <Tv className={`w-6 h-6 ${
                        device.status === 'online' ? 'text-emerald' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{device.name}</h3>
                      <p className="text-sm text-muted-foreground">{device.model}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-lg hover:bg-muted">
                        <MoreVertical className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/dashboard/devices/${device.id}`} className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Manage Device
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Power className="w-4 h-4" />
                        {device.status === 'online' ? 'Restart' : 'Wake Up'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Remove Device
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
                    <div className={`flex items-center gap-2 mt-1 ${
                      device.status === 'online' ? 'text-emerald' : 'text-muted-foreground'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        device.status === 'online' ? 'bg-emerald animate-pulse' : 'bg-muted-foreground'
                      }`} />
                      <span className="font-medium capitalize">{device.status}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Screen</p>
                    <p className="font-medium text-foreground mt-1">{device.currentScreen}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                    <p className="font-medium text-foreground mt-1">{device.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Last Seen</p>
                    <p className="font-medium text-foreground mt-1">{device.lastSeen}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Paired: {device.pairedAt}</span>
                  <Link 
                    to={`/dashboard/devices/${device.id}`}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Manage Settings →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Tv className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No devices found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Pair your first Sekine TV device to get started'}
            </p>
            <Link to="/dashboard/pair">
              <Button>Pair New Device</Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardDevices;
