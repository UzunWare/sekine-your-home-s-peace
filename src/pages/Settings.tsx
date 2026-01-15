import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calculator, Volume2, Monitor, Bell, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Location Section */}
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Location</h2>
              <p className="text-sm text-muted-foreground">Set your location for accurate prayer times</p>
            </div>
          </div>
          <div className="space-y-3">
            <Select defaultValue="london">
              <SelectTrigger className="w-full bg-muted/50 border-border/50">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="london">London, United Kingdom</SelectItem>
                <SelectItem value="dubai">Dubai, UAE</SelectItem>
                <SelectItem value="istanbul">Istanbul, Turkey</SelectItem>
                <SelectItem value="cairo">Cairo, Egypt</SelectItem>
                <SelectItem value="mecca">Mecca, Saudi Arabia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Calculation Method Section */}
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal/10">
              <Calculator className="w-5 h-5 text-teal" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Calculation Method</h2>
              <p className="text-sm text-muted-foreground">Choose the prayer time calculation method</p>
            </div>
          </div>
          <Select defaultValue="isna">
            <SelectTrigger className="w-full bg-muted/50 border-border/50">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="isna">ISNA (North America)</SelectItem>
              <SelectItem value="mwl">Muslim World League</SelectItem>
              <SelectItem value="egypt">Egyptian General Authority</SelectItem>
              <SelectItem value="makkah">Umm Al-Qura (Makkah)</SelectItem>
              <SelectItem value="karachi">University of Karachi</SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* Adhan Settings Section */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10">
              <Volume2 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Adhan Settings</h2>
              <p className="text-sm text-muted-foreground">Configure the call to prayer</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Enable Adhan */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Enable Adhan</p>
                <p className="text-sm text-muted-foreground">Play Adhan at prayer times</p>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Adhan Reciter */}
            <div className="space-y-2">
              <p className="text-foreground">Adhan Reciter</p>
              <Select defaultValue="mishary">
                <SelectTrigger className="w-full bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select reciter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mishary">Mishary Rashid Alafasy</SelectItem>
                  <SelectItem value="makkah">Makkah Adhan</SelectItem>
                  <SelectItem value="madinah">Madinah Adhan</SelectItem>
                  <SelectItem value="abdul-basit">Abdul Basit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Volume */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-foreground">Volume</p>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
            </div>
          </div>
        </section>

        {/* Iqamah Settings */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal/10">
              <Bell className="w-5 h-5 text-teal" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Iqamah Countdown</h2>
              <p className="text-sm text-muted-foreground">Set time between Adhan and Iqamah</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer) => (
              <div key={prayer} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-foreground">{prayer}</span>
                <Select defaultValue="15">
                  <SelectTrigger className="w-20 bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 min</SelectItem>
                    <SelectItem value="10">10 min</SelectItem>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="20">20 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </section>

        {/* Display Settings */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10">
              <Monitor className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Display Settings</h2>
              <p className="text-sm text-muted-foreground">Customize the screen appearance</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Screen Burn Protection</p>
                <p className="text-sm text-muted-foreground">Subtle element movement for OLED TVs</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Show Seconds</p>
                <p className="text-sm text-muted-foreground">Display seconds in the clock</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Background Slideshow</p>
                <p className="text-sm text-muted-foreground">Rotate background images</p>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Screensaver Timeout */}
            <div className="space-y-2">
              <div>
                <p className="text-foreground">Screensaver Timeout</p>
                <p className="text-sm text-muted-foreground">Time before screensaver activates</p>
              </div>
              <Select defaultValue="5m">
                <SelectTrigger className="w-full bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select timeout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled">Disabled</SelectItem>
                  <SelectItem value="20s">20 seconds</SelectItem>
                  <SelectItem value="1m">1 minute</SelectItem>
                  <SelectItem value="5m">5 minutes</SelectItem>
                  <SelectItem value="10m">10 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Night Mode */}
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal/10">
              <Moon className="w-5 h-5 text-teal" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Night Mode</h2>
              <p className="text-sm text-muted-foreground">Dim the display during night hours</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Enable Night Mode</p>
              <p className="text-sm text-muted-foreground">Automatically dim after Isha</p>
            </div>
            <Switch />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;
