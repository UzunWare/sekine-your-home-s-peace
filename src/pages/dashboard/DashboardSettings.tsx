import { useState } from 'react';
import { User, Bell, Shield, CreditCard, HelpCircle, Mail, Key, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/layouts/DashboardLayout';

const DashboardSettings = () => {
  const [notifications, setNotifications] = useState({
    prayerReminders: true,
    deviceAlerts: true,
    weeklyReport: false,
    marketingEmails: false,
  });

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and security</p>
        </div>

        {/* Profile Section */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Profile</h2>
              <p className="text-sm text-muted-foreground">Your personal information</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-semibold text-primary">JD</span>
            </div>
            <div>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
              <Input defaultValue="John" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
              <Input defaultValue="Doe" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <Input defaultValue="john@example.com" type="email" />
            </div>
          </div>

          <Button>Save Changes</Button>
        </section>

        {/* Notifications Section */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10">
              <Bell className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">Choose what updates you receive</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Prayer Time Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified before each prayer</p>
              </div>
              <Switch 
                checked={notifications.prayerReminders}
                onCheckedChange={(v) => setNotifications(prev => ({ ...prev, prayerReminders: v }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Device Alerts</p>
                <p className="text-sm text-muted-foreground">Notify when devices go offline</p>
              </div>
              <Switch 
                checked={notifications.deviceAlerts}
                onCheckedChange={(v) => setNotifications(prev => ({ ...prev, deviceAlerts: v }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Report</p>
                <p className="text-sm text-muted-foreground">Summary of prayer times and device usage</p>
              </div>
              <Switch 
                checked={notifications.weeklyReport}
                onCheckedChange={(v) => setNotifications(prev => ({ ...prev, weeklyReport: v }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Marketing Emails</p>
                <p className="text-sm text-muted-foreground">Updates about new features and offers</p>
              </div>
              <Switch 
                checked={notifications.marketingEmails}
                onCheckedChange={(v) => setNotifications(prev => ({ ...prev, marketingEmails: v }))}
              />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald/10">
              <Shield className="w-5 h-5 text-emerald" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Security</h2>
              <p className="text-sm text-muted-foreground">Protect your account</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Email Verification</p>
                  <p className="text-sm text-emerald">Verified</p>
                </div>
              </div>
              <span className="text-emerald text-sm">✓</span>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sage/10">
              <CreditCard className="w-5 h-5 text-sage" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Subscription</h2>
              <p className="text-sm text-muted-foreground">Manage your plan and billing</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-foreground">Free Plan</span>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Current</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Up to 2 devices, basic features</p>
            <Button className="w-full">Upgrade to Pro</Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Pro Plan includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Unlimited devices</li>
              <li>Custom Adhan uploads</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>
          </div>
        </section>

        {/* Help Section */}
        <section className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-muted">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Help & Support</h2>
              <p className="text-sm text-muted-foreground">Get assistance when you need it</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1">View Documentation</Button>
            <Button variant="outline" className="flex-1">Contact Support</Button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="glass-card p-6 border-destructive/30">
          <h2 className="text-lg font-medium text-destructive mb-4">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
